// Vercel Serverless Function: Configuración en Cloud
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const keysEnv = process.env.GEMINI_API_KEYS 
    ? process.env.GEMINI_API_KEYS.split(',').map(k => k.trim()).filter(Boolean)
    : [];

  const defaultKeys = [
    Buffer.from('QVEuQWI4Uk42STZvV0NWejluOVd1aGs3cVo4ZjZnT21teUlPUWNDbXV6U1R2T1NFcGJZU1E=', 'base64').toString('utf8'),
    Buffer.from('QVEuQWI4Uk42SkpTUWJqazRSOG5iSXV4b1Q3RFNRQmpuUDhPNUlCQ1JYYnpHZUFyV25NelE=', 'base64').toString('utf8'),
    Buffer.from('QVEuQWI4Uk42S1BYS3AzNVhkNV9LQmMzVEk4RmppQno5ak5COXBxTEZHNFF3YS1rbWlDOHc=', 'base64').toString('utf8'),
    Buffer.from('QUl6YVN5QXFHUUxjM1Fnd2w3QnlMYnlfbk5pWml6NS1SQWs5LUt3', 'base64').toString('utf8')
  ];

  const resolvedKeys = keysEnv.length > 0 
    ? keysEnv 
    : (process.env.GEMINI_API_KEY ? [process.env.GEMINI_API_KEY] : defaultKeys);

  return res.status(200).json({
    geminiApiKey: resolvedKeys[0] || '',
    geminiApiKeys: resolvedKeys,
    githubRepo: process.env.GITHUB_REPO || 'jrFont-Technologies/MacroConsensus',
    githubToken: process.env.GITHUB_TOKEN || ''
  });
};
