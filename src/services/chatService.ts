import {
  CHAT_PROLOGUE,
  RESUME_CONTEXT,
  SUGGESTED_QUESTIONS,
} from '@/data/resumeContext';

/** 对应 Claude Code 的 ANTHROPIC_AUTH_TOKEN */
const LLM_API_KEY = import.meta.env.VITE_LLM_API_KEY?.trim();
/** 对应 Claude Code 的 ANTHROPIC_BASE_URL，例如 https://api.gotoken.top */
const LLM_API_BASE_URL = (
  import.meta.env.VITE_LLM_API_BASE_URL || 'https://api.gotoken.top'
).replace(/\/$/, '');
const LLM_MODEL = import.meta.env.VITE_LLM_MODEL || 'MiniMax-M2';

export type ChatTurn = {
  role: 'user' | 'assistant';
  content: string;
};

export type ChatInitInfo = {
  prologue: string;
  suggested_questions: string[];
};

export const isChatConfigured = () => Boolean(LLM_API_KEY);

export const getChatInitInfo = (): ChatInitInfo => ({
  prologue: CHAT_PROLOGUE,
  suggested_questions: SUGGESTED_QUESTIONS,
});

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
  if (base.endsWith('/v1')) return `${base}/messages`;
  if (base.endsWith('/messages')) return base;
  return `${base}/v1/messages`;
};

/** Anthropic 要求 messages 以 user 开头，且 user/assistant 交替 */
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
    const t = data.content.trim();
    return t || null;
  }
  if (!Array.isArray(data.content)) return null;
  const text = data.content
    .filter((b) => b?.type === 'text' || typeof b?.text === 'string')
    .map((b) => b.text || '')
    .join('')
    .trim();
  return text || null;
};

export const sendChatMessage = async ({
  input,
  history = [],
}: {
  input: string;
  history?: ChatTurn[];
}): Promise<string> => {
  if (!LLM_API_KEY) {
    return '[System]: 请先配置 API Key（VITE_LLM_API_KEY，对应 Claude Code 的 ANTHROPIC_AUTH_TOKEN）。本地写在 `.env.local`，线上在 Vercel Environment Variables。';
  }

  const response = await fetch(resolveMessagesUrl(LLM_API_BASE_URL), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'anthropic-version': '2023-06-01',
      // gotoken / Anthropic 兼容网关常见鉴权方式
      'x-api-key': LLM_API_KEY,
      Authorization: `Bearer ${LLM_API_KEY}`,
    },
    body: JSON.stringify({
      model: LLM_MODEL,
      max_tokens: 1024,
      temperature: 0.4,
      system: RESUME_CONTEXT,
      messages: buildAnthropicMessages(history, input),
    }),
  });

  const data = (await response.json().catch(() => null)) as AnthropicMessagesResponse | null;

  if (!response.ok) {
    const errMsg =
      data?.error?.message || data?.message || `HTTP ${response.status}`;
    return `[API Error]: ${errMsg}`;
  }

  const content = extractText(data);
  if (!content) {
    return '[System]: 模型没有返回可用文本。';
  }

  return content;
};
