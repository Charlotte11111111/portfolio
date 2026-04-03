import type { ReactNode } from 'react';

type InlineToken = { type: 'text'; value: string } | { type: 'strong'; value: string };

const tokenizeInline = (text: string): InlineToken[] => {
  const tokens: InlineToken[] = [];
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  for (const part of parts) {
    if (!part) continue;
    const strongMatch = part.match(/^\*\*([^*]+)\*\*$/);
    if (strongMatch) {
      tokens.push({ type: 'strong', value: strongMatch[1] });
    } else {
      tokens.push({ type: 'text', value: part });
    }
  }
  return tokens;
};

const renderInline = (text: string): ReactNode => {
  const tokens = tokenizeInline(text);
  return tokens.map((t, idx) => {
    if (t.type === 'strong') return <strong key={idx}>{t.value}</strong>;
    return <span key={idx}>{t.value}</span>;
  });
};

type Block =
  | { type: 'p'; lines: string[] }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] };

export const renderMarkdownLite = (content: string): ReactNode => {
  const lines = content.replace(/\r\n/g, '\n').split('\n');
  const blocks: Block[] = [];

  const flushParagraph = (buf: string[]) => {
    const trimmed = buf.join('\n').trim();
    if (!trimmed) return;
    blocks.push({ type: 'p', lines: [trimmed] });
    buf.length = 0;
  };

  let paragraphBuf: string[] = [];
  let ulBuf: string[] | null = null;
  let olBuf: string[] | null = null;

  const flushLists = () => {
    if (ulBuf && ulBuf.length > 0) blocks.push({ type: 'ul', items: ulBuf });
    if (olBuf && olBuf.length > 0) blocks.push({ type: 'ol', items: olBuf });
    ulBuf = null;
    olBuf = null;
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    const isBlank = line.trim().length === 0;

    const olMatch = line.match(/^\s*(\d+)\.\s+(.*)$/);
    const ulMatch = line.match(/^\s*[-*]\s+(.*)$/);

    if (isBlank) {
      flushParagraph(paragraphBuf);
      flushLists();
      continue;
    }

    if (olMatch) {
      flushParagraph(paragraphBuf);
      if (ulBuf) flushLists();
      if (!olBuf) olBuf = [];
      olBuf.push(olMatch[2]);
      continue;
    }

    if (ulMatch) {
      flushParagraph(paragraphBuf);
      if (olBuf) flushLists();
      if (!ulBuf) ulBuf = [];
      ulBuf.push(ulMatch[1]);
      continue;
    }

    flushLists();
    paragraphBuf.push(line);
  }

  flushParagraph(paragraphBuf);
  flushLists();

  return (
    <div className="space-y-3">
      {blocks.map((b, idx) => {
        if (b.type === 'p') {
          return (
            <p key={idx} className="whitespace-pre-wrap leading-relaxed">
              {renderInline(b.lines.join('\n'))}
            </p>
          );
        }

        if (b.type === 'ul') {
          return (
            <ul key={idx} className="list-disc pl-5 space-y-1">
              {b.items.map((item, i) => (
                <li key={i} className="leading-relaxed">
                  {renderInline(item)}
                </li>
              ))}
            </ul>
          );
        }

        return (
          <ol key={idx} className="list-decimal pl-5 space-y-1">
            {b.items.map((item, i) => (
              <li key={i} className="leading-relaxed">
                {renderInline(item)}
              </li>
            ))}
          </ol>
        );
      })}
    </div>
  );
};

