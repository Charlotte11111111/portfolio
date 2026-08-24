import type { VercelRequest, VercelResponse } from '@vercel/node';

type FeedbackBody = {
  rating?: number;
  suggestion?: string;
};

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
      })[character] || character,
  );

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const apiKey = process.env.RESEND_API_KEY?.trim();
    if (!apiKey) {
      return res.status(500).json({ error: '服务端尚未配置 RESEND_API_KEY。' });
    }

    let body: FeedbackBody = {};
    try {
      body = (typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {}) as FeedbackBody;
    } catch {
      return res.status(400).json({ error: '无效的 JSON。' });
    }

    const rating = Number(body.rating);
    const suggestion = typeof body.suggestion === 'string' ? body.suggestion.trim() : '';

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return res.status(400).json({ error: '评分必须为 1–5 星。' });
    }
    if (suggestion.length > 2000) {
      return res.status(400).json({ error: '反馈内容不能超过 2000 字。' });
    }

    const to = process.env.FEEDBACK_TO_EMAIL?.trim() || 'shiyiqing111@gmail.com';
    const from =
      process.env.FEEDBACK_FROM_EMAIL?.trim() ||
      'Portfolio Feedback <onboarding@resend.dev>';
    const safeSuggestion = escapeHtml(suggestion || '访客没有填写文字建议。');
    const submittedAt = new Date().toLocaleString('zh-CN', {
      timeZone: 'Asia/Shanghai',
    });

    const resendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `作品集收到新的 ${rating} 星反馈`,
      text: [
        `评分：${rating} / 5`,
        `反馈：${suggestion || '访客没有填写文字建议。'}`,
        `时间：${submittedAt}`,
      ].join('\n\n'),
      html: `
        <div style="font-family:Arial,'PingFang SC','Microsoft YaHei',sans-serif;max-width:640px;margin:auto;padding:28px;color:#18181b">
          <p style="margin:0 0 8px;color:#16a34a;font-size:13px;font-weight:700;letter-spacing:.08em">PORTFOLIO FEEDBACK</p>
          <h1 style="margin:0 0 24px;font-size:24px">你收到了新的作品集反馈</h1>
          <div style="padding:18px;border-radius:14px;background:#f4f4f5">
            <p style="margin:0 0 12px"><strong>评分：</strong>${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}（${rating}/5）</p>
            <p style="margin:0;line-height:1.7;white-space:pre-wrap"><strong>建议：</strong>${safeSuggestion}</p>
          </div>
          <p style="margin:18px 0 0;color:#71717a;font-size:12px">提交时间：${submittedAt}</p>
        </div>
      `,
    }),
  });

    const result = (await resendResponse.json().catch(() => null)) as
      | { id?: string; message?: string }
      | null;

    if (!resendResponse.ok) {
      return res.status(502).json({
        error: result?.message || `邮件发送失败（HTTP ${resendResponse.status}）。`,
      });
    }

    return res.status(200).json({ ok: true, id: result?.id });
  } catch (error) {
    console.error('Feedback email failed:', error);
    return res.status(500).json({
      error:
        error instanceof Error
          ? `邮件服务调用异常：${error.message}`
          : '邮件服务调用异常，请查看 Vercel Function Logs。',
    });
  }
}
