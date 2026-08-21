import {
  CHAT_PROLOGUE,
  RESUME_CONTEXT,
  SUGGESTED_QUESTIONS,
} from '@/data/resumeContext';

const LLM_API_KEY = import.meta.env.VITE_LLM_API_KEY?.trim();
const LLM_API_BASE_URL = (
  import.meta.env.VITE_LLM_API_BASE_URL || 'https://api.openai.com/v1'
).replace(/\/$/, '');
const LLM_MODEL = import.meta.env.VITE_LLM_MODEL || 'gpt-4o-mini';

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

type OpenAIChatResponse = {
  choices?: Array<{ message?: { content?: string } }>;
  error?: { message?: string };
};

export const sendChatMessage = async ({
  input,
  history = [],
}: {
  input: string;
  history?: ChatTurn[];
}): Promise<string> => {
  if (!LLM_API_KEY) {
    return '[System]: 请先配置 LLM API Key（VITE_LLM_API_KEY）。本地写在 `.env.local`，线上在 Vercel Environment Variables。';
  }

  const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
    {
      role: 'system',
      content: RESUME_CONTEXT,
    },
    ...history.slice(-12).map((m) => ({
      role: m.role,
      content: m.content,
    })),
    { role: 'user', content: input },
  ];

  const response = await fetch(`${LLM_API_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${LLM_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: LLM_MODEL,
      temperature: 0.4,
      messages,
    }),
  });

  const data = (await response.json().catch(() => null)) as OpenAIChatResponse | null;

  if (!response.ok) {
    return `[API Error]: ${data?.error?.message || `HTTP ${response.status}`}`;
  }

  const content = data?.choices?.[0]?.message?.content?.trim();
  if (!content) {
    return '[System]: 模型没有返回可用文本。';
  }

  return content;
};
