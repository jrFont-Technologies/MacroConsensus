// Vercel Serverless Function: Explorador de Canales de YouTube (/videos + RSS Atom Feed)
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

  if (lower.includes('día') || lower.includes('dia') || lower.includes('day') || /\b\d+\s*d\b/.test(lower)) return num;
  if (lower.includes('semana') || lower.includes('sem') || lower.includes('week') || /\b\d+\s*w\b/.test(lower)) return num * 7;
  if (lower.includes('mes') || lower.includes('month') || /\b\d+\s*mo\b/.test(lower)) return num * 30;
  if (lower.includes('año') || lower.includes('year') || /\b\d+\s*a\b/.test(lower)) return num * 365;
  return null;
}

function parseDurationSeconds(lengthText) {
  if (!lengthText) return null;
  const parts = lengthText.trim().split(':').map(n => parseInt(n, 10));
  if (parts.some(isNaN)) return null;
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  return parts[0] || null;
}

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
  'jon economist': '@JonEconomist',
  '@marc_vidal': '@marc_vidal',
  'marc_vidal': '@marc_vidal',
  '@marcvidal': '@marc_vidal',
  'marcvidal': '@marc_vidal',
  'marc vidal': '@marc_vidal'
};

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

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Método no permitido. Usa POST.' });
  }

  try {
    const { handle, maxDays = 90 } = req.body || {};
    let rawInput = (handle || '').trim();
    if (!rawInput) {
      return res.status(400).json({ ok: false, error: 'Handle o URL del canal requerido' });
    }

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

    if (!pageRes.ok && pageRes.status === 404) {
      const fallbackBase = await resolveYouTubeChannelBaseUrl(rawInput, headers);
      if (fallbackBase) {
        targetUrl = `${fallbackBase.replace(/\/+$/, '')}/videos`;
        resolvedHandle = fallbackBase.split('youtube.com/')[1] || null;
        pageRes = await fetch(targetUrl, { headers });
      }
    }

    if (!pageRes.ok) {
      return res.status(200).json({ ok: false, error: `No se pudo acceder al canal (${pageRes.status})` });
    }

    const serverDateHeader = pageRes.headers.get('date');
    const serverNow = serverDateHeader ? new Date(serverDateHeader).getTime() : Date.now();
    const localNow = Date.now();

    const html = await pageRes.text();

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
      } catch (rssErr) {}
    }

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

          const lengthStr = vr.duration || '';
          const durationSec = parseDurationSeconds(lengthStr);
          if (durationSec !== null && durationSec < 60) continue;

          const vrTitle = vr.title || '';
          const vrDesc = vr.description || '';
          const pubText = vr.pubText || '';

          const rssInfo = rssMap.get(vId);
          let diasAntiguedad = rssInfo ? rssInfo.diasAntiguedad : parseRelativePublishedTime(pubText);
          if (diasAntiguedad === null) diasAntiguedad = 0;
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
      } catch (parseErr) {}
    }

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

    return res.status(200).json({
      ok: true,
      channelId,
      resolvedHandle,
      channelTitle,
      channelAvatar,
      count: videos.length,
      videos
    });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
};
