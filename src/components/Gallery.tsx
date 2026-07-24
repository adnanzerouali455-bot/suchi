import { useReveal } from '../hooks/useReveal';

const photos = [
  { src: 'https://images.pexels.com/photos/34690156/pexels-photo-34690156.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Plateau de sushis', span: 'lg:col-span-2 lg:row-span-2' },
  { src: 'https://images.pexels.com/photos/13869899/pexels-photo-13869899.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Création du chef' },
  { src: 'https://images.pexels.com/photos/4725627/pexels-photo-4725627.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Nigiri de saumon' },
  { src: 'https://images.pexels.com/photos/37165674/pexels-photo-37165674.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Wok de nouilles' },
  { src: 'https://images.pexels.com/photos/32393811/pexels-photo-32393811.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Bouchées vapeur' },
  { src: 'https://images.pexels.com/photos/8982387/pexels-photo-8982387.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Soupe miso' },
  { src: 'https://images.pexels.com/photos/19639299/pexels-photo-19639299.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Sashimi' },
  { src: 'https://images.pexels.com/photos/7416286/pexels-photo-7416286.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Salade wakame', span: 'lg:col-span-2' },
];

export default function Gallery() {
  const { ref, visible } = useReveal();

  return (
    <section id="galerie" className="bg-sumi-950 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div ref={ref} className={`reveal mx-auto max-w-2xl text-center ${visible ? 'is-visible' : ''}`}>
          <p className="mb-3 text-xs uppercase tracking-[0.4em] text-kin-300/80">Galerie</p>
          <h2 className="font-serif text-4xl font-light text-sumi-50 sm:text-5xl">
            L'<span className="text-kin-300">ambiance</span> & les plats
          </h2>
          <p className="mt-4 text-sm font-light text-sumi-300">
            Un aperçu de l'expérience Suchi For You — entre assiettes soignées et atmosphère zen.
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

function GalleryItem({ src, alt, span, index }: { src: string; alt: string; span?: string; index: number }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal group relative overflow-hidden rounded-xl ${span ?? ''} ${visible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${(index % 4) * 80}ms` }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-sumi-950/70 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-30" />
      <div className="absolute bottom-0 left-0 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <p className="font-serif text-sm text-sumi-50">{alt}</p>
      </div>
    </div>
  );
}
