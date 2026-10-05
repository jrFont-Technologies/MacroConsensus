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

    const failedAttempts = [];
    let lastData = null;
    let lastStatus = 500;

    for (let i = 0; i < keyList.length; i++) {
      const key = keyList[i];
      const prefix = key.substring(0, 14) + '...';
      const modelsToTry = [chosenModel];
      if (chosenModel === 'gemini-3.8-flash') {
        modelsToTry.push('gemini-3.6-flash', 'gemini-3.5-flash');
      }

      for (const currentModel of modelsToTry) {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${currentModel}:generateContent?key=${encodeURIComponent(key)}`;
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
            if (lastData && typeof lastData === 'object') {
              lastData._usedKeyIndex = i;
              lastData._usedKeyPrefix = prefix;
              lastData._usedModel = currentModel;
            }
            return res.status(200).json(lastData);
          } else {
            const errStr = lastData?.error?.message || `HTTP ${geminiRes.status}`;
            if ((geminiRes.status === 429 || geminiRes.status === 503) && currentModel !== modelsToTry[modelsToTry.length - 1]) {
              console.warn(`[Proxy Gemini] Clave #${i + 1} dio ${geminiRes.status} con ${currentModel}. Probando modelo de relevo...`);
              continue;
            }
            failedAttempts.push(`Slot #${i + 1} (${prefix}): ${errStr}`);
            break;
          }
        } catch (err) {
          failedAttempts.push(`Slot #${i + 1} (${prefix}): ${err.message}`);
          break;
        }
      }
    }

    const errorSummary = `Todas las claves API de Gemini fallaron:\n` + failedAttempts.map(f => `• ${f}`).join('\n');
    return res.status(lastStatus || 500).json({ error: { message: errorSummary, failedAttempts } });
  } catch (err) {
    return res.status(500).json({ error: { message: err.message } });
  }
};
