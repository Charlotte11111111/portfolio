import type { VercelRequest, VercelResponse } from '@vercel/node';
import { callLlmChat, resolveLlmEnv, type ChatTurn } from '../server/llmChat';

type ChatBody = {
  input?: string;
  history?: ChatTurn[];
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let body: ChatBody = {};
  try {
    body = (typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {}) as ChatBody;
  } catch {
    return res.status(400).json({ error: '无效的 JSON' });
  }

  const input = body?.input?.trim();
  if (!input) {
    return res.status(400).json({ error: 'input 不能为空' });
  }

  const { apiKey, baseUrl, model } = resolveLlmEnv(process.env);
  const result = await callLlmChat({
    input,
    history: Array.isArray(body.history) ? body.history : [],
    apiKey,
    baseUrl,
    model,
  });

  if (!result.ok) {
    return res.status(result.status).json({ error: result.error });
  }

  return res.status(200).json({ reply: result.text });
}
