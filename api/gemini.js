// Vercel Serverless Function: Proxy de Gemini API
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
    const { prompt, systemPrompt, apiKey, model } = parsedBody || {};
    const chosenModel = model || 'gemini-3.8-flash';
    const key = apiKey || process.env.GEMINI_API_KEY;

    if (!key) {
      return res.status(400).json({ error: { message: 'Clave de API de Gemini no proporcionada' } });
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${chosenModel}:generateContent?key=${encodeURIComponent(key)}`;
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

    const geminiData = await geminiRes.json();
    return res.status(geminiRes.status).json(geminiData);
  } catch (err) {
    return res.status(500).json({ error: { message: err.message } });
  }
};
