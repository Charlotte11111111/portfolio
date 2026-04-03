import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { Award, GraduationCap } from 'lucide-react';

const ParticlePulseEffect = lazy(() => import('./ParticlePulseEffect'));

const education = [
  {
    school: '香港理工大学',
    degree: '数据科学与大数据技术硕士',
    period: '2024.09 – 2026.10',
    note: '聚焦数据分析、机器学习与产品落地应用。',
  },
  {
    school: '北师香港浸会大学',
    degree: '数据科学与大数据技术学士',
    period: '2020.09 – 2024.06',
    note: '夯实数据科学基础，强化科研与项目实践能力。',
  },
];

const honors = ['成绩排名年级前 10%', '一等学位', '连续四年二等奖学金', 'CET-6'];

const EducationSection = () => {
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
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full bg-[#F2F2F4]/70 to-transparent blur-3xl dark:hidden" />
        <div className="absolute top-1/3 left-0 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-[#F8F8FA] to-transparent blur-3xl dark:hidden" />
        <div className="absolute bottom-0 right-1/4 w-[350px] h-[250px] rounded-full bg-gradient-to-t from-[#FAFAFC] to-transparent blur-2xl dark:hidden" />
        <div className="hidden dark:block absolute inset-0">
          <div className="absolute -top-28 left-1/2 -translate-x-1/2 w-[640px] h-[640px] rounded-full bg-[#22C55E]/6 blur-3xl animate-float-slower" />
          <div className="absolute -bottom-40 -left-40 w-[480px] h-[480px] rounded-full bg-white/[0.02] blur-3xl animate-float-slow" />
          <div className="absolute -bottom-40 -right-40 w-[560px] h-[560px] rounded-full bg-[#22C55E]/5 blur-3xl animate-float-slowest" />
          <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-black/30 to-transparent blur-3xl" />
          <div className="absolute top-1/2 right-1/4 w-[320px] h-[320px] rounded-full bg-gradient-to-l from-white/[0.015] to-transparent blur-3xl" />
        </div>
      </div>

      {/* ── Particle layer (behind content) ── */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        <div className="hidden dark:block h-full">
          <Suspense fallback={null}>
            <ParticlePulseEffect variant="night" height="100%" opacity={0.8} />
          </Suspense>
        </div>
        <div className="dark:hidden h-full">
          <Suspense fallback={null}>
            <ParticlePulseEffect variant="day" height="100%" opacity={0.8} />
          </Suspense>
        </div>
      </div>

      {/* ── Content layer ── */}
      <div className="relative max-w-7xl mx-auto z-20">
        <div
          className={`flex flex-col md:flex-row md:items-end md:justify-between gap-10 mb-14 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div>
            <p className="text-sm text-muted-foreground mb-4 tracking-widest">教育背景</p>
            <h2
              className="font-display text-3xl sm:text-5xl md:text-6xl text-foreground font-semibold"
              style={{ lineHeight: 1.15 }}
            >
              学术训练
              <span className="text-muted-foreground">与方法论</span>
            </h2>
          </div>
          <div className="max-w-xl">
            <p className="text-muted-foreground text-base leading-relaxed">
              以数据科学为底座，构建从分析方法到产品落地的能力闭环。
            </p>
          </div>
        </div>

        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-6 transition-all duration-700 delay-150 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Education Cards */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {education.map((item, idx) => (
              <div
                key={item.school}
                className="group relative rounded-3xl border border-border bg-background/60 backdrop-blur p-8 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_60px_-32px_rgba(34,197,94,0.45)] dark:bg-white/[0.03] dark:border-white/[0.08] dark:hover:shadow-[0_22px_60px_-32px_rgba(34,197,94,0.2)]"
                style={{ transitionDelay: `${idx * 60}ms` }}
              >

                <div className="relative">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs text-muted-foreground tracking-widest">{String(idx + 1).padStart(2, '0')}</div>
                      <h3 className="font-display text-2xl text-foreground font-semibold mt-2">{item.school}</h3>
                    </div>
                    <span className="w-10 h-10 rounded-full bg-[#22C55E]/12 text-[#22C55E] dark:bg-[#22C55E]/20 dark:text-[#4ADE80] flex items-center justify-center border border-[#22C55E]/20 dark:border-[#22C55E]/15">
                      <GraduationCap className="w-5 h-5" />
                    </span>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm text-foreground font-medium">{item.degree}</p>
                    <p className="text-sm text-muted-foreground mt-1">{item.period}</p>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mt-5">{item.note}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Honors Card */}
          <div className="lg:col-span-4">
            <div className="relative rounded-3xl border border-border bg-background/60 backdrop-blur p-8 overflow-hidden dark:bg-white/[0.03] dark:border-white/[0.08]">
              <div className="relative">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-[#22C55E]/12 text-[#22C55E] dark:bg-[#22C55E]/20 dark:text-[#4ADE80] flex items-center justify-center border border-[#22C55E]/20 dark:border-[#22C55E]/15">
                    <Award className="w-5 h-5" />
                  </span>
                  <div>
                    <div className="text-xs text-muted-foreground tracking-widest">HONORS</div>
                    <div className="text-xl font-display font-semibold">相关荣誉</div>
                  </div>
                </div>

                <div className="mt-7 space-y-3">
                  {honors.map((h, i) => (
                    <div
                      key={h}
                      className="flex items-start gap-3 rounded-2xl border border-border bg-background/70 dark:bg-white/[0.04] dark:border-white/[0.06] px-4 py-3"
                      style={{ transitionDelay: `${i * 50}ms` }}
                    >
                      <span className="mt-1 inline-flex w-2 h-2 rounded-full bg-[#22C55E] dark:bg-[#4ADE80] shrink-0" />
                      <span className="text-sm text-muted-foreground leading-relaxed">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
