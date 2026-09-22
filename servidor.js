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

    // Extraer título si es posible
    let title = '';
    const titleMatch = html.match(/<title>(.*?)<\/title>/);
    if (titleMatch) {
      title = titleMatch[1].replace(' - YouTube', '').trim();
    }

    // Extraer autor/canal
    let author = '';
    const authorMatch = html.match(/"ownerChannelName":"(.*?)"/) || html.match(/"author":"(.*?)"/);
    if (authorMatch) {
      author = authorMatch[1];
    }

    // Buscar bloque de subtítulos en ytInitialPlayerResponse
    const playerResponseMatch = html.match(/ytInitialPlayerResponse\s*=\s*({.+?});(?:var|<\/script>)/);
    if (!playerResponseMatch) {
      return { ok: false, error: 'No se pudo leer ytInitialPlayerResponse', title, author };
    }

    const playerResponse = JSON.parse(playerResponseMatch[1]);
    const captionTracks = playerResponse?.captions?.playerCaptionsTracklistRenderer?.captionTracks;

    if (!captionTracks || captionTracks.length === 0) {
      return { ok: false, error: 'Este vídeo no tiene subtítulos disponibles en YouTube.', title, author };
    }

    // Priorizar español, luego inglés o el primero disponible
    let track = captionTracks.find(t => t.languageCode === 'es' || t.languageCode.startsWith('es'));
    if (!track) {
      track = captionTracks.find(t => t.languageCode === 'en' || t.languageCode.startsWith('en')) || captionTracks[0];
    }

    const transcriptRes = await fetch(track.baseUrl);
    const xml = await transcriptRes.text();

    // Parsear el XML simple de transcripción
    const regex = /<text start="([\d\.]+)" dur="([\d\.]+)".*?>(.*?)<\/text>/g;
    let match;
    const lines = [];
    while ((match = regex.exec(xml)) !== null) {
      const startSec = parseFloat(match[1]);
      const minutes = Math.floor(startSec / 60);
      const seconds = Math.floor(startSec % 60);
      const timeStr = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      
      // Decodificar entidades HTML básicas
      let text = match[3]
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/\n/g, ' ')
        .trim();

      if (text) {
        lines.push({ time: timeStr, sec: startSec, text });
      }
    }

    const fullText = lines.map(l => `[${l.time}] ${l.text}`).join('\n');
    return {
      ok: true,
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
