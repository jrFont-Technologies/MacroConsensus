// Vercel Serverless Function: Proxy de Gemini API con conmutación automática por fallo
module.exports = async (req, res) => {
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
    let parsedBody = req.body;
    if (typeof parsedBody === 'string') {
      try { parsedBody = JSON.parse(parsedBody); } catch (e) {}
    }
    const { prompt, systemPrompt, apiKey, apiKeys, model } = parsedBody || {};
    const chosenModel = model || 'gemini-3.8-flash';

    // Lista ordenada de claves candidatas
    let keyList = [];
    if (Array.isArray(apiKeys) && apiKeys.length > 0) {
      keyList = apiKeys.map(k => (typeof k === 'string' ? k.trim() : '')).filter(Boolean);
    } else if (apiKey && typeof apiKey === 'string' && apiKey.trim()) {
      keyList = [apiKey.trim()];
    } else if (process.env.GEMINI_API_KEY) {
      keyList = [process.env.GEMINI_API_KEY];
    }

    if (keyList.length === 0) {
      return res.status(400).json({ error: { message: 'Clave de API de Gemini no proporcionada' } });
    }

    let lastError = null;
    let lastData = null;
    let lastStatus = 500;

    for (let i = 0; i < keyList.length; i++) {
      const key = keyList[i];
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${chosenModel}:generateContent?key=${encodeURIComponent(key)}`;
      try {
        const geminiRes = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            systemInstruction: systemPrompt ? { parts: [{ text: systemPrompt }] } : undefined,
            generationConfig: {
              temperature: 0.2,
              responseMimeType: 'application/json'
            }
          })
        });

        lastStatus = geminiRes.status;
        lastData = await geminiRes.json();

        if (geminiRes.ok) {
          // Inyectamos qué clave resolvió con éxito la petición (enmascarada)
          if (lastData && typeof lastData === 'object') {
            lastData._usedKeyIndex = i;
            lastData._usedKeyPrefix = key.substring(0, 14) + '...';
          }
          return res.status(200).json(lastData);
        } else {
          lastError = lastData?.error?.message || `HTTP ${geminiRes.status}`;
          console.warn(`[Proxy Gemini] Clave #${i + 1} (${key.substring(0, 12)}...) falló: ${lastError}. Probando siguiente clave...`);
        }
      } catch (err) {
        lastError = err.message;
        console.warn(`[Proxy Gemini] Error de red en clave #${i + 1}: ${err.message}`);
      }
    }

    return res.status(lastStatus || 500).json(lastData || { error: { message: `Todas las claves fallaron. Último error: ${lastError}` } });
  } catch (err) {
    return res.status(500).json({ error: { message: err.message } });
  }
};
