// Vercel Serverless Function: Extractor de YouTube con Bypass de Consentimiento y oEmbed
module.exports = async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido. Usa POST.' });
  }

  try {
    const { url } = req.body || {};
    if (!url) {
      return res.status(400).json({ error: 'URL requerida' });
    }

    const regExp = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/;
    const match = url.match(regExp);
    const videoId = match ? match[1] : null;

    if (!videoId) {
      return res.status(400).json({ error: 'URL de YouTube inválida' });
    }

    // 1. Obtener metadatos oficiales y fiables vía oEmbed
    let title = '';
    let author = '';
    let thumbnail = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

    try {
      const oembedRes = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
      if (oembedRes.ok) {
        const oembedData = await oembedRes.json();
        title = oembedData.title || '';
        author = oembedData.author_name || '';
        if (oembedData.thumbnail_url) thumbnail = oembedData.thumbnail_url;
      }
    } catch (oeErr) {
      console.warn('Error en oembed:', oeErr.message);
    }

    // 2. Obtener transcripción con cookies de consentimiento para evitar bloqueos
    const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const ytRes = await fetch(watchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
        'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
        'Cookie': 'SOCS=CAISNQgDEitib3FfaWRlbnRpdHlmcm9udGVuZHVpc2VydmVyXzIwMjMwNjI3LjA3X3AwGgJzcxgBIAEaBgiA_LyaBg; CONSENT=YES+cb.20230531-04-p0.es+FX+999'
      }
    });

    const html = await ytRes.text();

    if (!title) {
      const titleMatch = html.match(/<title>(.*?)<\/title>/);
      if (titleMatch) title = titleMatch[1].replace(' - YouTube', '').trim();
    }

    if (!author) {
      const authorMatch = html.match(/"ownerChannelName":"(.*?)"/) || html.match(/"author":"(.*?)"/);
      if (authorMatch) author = authorMatch[1];
    }

    const playerMatch = html.match(/ytInitialPlayerResponse\s*=\s*({.+?});(?:var|<\/script>)/);
    if (!playerMatch) {
      return res.status(200).json({ ok: false, error: 'No se detectaron subtítulos en la respuesta', title, author, thumbnail, videoId });
    }

    let captionTracks;
    try {
      const playerResponse = JSON.parse(playerMatch[1]);
      captionTracks = playerResponse?.captions?.playerCaptionsTracklistRenderer?.captionTracks;
    } catch (e) {}

    if (!captionTracks || captionTracks.length === 0) {
      return res.status(200).json({ ok: false, error: 'Sin subtítulos automáticos en YouTube', title, author, thumbnail, videoId });
    }

    let track = captionTracks.find(t => t.languageCode === 'es' || t.languageCode.startsWith('es'));
    if (!track) {
      track = captionTracks.find(t => t.languageCode === 'en' || t.languageCode.startsWith('en')) || captionTracks[0];
    }

    const transcriptRes = await fetch(track.baseUrl);
    const xml = await transcriptRes.text();

    const regex = /<text start="([\d\.]+)" dur="([\d\.]+)".*?>(.*?)<\/text>/g;
    let textMatch;
    const lines = [];
    while ((textMatch = regex.exec(xml)) !== null) {
      const startSec = parseFloat(textMatch[1]);
      const minutes = Math.floor(startSec / 60);
      const seconds = Math.floor(startSec % 60);
      const timeStr = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      let text = textMatch[3]
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/\n/g, ' ')
        .trim();
      if (text) lines.push({ time: timeStr, text });
    }

    const fullTranscript = lines.map(l => `[${l.time}] ${l.text}`).join('\n');

    return res.status(200).json({
      ok: true,
      videoId,
      title,
      author,
      thumbnail,
      language: track.languageCode,
      lineCount: lines.length,
      fullTranscript
    });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
};
