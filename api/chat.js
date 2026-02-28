// Vercel serverless function — proxies to n8n (no browser CORS issues)
const N8N_URL = 'https://n8n.nrmcampaign.com/webhook/oddshoes-chat-trigger/chat';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const response = await fetch(N8N_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error('n8n proxy error:', err);
    return res.status(500).json({
      output: "Something went wrong connecting to the AI. Please try again or email buildit@oddshoes.dev 🙏",
    });
  }
}
