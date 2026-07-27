import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../i18n/I18nContext';

export default function Sizzle() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const winH = window.innerHeight;
      // 0 when section enters bottom, 1 when section exits top
      const raw = (winH - rect.top) / (winH + rect.height);
      setProgress(Math.max(0, Math.min(1, raw)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Phases: 0-0.3 chopsticks descend, 0.3-0.5 pick up piece, 0.5-0.7 dip in soy, 0.7-1.0 lift to camera
  const chopstickY = progress < 0.3
    ? -100 * (1 - progress / 0.3)
    : progress < 0.5
      ? 0
      : progress < 0.7
        ? 40
        : -120 * ((progress - 0.7) / 0.3);

  const pieceY = progress < 0.3
    ? 60
    : progress < 0.5
      ? 60 - (progress - 0.3) / 0.2 * 40
      : progress < 0.7
        ? 20 + (progress - 0.5) / 0.2 * 30
        : 50 - (progress - 0.7) / 0.3 * 200;

  const pieceScale = progress < 0.7
    ? 1
    : 1 + (progress - 0.7) / 0.3 * 1.5;

  const pieceOpacity = progress < 0.85 ? 1 : 1 - (progress - 0.85) / 0.15;

  const soyRippleOpacity = progress > 0.5 && progress < 0.7
    ? Math.sin((progress - 0.5) / 0.2 * Math.PI)
    : 0;

  const soyRippleScale = progress > 0.5 && progress < 0.7
    ? (progress - 0.5) / 0.2 * 2.5
    : 0;

  return (
    <section ref={sectionRef} className="relative flex h-[130vh] items-center justify-center overflow-hidden bg-sumi-950">
      {/* Sticky viewport */}
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,98,44,0.06)_0%,transparent_60%)]" />

        {/* Background steam */}
        <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2">
          <div className="h-32 w-20 animate-steam-rise rounded-full bg-white/5 blur-xl" />
        </div>

        {/* Soy sauce dish */}
        <div className="absolute bottom-[25%] left-1/2 -translate-x-1/2">
          <div className="relative">
            {/* Dish */}
            <div className="h-20 w-32 rounded-[40px] bg-gradient-to-b from-sumi-800 to-sumi-950 shadow-2xl ring-1 ring-sumi-600/50" />
            {/* Soy sauce surface */}
            <div className="absolute inset-x-3 top-2 h-12 rounded-[32px] bg-gradient-to-b from-kin-700/80 via-kin-800/90 to-kin-900/95">
              <div className="absolute inset-0 rounded-[32px] bg-[radial-gradient(ellipse_at_30%_40%,rgba(255,200,100,0.2),transparent)]" />
              {/* Soy ripple */}
              {soyRippleOpacity > 0 && (
                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-kin-300/60"
                  style={{ width: '40px', height: '40px', opacity: soyRippleOpacity, transform: `translate(-50%,-50%) scale(${soyRippleScale})` }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Chopsticks + nigiri piece */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 perspective-2000">
          <div
            className="relative preserve-3d"
            style={{
              transform: `translateY(${chopstickY}px) scale(${progress < 0.7 ? 1 : 1 + (progress - 0.7) * 0.3})`,
              opacity: pieceOpacity,
            }}
          >
            {/* Chopstick 1 (top) */}
            <div
              className="absolute h-2.5 w-80 rounded-full bg-gradient-to-r from-kin-800 via-kin-500 to-kin-300 shadow-lg rotate-[-18deg] origin-left"
              style={{ left: '40%', top: '-10px' }}
            />
            {/* Chopstick 2 (bottom) */}
            <div
              className="absolute h-2.5 w-80 rounded-full bg-gradient-to-r from-kin-800 via-kin-500 to-kin-300 shadow-lg rotate-[-12deg] origin-left"
              style={{ left: '40%', top: '6px' }}
            />

            {/* Nigiri piece being held */}
            <div
              className="relative"
              style={{
                transform: `translateY(${pieceY - chopstickY}px) scale(${pieceScale})`,
                transformStyle: 'preserve-3d',
              }}
            >
              <div className="relative h-28 w-36">
                {/* Rice base */}
                <div className="absolute bottom-0 h-14 w-full rounded-b-2xl rounded-t-lg bg-gradient-to-b from-sumi-50 to-sumi-200 shadow-lg">
                  {/* Rice grain texture */}
                  <div className="absolute inset-0 rounded-b-2xl rounded-t-lg opacity-30 bg-[radial-gradient(circle_at_20%_30%,white_1px,transparent_2px),radial-gradient(circle_at_60%_50%,white_1px,transparent_2px),radial-gradient(circle_at_80%_70%,white_1px,transparent_2px),radial-gradient(circle_at_40%_80%,white_1px,transparent_2px)]" />
                </div>
                {/* Salmon on top */}
                <div className="absolute top-0 h-16 w-full rounded-t-2xl rounded-b-lg bg-gradient-to-b from-shu-400 via-shu-500 to-shu-600 shadow-md">
                  {/* Glossy highlight on salmon */}
                  <div className="absolute inset-0 rounded-t-2xl rounded-b-lg bg-gradient-to-br from-white/40 via-transparent to-transparent" />
                  <div className="absolute left-4 top-3 h-2 w-12 rounded-full bg-white/50 blur-sm" />
                  {/* Salmon texture lines */}
                  <div className="absolute inset-0 rounded-t-2xl rounded-b-lg opacity-20 bg-[repeating-linear-gradient(90deg,transparent,transparent_8px,white_1px,transparent_9px)]" />
                </div>
                {/* Wasabi dab */}
                <div className="absolute right-6 top-8 h-5 w-5 rounded-full bg-green-500/80 shadow-sm" />
              </div>
            </div>
          </div>
        </div>

        {/* Phase text */}
        <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 text-center">
          <p className="font-script text-2xl text-shu-400/80 transition-opacity duration-300" style={{ opacity: progress > 0.05 && progress < 0.95 ? 0.8 : 0 }}>
            {progress < 0.3 ? t('sizzle.phase1') : progress < 0.5 ? t('sizzle.phase2') : progress < 0.7 ? t('sizzle.phase3') : t('sizzle.phase4')}
          </p>
        </div>
      </div>
    </section>
  );
}
