import { useState } from 'react';
import { Heart, X, Star, Send, ChevronDown } from 'lucide-react';

// ── Star Rating (ui-ux-pro-max: accessible, keyboard navigable) ──
const StarRating = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) => (
  <div className="flex items-center gap-1" role="radiogroup" aria-label="评分">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        role="radio"
        aria-checked={value === star}
        aria-label={`${star} 星`}
        onClick={() => onChange(star)}
        className="p-1 transition-transform duration-150 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22C55E] rounded"
      >
        <Star
          className={`w-7 h-7 transition-colors duration-200 ${
            value >= star
              ? 'fill-[#22C55E] text-[#22C55E]'
              : 'fill-none text-border dark:text-white/20'
          }`}
        />
      </button>
    ))}
    {value > 0 && (
      <span className="ml-2 text-sm text-muted-foreground font-medium">
        {value > 3 ? '感谢！' : value > 1 ? '收到反馈了' : '会继续努力'}
      </span>
    )}
  </div>
);

const CandySupport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [suggestion, setSuggestion] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = () => {
    if (rating === 0) return;
    setSending(true);
    // Simulate async submission (ui-ux-pro-max: show loading feedback)
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
    }, 600);
  };

  const handleClose = () => {
    setIsOpen(false);
    // Reset after animation
    setTimeout(() => {
      setRating(0);
      setSuggestion('');
      setSubmitted(false);
      setShowQR(false);
    }, 300);
  };

  return (
    <>
      {/* ── Candy Button (fixed bottom-right) ── */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[100] group"
        aria-label="打赏支持"
      >
        <div className="relative">
          {/* Soft glow — subtle ring, not a dot */}
          <div className="absolute -inset-2 rounded-full bg-[#22C55E]/20 blur-xl group-hover:bg-[#22C55E]/35 transition-colors animate-pulse" />
          {/* Candy body */}
          <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#22C55E] to-[#16a34a] flex items-center justify-center shadow-lg hover:shadow-[0_8px_32px_-8px_rgba(34,197,94,0.5)] transition-all duration-300 group-hover:scale-110">
            <Heart className="w-6 h-6 text-white fill-white" />
          </div>
        </div>
      </button>

      {/* ── Modal ── */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={handleClose}
        >
          <div
            className="relative w-full max-w-md mx-4 rounded-3xl bg-background dark:bg-[#111113] border border-border dark:border-white/10 overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border dark:border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#22C55E]/15 flex items-center justify-center">
                  <Heart className="w-4 h-4 text-[#22C55E] fill-[#22C55E]" />
                </div>
                <span className="font-display text-lg font-semibold text-foreground">
                  {submitted ? '感谢你的支持' : '留下你的反馈'}
                </span>
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label="关闭"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6">
              {!submitted ? (
                <>
                  {/* Rating section */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-foreground">
                      给我的页面打个分吧
                    </label>
                    <StarRating value={rating} onChange={setRating} />
                  </div>

                  {/* Suggestion textarea */}
                  <div className="space-y-2">
                    <label
                      htmlFor="suggestion"
                      className="text-sm font-medium text-foreground"
                    >
                      有什么建议？（可选）
                    </label>
                    <textarea
                      id="suggestion"
                      rows={3}
                      value={suggestion}
                      onChange={(e) => setSuggestion(e.target.value)}
                      placeholder="页面体验、设计风格、内容表达……任意你感受最深的点 ✏️"
                      className="w-full rounded-xl border border-border dark:border-white/10 bg-muted/40 dark:bg-white/[0.04] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#22C55E]/40 resize-none transition-shadow"
                    />
                  </div>

                  {/* Submit button */}
                  <button
                    onClick={handleSubmit}
                    disabled={rating === 0 || sending}
                    className="w-full rounded-xl bg-[#22C55E] hover:bg-[#16a34a] disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium text-sm py-3 flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-[0_8px_24px_-8px_rgba(34,197,94,0.5)]"
                  >
                    {sending ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        提交中…
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        提交反馈
                      </>
                    )}
                  </button>
                </>
              ) : (
                <>
                  {/* Success state */}
                  <div className="text-center space-y-3 py-2">
                    <div className="text-5xl">
                      {rating >= 4 ? '🎉' : rating >= 2 ? '🙏' : '💪'}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {rating >= 4
                        ? '太开心了！你的认可就是我最大的动力 💚'
                        : '收到！我会继续改进，期待下次给你更好的体验'}
                    </p>
                  </div>

                  {/* 请我吃糖 toggle */}
                  {!showQR ? (
                    <button
                      onClick={() => setShowQR(true)}
                      className="w-full rounded-xl border-2 border-dashed border-[#22C55E]/40 text-[#22C55E] hover:border-[#22C55E] hover:bg-[#22C55E]/5 font-medium text-sm py-3 flex items-center justify-center gap-2 transition-all duration-200"
                    >
                      <Heart className="w-4 h-4 fill-[#22C55E]" />
                      也请我吃颗糖 🍬
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  ) : (
                    <>
                      {/* QR Codes */}
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          {/* WeChat Pay */}
                          <div className="flex flex-col items-center gap-2">
                            <div className="w-full aspect-square rounded-2xl bg-white p-2 overflow-hidden">
                              <img
                                src="/candy/wechat-pay.PNG"
                                alt="微信支付"
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <div className="flex items-center gap-1.5">
                              <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="#07C160">
                                <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.283.144.399.173.105.365.063.499-.073l1.339-1.073a.864.864 0 0 1 .626-.165l.063.01c1.422.288 2.948.443 4.547.443 1.599 0 3.125-.155 4.547-.443.02-.004.042-.008.063-.01a.864.864 0 0 1 .626.165l1.31 1.05c.139.11.332.178.527.072.194-.106.19-.27.175-.346l-.375-1.406a.59.59 0 0 1 .213-.664C22.83 13.733 24 11.742 24 9.53c0-4.054-3.891-7.342-8.691-7.342-1.6 0-3.125.156-4.547.444-.021.004-.043.008-.063.012-.36.073-.586.167-.586.167-.192.06-.28.13-.28.25 0 .176.211.326.534.42z"/>
                              </svg>
                              <span className="text-xs font-medium text-foreground">微信支付</span>
                            </div>
                          </div>

                          {/* Alipay */}
                          <div className="flex flex-col items-center gap-2">
                            <div className="w-full aspect-square rounded-2xl bg-white p-2 overflow-hidden">
                              <img
                                src="/candy/alipay.PNG"
                                alt="支付宝"
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <div className="flex items-center gap-1.5">
                              <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="#1677FF">
                                <path d="M21.98 8.81c-.22-.26-.6-.34-.9-.2-.3.13-.43.46-.3.76.15.32.35.6.6.82.25.22.56.38.9.47.1.03.2.04.3.04.27 0 .53-.08.76-.22.23-.14.42-.34.56-.58.14-.24.22-.5.24-.78.02-.28-.04-.55-.16-.8-.12-.25-.3-.47-.52-.64-.22-.17-.48-.3-.76-.36-.28-.06-.57-.06-.85 0-.28.06-.55.19-.78.36-.23.17-.42.39-.55.64-.13.25-.2.52-.2.8-.01.28.08.56.22.81zM21.08 9.6c-.15-.28-.37-.52-.63-.72-.26-.2-.56-.35-.89-.44-.33-.09-.67-.11-1.01-.07-.34.04-.67.16-.96.34-.29.18-.53.43-.71.72-.18.29-.29.62-.32.97-.03.35.03.69.16 1.01.13.32.34.6.6.83.26.23.57.4.92.49.35.09.71.11 1.07.05.36-.06.7-.2.99-.4.29-.2.52-.47.68-.79.16-.32.23-.67.2-1.02-.03-.35-.14-.68-.32-.97-.18-.29-.43-.53-.72-.71-.29-.18-.62-.3-.97-.34-.35-.04-.7-.03-1.04.05-.34.08-.66.23-.94.43-.28.2-.51.46-.68.76-.17.3-.26.64-.26.99 0 .35.1.69.29.99.19.3.46.55.78.73.32.18.68.29 1.06.31.38.02.76-.03 1.12-.16.36-.13.68-.34.95-.61.27-.27.47-.6.59-.97.12-.37.15-.77.07-1.16z"/>
                              </svg>
                              <span className="text-xs font-medium text-foreground">支付宝</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Collapse QR */}
                      <button
                        onClick={() => setShowQR(false)}
                        className="w-full text-xs text-muted-foreground hover:text-foreground flex items-center justify-center gap-1 py-1 transition-colors"
                      >
                        收起二维码
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CandySupport;
