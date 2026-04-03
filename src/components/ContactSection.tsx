import { useRef, useEffect, useState } from 'react';

const ContactSection = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="relative py-32 px-6 overflow-hidden">
      {/* ── Day Mode: Apple 暖白背景 ── */}
      <div className="absolute inset-0 dark:block hidden">
        {/* 夜间：深中性背景 + 极淡绿色签名光晕 */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[640px] h-[640px] rounded-full bg-[#22C55E]/5 blur-3xl animate-float-slower" />
        <div className="absolute -bottom-40 -left-32 w-[480px] h-[480px] rounded-full bg-white/[0.02] blur-3xl animate-float-slow" />
        <div className="absolute -bottom-40 -right-40 w-[520px] h-[520px] rounded-full bg-[#22C55E]/4 blur-3xl animate-float-slowest" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[160px] rounded-full bg-gradient-to-t from-black/20 to-transparent blur-2xl" />
      </div>

      {/* ── Day Mode: Apple 暖白 ── */}
      <div className="absolute inset-0 dark:hidden">
        {/* 日间：Apple 风格极淡暖灰背景 */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#F0F0F2]/80 to-transparent blur-3xl" />
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-[#F5F5F7] to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] rounded-full bg-gradient-to-t from-[#F8F8FA] to-transparent blur-2xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <p className="text-sm mb-6 tracking-widest text-muted-foreground dark:text-white/50">期待与您交流</p>
          <h2
            className="font-display text-3xl sm:text-5xl md:text-7xl leading-none font-semibold text-foreground dark:text-white"
            style={{ letterSpacing: '-1px' }}
          >
            有想法？
            <br />
            <span className="text-muted-foreground dark:text-white/40">一起聊聊。</span>
          </h2>
          <a
            href="mailto:shiyiqing111@gmail.com"
            className="inline-block mt-12 rounded-full bg-[#22C55E] text-white dark:bg-white/10 dark:text-white px-14 py-5 text-base transition-transform hover:scale-[1.03] hover:shadow-[0_8px_32px_-8px_rgba(34,197,94,0.5)] dark:hover:shadow-[0_8px_32px_-8px_rgba(34,197,94,0.25)]"
          >
            发送邮件
          </a>
        </div>

        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-12 pt-16 border-t border-border dark:border-white/[0.08] transition-all duration-1000 delay-300 ${
            visible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div>
            <span className="font-display text-2xl font-semibold text-foreground dark:text-white">史一晴</span>
            <p className="text-sm text-muted-foreground dark:text-white/50 mt-4 leading-relaxed">
              数据科学 · 产品经理
              <br />
              香港理工大学
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-muted-foreground dark:text-white/50 tracking-widest mb-4">联系方式</p>
            <p className="text-sm text-foreground dark:text-white/70">shiyiqing111@gmail.com</p>
            <p className="text-sm text-foreground dark:text-white/70">(+86) 18603109575</p>
            <p className="text-sm text-foreground dark:text-white/70">微信：18603109575</p>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-muted-foreground dark:text-white/50 tracking-widest mb-4">导航</p>
            {[
              { label: '首页', href: '#' },
              { label: '技能', href: '#skills' },
              { label: '经历', href: '#experience' },
              { label: '项目', href: '#projects' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block text-sm text-foreground dark:text-white/70 hover:text-[#22C55E] dark:hover:text-[#22C55E] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div className={`mt-16 pt-8 border-t border-border dark:border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground dark:text-white/40 transition-all duration-1000 delay-500 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}>
          <span>© 2025 史一晴. All rights reserved.</span>
          <span>用心构建。</span>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
