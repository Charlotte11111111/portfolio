import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { ArrowUpRight, Bot, Sparkles, Github, ExternalLink, ChevronRight } from 'lucide-react';

const ParticleButterflyEffect = lazy(() => import('./ParticleButterflyEffect'));

const vibeProjects = [
  {
    title: 'Vibe Prompt Assistant',
    description: '结构化 Prompt 设计实验，将模糊需求转化为高质量 AI 输出。',
    tags: ['React', 'AI API', '语音识别'],
    github: 'https://github.com/shiyiqing111/Vibe-prompt-assistant',
    demo: 'https://traevibe-prompt-assistant0ied.vercel.app/',
    featured: true,
  },
  {
    title: 'MockAI',
    description: '深度解析岗位要求，定制化生成模拟面试题与策略，帮助复盘。',
    tags: ['React', 'AI', '面试助手'],
    github: 'https://github.com/shiyiqing111/MockAI',
    demo: 'https://traes7131vdn.vercel.app/',
    featured: true,
  },
  {
    title: 'Food Map',
    description: '探索城市美食地图，基于地理位置与口味偏好推荐附近餐厅与地道小吃。',
    tags: ['AI', '地图', '推荐系统'],
    github: 'https://github.com/shiyiqing111/Food-Map/tree/main',
    demo: 'https://food-map-beta-nine.vercel.app/',
    featured: false,
  },
  {
    title: 'AI Resume Autofill',
    description: 'Chrome 扩展插件，AI 智能识别并自动填写网页表单字段，适配主流招聘平台。',
    tags: ['Chrome Extension', 'AI', '自动化'],
    github: 'https://github.com/Charlotte11111111/Resume-autofill',
    featured: false,
  },
  {
    title: 'Linguist Translator',
    description: '智能翻译浏览器扩展，支持整页翻译、划词翻译、词库收藏与闪卡复习。',
    tags: ['Chrome Extension', '翻译', '学习工具'],
    github: 'https://github.com/Charlotte11111111/Translation-plugin',
    featured: false,
  },
];

const VibeCodingSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const featuredProjects = vibeProjects.filter((p) => p.featured);
  const otherProjects = vibeProjects.filter((p) => !p.featured);

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-28 px-6 overflow-hidden">
      {/* ── Background layer ── */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full bg-[#F0F0F2]/60 to-transparent blur-3xl dark:hidden" />
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-[#F5F5F7] to-transparent blur-3xl dark:hidden" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[400px] rounded-full bg-gradient-to-t from-[#F8F8FA] to-transparent blur-2xl dark:hidden" />
        <div className="hidden dark:block absolute inset-0">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[640px] h-[640px] rounded-full bg-[#22C55E]/5 blur-3xl animate-float-slower" />
          <div className="absolute -bottom-40 -left-32 w-[480px] h-[480px] rounded-full bg-white/[0.02] blur-3xl animate-float-slow" />
          <div className="absolute -bottom-40 -right-40 w-[520px] h-[520px] rounded-full bg-[#22C55E]/4 blur-3xl animate-float-slowest" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[160px] rounded-full bg-gradient-to-t from-black/20 to-transparent blur-2xl" />
        </div>
      </div>

      {/* ── Particle layer ── */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        <div className="hidden dark:block h-full">
          <Suspense fallback={null}>
            <ParticleButterflyEffect variant="night" height="100%" opacity={1} />
          </Suspense>
        </div>
        <div className="dark:hidden h-full">
          <Suspense fallback={null}>
            <ParticleButterflyEffect variant="day" height="100%" opacity={1} />
          </Suspense>
        </div>
      </div>

      {/* ── Content layer ── */}
      <div className="relative max-w-7xl mx-auto z-20">
        {/* ── Header ── */}
        <div
          className={`mb-12 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 backdrop-blur px-4 py-2 dark:bg-white/[0.04] dark:border-white/[0.08]">
                <span className="w-8 h-8 rounded-full bg-[#22C55E]/15 text-[#22C55E] dark:bg-[#22C55E]/20 dark:text-[#22C55E] flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </span>
                <span className="text-sm tracking-widest text-muted-foreground">VIBE CODING</span>
              </div>
              <h2
                className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground font-semibold mt-5"
                style={{ lineHeight: 1.15 }}
              >
                把想法变成可用原型
              </h2>
            </div>
            <div className="max-w-md">
              <p className="text-muted-foreground text-sm leading-relaxed">
                大模型作为"并行协作者"，完成需求拆解、Prompt 设计、快速原型与迭代验证。
                用更短时间，把更靠谱的产品交付出来。
              </p>
            </div>
          </div>
        </div>

        {/* ── Featured Projects (2-column) ── */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-5 mb-6 transition-all duration-700 delay-150 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {featuredProjects.map((project, idx) => (
            <a
              key={project.title}
              href={project.demo || project.github}
              target="_blank"
              rel="noreferrer"
              className="group relative rounded-2xl border border-border/60 bg-background/40 dark:bg-white/[0.03] dark:border-white/[0.08] p-6 overflow-hidden transition-all duration-300 hover:border-[#22C55E]/40 hover:shadow-[0_12px_40px_-20px_rgba(34,197,94,0.4)] hover:-translate-y-0.5"
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[#22C55E]/5 to-transparent" />
              
              <div className="relative">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#22C55E] font-medium tracking-wide">FEATURED</span>
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl text-foreground font-semibold mt-2 group-hover:text-[#22C55E] transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    {project.demo && (
                      <span className="w-9 h-9 rounded-full border border-border dark:border-white/10 flex items-center justify-center text-muted-foreground group-hover:text-[#22C55E] group-hover:border-[#22C55E]/30 transition-all">
                        <ExternalLink className="w-4 h-4" />
                      </span>
                    )}
                    <span className="w-9 h-9 rounded-full border border-border dark:border-white/10 flex items-center justify-center text-muted-foreground group-hover:text-[#22C55E] group-hover:border-[#22C55E]/30 transition-all">
                      <Github className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-background/60 dark:bg-white/[0.05] dark:border-white/[0.08] px-3 py-1 text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Arrow indicator */}
                <div className="flex items-center gap-1.5 mt-4 text-xs text-muted-foreground group-hover:text-[#22C55E] transition-colors">
                  <span>查看详情</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* ── Workflow + Other Projects ── */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-5 transition-all duration-700 delay-300 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Workflow Card */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <div className="relative rounded-2xl border border-border/60 bg-background/40 dark:bg-white/[0.03] dark:border-white/[0.08] p-5 h-full">
              <div className="flex items-center gap-2.5 mb-4">
                <span className="w-9 h-9 rounded-lg bg-[#22C55E]/15 text-[#22C55E] dark:bg-[#22C55E]/20 dark:text-[#4ADE80] flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </span>
                <span className="text-sm font-medium">开发流程</span>
              </div>
              
              <div className="space-y-2.5">
                {[
                  { step: '01', text: '需求拆解' },
                  { step: '02', text: 'Prompt 设计' },
                  { step: '03', text: '快速原型' },
                  { step: '04', text: '迭代验证' },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="flex items-center gap-3 text-sm"
                  >
                    <span className="w-6 h-6 rounded-md bg-[#22C55E]/10 text-[#22C55E] text-xs font-medium flex items-center justify-center shrink-0">
                      {item.step}
                    </span>
                    <span className="text-muted-foreground">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-border/40">
                <p className="text-xs text-muted-foreground">
                  适用：原型验证 · 产品 Demo · 数据可视化
                </p>
              </div>
            </div>
          </div>

          {/* Other Projects (3-column grid) */}
          <div className="lg:col-span-9 order-1 lg:order-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {otherProjects.map((project, idx) => (
                <a
                  key={project.title}
                  href={project.demo || project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative rounded-xl border border-border/40 bg-background/30 dark:bg-white/[0.02] dark:border-white/[0.06] p-4 overflow-hidden transition-all duration-300 hover:border-[#22C55E]/30 hover:shadow-[0_8px_24px_-12px_rgba(34,197,94,0.3)] hover:-translate-y-0.5"
                  style={{ transitionDelay: `${idx * 40}ms` }}
                >
                  {/* Subtle glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[#22C55E]/[0.03] to-transparent" />
                  
                  <div className="relative">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-medium text-foreground group-hover:text-[#22C55E] transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                      <Github className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed mt-2 line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {project.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border/60 bg-background/50 dark:bg-white/[0.03] px-2 py-0.5 text-[10px] text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-1.5 mt-3 text-[10px] text-muted-foreground group-hover:text-[#22C55E] transition-colors">
                      <span>访问</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── View All Link ── */}
        <div
          className={`mt-8 flex justify-center transition-all duration-700 delay-500 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <a
            href="https://github.com/Charlotte11111111"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-[#22C55E] transition-colors group"
          >
            <span>查看更多项目</span>
            <Github className="w-4 h-4" />
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default VibeCodingSection;
