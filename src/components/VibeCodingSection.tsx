import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { ArrowUpRight, Bot, Sparkles, Github } from 'lucide-react';

const ParticleButterflyEffect = lazy(() => import('./ParticleButterflyEffect'));

const vibeProjects = [
  {
    title: 'Vibe Prompt Assistant',
    description: '结构化 Prompt 设计实验，将模糊需求转化为高质量 AI 输出。',
    tags: ['React', 'AI API', '语音识别'],
    github: 'https://github.com/shiyiqing111/Vibe-prompt-assistant',
    demo: 'https://traevibe-prompt-assistant0ied.vercel.app/',
  },
  {
    title: 'MockAI',
    description: '深度解析岗位要求，定制化生成模拟面试题与策略，帮助复盘。',
    tags: ['React', 'AI', '面试助手'],
    github: 'https://github.com/shiyiqing111/MockAI',
    demo: 'https://traes7131vdn.vercel.app/',
  },
  {
    title: 'Food Map',
    description: '探索城市美食地图，基于地理位置与口味偏好推荐附近餐厅与地道小吃。',
    tags: ['AI', '地图', '推荐系统'],
    github: 'https://github.com/shiyiqing111/Food-Map/tree/main',
    demo: 'https://food-map-beta-nine.vercel.app/',
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
      { threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-28 sm:py-32 px-6 overflow-hidden">
      {/* ── Background layer ── */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#F0F0F2]/80 to-transparent blur-3xl dark:hidden" />
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-[#F5F5F7] to-transparent blur-3xl dark:hidden" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] rounded-full bg-gradient-to-t from-[#F8F8FA] to-transparent blur-2xl dark:hidden" />
        <div className="hidden dark:block absolute inset-0">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[640px] h-[640px] rounded-full bg-[#22C55E]/5 blur-3xl animate-float-slower" />
          <div className="absolute -bottom-40 -left-32 w-[480px] h-[480px] rounded-full bg-white/[0.02] blur-3xl animate-float-slow" />
          <div className="absolute -bottom-40 -right-40 w-[520px] h-[520px] rounded-full bg-[#22C55E]/4 blur-3xl animate-float-slowest" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[160px] rounded-full bg-gradient-to-t from-black/20 to-transparent blur-2xl" />
        </div>
      </div>

      {/* ── Particle layer (behind content) ── */}
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

      {/* ── Content layer (on top) ── */}
      <div className="relative max-w-7xl mx-auto z-20">
        <div
          className={`flex flex-col md:flex-row md:items-end md:justify-between gap-10 mb-14 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 backdrop-blur px-4 py-2 dark:bg-white/[0.04] dark:border-white/[0.08]">
              <span className="w-8 h-8 rounded-full bg-[#22C55E]/15 text-[#22C55E] dark:bg-[#22C55E]/20 dark:text-[#22C55E] flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </span>
              <span className="text-sm tracking-widest text-muted-foreground">VIBE CODING</span>
            </div>
            <h2
              className="font-display text-3xl sm:text-5xl md:text-6xl text-foreground font-semibold mt-6"
              style={{ lineHeight: 1.12 }}
            >
              把想法变成可用原型
              <span className="text-muted-foreground">更快</span>
              <span className="text-muted-foreground">更准</span>
            </h2>
          </div>
          <div className="max-w-xl">
            <p className="text-muted-foreground text-base leading-relaxed">
              我把大模型当成"并行协作者"：在同一条主线上完成需求拆解、Prompt 设计、快速原型与迭代验证。
              目标不是炫技，而是用更短时间把更靠谱的产品交付出来。
            </p>
          </div>
        </div>

        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-6 transition-all duration-700 delay-150 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Workflow Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl border border-border bg-background/80 backdrop-blur-sm dark:bg-white/[0.04] dark:border-white/[0.08] p-8 overflow-hidden">

              <div className="relative">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-[#22C55E]/15 text-[#22C55E] dark:bg-[#22C55E]/20 dark:text-[#4ADE80] flex items-center justify-center">
                    <Bot className="w-5 h-5" />
                  </span>
                  <div>
                    <div className="text-sm text-muted-foreground tracking-widest">WORKFLOW</div>
                    <div className="text-xl font-display font-semibold">从 0 到 1 的加速链路</div>
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  {["需求拆解 → 目标清晰", "Prompt 设计 → 结果可控", "快速原型 → 迭代验证"].map((text, idx) => (
                    <div
                      key={text}
                      className="group rounded-2xl border border-border bg-background/70 dark:bg-white/[0.04] dark:border-white/[0.06] px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_45px_-24px_rgba(34,197,94,0.55)] dark:hover:shadow-[0_16px_45px_-24px_rgba(34,197,94,0.25)]"
                      style={{ transitionDelay: `${idx * 40}ms` }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-foreground font-medium">{text}</span>
                        <span className="text-xs text-muted-foreground">0{idx + 1}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex w-2 h-2 rounded-full bg-[#22C55E] animate-pulse-soft motion-reduce:animate-none" />
                  适用于：作品集原型、产品 Demo、数据应用可视化
                </div>
              </div>
            </div>
          </div>

          {/* Project Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            {vibeProjects.map((p, idx) => (
              <div
                key={p.title}
                className={`group relative rounded-3xl border border-border/50 bg-background/20 dark:bg-white/[0.02] dark:border-white/[0.06] backdrop-blur-sm p-8 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_60px_-32px_rgba(34,197,94,0.65)] dark:hover:shadow-[0_22px_60px_-32px_rgba(34,197,94,0.3)]`}
              >
                {/* Day: warm | Night: subtle dark green */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_20%_20%,rgba(34,197,94,0.18),transparent_55%)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(34,197,94,0.10),transparent_55%)]" />
                <div className="absolute -left-24 -top-24 w-56 h-56 rounded-full bg-[#22C55E]/10 blur-3xl opacity-60 dark:bg-[#22C55E]/8" />

                <div className="relative">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs text-muted-foreground tracking-widest">VIBE PROJECT</div>
                      <h3 className="font-display text-2xl text-foreground font-semibold mt-2">
                        {p.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mt-4">
                    {p.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-6">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border bg-background/70 dark:bg-white/[0.05] dark:border-white/[0.08] dark:text-white/60 px-3 py-1 text-xs text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3 mt-6">
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 dark:bg-white/[0.05] dark:border-white/[0.08] px-4 py-2 text-sm text-foreground hover:bg-[#22C55E]/10 hover:border-[#22C55E]/30 transition-all duration-200"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                      <span>在线体验</span>
                    </a>
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 dark:bg-white/[0.05] dark:border-white/[0.08] px-4 py-2 text-sm text-foreground hover:bg-[#22C55E]/10 hover:border-[#22C55E]/30 transition-all duration-200"
                    >
                      <Github className="w-4 h-4" />
                      <span>GitHub</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VibeCodingSection;
