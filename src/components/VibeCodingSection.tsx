import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import {
  ArrowUpRight,
  ChevronRight,
  Github,
  Sparkles,
} from 'lucide-react';

const ParticleButterflyEffect = lazy(() => import('./ParticleButterflyEffect'));

type VibeProject = {
  title: string;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
  featured: boolean;
  visual: 'knowledge' | 'studio' | 'prompt' | 'interview' | 'ring' | 'resume' | 'translate';
  screenshots: string[];
};

const vibeProjects: VibeProject[] = [
  {
    title: 'Knowledge Assistant',
    description: 'AI 知识库助手：基于 Skills 与多 Agent 协作，完成知识沉淀、问答与产品工作流编排。',
    tags: ['Next.js', 'LangGraph', 'AI Agent'],
    github: 'https://github.com/Charlotte11111111/portfolio',
    demo: 'https://knowledge-assistant-kappa.vercel.app/inbox',
    featured: true,
    visual: 'knowledge',
    screenshots: [
      new URL('../../image/knowlege-assistant/20260821-172904.jpg', import.meta.url).href,
      new URL('../../image/knowlege-assistant/20260821-173025.jpg', import.meta.url).href,
      new URL('../../image/knowlege-assistant/20260821-173030.jpg', import.meta.url).href,
    ],
  },
  {
    title: 'Product Skills Studio',
    description: 'AI 原生产品工作台：6 个可复用 Skills 由 5 个 LangGraph Agent 编排，覆盖脑暴、PRD、评审与数据分析。',
    tags: ['Next.js', 'LangGraph', 'Skills'],
    github: 'https://github.com/Charlotte11111111/product-skills-studio',
    demo: 'https://product-skills-studio.vercel.app/',
    featured: true,
    visual: 'studio',
    screenshots: [
      new URL('../../image/Product Skills Studio/20260821-173235.568-1.jpg', import.meta.url).href,
      new URL('../../image/Product Skills Studio/20260821-173235.568-2.jpg', import.meta.url).href,
      new URL('../../image/Product Skills Studio/20260821-173235.568-3.jpg', import.meta.url).href,
    ],
  },
  {
    title: 'Vibe Prompt Assistant',
    description: '结构化 Prompt 设计实验，将模糊需求转化为高质量 AI 输出。',
    tags: ['React', 'AI API', '语音识别'],
    github: 'https://github.com/shiyiqing111/Vibe-prompt-assistant',
    demo: 'https://vibe-prompt-assistant.vercel.app/',
    featured: true,
    visual: 'prompt',
    screenshots: [
      new URL('../../image/Vibe Prompt/20260821-173842.png', import.meta.url).href,
      new URL('../../image/Vibe Prompt/20260821-173851.jpg', import.meta.url).href,
      new URL('../../image/Vibe Prompt/20260821-173858.jpg', import.meta.url).href,
    ],
  },
  {
    title: 'MockAI',
    description: '深度解析岗位要求，定制化生成模拟面试题与策略，帮助复盘。',
    tags: ['React', 'AI', '面试助手'],
    github: 'https://github.com/shiyiqing111/MockAI',
    demo: 'https://mock-ai-xi.vercel.app/',
    featured: true,
    visual: 'interview',
    screenshots: [
      new URL('../../image/MockAI/20260821-173802.jpg', import.meta.url).href,
      new URL('../../image/MockAI/20260821-173808.jpg', import.meta.url).href,
      new URL('../../image/MockAI/20260821-173818.jpg', import.meta.url).href,
    ],
  },
  {
    title: 'Energy Ring',
    description:
      '面向智能戒指选购场景打造的 Web 交互原型，整合 AR 虚拟试戴、摄像头指围测量与屏幕尺寸校准，帮助用户在线完成戒指外观预览与尺寸选择。',
    tags: ['AR 虚拟试戴', '摄像头测量', 'Web 原型'],
    demo: 'https://srv1560692.hstgr.cloud',
    featured: true,
    visual: 'ring',
    screenshots: [
      new URL('../../image/Energy Ring/20260821-174153.jpg', import.meta.url).href,
      new URL('../../image/Energy Ring/20260821-174234.jpg', import.meta.url).href,
      new URL('../../image/Energy Ring/20260821-174242.jpg', import.meta.url).href,
    ],
  },
  {
    title: 'AI Resume Autofill',
    description: 'Chrome 扩展插件，AI 智能识别并自动填写网页表单字段，适配主流招聘平台。',
    tags: ['Chrome Extension', 'AI', '自动化'],
    github: 'https://github.com/Charlotte11111111/Resume-autofill',
    featured: false,
    visual: 'resume',
    screenshots: [
      new URL('../../image/AI Resume Autofill/img_v3_0214p_9d5ca95e-f478-44cc-9eec-f9ceba45111g.jpg', import.meta.url).href,
    ],
  },
  {
    title: 'Linguist Translator',
    description: '智能翻译浏览器扩展，支持整页翻译、划词翻译、词库收藏与闪卡复习。',
    tags: ['Chrome Extension', '翻译', '学习工具'],
    github: 'https://github.com/Charlotte11111111/Translation-plugin',
    featured: false,
    visual: 'translate',
    screenshots: [
      new URL('../../image/Linguist Translator/img_v3_0214p_472a3ed2-7390-412b-b746-db9cf3cf019g.jpg', import.meta.url).href,
    ],
  },
];

const ProjectVisual = ({ project }: { project: VibeProject }) => {
  const count = project.screenshots.length;

  return (
    <div className="group/stack relative h-full min-h-[280px] overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-full w-full">
          {project.screenshots.map((src, index) => {
            const defaultX = (index - (count - 1) / 2) * 5;
            const spreadX = count === 1 ? 0 : (index - (count - 1) / 2) * 25;
            const rotation = (index - (count - 1) / 2) * 3;
            return (
              <div
                key={src}
                className="absolute left-[3%] top-1/2 h-full w-[94%] -translate-y-1/2 cursor-zoom-in overflow-hidden border-l border-border/50 bg-background shadow-[-10px_0_30px_rgba(0,0,0,0.14)] transition-all duration-500 ease-out [transform:translateX(var(--stack-x))_translateY(-50%)_rotate(var(--stack-r))] group-hover/stack:[transform:translateX(var(--spread-x))_translateY(-50%)_rotate(0deg)] hover:!z-50 hover:![transform:translateX(var(--spread-x))_translateY(-50%)_rotate(0deg)_scale(1.05)]"
                style={{
                  zIndex: index + 1,
                  '--stack-x': `${defaultX}%`,
                  '--spread-x': `${spreadX}%`,
                  '--stack-r': `${rotation}deg`,
                } as React.CSSProperties}
              >
                <img
                  src={src}
                  alt={`${project.title} 项目截图 ${index + 1}`}
                  className="h-full w-full object-cover object-top"
                  loading="lazy"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

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
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-10">
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
        </div>

        {/* ── Project list ── */}
        <div
          className={`space-y-6 transition-all duration-700 delay-150 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {vibeProjects.map((project, idx) => (
            <article
              key={project.title}
              className="group relative overflow-hidden rounded-[28px] border border-border/70 bg-background/65 shadow-[0_18px_60px_-48px_rgba(0,0,0,0.45)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-[#22C55E]/35 hover:shadow-[0_28px_70px_-46px_rgba(34,197,94,0.38)] dark:bg-white/[0.025] dark:border-white/[0.08]"
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              <div className="grid min-h-[280px] grid-cols-1 md:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
                <div className="flex flex-col justify-between px-5 py-6 sm:px-8 sm:py-8">
                  <div>
                    <div className="flex items-center gap-3 text-[11px] tracking-[0.24em] text-muted-foreground">
                      <span>{String(idx + 1).padStart(2, '0')}</span>
                      <span className="h-px w-8 bg-border" />
                      <span>{project.featured ? 'FEATURED PROJECT' : 'VIBE PROJECT'}</span>
                    </div>
                    <h3 className="mt-5 font-display text-3xl font-semibold text-foreground transition-colors group-hover:text-[#22C55E] sm:text-4xl">
                      {project.title}
                    </h3>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                      {project.description}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-border bg-background/70 px-3 py-1.5 text-xs text-muted-foreground dark:bg-white/[0.04]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm text-background transition-transform hover:scale-[1.03]">
                        <ArrowUpRight className="h-4 w-4" />
                        在线体验
                      </a>
                    )}
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-5 py-2.5 text-sm text-foreground transition-colors hover:border-[#22C55E]/35 hover:bg-[#22C55E]/10">
                        <Github className="h-4 w-4" />
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
                <div className="min-h-[280px] md:min-h-full">
                  <ProjectVisual project={project} />
                </div>
              </div>
            </article>
          ))}
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
