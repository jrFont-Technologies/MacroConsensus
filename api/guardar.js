// Vercel Serverless Function: Stub de guardado en la nube
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // En entorno Cloud / Vercel Serverless, el almacenamiento persistente
  // se realiza directamente contra el repositorio GitHub (API REST).
  return res.status(200).json({
    ok: true,
    serverless: true,
    message: 'Persistencia gestionada automáticamente vía GitHub REST API'
  });
};
