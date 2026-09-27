const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = process.env.PORT || 8080;
const DATA_FILE = path.join(__dirname, 'datos.json');

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// Helper: Extraer ID de vídeo de YouTube
function extractVideoId(url) {
  if (!url) return null;
  const regExp = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

// Helper: Extraer transcripción limpia de YouTube directamente (sin dependencias externas)
async function fetchYouTubeTranscript(videoId) {
  try {
    let title = '';
    let author = '';
    let thumbnail = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

    // 1. oEmbed para título y autor fiables
    try {
      const oembedRes = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
      if (oembedRes.ok) {
        const oembedData = await oembedRes.json();
        title = oembedData.title || '';
        author = oembedData.author_name || '';
        if (oembedData.thumbnail_url) thumbnail = oembedData.thumbnail_url;
      }
    } catch (e) {}

    // 2. Watch page con cookies de consentimiento
    const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const res = await fetch(watchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
        'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
        'Cookie': 'SOCS=CAISNQgDEitib3FfaWRlbnRpdHlmcm9udGVuZHVpc2VydmVyXzIwMjMwNjI3LjA3X3AwGgJzcxgBIAEaBgiA_LyaBg; CONSENT=YES+cb.20230531-04-p0.es+FX+999'
      }
    });
    const html = await res.text();

    // Extraer título si no vino de oEmbed
    if (!title) {
      const titleMatch = html.match(/<title>(.*?)<\/title>/);
      if (titleMatch) title = titleMatch[1].replace(' - YouTube', '').trim();
    }

    // Extraer autor/canal si no vino de oEmbed
    if (!author) {
      const authorMatch = html.match(/"ownerChannelName":"(.*?)"/) || html.match(/"author":"(.*?)"/);
      if (authorMatch) author = authorMatch[1];
    }

    // 3. Obtener pistas de subtítulos vía InnerTube ANDROID (evita respuestas vacías de timedtext web)
    let captionTracks = null;
    let playerResponse = null;

    const apiKeyMatch = html.match(/"INNERTUBE_API_KEY":"([^"]+)"/);
    const visitorMatch = html.match(/"VISITOR_DATA":"([^"]+)"/) || html.match(/"visitorData":"([^"]+)"/);

    if (apiKeyMatch && apiKeyMatch[1]) {
      try {
        const pRes = await fetch(`https://www.youtube.com/youtubei/v1/player?key=${apiKeyMatch[1]}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'com.google.android.youtube/20.10.38 (Linux; U; Android 14) gzip',
            'X-Goog-Visitor-Id': visitorMatch?.[1] || ''
          },
          body: JSON.stringify({
            context: {
              client: {
                clientName: 'ANDROID',
                clientVersion: '20.10.38',
                androidSdkVersion: 34,
                hl: 'es',
                gl: 'ES',
                visitorData: visitorMatch?.[1]
              }
            },
            videoId
          })
        });
        if (pRes.ok) {
          const pData = await pRes.json();
          playerResponse = pData;
          captionTracks = pData?.captions?.playerCaptionsTracklistRenderer?.captionTracks;
        }
      } catch (e) {}
    }

    // Respaldo: buscar bloque de subtítulos en ytInitialPlayerResponse de la página web
    if (!captionTracks || captionTracks.length === 0) {
      const playerResponseMatch = html.match(/ytInitialPlayerResponse\s*=\s*({.+?});(?:var|<\/script>)/);
      if (playerResponseMatch) {
        try {
          playerResponse = JSON.parse(playerResponseMatch[1]);
          captionTracks = playerResponse?.captions?.playerCaptionsTracklistRenderer?.captionTracks;
        } catch (e) {}
      }
    }

    if (!captionTracks || captionTracks.length === 0) {
      return { ok: false, error: 'Este vídeo no tiene subtítulos disponibles en YouTube.', title, author };
    }

    // Priorizar español, luego inglés o el primero disponible
    let track = captionTracks.find(t => t.languageCode === 'es' || t.languageCode.startsWith('es'));
    if (!track) {
      track = captionTracks.find(t => t.languageCode === 'en' || t.languageCode.startsWith('en')) || captionTracks[0];
    }

    const transcriptRes = await fetch(track.baseUrl, {
      headers: {
        'User-Agent': 'com.google.android.youtube/20.10.38 (Linux; U; Android 14) gzip'
      }
    });
    const xml = await transcriptRes.text();

    const lines = [];

    // Formato 1: timedtext format="3" (<p t="ms" d="ms"><s>...</s></p>)
    const pRegex = /<p\s+t="(\d+)"(?:\s+d="(\d+)")?[^>]*>([\s\S]*?)<\/p>/g;
    let pMatch;
    while ((pMatch = pRegex.exec(xml)) !== null) {
      const startSec = Math.floor(parseInt(pMatch[1], 10) / 1000);
      const minutes = Math.floor(startSec / 60);
      const seconds = Math.floor(startSec % 60);
      const timeStr = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

      const text = pMatch[3]
        .replace(/<[^>]+>/g, '')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/\s+/g, ' ')
        .trim();

      if (text) {
        lines.push({ time: timeStr, sec: startSec, text });
      }
    }

    // Formato 2: clásico (<text start="sec" dur="sec">...</text>)
    if (lines.length === 0) {
      const regex = /<text start="([\d\.]+)" dur="([\d\.]+)".*?>(.*?)<\/text>/g;
      let match;
      while ((match = regex.exec(xml)) !== null) {
        const startSec = parseFloat(match[1]);
        const minutes = Math.floor(startSec / 60);
        const seconds = Math.floor(startSec % 60);
        const timeStr = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        const text = match[3]
          .replace(/<[^>]+>/g, '')
          .replace(/&amp;/g, '&')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/\s+/g, ' ')
          .trim();

        if (text) {
          lines.push({ time: timeStr, sec: startSec, text });
        }
      }
    }

    const fullText = lines.map(l => `[${l.time}] ${l.text}`).join('\n');
    return {
      ok: lines.length > 0,
      title: title || playerResponse?.videoDetails?.title || '',
      author: author || playerResponse?.videoDetails?.author || '',
      thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      language: track.languageCode,
      lineCount: lines.length,
      fullTranscript: fullText
    };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

function decodeHtmlEntities(str) {
  if (!str) return '';
  return str
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();
}

// Parsear texto relativo de YouTube ("hace 2 horas", "hace 5 días", "hace 3 d", "3 weeks ago", etc.) a días de antigüedad
function parseRelativePublishedTime(text) {
  if (!text) return null;
  const lower = text.toLowerCase();
  if (
    lower.includes('segundo') || lower.includes('second') ||
    lower.includes('minuto') || lower.includes('minute') ||
    lower.includes('hora') || lower.includes('hour') ||
    lower.includes('momento') || lower.includes('just now') ||
    /\b\d+\s*h\b/.test(lower) || /\b\d+\s*min\b/.test(lower)
  ) {
    return 0;
  }
  const numMatch = lower.match(/(\d+)/);
  const num = numMatch ? parseInt(numMatch[1], 10) : 1;

  if (lower.includes('día') || lower.includes('dia') || lower.includes('day') || /\b\d+\s*d\b/.test(lower)) {
    return num;
  }
  if (lower.includes('semana') || lower.includes('sem') || lower.includes('week') || /\b\d+\s*w\b/.test(lower)) {
    return num * 7;
  }
  if (lower.includes('mes') || lower.includes('month') || /\b\d+\s*mo\b/.test(lower)) {
    return num * 30;
  }
  if (lower.includes('año') || lower.includes('year') || /\b\d+\s*a\b/.test(lower)) {
    return num * 365;
  }
  return null;
}

// Parsear duración "MM:SS" o "HH:MM:SS" a segundos
function parseDurationSeconds(lengthText) {
  if (!lengthText) return null;
  const parts = lengthText.trim().split(':').map(n => parseInt(n, 10));
  if (parts.some(isNaN)) return null;
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  return parts[0] || null;
}

// Extraer vídeos recursivamente de ytInitialData (soporta lockupViewModel actual y videoRenderer clásico)
function collectVideoRenderers(obj, results = []) {
  if (!obj || typeof obj !== 'object') return results;

  if (obj.lockupViewModel && obj.lockupViewModel.contentId) {
    const lvm = obj.lockupViewModel;
    const metaVm = lvm.metadata?.lockupMetadataViewModel;
    const title = metaVm?.title?.content || '';
    const duration = lvm.contentImage?.thumbnailViewModel?.overlays?.[0]?.thumbnailBottomOverlayViewModel?.badges?.[0]?.thumbnailBadgeViewModel?.text || '';
    let pubText = '';
    const rows = metaVm?.metadata?.contentMetadataViewModel?.metadataRows || [];
    for (const row of rows) {
      for (const part of (row.metadataParts || [])) {
        const label = part.accessibilityLabel || part.text?.content || '';
        if (/hace\s|ago|día|dia|semana|sem|mes|hora|minuto|day|week|month|hour|\b\d+\s*d\b|\b\d+\s*h\b/i.test(label)) {
          pubText = label;
        }
      }
    }
    results.push({
      videoId: lvm.contentId,
      title,
      description: '',
      duration,
      pubText
    });
    return results;
  }

  if (obj.videoRenderer && obj.videoRenderer.videoId) {
    const vr = obj.videoRenderer;
    results.push({
      videoId: vr.videoId,
      title: vr.title?.runs?.map(r => r.text).join('') || vr.title?.simpleText || '',
      description: vr.descriptionSnippet?.runs?.map(r => r.text).join('') || '',
      duration: vr.lengthText?.simpleText || vr.lengthText?.runs?.[0]?.text || '',
      pubText: vr.publishedTimeText?.simpleText || vr.publishedTimeText?.runs?.[0]?.text || ''
    });
    return results;
  }

  if (Array.isArray(obj)) {
    for (const item of obj) collectVideoRenderers(item, results);
  } else {
    for (const key of Object.keys(obj)) {
      collectVideoRenderers(obj[key], results);
    }
  }
  return results;
}

// Mapa de alias conocidos para asegurar resolución instantánea
const KNOWN_CHANNEL_HANDLES = {
  '@joseluiscavaoficial': '@JoseLuisCavatv',
  'joseluiscavaoficial': '@JoseLuisCavatv',
  'jose luis cava': '@JoseLuisCavatv',
  'josé luis cava': '@JoseLuisCavatv',
  '@juanramonrallo': '@juanrallo',
  'juanramonrallo': '@juanrallo',
  'juan ramon rallo': '@juanrallo',
  'juan ramón rallo': '@juanrallo',
  '@joneconomist': '@JonEconomist',
  'jon economist': '@JonEconomist'
};

// Buscar el canal en YouTube si el handle introducido da 404 o es un nombre libre
async function resolveYouTubeChannelBaseUrl(query, headers) {
  try {
    const cleanQ = query.replace(/^@/, '').replace(/https?:\/\/(www\.)?youtube\.com\/?/i, '').replace(/\/videos$/i, '').trim();
    const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(cleanQ)}&sp=EgIQAg%253D%253D`;
    const res = await fetch(searchUrl, { headers });
    if (!res.ok) return null;
    const html = await res.text();
    const match = html.match(/"canonicalBaseUrl":"\/(@[\w.-]+)"/) ||
                  html.match(/"canonicalBaseUrl":"\/(channel\/UC[\w-]+)"/) ||
                  html.match(/"browseId":"(UC[\w-]+)"/);
    if (match && match[1]) {
      if (match[1].startsWith('UC')) {
        return `https://www.youtube.com/channel/${match[1]}`;
      }
      return `https://www.youtube.com/${match[1]}`;
    }
  } catch (e) {}
  return null;
}

// Helper: Explorar los últimos vídeos de un canal de YouTube (ventana de hasta 90 días)
async function fetchYouTubeChannelVideos(handleOrUrl, maxDays = 90) {
  try {
    let rawInput = (handleOrUrl || '').trim();
    if (!rawInput) throw new Error('Handle o URL del canal requerido');

    const normalizedKey = rawInput.toLowerCase().replace(/https?:\/\/(www\.)?youtube\.com\//, '').replace(/\/videos$/, '');
    if (KNOWN_CHANNEL_HANDLES[normalizedKey]) {
      rawInput = KNOWN_CHANNEL_HANDLES[normalizedKey];
    }

    let targetUrl = rawInput;
    if (!targetUrl.startsWith('http')) {
      const cleanHandle = targetUrl.startsWith('@') ? targetUrl : `@${targetUrl.replace(/\s+/g, '')}`;
      targetUrl = `https://www.youtube.com/${cleanHandle}/videos`;
    } else if (!targetUrl.endsWith('/videos')) {
      targetUrl = targetUrl.replace(/\/+$/, '') + '/videos';
    }

    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
      'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
      'Cookie': 'SOCS=CAISNQgDEitib3FfaWRlbnRpdHlmcm9udGVuZHVpc2VydmVyXzIwMjMwNjI3LjA3X3AwGgJzcxgBIAEaBgiA_LyaBg; CONSENT=YES+cb.20230531-04-p0.es+FX+999'
    };

    let pageRes = await fetch(targetUrl, { headers });
    let resolvedHandle = null;

    // Si el handle no existe directamente (404), buscar automáticamente el canal en YouTube
    if (!pageRes.ok && pageRes.status === 404) {
      const fallbackBase = await resolveYouTubeChannelBaseUrl(rawInput, headers);
      if (fallbackBase) {
        targetUrl = `${fallbackBase.replace(/\/+$/, '')}/videos`;
        resolvedHandle = fallbackBase.split('youtube.com/')[1] || null;
        pageRes = await fetch(targetUrl, { headers });
      }
    }

    if (!pageRes.ok) {
      throw new Error(`No se pudo acceder al canal (${pageRes.status})`);
    }

    const serverDateHeader = pageRes.headers.get('date');
    const serverNow = serverDateHeader ? new Date(serverDateHeader).getTime() : Date.now();
    const localNow = Date.now();

    const html = await pageRes.text();

    // 1. Extraer channelId y metadatos del canal
    const rssMatch = html.match(/feeds\/videos\.xml\?channel_id=(UC[\w-]+)/);
    const extMatch = html.match(/"externalId":"(UC[\w-]+)"/) ||
                     html.match(/"channelId":"(UC[\w-]+)"/) ||
                     html.match(/itemprop="channelId"\s+content="(UC[\w-]+)"/);
    const channelId = (rssMatch && rssMatch[1]) || (extMatch && extMatch[1]) || null;

    const vanityMatch = html.match(/<link rel="canonical" href="https:\/\/www\.youtube\.com\/(@[\w.-]+)"/) ||
                        html.match(/"vanityChannelUrl":"https?:\/\/www\.youtube\.com\/(@[\w.-]+)"/);
    if (vanityMatch && vanityMatch[1]) {
      resolvedHandle = vanityMatch[1];
    }

    const titleMatch = html.match(/<meta property="og:title" content="(.*?)">/) || html.match(/<title>(.*?)<\/title>/);
    const channelTitle = titleMatch ? decodeHtmlEntities(titleMatch[1].replace(' - YouTube', '')) : '';

    const avatarMatch = html.match(/<meta property="og:image" content="(.*?)">/);
    const channelAvatar = avatarMatch ? avatarMatch[1] : '';

    // 2. Consultar feed RSS/Atom oficial de YouTube para fechas ISO exactas y descripciones
    const rssMap = new Map();
    if (channelId) {
      try {
        const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
        const rssRes = await fetch(rssUrl, { headers });
        if (rssRes.ok) {
          const rssXml = await rssRes.text();
          const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
          let entryMatch;
          while ((entryMatch = entryRegex.exec(rssXml)) !== null) {
            const entry = entryMatch[1];
            const vidMatch = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/);
            const tMatch = entry.match(/<title>([\s\S]*?)<\/title>/);
            const pubMatch = entry.match(/<published>(.*?)<\/published>/);
            const descMatch = entry.match(/<media:description>([\s\S]*?)<\/media:description>/);
            const authorMatch = entry.match(/<author>\s*<name>(.*?)<\/name>/);

            if (vidMatch && vidMatch[1]) {
              const vId = vidMatch[1].trim();
              const pubIso = pubMatch ? pubMatch[1].trim() : null;
              let ageMs = 0;
              if (pubIso) {
                const parsedPub = new Date(pubIso).getTime();
                if (!isNaN(parsedPub)) {
                  ageMs = Math.max(0, serverNow - parsedPub);
                }
              }
              rssMap.set(vId, {
                videoId: vId,
                title: tMatch ? decodeHtmlEntities(tMatch[1]) : '',
                author: authorMatch ? decodeHtmlEntities(authorMatch[1]) : channelTitle,
                description: descMatch ? decodeHtmlEntities(descMatch[1]).slice(0, 600) : '',
                ageMs,
                diasAntiguedad: Math.floor(ageMs / (1000 * 60 * 60 * 24)),
                dateTimestamp: localNow - ageMs
              });
            }
          }
        }
      } catch (rssErr) {
        console.warn('Aviso: no se pudo leer RSS del canal:', rssErr.message);
      }
    }

    // 3. Extraer vídeos de la pestaña /videos (ytInitialData) — excluye Shorts automáticamente
    const videoItemsMap = new Map();
    const initDataMatch = html.match(/var ytInitialData\s*=\s*(\{[\s\S]+?\});<\/script>/) ||
                          html.match(/ytInitialData\s*=\s*(\{[\s\S]+?\});(?:var|<\/script>)/);

    if (initDataMatch) {
      try {
        const ytData = JSON.parse(initDataMatch[1]);
        const renderers = collectVideoRenderers(ytData);

        for (const vr of renderers) {
          const vId = vr.videoId;
          if (!vId || videoItemsMap.has(vId)) continue;

          // Ignorar emisiones en directo futuras o vídeos ultracortos (< 60s, posibles Shorts)
          const lengthStr = vr.duration || '';
          const durationSec = parseDurationSeconds(lengthStr);
          if (durationSec !== null && durationSec < 60) continue;

          const vrTitle = vr.title || '';
          const vrDesc = vr.description || '';
          const pubText = vr.pubText || '';

          const rssInfo = rssMap.get(vId);
          let diasAntiguedad = rssInfo ? rssInfo.diasAntiguedad : parseRelativePublishedTime(pubText);
          if (diasAntiguedad === null) {
            diasAntiguedad = 0;
          }

          if (diasAntiguedad > maxDays) continue;

          const dateTimestamp = rssInfo ? rssInfo.dateTimestamp : (localNow - diasAntiguedad * 86400000);
          const dateObj = new Date(dateTimestamp);
          const fechaStr = dateObj.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          });

          let recencyTier = 'tier3';
          let recencyLabel = '🕰️ 46-90 días (Estructural)';
          if (diasAntiguedad <= 15) {
            recencyTier = 'tier1';
            recencyLabel = '🔥 Últimos 15 días (Máx. Ponderación)';
          } else if (diasAntiguedad <= 45) {
            recencyTier = 'tier2';
            recencyLabel = '⚡ 16-45 días (Tendencia)';
          }

          videoItemsMap.set(vId, {
            videoId: vId,
            url: `https://www.youtube.com/watch?v=${vId}`,
            title: decodeHtmlEntities(vrTitle || rssInfo?.title || ''),
            author: channelTitle || rssInfo?.author || '',
            description: rssInfo?.description || decodeHtmlEntities(vrDesc),
            duration: lengthStr,
            publishedText: pubText,
            fecha: fechaStr,
            dateTimestamp,
            diasAntiguedad,
            recencyTier,
            recencyLabel,
            thumbnail: `https://i.ytimg.com/vi/${vId}/hqdefault.jpg`
          });
        }
      } catch (parseErr) {
        console.warn('Error parseando ytInitialData:', parseErr.message);
      }
    }

    // Si ytInitialData no devolvió vídeos pero el RSS sí, usar los del RSS
    if (videoItemsMap.size === 0 && rssMap.size > 0) {
      for (const [vId, rssInfo] of rssMap.entries()) {
        if (rssInfo.diasAntiguedad > maxDays) continue;
        const dateObj = new Date(rssInfo.dateTimestamp);
        const fechaStr = dateObj.toLocaleDateString('es-ES', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
        let recencyTier = 'tier3';
        let recencyLabel = '🕰️ 46-90 días (Estructural)';
        if (rssInfo.diasAntiguedad <= 15) {
          recencyTier = 'tier1';
          recencyLabel = '🔥 Últimos 15 días (Máx. Ponderación)';
        } else if (rssInfo.diasAntiguedad <= 45) {
          recencyTier = 'tier2';
          recencyLabel = '⚡ 16-45 días (Tendencia)';
        }
        videoItemsMap.set(vId, {
          videoId: vId,
          url: `https://www.youtube.com/watch?v=${vId}`,
          title: rssInfo.title,
          author: rssInfo.author || channelTitle,
          description: rssInfo.description,
          duration: '',
          publishedText: '',
          fecha: fechaStr,
          dateTimestamp: rssInfo.dateTimestamp,
          diasAntiguedad: rssInfo.diasAntiguedad,
          recencyTier,
          recencyLabel,
          thumbnail: `https://i.ytimg.com/vi/${vId}/hqdefault.jpg`
        });
      }
    }

    const videos = Array.from(videoItemsMap.values()).sort((a, b) => b.dateTimestamp - a.dateTimestamp);

    return {
      ok: true,
      channelId,
      channelTitle,
      channelAvatar,
      count: videos.length,
      videos
    };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

const server = http.createServer(async (req, res) => {
  let reqUrl = decodeURI(req.url.split('?')[0]);

  // Soporte CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-goog-api-key'
    });
    res.end();
    return;
  }

  // 1. Endpoint: Guardar datos localmente
  if (req.method === 'POST' && reqUrl === '/api/guardar') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const parsed = JSON.parse(body);
        fs.writeFileSync(DATA_FILE, JSON.stringify(parsed, null, 2), 'utf8');
        res.writeHead(200, {
          'Content-Type': 'application/json; charset=UTF-8',
          'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify({ ok: true, timestamp: new Date().toISOString() }));
      } catch (e) {
        res.writeHead(400, {
          'Content-Type': 'application/json; charset=UTF-8',
          'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify({ ok: false, error: e.message }));
      }
    });
    return;
  }

  // 1b. Endpoint: Obtener credenciales locales si existen (seguro, no versionado en git)
  if (req.method === 'GET' && reqUrl === '/api/config-local') {
    const localCfgPath = path.join(__dirname, 'config.local.json');
    if (fs.existsSync(localCfgPath)) {
      try {
        const cfg = JSON.parse(fs.readFileSync(localCfgPath, 'utf8'));
        res.writeHead(200, {
          'Content-Type': 'application/json; charset=UTF-8',
          'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify(cfg));
        return;
      } catch (e) {}
    }
    res.writeHead(200, {
      'Content-Type': 'application/json; charset=UTF-8',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(JSON.stringify({}));
    return;
  }

  // 2. Endpoint: Extraer transcripción y metadatos de YouTube
  if (req.method === 'POST' && reqUrl === '/api/extraer-video') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const { url } = JSON.parse(body);
        const videoId = extractVideoId(url);
        if (!videoId) {
          throw new Error('URL de YouTube no válida');
        }

        const data = await fetchYouTubeTranscript(videoId);
        res.writeHead(200, {
          'Content-Type': 'application/json; charset=UTF-8',
          'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify({ ...data, videoId }));
      } catch (e) {
        res.writeHead(400, {
          'Content-Type': 'application/json; charset=UTF-8',
          'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify({ ok: false, error: e.message }));
      }
    });
    return;
  }

  // 2b. Endpoint: Explorar últimos vídeos de un canal de YouTube (ventana de 90 días)
  if (req.method === 'POST' && reqUrl === '/api/explorar-canal') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const { handle, maxDays } = JSON.parse(body || '{}');
        const data = await fetchYouTubeChannelVideos(handle, maxDays || 90);
        res.writeHead(200, {
          'Content-Type': 'application/json; charset=UTF-8',
          'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify(data));
      } catch (e) {
        res.writeHead(400, {
          'Content-Type': 'application/json; charset=UTF-8',
          'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify({ ok: false, error: e.message }));
      }
    });
    return;
  }

  // 3. Endpoint Proxy para Gemini (opcional si el cliente prefiere llamar directo)
  if (req.method === 'POST' && reqUrl === '/api/gemini') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const { prompt, systemPrompt, apiKey, model } = JSON.parse(body);
        const chosenModel = model || 'gemini-3.8-flash';
        const key = apiKey || process.env.GEMINI_API_KEY;

        if (!key) {
          throw new Error('Clave de API de Gemini no proporcionada');
        }

        const url = `https://generativelanguage.googleapis.com/v1beta/models/${chosenModel}:generateContent?key=${key}`;
        const geminiRes = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            systemInstruction: systemPrompt ? { parts: [{ text: systemPrompt }] } : undefined,
            generationConfig: {
              temperature: 0.2,
              responseMimeType: "application/json"
            }
          })
        });

        const geminiData = await geminiRes.json();
        res.writeHead(geminiRes.status, {
          'Content-Type': 'application/json; charset=UTF-8',
          'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify(geminiData));
      } catch (e) {
        res.writeHead(500, {
          'Content-Type': 'application/json; charset=UTF-8',
          'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify({ error: { message: e.message } }));
      }
    });
    return;
  }

  // 4. Servir archivos estáticos
  if (reqUrl === '/' || reqUrl === '') {
    reqUrl = '/index.html';
  }

  const filePath = path.join(__dirname, reqUrl);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
        res.end('404 Not Found');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=UTF-8' });
        res.end(`500 Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*'
      });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(` MacroConsensus v1.0 - Servidor Local Activo`);
  console.log(` URL Local: http://localhost:${PORT}`);
  console.log(`====================================================`);
});
