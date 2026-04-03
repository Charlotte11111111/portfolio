const COZE_API_TOKEN = import.meta.env.VITE_COZE_API_TOKEN;
const BOT_ID = import.meta.env.VITE_COZE_BOT_ID || '7613987519474303016';
const API_BASE_URL = '/coze-api';

interface CozeMessage {
  role: 'user' | 'assistant';
  type: 'answer' | 'function_call' | 'tool_response' | 'follow_up';
  content: string;
  content_type: 'text' | 'object_string';
}

interface CozeMessageListResponse {
  data: CozeMessage[];
}

export interface CozeInitInfo {
  prologue?: string;
  suggested_questions?: string[];
}

export const getBotInitInfo = async (): Promise<CozeInitInfo | null> => {
  if (!COZE_API_TOKEN) return null;

  try {
    const response = await fetch(`${API_BASE_URL}/v1/bot/get_online_info?bot_id=${BOT_ID}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${COZE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) return null;

    const data = await response.json();
    const onboarding = data?.data?.onboarding_info;
    if (!onboarding) return null;

    return {
      prologue: onboarding.prologue,
      suggested_questions: onboarding.suggested_questions,
    };
  } catch {
    return null;
  }
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const sendMessageToCoze = async ({
  input,
  userId,
}: {
  input: string;
  userId: string;
}): Promise<string> => {
  if (!COZE_API_TOKEN) {
    return '[System]: 请先配置 Coze API Token（VITE_COZE_API_TOKEN）。';
  }

  const trimmedToken = COZE_API_TOKEN.trim();
  if (!trimmedToken) {
    return '[System]: Coze Token 为空，请检查 `.env.local`。';
  }

  const chatResponse = await fetch(`${API_BASE_URL}/v3/chat`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${trimmedToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      bot_id: BOT_ID,
      user_id: userId,
      stream: false,
      auto_save_history: true,
      additional_messages: [
        {
          role: 'user',
          content: input,
          content_type: 'text',
        },
      ],
    }),
  });

  const chatData = await chatResponse
    .json()
    .catch(() => ({ code: chatResponse.status, msg: 'Invalid JSON response' }));

  if (!chatResponse.ok) {
    return `[Coze Error]: ${chatData?.msg || `HTTP ${chatResponse.status}`}`;
  }

  if (chatData?.code !== undefined && chatData.code !== 0) {
    return `[Coze Error]: ${chatData.msg || 'Unknown error'}`;
  }

  const conversationData = chatData.data || chatData;
  if (conversationData?.last_error?.code && conversationData.last_error.code !== 0) {
    return `[Coze Error]: ${conversationData.last_error.msg || 'Unknown error'}`;
  }

  let status: string | undefined = conversationData.status;
  const conversationId: string | undefined = conversationData.conversation_id;
  const chatId: string | undefined = conversationData.id;

  if (!status || !conversationId || !chatId) {
    return '[System Error]: 无法解析对话响应。';
  }

  let attempts = 0;
  while (status === 'in_progress' || status === 'created') {
    if (attempts > 60) break;
    await sleep(800);

    const checkResponse = await fetch(
      `${API_BASE_URL}/v3/chat/retrieve?conversation_id=${conversationId}&chat_id=${chatId}`,
      {
        headers: { Authorization: `Bearer ${trimmedToken}` },
      },
    );

    if (!checkResponse.ok) {
      return `[System Error]: 轮询状态失败 (${checkResponse.status})。`;
    }

    const checkData = await checkResponse.json();
    if (checkData?.code && checkData.code !== 0) {
      return `[Coze Error]: ${checkData.msg || '轮询接口返回错误'}`;
    }

    const pollData = checkData.data || checkData;
    status = pollData.status;

    if (status === 'failed') {
      return `[Coze Error]: 对话失败 (Code: ${pollData?.last_error?.code || 'Unknown'})。`;
    }

    if (status === 'canceled') {
      return '[System]: 对话已取消。';
    }

    attempts++;
  }

  if (status !== 'completed') {
    return `[System]: 对话响应超时 (状态: ${status})。`;
  }

  const messagesResponse = await fetch(
    `${API_BASE_URL}/v3/chat/message/list?conversation_id=${conversationId}&chat_id=${chatId}`,
    {
      headers: { Authorization: `Bearer ${trimmedToken}` },
    },
  );

  if (!messagesResponse.ok) {
    return `[System Error]: 获取消息失败 (${messagesResponse.status})。`;
  }

  const messagesData: CozeMessageListResponse = await messagesResponse.json();
  const assistantMessages = messagesData.data.filter(
    (msg) => msg.role === 'assistant' && msg.type === 'answer',
  );

  if (assistantMessages.length === 0) {
    return '[System]: 任务已完成，但没有返回文本回复。';
  }

  return assistantMessages[assistantMessages.length - 1].content;
};
