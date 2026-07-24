import { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';

// Pexels sushi photo IDs for orbiting pieces
const orbitPieces = [
  { id: 'o1', src: 'https://images.pexels.com/photos/4725627/pexels-photo-4725627.jpeg?auto=compress&cs=tinysrgb&w=200', label: 'Nigiri saumon', radius: 280, speed: 28, phase: 0, size: 90 },
  { id: 'o2', src: 'https://images.pexels.com/photos/13869890/pexels-photo-13869890.jpeg?auto=compress&cs=tinysrgb&w=200', label: 'Temaki', radius: 320, speed: 35, phase: 1.2, size: 80 },
  { id: 'o3', src: 'https://images.pexels.com/photos/5208237/pexels-photo-5208237.jpeg?auto=compress&cs=tinysrgb&w=200', label: 'Maki', radius: 250, speed: 24, phase: 2.5, size: 70 },
  { id: 'o4', src: 'https://images.pexels.com/photos/4725578/pexels-photo-4725578.jpeg?auto=compress&cs=tinysrgb&w=200', label: 'California', radius: 340, speed: 40, phase: 3.8, size: 85 },
  { id: 'o5', src: 'https://images.pexels.com/photos/6531075/pexels-photo-6531075.jpeg?auto=compress&cs=tinysrgb&w=200', label: 'Futomaki', radius: 300, speed: 32, phase: 5.0, size: 75 },
  { id: 'o6', src: 'https://images.pexels.com/photos/19639299/pexels-photo-19639299.jpeg?auto=compress&cs=tinysrgb&w=200', label: 'Sashimi', radius: 270, speed: 26, phase: 0.7, size: 65 },
];

function SteamWisp({ delay, left, scale = 1 }: { delay: number; left: string; scale?: number }) {
  return (
    <div
      className="pointer-events-none absolute bottom-[30%] animate-steam-rise"
      style={{ left, animationDelay: `${delay}s`, animationDuration: `${4 + delay * 0.3}s` }}
    >
      <div
        className="rounded-full bg-gradient-to-t from-white/0 via-white/15 to-white/0 blur-md"
        style={{ width: `${40 * scale}px`, height: `${100 * scale}px` }}
      />
    </div>
  );
}

export default function Hero() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [rotX, setRotX] = useState(-12);
  const [rotY, setRotY] = useState(20);
  const [isDragging, setIsDragging] = useState(false);
  const [autoIdle, setAutoIdle] = useState(true);
  const dragStart = useRef({ x: 0, y: 0, rotX: 0, rotY: 0 });
  const idleAngle = useRef(0);
  const rafRef = useRef<number>(0);

  // Idle auto-rotation when not dragging
  useEffect(() => {
    const tick = () => {
      if (autoIdle && !isDragging) {
        idleAngle.current += 0.15;
        setRotY(20 + Math.sin(idleAngle.current * 0.01) * 15);
        setRotX(-12 + Math.sin(idleAngle.current * 0.008) * 6);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [autoIdle, isDragging]);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    setIsDragging(true);
    setAutoIdle(false);
    dragStart.current = { x: e.clientX, y: e.clientY, rotX, rotY };
  }, [rotX, rotY]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setRotY(dragStart.current.rotY + dx * 0.4);
    setRotX(Math.max(-60, Math.min(60, dragStart.current.rotX - dy * 0.4)));
  }, [isDragging]);

  const onPointerUp = useCallback(() => {
    setIsDragging(false);
    // Resume idle after 3s
    setTimeout(() => setAutoIdle(true), 3000);
  }, []);

  // Orbit animation
  const [orbitTick, setOrbitTick] = useState(0);
  useEffect(() => {
    let raf: number;
    const tick = () => { setOrbitTick(t => t + 1); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section id="accueil" className="relative flex h-screen min-h-[700px] items-center justify-center overflow-hidden bg-sumi-950">
      {/* Ambient gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-sumi-950 via-sumi-900 to-sumi-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,98,44,0.08)_0%,transparent_60%)]" />

      {/* Flickering lantern glows in corners */}
      <div className="absolute left-[8%] top-[15%] h-40 w-40 rounded-full bg-shu-500/20 blur-3xl animate-lantern-flicker" />
      <div className="absolute right-[10%] top-[20%] h-32 w-32 rounded-full bg-shu-500/15 blur-3xl animate-lantern-flicker" style={{ animationDelay: '1.5s' }} />
      <div className="absolute left-[15%] bottom-[20%] h-36 w-36 rounded-full bg-kin-400/10 blur-3xl animate-lantern-flicker" style={{ animationDelay: '0.8s' }} />

      {/* 3D Scene */}
      <div
        ref={sceneRef}
        className="absolute inset-0 perspective-2000"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        {/* Orbiting sushi pieces */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {orbitPieces.map((p) => {
            const angle = (orbitTick * 0.003) / p.speed * 30 + p.phase;
            const x = Math.cos(angle) * p.radius;
            const y = Math.sin(angle) * p.radius * 0.35;
            const z = Math.sin(angle) * 100;
            const scale = 0.7 + (Math.sin(angle) + 1) * 0.15;
            return (
              <div
                key={p.id}
                className="absolute preserve-3d"
                style={{
                  transform: `translate3d(${x}px, ${y}px, ${z}px) scale(${scale})`,
                  zIndex: Math.round(z + 200),
                  opacity: 0.85,
                }}
              >
                <div className="relative animate-float-gentle" style={{ animationDelay: `${p.phase}s` }}>
                  <img
                    src={p.src}
                    alt={p.label}
                    draggable={false}
                    className="rounded-full object-cover shadow-2xl shadow-black/60 ring-1 ring-white/10"
                    style={{ width: `${p.size}px`, height: `${p.size}px` }}
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/0 to-white/20" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Central 3D sushi piece — drag to rotate */}
        <div
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        >
          <div
            className="preserve-3d transition-transform duration-100"
            style={{ transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)` }}
          >
            {/* Main sushi — salmon nigiri */}
            <div className="relative animate-bob">
              {/* Glow behind */}
              <div className="absolute inset-0 -z-10 scale-150 rounded-full bg-shu-500/15 blur-3xl" />

              {/* The nigiri */}
              <div className="relative h-64 w-64 sm:h-80 sm:w-80">
                <img
                  src="https://images.pexels.com/photos/4725627/pexels-photo-4725627.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Nigiri saumon"
                  draggable={false}
                  className="h-full w-full rounded-3xl object-cover shadow-2xl shadow-black/70 ring-1 ring-white/15"
                />
                {/* Glossy specular sweep */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl">
                  <div className="absolute inset-y-0 -left-full w-1/2 animate-gloss-sweep bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                </div>
                {/* Wet highlight */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-transparent via-transparent to-white/15" />
                {/* Rice texture overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 rounded-b-3xl bg-gradient-to-t from-sumi-100/10 to-transparent" />
              </div>

              {/* Steam wisps */}
              <SteamWisp delay={0} left="30%" />
              <SteamWisp delay={1.5} left="50%" scale={1.2} />
              <SteamWisp delay={2.8} left="65%" scale={0.8} />
            </div>
          </div>
        </div>

        {/* Chopsticks swooping in from the right */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
          <div className="relative animate-fade-in" style={{ animationDelay: '1.2s', opacity: 0 }}>
            {/* Chopstick 1 */}
            <div
              className="absolute h-2 w-72 rounded-full bg-gradient-to-r from-kin-700 via-kin-400 to-kin-300 shadow-lg rotate-[-20deg] origin-right"
              style={{ right: '20px', top: '-8px' }}
            />
            {/* Chopstick 2 */}
            <div
              className="absolute h-2 w-72 rounded-full bg-gradient-to-r from-kin-700 via-kin-400 to-kin-300 shadow-lg rotate-[-15deg] origin-right"
              style={{ right: '20px', top: '4px' }}
            />
          </div>
        </div>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <p className="mb-5 animate-fade-in text-xs uppercase tracking-[0.5em] text-shu-400/90" style={{ animationDelay: '0.3s', opacity: 0 }}>
          Izakaya Japonaise · Berkane
        </p>
        <h1 className="animate-fade-up font-script text-6xl font-bold leading-tight text-sumi-50 sm:text-7xl md:text-8xl" style={{ textShadow: '0 4px 30px rgba(232,98,44,0.3)' }}>
          Sushi
          <span className="block text-shu-500">For You</span>
        </h1>
        <p className="mx-auto mt-7 max-w-2xl animate-fade-up text-base font-light leading-relaxed text-sumi-200 sm:text-lg" style={{ animationDelay: '0.4s', opacity: 0 }}>
          Sushi, sashimi, wok et cuisine fusion — une expérience gastronomique
          où la précision japonaise rencontre les saveurs de l'Asie.
        </p>
        <div className="mt-10 flex animate-fade-up flex-col items-center justify-center gap-4 sm:flex-row" style={{ animationDelay: '0.6s', opacity: 0 }}>
          <a
            href="#menu"
            className="group flex items-center gap-2 rounded-full bg-shu-500 px-8 py-3.5 text-sm font-medium tracking-wide text-white transition-all hover:bg-shu-400 hover:shadow-lg hover:shadow-shu-500/40"
          >
            Voir le menu
            <ChevronDown size={16} className="transition-transform group-hover:translate-y-0.5" />
          </a>
          <a
            href="#reservation"
            className="rounded-full border border-kin-400/50 px-8 py-3.5 text-sm font-light tracking-wide text-kin-200 transition-all hover:border-kin-300 hover:bg-kin-400/10"
          >
            Réserver une table
          </a>
        </div>
      </div>

      {/* Drag hint */}
      <div className="absolute bottom-24 right-8 hidden animate-fade-in text-right text-xs text-sumi-400 lg:block" style={{ animationDelay: '2s', opacity: 0 }}>
        <p className="font-light tracking-wide">Faites glisser pour tourner</p>
        <p className="text-shu-400/60">↻ 360°</p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in" style={{ animationDelay: '1.5s', opacity: 0 }}>
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-sumi-300/30 p-1.5">
          <div className="h-2 w-1 animate-bounce rounded-full bg-shu-400" />
        </div>
      </div>
    </section>
  );
}
