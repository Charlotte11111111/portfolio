import { useRef, useEffect, useState, useCallback } from 'react';
import expFadada from '@/assets/exp-fadada.jpg';
import expBgi from '@/assets/exp-bgi.jpg';
import expVesync from '@/assets/exp-vesync.jpg';

const experiences = [
  {
    company: 'VeSync（晨北科技）',
    role: '软件产品经理',
    period: '2026.03 – 至今',
    image: expVesync,
    summary:
      'VeSync 旗下拥有 Levoit、ETEKCITY 等多个成熟出海消费电子品牌，产品矩阵覆盖智能家居、健康硬件等品类。本人参与智能戒指新品项目（公司智能穿戴品类从0到1阶段），负责 H5 网页与 App 端产品工作，推进 AI 指维识别核心功能从立项到上线落地。',
    highlights: [
      {
        title: 'AI 指维识别功能的全流程产品化',
        detail:
          '智能指环负责 H5 网页 AI 指维识别功能，从功能前期的 ROI 计算、成本效益评估出发，完成 PRD 撰写与交互原型设计，协调研发与算法团队进行功能测试验证，与法务部门确认合规性，梳理完整的用户路径与功能展示渠道，推进功能上线落地。',
      },
      {
        title: 'App 包活策略优化与留存管理',
        detail:
          '通过系统分析竞品弹窗逻辑与包活设计，为产品 App 包活提供差异化方案，设计基于 GPS 定位的定时回传与主动管理机制，建立健康提示的触发逻辑与引导体系，提升用户活跃度与 App 留存率。',
      },
      {
        title: '用户指导文档体系建设',
        detail:
          '主导 QSG、产品说明书与 FAQ 文档的策划与绘制，组织产品、法务、质量等跨部门团队收集与整合常见问题解答，确保文档内容的准确性与易用性，降低用户上手成本，同时保证内容合规性。',
      },
    ],
  },
  {
    company: '法大大',
    role: '软件产品经理',
    period: '2025.09 – 2025.12',
    image: expFadada,
    summary:
      '聚焦海外 SaaS 电子签约产品全链路优化，负责需求分析、竞品研究、功能迭代及内容运营，联动跨团队推进企业级方案落地，提升产品体验与市场竞争力。',
    highlights: [
      {
        title: '需求判断与场景解决方案',
        detail:
          '围绕海外用户在文档上传与签署流程中的真实使用场景，从售前演示与售后工单中抽象高频失败路径，定位上传格式限制、签署步骤理解成本高等问题，将模糊反馈拆解为流程与交互层面的明确优化需求，并跟进版本迭代。通过用户反馈与使用埋点数据分析针对性优化，优化后重复工单降低至原来50%；同时结合用户路径，将模板入口前置至"发送信封"关键节点，经 A/B 测试验证不影响主流程转化后上线，模板功能使用率提升约 30%。',
      },
      {
        title: '竞品对标与 PLG 策略分析',
        detail:
          '系统分析 DocuSign 等头部电子签产品在模板能力、自助转化路径与版本定价上的差异，拆解不同产品版本对"首次使用成功率"的影响逻辑，输出多套 PLG 增长路径建议，支持新产品功能取舍与版本规划。',
      },
      {
        title: '官网 CMS 内容结构治理',
        detail:
          '针对海外官网页面字段不统一、内容结构混乱导致 SEO 表现不佳的问题，统一标题层级、Meta 信息与内容模块规范，推动 CMS 模板标准化，提升搜索引擎收录友好度，同时显著降低后续内容运营与新页面搭建成本。',
      },
      {
        title: '智能客服与自助转化优化',
        detail:
          '在 Udesk 智能客服资源有限的情况下，聚焦"基础问题自动回复 + 人工工单前分流"两类核心场景，重构机器人介入、人工分流、评价触发与帮助中心跳转逻辑；基于高频 FAQs 按"问题意图–问题分类–标准答案"补充知识库，并协调第三方厂商优化接口与页面跳转路径。',
      },
    ],
  },
  {
    company: '华大基因生命科学研究所',
    role: '科研项目管理',
    period: '2025.04 – 2025.09',
    image: expBgi,
    summary:
      '作为业务侧对接产品经理，参与 10+ 科研项目从立项到结项的全过程管理，围绕项目进度、成果产出与资金回款数据，推动 PM 系统功能优化与管理看板标准化。',
    highlights: [
      {
        title: 'PM 系统功能优化与需求抽象',
        detail:
          '以业务方角色深度参与内部 PM 系统使用，基于真实项目推进场景，将问题拆解为「角色—流程—输入输出—风险点」四要素，协助提出节点处理中状态、节点撤回、状态标记与权限白名单等功能需求，在保证流程合规的前提下提升系统灵活性与可用性。',
      },
      {
        title: '项目全流程推进与节点管理',
        detail:
          '跟进 10+ 在研科研项目从立项、实验执行、数据分析到结项交付的完整流程，定期同步研发、实验与管理团队进展，将科研过程中的模糊诉求拆解为明确节点、交付物与责任人，识别阶段性滞后风险并提前预警，降低项目延期率。',
      },
      {
        title: 'KPI 数据看板搭建',
        detail: '搭建 2 套项目进度与 KPI 仪表盘，统一指标口径（成果发表进度与立项节点偏差、结项延期对应的经费、各分院回款率完成情况等）。',
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
