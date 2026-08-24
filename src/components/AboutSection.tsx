import { useRef, useEffect, useState } from 'react';
import { Download } from 'lucide-react';

type Project = {
  title: string;
  subtitle: string;
  period: string;
  description: string;
  highlights?: string[];
  pdf?: string;
};

const projects: Project[] = [
  {
    title: 'AI 指围识别工具',
    subtitle: '实习项目 · 智能穿戴',
    period: '2026.03 – 2026.07',
    description:
      '主导 AI 拍照识别工具从 0 到 1 落地，搭建 AR 虚拟试戴、摄像头 AI 指围测量、屏幕标尺校准三大核心功能，替代线下实体试戴套件。',
    highlights: [
      '搭建利润测算模型开展 ROI 与敏感性分析，测算识别准确率盈亏阈值；完成百人手部采样与用户调研，划定测量精度目标，为项目立项提供量化依据。',
      '协同算法对比两套识别方案，创新「AI 识别 + 用户手动微调」人机协同方案，识别准确率提升 15%；独立完成三大模块 PRD 与原型，联动多团队推进开发、测试与合规校验。',
      '基于数据定位手指识别精度差异，拆解算法链路并优化推理速度，实现端侧模型实时检测；补充水平仪、异常兜底与自动角点校准能力，交付完整 MVP。',
    ],
  },
  {
    title: 'AI 产品工具',
    subtitle: 'Vibe Coding · 个人项目',
    period: '2025 – 至今',
    description:
      '围绕工作效率打造 AI 应用，覆盖 Skill 工作流、Agent、Prompt 调优、浏览器插件与知识库，实现结构化输出、RAG 检索、Agent 搭建及前后端服务打通。',
    highlights: [
      '个人知识库与知识图谱：打通 Electron / React、FastAPI、向量库与 Agent，完成知识入库、RAG 问答及图谱查询闭环。',
      'AI 产品工作流：编排个人积累的 Skill，将模糊想法拆解为脑暴、PRD、评审、实验等可执行产品链路，侧重 Prompt 结构化与多步骤工作流设计。',
      '秋招助手：简历填写插件自动匹配招聘网站表单字段；MockAI 基于简历与 JD 进行匹配分析、公司业务研究、定制面试题生成与薄弱点突击，覆盖「投递—备面」闭环。',
    ],
  },
  {
    title: '智能学习设备租赁平台',
    subtitle: '产品调研与方案设计',
    period: '2023.07 – 2023.12',
    description: '调研 300+ 名中学生与家长，完成学习机租赁 + 在线课程整合平台的 0–1 商业模型设计，包括竞品分析、功能矩阵与差异化定位。',
    pdf: '/projects/project-1.pdf',
  },
  {
    title: 'Yelp 用户评论行为分析',
    subtitle: '内容偏好洞察',
    period: '2021.10 – 2021.12',
    description: '分析不同菜系下用户评分分布与情绪特征差异，进行聚类分析与主题分析，提炼产品启示与内容优化思路。第一作者发表学术论文。',
    pdf: '/projects/project-2.pdf',
  },
];

const campusExperiences = [
  {
    title: '团委会 · 行政委员',
    period: '2020 – 2023',
    description:
      '负责团委会日常行政运转与事务统筹，保障组织会议、活动执行、材料流转和跨部门协同，是团委工作落地的中枢角色。',
    responsibilities: [
      '统筹团委会日常行政事务，包括会议组织、纪要整理、通知下发、材料归档与进度跟进。',
      '对接学院、团委各部门及班级团支部，协调活动场地、人员、物资与时间安排。',
      '参与团学活动全流程支持，覆盖前期筹备、现场执行、物资管理与会后复盘。',
      '维护团委制度与流程规范，跟进待办事项，减少跨部门沟通遗漏与执行偏差。',
      '协助完成团员教育、评优推优、志愿服务等常规团务的组织与材料汇总。',
    ],
  },
  {
    title: '学生会 · 策划部部长',
    period: '2021 – 2024',
    description:
      '负责学生会大型活动与品牌项目的策划与落地，主导活动主题、流程设计、资源协调与跨部门推进，对活动效果与执行质量负责。',
    responsibilities: [
      '主导迎新、晚会、比赛、主题周等大型活动方案策划，完成主题定位、流程设计、预算与排期。',
      '拆解活动目标与执行路径，输出活动策划案和执行手册，明确分工、节点与验收标准。',
      '协调宣传、外联、文艺、后勤等部门，推动物料、场地、嘉宾与志愿者等资源到位。',
      '跟进彩排与现场执行，及时处理突发问题，保障活动按时、按质完成。',
      '活动后复盘到场、反馈与改进点，沉淀可复用的策划模板与执行经验。',
      '带领策划部成员完成选题、方案评审与项目推进，提升团队产出效率与方案质量。',
    ],
  },
];

const AboutSection = () => {
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
    <section id="projects" ref={sectionRef} className="relative py-32 px-6 overflow-hidden">
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
        {/* 日间：Apple 风格极淡暖灰背景，绿色仅作签名点缀 */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#F2F2F4]/80 to-transparent blur-3xl" />
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-[#F8F8FA] to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] rounded-full bg-gradient-to-t from-[#FAFAFC] to-transparent blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Projects — standalone first section */}
        <div
          className={`transition-all duration-1000 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <p className="mb-4 text-sm tracking-widest text-muted-foreground">项目经历</p>
          <h2 className="mb-10 font-display text-3xl font-semibold text-foreground sm:text-5xl" style={{ lineHeight: 1.2 }}>
            从想法到落地
          </h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.title}
                className="group rounded-2xl border border-border bg-background/45 p-8 transition-colors duration-300 hover:bg-secondary/50 dark:bg-white/[0.025]"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl text-foreground font-semibold">{project.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{project.subtitle}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-sm text-muted-foreground">{project.period}</span>
                    {project.pdf && (
                      <a
                        href={project.pdf}
                        download
                        aria-label={`下载 ${project.title} 项目文件`}
                        className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground transition-colors group-hover:text-foreground group-hover:border-foreground/20"
                      >
                        <Download className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
                {project.highlights && (
                  <ul className="mt-5 space-y-3 border-t border-border/70 pt-5">
                    {project.highlights.map((highlight, index) => (
                      <li key={highlight} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#22C55E]/10 text-[10px] font-medium text-[#22C55E]">
                          {index + 1}
                        </span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </div>

        {/* Academic & campus — separate section after projects */}
        <div
          className={`mt-28 border-t border-border pt-24 transition-all duration-1000 delay-300 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <p className="mb-4 text-sm tracking-widest text-muted-foreground">学术与校园</p>
          <h2 className="mb-10 font-display text-3xl font-semibold text-foreground sm:text-5xl" style={{ lineHeight: 1.2 }}>
            探索与实践
          </h2>

          <div className="rounded-2xl bg-secondary p-8 mb-8">
            <p className="text-sm text-muted-foreground mb-2 tracking-widest">论文发表</p>
            <p className="text-foreground text-sm leading-relaxed font-medium">
              第一作者 —{' '}
              <a href="https://arxiv.org/abs/2307.10826" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-primary transition-colors">
                "Yelp Reviews and Food Types: A Comparative Analysis of Ratings, Sentiments, and Topics."
              </a>
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {campusExperiences.map((experience, experienceIndex) => (
              <article
                key={experience.title}
                className="rounded-2xl border border-border bg-background/50 p-6 transition-colors duration-300 hover:bg-secondary/50 dark:bg-white/[0.025]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs tracking-[0.2em] text-[#22C55E]">
                      CAMPUS {String(experienceIndex + 1).padStart(2, '0')}
                    </p>
                    <h4 className="mt-2 font-display text-xl font-semibold text-foreground">
                      {experience.title}
                    </h4>
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">{experience.period}</span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {experience.description}
                </p>
                <div className="mt-5 border-t border-border/70 pt-5">
                  <p className="mb-3 text-xs font-medium tracking-widest text-foreground/70">主要工作</p>
                  <ul className="space-y-3">
                    {experience.responsibilities.map((responsibility) => (
                      <li key={responsibility} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#22C55E]" />
                        <span>{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 pt-16 border-t border-border transition-all duration-1000 delay-500 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {[
            { number: 'Top 10%', label: '成绩排名' },
            { number: '10+', label: '活动组织' },
            { number: '1', label: '论文发表' },
            { number: '3段', label: '实习经历' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <span className="font-display text-3xl sm:text-4xl text-foreground font-semibold">{stat.number}</span>
              <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
