import { useRef, useEffect, useState, useCallback } from 'react';
import expFadada from '@/assets/exp-fadada.jpg';
import expBgi from '@/assets/exp-bgi.jpg';
import expVesync from '@/assets/exp-vesync.jpg';

const experiences = [
  {
    company: 'VeSync（晨北科技）',
    role: '产品经理（智能穿戴品类）',
    period: '2026.03 – 至今',
    image: expVesync,
    summary:
      '北美智能小家电头部出海品牌，旗下 Levoit、Cosori、Etekcity 等品牌覆盖全球 100+ 国家和地区，年营收约 47 亿元。',
    highlights: [
      {
        title: 'AI 指围识别从 0 到 1',
        detail:
          '从尺码错配导致退换货的用户痛点与业务损耗出发，主导功能方案评估至灰度上线；结合用户调研优化测码流程与引导，依据灰度数据迭代测量时长与准确率，完成 ROI 评估、PRD 与原型，并协同算法、研发、设计落地，降低因尺码错误导致的退换货损耗。',
      },
      {
        title: '健康干预模块 Optimize',
        detail:
          '负责 App 核心板块 Optimize 的产品定义，基于行为科学框架梳理干预策略与用户动机机制，结合用户研究洞察并与研究院对齐产品逻辑；完成研究结论沉淀与产品定义，输出 PRD 并适配戒指 Launch 版本。',
      },
      {
        title: '用户研究与竞品调研',
        detail:
          '主导北美可穿戴健康品类（Band、手表、戒指）用户与市场研究，整合美国用户深访及 Trustpilot、Reddit、Amazon 等 VOC，拆解各场景下的购前动机、购后价值与弃用触发；对比竞品形态、订阅模式、数据信任与上市打法，输出用户需求洞察与品类机会报告，为产品方向与 Launch 策略提供依据。',
      },
      {
        title: '首次体验与口碑链路',
        detail:
          '参与 Launch 前用户体验闭环设计，基于用户路径研究梳理「开箱试戴→首次连接→固件更新→订阅注册→首次使用→价值感知→分享传播」全链路；定位激活与价值感知断点，规划 Onboarding 与 Aha Moment 关键节点，完善设备激活前置链路，提升初次价值感知与口碑自发传播。',
      },
    ],
  },
  {
    company: '法大大',
    role: '产品经理（B 端电子签）',
    period: '2025.09 – 2025.12',
    image: expFadada,
    summary:
      '国内领先的电子签与法律科技平台，累计服务超 10 万家企业客户，覆盖 200+ 家世界 / 中国 500 强。',
    highlights: [
      {
        title: '智能客服系统',
        detail:
          '负责自建智能客服系统的需求与方案设计，独立输出功能 PRD 与埋点文档；重构机器人介入、人工分流、评价触发与帮助中心跳转逻辑，完善 RAG 知识库。上线后机器人评分与一轮解决率提升约 30%–40%，转接人工工单量降低近一半。',
      },
      {
        title: '官网 CMS 与 Blog 功能建设',
        detail:
          '针对官网内容结构混乱、SEO 表现不佳的问题提出需求，联动研发落地后台运营管理板块与 Blog 功能，统一标题层级、Meta 与内容模块规范，提升搜索引擎收录友好度，降低运营成本并丰富官网内容。',
      },
      {
        title: '售前售后需求管理',
        detail:
          '需求主要来自售前演示与售后工单、行为数据。售前按行业进行场景化演示，判断「可排期需求」与「边界需求」；售后持续跟踪用量、签署完成率与关键路径，针对问题优化指引，经 A/B 测试验证后上线，模板功能使用率提升约 30%。',
      },
    ],
  },
  {
    company: '华大基因',
    role: '产品经理（数字企业化平台）',
    period: '2025.04 – 2025.09',
    image: expBgi,
    summary:
      '华大集团是全球领先的生命科学产业集团，旗下涵盖华大基因、华大智造及生命科学研究院等板块。',
    highlights: [
      {
        title: '节点状态与撤回',
        detail:
          '针对节点卡住、误操作难回退等问题完成调研与状态机方案设计，输出 PRD 与原型并推动上线，落地处理中状态、撤回与状态标记，提升流程灵活性并保留审计留痕。',
      },
      {
        title: '权限白名单模块',
        detail:
          '设计「角色权限 + 白名单」模型，明确功能权限与数据可见范围，完成需求与权限矩阵并联动研发上线，减少越权与反复线下开通。',
      },
      {
        title: '进度与 KPI 看板',
        detail:
          '统一发表进度偏差、延期经费、分院回款等指标口径，基于数据库建立可视化看板，支撑自助查看与进度共享。',
      },
    ],
  },
];

const WorkSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const wheelAccumRef = useRef(0);
  const lastWheelTimeRef = useRef(0);

  const scrollToIndex = useCallback((index: number) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const scrollableDistance = containerRef.current.offsetHeight - window.innerHeight;
    const clamped = Math.max(0, Math.min(experiences.length - 1, index));
    const targetScroll = containerTop + (clamped / experiences.length) * scrollableDistance;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  }, []);

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const containerHeight = containerRef.current.offsetHeight;
    const viewportHeight = window.innerHeight;
    const scrolled = -rect.top;
    const scrollableDistance = containerHeight - viewportHeight;
    if (scrollableDistance <= 0) return;
    const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));
    setScrollProgress(progress);
    setActiveIndex(Math.min(experiences.length - 1, Math.floor(progress * experiences.length)));
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const inViewport = rect.top <= 10 && rect.height > 0;
      if (!inViewport) return;

      // Accumulate delta (supports both mouse wheel and trackpad)
      wheelAccumRef.current += e.deltaY;
      const absAccum = Math.abs(wheelAccumRef.current);

      // ── If threshold met, snap to next card ──
      const threshold = 20; // lower = more sensitive
      if (absAccum >= threshold) {
        const now = Date.now();
        // Debounce: ignore if we snapped in the last 600ms (prevents double-fire)
        if (now - lastWheelTimeRef.current < 600) return;
        lastWheelTimeRef.current = now;

        const direction = wheelAccumRef.current > 0 ? 1 : -1;
        const nextIndex = activeIndex + direction;
        wheelAccumRef.current = 0;

        if (nextIndex < 0 || nextIndex >= experiences.length) return;
        scrollToIndex(nextIndex);
        // No preventDefault() — let native scroll + snap animation coexist
      }
    };

    window.addEventListener('wheel', onWheel, { passive: true });
    return () => window.removeEventListener('wheel', onWheel);
  }, [activeIndex, scrollToIndex]);

  const toggleExpand = (key: string) => {
    setExpandedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const segmentSize = 1 / experiences.length;
  const localProgress = (scrollProgress - activeIndex * segmentSize) / segmentSize;

  return (
    <section id="experience" ref={containerRef} style={{ height: `${experiences.length * 100 + 50}vh` }}>
      {/* Night backgrounds */}
      <div className="absolute inset-0 z-0 hidden dark:block">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[560px] h-[280px] rounded-full bg-[#22C55E]/4 blur-3xl" />
        <div className="absolute top-1/4 -right-20 w-[360px] h-[360px] rounded-full bg-gradient-to-l from-white/[0.02] to-transparent blur-3xl" />
        <div className="absolute bottom-1/4 -left-20 w-[320px] h-[320px] rounded-full bg-gradient-to-r from-black/40 to-transparent blur-3xl" />
      </div>
      {/* Day backgrounds */}
      <div className="absolute inset-0 z-0 dark:hidden">
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-[700px] h-[280px] rounded-full bg-[#EEF0F2]/80 to-transparent blur-3xl" />
        <div className="absolute top-1/3 -right-16 w-[360px] h-[360px] rounded-full bg-gradient-to-l from-[#F5F5F7] to-transparent blur-3xl" />
        <div className="absolute bottom-1/4 -left-16 w-[320px] h-[320px] rounded-full bg-gradient-to-r from-[#F8F8FA] to-transparent blur-3xl" />
      </div>

      <div className="sticky top-0 h-screen overflow-hidden dark:bg-[#0a0a0a]/90 dark:backdrop-blur-sm bg-secondary/80 backdrop-blur-sm">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-20 pt-10 pb-4 px-6 bg-gradient-to-b from-secondary via-secondary to-transparent dark:from-[#0a0a0a]/90 dark:via-[#0a0a0a]/80 dark:to-transparent">
          <div className="max-w-7xl mx-auto flex items-end justify-between">
            <div>
              <p className="text-sm text-muted-foreground tracking-widest mb-2">实习经历</p>
              <h2 className="font-display text-3xl sm:text-5xl text-foreground font-semibold" style={{ lineHeight: 1.2 }}>实践出真知</h2>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 pt-32 sm:pt-36 pb-8 px-6">
          <div className="max-w-7xl mx-auto h-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 h-full">
              {/* Image */}
              <div className="relative hidden lg:flex items-center justify-center overflow-hidden rounded-3xl">
                {experiences.map((exp, i) => (
                  <img key={i} src={exp.image} alt={exp.company} loading="lazy" width={800} height={1024}
                    className={`absolute inset-0 w-full h-full object-cover rounded-3xl transition-all duration-700 ${i === activeIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`} />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-3xl dark:from-black/70" />
                <div className="absolute bottom-8 left-8 right-8 z-10">
                  {experiences.map((exp, i) => (
                    <div key={i} className={`transition-all duration-500 ${i === activeIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 absolute bottom-0 left-0'}`}>
                      <span className="text-white/60 text-xs tracking-widest">{exp.period}</span>
                      <h3 className="text-white font-display text-3xl font-semibold mt-1">{exp.company}</h3>
                      <p className="text-white/80 text-sm mt-1">{exp.role}</p>
                    </div>
                  ))}
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 rounded-b-3xl overflow-hidden">
                  <div className="h-full bg-white/60 transition-all duration-300" style={{ width: `${localProgress * 100}%` }} />
                </div>
              </div>

              {/* Nav Dots */}
              <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 -ml-10 z-20">
                <div className="flex flex-col items-center gap-3">
                  {experiences.map((_, i) => (
                    <button key={i} type="button" onClick={() => scrollToIndex(i)}
                      className={`relative transition-all duration-500 ${i === activeIndex ? 'w-2 h-8 rounded-full bg-foreground' : 'w-2 h-2 rounded-full bg-foreground/20 hover:bg-foreground/35'}`}
                      aria-label={`跳转到第 ${i + 1} 段经历`} />
                  ))}
                </div>
              </div>

              {/* Details */}
              <div className="relative flex flex-col justify-center overflow-hidden">
                {experiences.map((exp, i) => (
                  <div key={i}
                    className={`transition-all duration-700 ${i === activeIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none absolute inset-0'}`}
                    style={{ position: i === activeIndex ? 'relative' : 'absolute' }}>
                    <div className="lg:hidden mb-6">
                      <span className="text-sm text-muted-foreground tracking-widest">{exp.period}</span>
                      <h3 className="font-display text-2xl text-foreground font-semibold mt-1">{exp.company}</h3>
                      <p className="text-muted-foreground text-sm">{exp.role}</p>
                    </div>
                    <div className="hidden lg:flex items-center gap-4 mb-6">
                      <span className="font-display text-6xl text-foreground/10 font-semibold dark:text-white/10">{String(i + 1).padStart(2, '0')}</span>
                      <div className="h-px flex-1 bg-border dark:bg-white/10" />
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-8">{exp.summary}</p>
                    <div className="space-y-3">
                      {exp.highlights.map((h, hi) => {
                        const key = `${i}-${hi}`;
                        const isExpanded = expandedItems[key];
                        return (
                          <div key={hi} className="group/item rounded-xl border border-border bg-background/50 overflow-hidden transition-all duration-300 hover:border-foreground/20 dark:bg-white/[0.03] dark:border-white/[0.06] dark:hover:border-white/15">
                            <button onClick={() => toggleExpand(key)} className="w-full flex items-center justify-between px-5 py-4 text-left">
                              <div className="flex items-center gap-3">
                                <span className="w-6 h-6 rounded-full bg-foreground/5 dark:bg-white/10 flex items-center justify-center text-xs text-muted-foreground font-medium shrink-0">{hi + 1}</span>
                                <span className="text-sm text-foreground font-medium">{h.title}</span>
                              </div>
                              <svg className={`w-4 h-4 text-muted-foreground transition-transform duration-300 shrink-0 ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
                            <div className={`overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                              <p className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed pl-14">{h.detail}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
