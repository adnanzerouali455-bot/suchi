import { useEffect, useRef, useState } from 'react';
import { useReveal } from '../hooks/useReveal';

const layers = [
  { id: 'nori', name: 'Nori', description: 'Algue nori grillée', color: 'from-green-900 to-green-950', delay: 0 },
  { id: 'rice', name: 'Riz', description: 'Riz vinaigré tiède', color: 'from-sumi-50 to-sumi-200', delay: 0.15 },
  { id: 'wasabi', name: 'Wasabi', description: 'Wasabi frais râpé', color: 'from-green-400 to-green-600', delay: 0.3 },
  { id: 'salmon', name: 'Saumon', description: 'Saumon frais tranché', color: 'from-shu-400 to-shu-600', delay: 0.45 },
  { id: 'sesame', name: 'Sésame', description: 'Graines de sésame torréfiées', color: 'from-kin-200 to-kin-400', delay: 0.6 },
];

export default function IngredientAssembly() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const { ref: headerRef, visible } = useReveal();

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const winH = window.innerHeight;
      const raw = (winH * 0.7 - rect.top) / (winH * 0.5 + rect.height * 0.5);
      setProgress(Math.max(0, Math.min(1, raw)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const layerCount = layers.length;
  const visibleLayers = Math.min(layerCount, Math.floor(progress * layerCount * 1.2));

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-gradient-to-b from-sumi-950 to-sumi-900 py-24 lg:py-32">
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(232,98,44,0.05)_0%,transparent_60%)]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div ref={headerRef} className={`reveal mx-auto max-w-2xl text-center ${visible ? 'is-visible' : ''}`}>
          <p className="mb-3 text-xs uppercase tracking-[0.4em] text-shu-400/80">L'art du roulé</p>
          <h2 className="font-serif text-4xl font-light text-sumi-50 sm:text-5xl">
            Chaque <span className="text-shu-500">ingrédient</span> compte
          </h2>
          <p className="mt-4 text-sm font-light text-sumi-300">
            Faites défiler pour voir le maki se construire pièce par pièce.
          </p>
        </div>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Visual — roll being built */}
          <div className="relative flex h-96 items-center justify-center perspective-2000">
            {/* Cutting board */}
            <div className="absolute bottom-8 h-8 w-72 rounded-lg bg-gradient-to-b from-sumi-700 to-sumi-800 shadow-xl" />

            {/* Roll cross-section being built */}
            <div className="relative preserve-3d" style={{ transform: `rotateX(${15 - progress * 10}deg) rotateY(${10}deg) scale(${0.8 + progress * 0.3})` }}>
              {/* Nori (outer ring) */}
              <div
                className="absolute rounded-full bg-gradient-to-br from-green-900 to-green-950 shadow-2xl transition-all duration-500"
                style={{
                  width: '200px',
                  height: '200px',
                  opacity: visibleLayers >= 1 ? 1 : 0,
                  transform: visibleLayers >= 1 ? 'scale(1)' : 'scale(0.5)',
                }}
              />

              {/* Rice ring */}
              <div
                className="absolute rounded-full bg-gradient-to-br from-sumi-100 to-sumi-300 shadow-inner transition-all duration-500"
                style={{
                  width: '170px',
                  height: '170px',
                  top: '15px',
                  left: '15px',
                  opacity: visibleLayers >= 2 ? 1 : 0,
                  transform: visibleLayers >= 2 ? 'scale(1)' : 'scale(0.3)',
                }}
              >
                {/* Rice grain dots */}
                <div className="absolute inset-0 rounded-full opacity-40 bg-[radial-gradient(circle_at_20%_25%,white_2px,transparent_3px),radial-gradient(circle_at_70%_30%,white_2px,transparent_3px),radial-gradient(circle_at_40%_60%,white_2px,transparent_3px),radial-gradient(circle_at_80%_70%,white_2px,transparent_3px),radial-gradient(circle_at_25%_80%,white_2px,transparent_3px)]" />
              </div>

              {/* Wasabi dab */}
              <div
                className="absolute rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-md transition-all duration-500"
                style={{
                  width: '40px',
                  height: '40px',
                  top: '80px',
                  left: '80px',
                  opacity: visibleLayers >= 3 ? 0.9 : 0,
                  transform: visibleLayers >= 3 ? 'scale(1)' : 'scale(0)',
                }}
              />

              {/* Salmon filling (center) */}
              <div
                className="absolute rounded-full bg-gradient-to-br from-shu-400 via-shu-500 to-shu-600 shadow-lg transition-all duration-500"
                style={{
                  width: '80px',
                  height: '80px',
                  top: '60px',
                  left: '60px',
                  opacity: visibleLayers >= 4 ? 1 : 0,
                  transform: visibleLayers >= 4 ? 'scale(1)' : 'scale(0.2)',
                }}
              >
                {/* Salmon gloss */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/40 via-transparent to-transparent" />
                <div className="absolute left-3 top-2 h-2 w-8 rounded-full bg-white/50 blur-sm" />
              </div>

              {/* Sesame seeds */}
              {visibleLayers >= 5 && (
                <>
                  <div className="absolute h-2 w-1 rounded-full bg-kin-300 shadow-sm" style={{ top: '50px', left: '100px', transform: 'rotate(30deg)' }} />
                  <div className="absolute h-2 w-1 rounded-full bg-kin-200 shadow-sm" style={{ top: '120px', left: '70px', transform: 'rotate(-20deg)' }} />
                  <div className="absolute h-2 w-1 rounded-full bg-kin-300 shadow-sm" style={{ top: '90px', left: '140px', transform: 'rotate(45deg)' }} />
                  <div className="absolute h-2 w-1 rounded-full bg-kin-200 shadow-sm" style={{ top: '140px', left: '120px', transform: 'rotate(15deg)' }} />
                  <div className="absolute h-2 w-1 rounded-full bg-kin-300 shadow-sm" style={{ top: '70px', left: '50px', transform: 'rotate(-40deg)' }} />
                </>
              )}

              {/* Steam when complete */}
              {visibleLayers >= 5 && (
                <div className="absolute -top-20 left-1/2 -translate-x-1/2">
                  <div className="h-16 w-8 animate-steam-rise rounded-full bg-white/10 blur-md" />
                </div>
              )}
            </div>

            {/* Flying ingredients (before they land) */}
            {layers.map((layer, i) => {
              if (i < visibleLayers) return null;
              return (
                <div
                  key={layer.id}
                  className="absolute animate-float-gentle"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${10 + i * 12}%`,
                    opacity: 0.5,
                    animationDelay: `${layer.delay}s`,
                  }}
                >
                  <div className={`h-12 w-12 rounded-full bg-gradient-to-br ${layer.color} shadow-lg ring-1 ring-white/10`} />
                </div>
              );
            })}
          </div>

          {/* Ingredient list */}
          <div className="space-y-4">
            {layers.map((layer, i) => {
              const isActive = i < visibleLayers;
              return (
                <div
                  key={layer.id}
                  className={`flex items-center gap-4 rounded-2xl border p-4 transition-all duration-500 ${
                    isActive
                      ? 'border-shu-500/40 bg-sumi-900/80 opacity-100 translate-x-0'
                      : 'border-sumi-700/30 bg-sumi-900/30 opacity-40 translate-x-4'
                  }`}
                >
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${layer.color} shadow-md`}>
                    <span className="font-serif text-lg font-semibold text-sumi-950">{i + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-lg text-sumi-50">{layer.name}</h3>
                    <p className="text-xs font-light text-sumi-400">{layer.description}</p>
                  </div>
                  <div className={`h-3 w-3 rounded-full transition-all duration-300 ${isActive ? 'bg-shu-500 shadow-glow' : 'bg-sumi-700'}`} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
