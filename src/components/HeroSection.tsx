import { useEffect, useRef, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import ChatPopover from './ChatPopover';

const VIDEO_URL = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4';

const ThemeToggle = () => {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <button
      onClick={toggle}
      className="relative w-10 h-10 rounded-full border border-border flex items-center justify-center transition-colors hover:bg-secondary"
      aria-label="切换主题"
    >
      <Sun className={`h-4 w-4 absolute transition-all duration-300 ${dark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}`} />
      <Moon className={`h-4 w-4 absolute transition-all duration-300 ${dark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}`} />
    </button>
  );
};

const Navbar = () => (
  <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
    <a href="/" className="font-display text-2xl tracking-tight text-foreground font-semibold">
      史一晴
    </a>
    <div className="hidden md:flex items-center gap-8">
      {[
        { label: '首页', href: '#', active: true },
        { label: '技能', href: '#skills', active: false },
        { label: '经历', href: '#experience', active: false },
        { label: '项目', href: '#projects', active: false },
        { label: '联系我', href: '#contact', active: false },
      ].map((item) => (
        <a
          key={item.label}
          href={item.href}
          className={`text-sm transition-colors hover:text-foreground ${
            item.active ? 'text-foreground' : 'text-muted-foreground'
          }`}
        >
          {item.label}
        </a>
      ))}
    </div>
    <div className="flex items-center gap-3">
      <ThemeToggle />
      <a href="mailto:shiyiqing111@gmail.com" className="rounded-full bg-primary px-6 py-2.5 text-sm text-primary-foreground transition-transform hover:scale-[1.03]">
        联系我
      </a>
    </div>
  </nav>
);

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = videoContainerRef.current;
    if (!video || !container) return;

    let animationId: number;

    const fadeLoop = () => {
      if (!video.duration) {
        animationId = requestAnimationFrame(fadeLoop);
        return;
      }
      const time = video.currentTime;
      const duration = video.duration;

      if (time < 0.5) {
        container.style.opacity = String(Math.min(time / 0.5, 1));
      } else if (time > duration - 0.5) {
        container.style.opacity = String(Math.max((duration - time) / 0.5, 0));
      } else {
        container.style.opacity = '1';
      }

      animationId = requestAnimationFrame(fadeLoop);
    };

    const handleEnded = () => {
      container.style.opacity = '0';
      setTimeout(() => {
        video.currentTime = 0;
        video.play();
      }, 100);
    };

    video.addEventListener('ended', handleEnded);
    animationId = requestAnimationFrame(fadeLoop);
    video.play().catch(() => {});

    return () => {
      cancelAnimationFrame(animationId);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <div
        ref={videoContainerRef}
        className="absolute z-0"
        style={{ top: '300px', inset: 'auto 0 0 0', opacity: 0 }}
      >
        <video
          ref={videoRef}
          src={VIDEO_URL}
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      <Navbar />

      <div
        className="relative z-10 flex flex-col items-center justify-center text-center px-6 pb-40"
        style={{ paddingTop: 'calc(8rem - 75px)' }}
      >
        <p className="text-sm text-muted-foreground mb-6 tracking-widest animate-fade-rise">
          数据科学 · 产品经理 · 用户研究
        </p>
        <h1
          className="font-display text-4xl sm:text-6xl md:text-7xl max-w-5xl font-semibold animate-fade-rise"
          style={{ lineHeight: 1.15, letterSpacing: '-1px' }}
        >
          用数据洞察驱动
          <br />
          <span className="text-muted-foreground">产品与体验创新</span>
        </h1>

        <p className="text-base sm:text-lg max-w-2xl mt-8 leading-relaxed text-muted-foreground animate-fade-rise-delay">
          香港理工大学数据科学硕士，专注于用户研究、需求分析与数据驱动的产品优化。
          擅长将复杂数据转化为可落地的产品策略，致力于打造有深度、有温度的数字体验。
        </p>

        <div className="flex items-center gap-6 mt-12 animate-fade-rise-delay-2">
          <a href="mailto:shiyiqing111@gmail.com" className="rounded-full bg-primary px-10 py-4 text-base text-primary-foreground transition-transform hover:scale-[1.03]">
            联系我
          </a>
          <ChatPopover avatarSrc="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Close-up%203D%20stylized%20female%20avatar%20with%20very%20large%20expressive%20eyes%2C%20big%20head%2C%20minimal%20shoulders%2C%20brown%20hair%2C%20wearing%20a%20green%20knitted%20sweater%2C%20soft%20studio%20lighting%2C%20clean%20white%20background%2C%20high%20quality%2C%20pixar%20animation%20style&image_size=square" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
