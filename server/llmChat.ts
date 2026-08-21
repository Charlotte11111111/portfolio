import { RESUME_CONTEXT } from '../src/data/resumeContext';

export type ChatTurn = {
  role: 'user' | 'assistant';
  content: string;
};

type AnthropicContentBlock = {
  type?: string;
  text?: string;
};

type AnthropicMessagesResponse = {
  content?: AnthropicContentBlock[] | string;
  error?: { message?: string; type?: string };
  message?: string;
};

const resolveMessagesUrl = (base: string) => {
  const normalized = base.replace(/\/$/, '');
  if (normalized.endsWith('/v1')) return `${normalized}/messages`;
  if (normalized.endsWith('/messages')) return normalized;
  return `${normalized}/v1/messages`;
};

const buildAnthropicMessages = (history: ChatTurn[], input: string) => {
  const recent = history.slice(-12);
  const firstUserIdx = recent.findIndex((m) => m.role === 'user');
  const turns = firstUserIdx >= 0 ? recent.slice(firstUserIdx) : [];

  return [
    ...turns.map((m) => ({ role: m.role, content: m.content })),
    { role: 'user' as const, content: input },
  ];
};

const extractText = (data: AnthropicMessagesResponse | null): string | null => {
  if (!data) return null;
  if (typeof data.content === 'string') {
    const text = data.content.trim();
    return text || null;
  }
  if (!Array.isArray(data.content)) return null;
  const text = data.content
    .filter((block) => block?.type === 'text' || typeof block?.text === 'string')
    .map((block) => block.text || '')
    .join('')
    .trim();
  return text || null;
};

export type LlmChatResult =
  | { ok: true; text: string }
  | { ok: false; error: string; status: number };

export async function callLlmChat({
  input,
  history = [],
  apiKey,
  baseUrl,
  model,
}: {
  input: string;
  history?: ChatTurn[];
  apiKey: string;
  baseUrl: string;
  model: string;
}): Promise<LlmChatResult> {
  if (!apiKey) {
    return {
      ok: false,
      status: 500,
      error: '服务端未配置 LLM_API_KEY（或 ANTHROPIC_AUTH_TOKEN）。请在 Vercel Environment Variables 中设置。',
    };
  }

  const response = await fetch(resolveMessagesUrl(baseUrl), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'anthropic-version': '2023-06-01',
      'x-api-key': apiKey,
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      max_tokens: 1024,
      temperature: 0.4,
      system: RESUME_CONTEXT,
      messages: buildAnthropicMessages(history, input),
    }),
  });

  const data = (await response.json().catch(() => null)) as AnthropicMessagesResponse | null;

  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      error: data?.error?.message || data?.message || `上游接口 HTTP ${response.status}`,
    };
  }

  const text = extractText(data);
  if (!text) {
    return { ok: false, status: 502, error: '模型没有返回可用文本。' };
  }

  return { ok: true, text };
}

export function resolveLlmEnv(env: Record<string, string | undefined>) {
  const apiKey =
    env.LLM_API_KEY?.trim() ||
    env.ANTHROPIC_AUTH_TOKEN?.trim() ||
    env.VITE_LLM_API_KEY?.trim() ||
    '';

  const rawBase = (
    env.LLM_API_BASE_URL ||
    env.ANTHROPIC_BASE_URL ||
    env.VITE_LLM_API_BASE_URL ||
    'https://api.gotoken.top'
  ).replace(/\/$/, '');

  // 旧的浏览器直连 / OpenAI 误配一律回退到 gotoken
  const baseUrl =
    rawBase.includes('api.openai.com') ||
    rawBase === '/llm-api' ||
    rawBase === '/api' ||
    rawBase.startsWith('/')
      ? 'https://api.gotoken.top'
      : rawBase;

  const model =
    env.LLM_MODEL?.trim() ||
    env.VITE_LLM_MODEL?.trim() ||
    'MiniMax-M2';

  return { apiKey, baseUrl, model };
}
