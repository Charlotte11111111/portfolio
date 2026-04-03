export default function SkillsGlowBackground() {
  return (
    <div aria-hidden className="relative h-44 sm:h-56 w-full overflow-hidden">
      {/* ── Night Mode: Dark + subtle green ── */}
      <div className="absolute inset-0 pointer-events-none hidden dark:block">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[820px] h-[820px] rounded-full bg-[#22C55E]/5 blur-3xl animate-float-slower motion-reduce:animate-none" />
        <div className="absolute -bottom-40 -left-40 w-[520px] h-[520px] rounded-full bg-white/[0.02] blur-3xl animate-float-slow motion-reduce:animate-none" />
        <div className="absolute -bottom-40 -right-40 w-[620px] h-[620px] rounded-full bg-[#22C55E]/4 blur-3xl animate-float-slowest motion-reduce:animate-none" />
      </div>

      {/* ── Day Mode: Apple warm ── */}
      <div className="absolute inset-0 pointer-events-none dark:hidden">
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-[640px] h-[300px] rounded-full bg-[#F0F0F2]/80 to-transparent blur-3xl" />
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-[#F5F5F7] to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] rounded-full bg-gradient-to-t from-[#F8F8FA] to-transparent blur-2xl" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="skills-glow-liquid w-[92%] max-w-7xl h-[70%] rounded-3xl" />
      </div>

      <div className="skills-glow-scan pointer-events-none absolute inset-y-0 -left-1/3 w-1/3" />
    </div>
  );
}

