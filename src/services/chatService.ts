import {
  CHAT_PROLOGUE,
  SUGGESTED_QUESTIONS,
} from '@/data/resumeContext';

export type ChatTurn = {
  role: 'user' | 'assistant';
  content: string;
};

export type ChatInitInfo = {
  prologue: string;
  suggested_questions: string[];
};

/** 密钥只在服务端；前端只请求同源 /api/chat，避免 CORS 与密钥泄露 */
export const getChatInitInfo = (): ChatInitInfo => ({
  prologue: CHAT_PROLOGUE,
  suggested_questions: SUGGESTED_QUESTIONS,
});

export const sendChatMessage = async ({
  input,
  history = [],
}: {
  input: string;
  history?: ChatTurn[];
}): Promise<string> => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input, history }),
    });

    const data = (await response.json().catch(() => null)) as {
      reply?: string;
      error?: string;
    } | null;

    if (!response.ok) {
      return `[API Error]: ${data?.error || `HTTP ${response.status}`}`;
    }

    if (!data?.reply?.trim()) {
      return '[System]: 模型没有返回可用文本。';
    }

    return data.reply.trim();
  } catch {
    return '[System]: 网络异常，稍后再试。若在本地开发，请确认已启动 Vite（已内置 /api/chat）。';
  }
};
