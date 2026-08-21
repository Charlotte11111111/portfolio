import { type KeyboardEvent, useEffect, useRef, useState } from 'react';
import { Bot, Send } from 'lucide-react';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { renderMarkdownLite } from '@/lib/markdownLite';
import {
  getChatInitInfo,
  sendChatMessage,
  type ChatTurn,
} from '@/services/chatService';

type ChatRole = 'user' | 'assistant' | 'system';

type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
};

const createId = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
};

export default function ChatPopover({
  avatarSrc,
  className,
}: {
  avatarSrc: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggested, setSuggested] = useState<string[]>([]);

  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length, loading]);

  useEffect(() => {
    if (!open) return;
    if (messages.length > 0) return;

    const init = getChatInitInfo();
    setMessages([{ id: createId(), role: 'assistant', content: init.prologue }]);
    setSuggested(init.suggested_questions.slice(0, 4));
  }, [open, messages.length]);

  const toHistory = (list: ChatMessage[]): ChatTurn[] =>
    list
      .filter((m) => m.role === 'user' || m.role === 'assistant')
      .map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content }));

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMessage: ChatMessage = { id: createId(), role: 'user', content: trimmed };
    const nextMessages = [...messages, userMessage];

    setLoading(true);
    setSuggested([]);
    setMessages(nextMessages);
    setInput('');

    try {
      const reply = await sendChatMessage({
        input: trimmed,
        history: toHistory(messages),
      });
      setMessages((prev) => [...prev, { id: createId(), role: 'assistant', content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: createId(), role: 'system', content: '网络异常，稍后再试。' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== 'Enter') return;
    if (e.shiftKey) return;
    e.preventDefault();
    void send(input);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            'relative group block w-16 h-16 rounded-full overflow-visible cursor-pointer transition-transform duration-300 hover:scale-[1.03]',
            className,
          )}
          aria-label="打开对话"
        >
          <span className="pointer-events-none absolute inset-[-7px] rounded-full bg-[conic-gradient(from_0deg,rgba(34,197,94,0),rgba(34,197,94,0.95),rgba(34,197,94,0),rgba(34,197,94,0.55),rgba(34,197,94,0))] opacity-80 blur-[1px] animate-spin-slow motion-reduce:animate-none" />
          <span className="pointer-events-none absolute inset-[-4px] rounded-full border border-[#22C55E]/45 opacity-90" />

          <div className="pointer-events-none absolute left-full ml-4 top-1/2 -translate-y-1/2">
            <div className="relative">
              <span className="absolute -top-1.5 -left-2.5 w-4 h-4 rounded-full bg-[#22C55E] opacity-90" />
              <span className="absolute -top-0.5 -left-5 w-3 h-3 rounded-full bg-[#22C55E] opacity-65" />
              <span className="absolute -top-2 -left-7.5 w-2 h-2 rounded-full bg-[#22C55E] opacity-50" />
              <div className="relative px-4 py-2 bg-[#22C55E] text-white text-sm font-medium rounded-[22px] shadow-lg whitespace-nowrap animate-bounce-subtle motion-reduce:animate-none">
                跟我对话
                <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#22C55E] rounded-full" />
                <span className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#22C55E] rounded-full opacity-55" />
              </div>
            </div>
          </div>

          <img
            src={avatarSrc}
            alt="跟我对话"
            className="relative z-10 w-full h-full rounded-full object-cover border-2 border-border bg-secondary shadow-md"
          />
        </button>
      </PopoverTrigger>

      <PopoverContent
        side="right"
        align="center"
        sideOffset={14}
        className="w-[420px] p-0 overflow-hidden rounded-3xl border border-border bg-background/80 backdrop-blur shadow-[0_28px_90px_-55px_rgba(0,0,0,0.55)]"
      >
        <div className="relative flex items-center justify-between px-4 py-3 border-b border-border/70">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,197,94,0.16),transparent_60%)]" />
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#22C55E]/15 flex items-center justify-center text-[#22C55E]">
              <Bot className="w-4 h-4" />
            </span>
            <div className="leading-tight">
              <div className="text-sm font-medium">跟我对话</div>
              <div className="text-xs text-muted-foreground">简历助手</div>
            </div>
          </div>
        </div>

        <ScrollArea className="h-[360px] px-4 py-4">
          <div className="space-y-3">
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}
              >
                <div
                  className={cn(
                    'max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm',
                    m.role === 'user' &&
                      'bg-[#22C55E] text-white shadow-[0_12px_40px_-28px_rgba(34,197,94,0.9)]',
                    m.role === 'assistant' &&
                      'bg-secondary/70 text-foreground border border-border/70',
                    m.role === 'system' &&
                      'bg-destructive/10 text-destructive border border-destructive/20',
                  )}
                >
                  {m.role === 'assistant' ? (
                    renderMarkdownLite(m.content)
                  ) : (
                    <span className="whitespace-pre-wrap leading-relaxed">{m.content}</span>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl px-3 py-2 text-sm bg-secondary text-muted-foreground">
                  正在思考…
                </div>
              </div>
            )}

            {suggested.length > 0 && !loading && (
              <div className="flex flex-wrap gap-2 pt-2">
                {suggested.map((q) => (
                  <button
                    key={q}
                    type="button"
                    className="text-xs px-3 py-1.5 rounded-full border bg-background hover:bg-secondary transition-colors"
                    onClick={() => void send(q)}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div ref={endRef} />
          </div>
        </ScrollArea>

        <div className="border-t border-border/70 bg-background/70 p-3">
          <div className="flex items-end gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="输入问题，回车发送（Shift+Enter 换行）"
              className="min-h-[44px] max-h-[120px] resize-none bg-background/80"
              disabled={loading}
            />
            <Button
              type="button"
              className="h-11 w-11 p-0 bg-[#22C55E] text-white hover:bg-[#1FB455]"
              onClick={() => void send(input)}
              disabled={!input.trim() || loading}
              aria-label="发送"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
