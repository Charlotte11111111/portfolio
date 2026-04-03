import { useRef, useEffect, useState } from 'react';

const skillGroups = [
  {
    number: '01',
    title: '产品能力',
    description: '用户研究、需求分析、数据埋点分析、竞品分析、PRD 撰写，原型设计、产品规划、运营策略、A/B 测试、PLG 策略研究',
  },
  {
    number: '02',
    title: '数据分析',
    description: 'Python、SQL、C 语言、R、Excel、Tableau、数据可视化',
  },
  {
    number: '03',
    title: 'AI 创新实践',
    description: '探索 Vibe Coding 开发模式，利用大模型辅助完成需求拆解、Prompt 设计与原型生成，提升产品原型与功能验证效率。',
  },
];

const StudioSection = () => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute('data-index'));
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set(prev).add(index));
          }
        });
      },
      { threshold: 0.2 }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="relative py-32 px-6 overflow-hidden">
      {/* ── Night Mode ── */}
      <div className="absolute inset-0 hidden dark:block">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[560px] h-[360px] rounded-full bg-[#22C55E]/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[480px] rounded-full bg-gradient-to-br from-[#22C55E]/3 via-transparent to-transparent blur-3xl" />
        <div className="absolute -bottom-40 left-1/4 w-[480px] h-[360px] rounded-full bg-white/[0.015] to-transparent blur-3xl" />
      </div>

      {/* ── Day Mode ── */}
      <div className="absolute inset-0 dark:hidden">
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-[700px] h-[280px] rounded-full bg-[#F0F0F2]/60 to-transparent blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-gradient-to-br from-[#F5F5F7]/50 via-transparent to-transparent blur-3xl" />
        <div className="absolute -bottom-20 right-1/4 w-[400px] h-[300px] rounded-full bg-gradient-to-t from-[#FAFAFC] to-transparent blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-20">
          <div>
            <p className="text-sm text-muted-foreground mb-4 tracking-widest">技能专长</p>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl text-foreground font-semibold" style={{ lineHeight: 1.2 }}>
              核心能力
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md mt-6 md:mt-0 text-base leading-relaxed">
            跨越数据科学与产品管理的复合型能力体系，兼具技术深度与业务敏锐度。
          </p>
        </div>

        <div className="border-t border-border dark:border-white/[0.08]">
          {skillGroups.map((skill, index) => (
            <div
              key={skill.number}
              ref={(el) => { itemRefs.current[index] = el; }}
              data-index={index}
              className={`group flex flex-col md:flex-row md:items-center gap-6 md:gap-12 py-10 border-b border-border dark:border-white/[0.06] transition-all duration-700 ${
                visibleItems.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <span className="text-sm text-muted-foreground font-body w-12 shrink-0">{skill.number}</span>
              <h3 className="font-display text-2xl sm:text-3xl text-foreground flex-1 font-semibold">
                {skill.title}
              </h3>
              <p className="text-muted-foreground max-w-lg text-sm leading-relaxed">{skill.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudioSection;
