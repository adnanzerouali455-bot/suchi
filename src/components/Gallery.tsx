import { useRef, useState } from 'react';
import { useReveal } from '../hooks/useReveal';

const photos = [
  { src: 'https://images.pexels.com/photos/34690156/pexels-photo-34690156.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Plateau de sushis', span: 'lg:col-span-2 lg:row-span-2', lantern: true },
  { src: 'https://images.pexels.com/photos/13869899/pexels-photo-13869899.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Création du chef' },
  { src: 'https://images.pexels.com/photos/4725627/pexels-photo-4725627.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Nigiri de saumon' },
  { src: 'https://images.pexels.com/photos/37165674/pexels-photo-37165674.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Wok de nouilles' },
  { src: 'https://images.pexels.com/photos/32393811/pexels-photo-32393811.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Bouchées vapeur' },
  { src: 'https://images.pexels.com/photos/8982387/pexels-photo-8982387.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Soupe miso' },
  { src: 'https://images.pexels.com/photos/19639299/pexels-photo-19639299.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Sashimi' },
  { src: 'https://images.pexels.com/photos/7416286/pexels-photo-7416286.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Salade wakame', span: 'lg:col-span-2' },
];

function GalleryItem({ src, alt, span, index, lantern }: { src: string; alt: string; span?: string; index: number; lantern?: boolean }) {
  const { ref, visible } = useReveal();
  const itemRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const handleMove = (e: React.MouseEvent) => {
    const el = itemRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ rx: -dy * 8, ry: dx * 8 });
  };
  const handleLeave = () => setTilt({ rx: 0, ry: 0 });

  return (
    <div
      ref={ref}
      className={`reveal perspective-1000 ${span ?? ''} ${visible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${(index % 4) * 80}ms` }}
    >
      <div
        ref={itemRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="group relative h-full w-full overflow-hidden rounded-xl preserve-3d"
        style={{ transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` }}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Flickering lantern glow overlay */}
        {lantern && (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(232,98,44,0.25),transparent_50%)] animate-lantern-flicker" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-sumi-950/80 via-sumi-950/20 to-transparent opacity-70 transition-opacity group-hover:opacity-40" />
        <div className="absolute bottom-0 left-0 p-4 opacity-0 transition-all duration-300 group-hover:opacity-100" style={{ transform: 'translateZ(30px)' }}>
          <p className="font-serif text-sm text-sumi-50">{alt}</p>
        </div>
        {/* Gloss sweep */}
        <div className="absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute inset-y-0 -left-full w-1/2 animate-gloss-sweep bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  const { ref, visible } = useReveal();

  return (
    <section id="galerie" className="relative bg-sumi-950 py-24 lg:py-32">
      {/* Hanging lanterns decoration */}
      <div className="pointer-events-none absolute left-[12%] top-0 h-32 w-32 rounded-full bg-shu-500/15 blur-3xl animate-lantern-flicker" />
      <div className="pointer-events-none absolute right-[15%] top-10 h-28 w-28 rounded-full bg-shu-500/12 blur-3xl animate-lantern-flicker" style={{ animationDelay: '1.2s' }} />
      <div className="pointer-events-none absolute left-[40%] top-5 h-24 w-24 rounded-full bg-kin-400/10 blur-3xl animate-lantern-flicker" style={{ animationDelay: '0.6s' }} />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div ref={ref} className={`reveal mx-auto max-w-2xl text-center ${visible ? 'is-visible' : ''}`}>
          <p className="mb-3 text-xs uppercase tracking-[0.4em] text-shu-400/80">Galerie</p>
          <h2 className="font-serif text-4xl font-light text-sumi-50 sm:text-5xl">
            L'<span className="text-shu-500">ambiance</span> & les plats
          </h2>
          <p className="mt-4 text-sm font-light text-sumi-300">
            Un aperçu de l'expérience Sushi For You — entre assiettes soignées et atmosphère zen.
          </p>
        </div>

        <div className="mt-12 grid auto-rows-[200px] grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {photos.map((p, i) => (
            <GalleryItem key={i} {...p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
