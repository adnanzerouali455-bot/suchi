import { useReveal } from '../hooks/useReveal';

const stats = [
  { value: '40+', label: 'Pièces par plateau' },
  { value: '100%', label: 'Fait maison' },
  { value: '5★', label: 'Avis clients' },
];

export default function About() {
  const { ref, visible } = useReveal();

  return (
    <section id="apropos" className="relative overflow-hidden bg-sumi-950 py-24 lg:py-32">
      {/* Decorative kanji */}
      <div className="pointer-events-none absolute -right-10 top-10 select-none font-serif text-[20rem] leading-none text-sumi-800/40">
        和
      </div>

      <div ref={ref} className={`reveal mx-auto max-w-6xl px-6 lg:px-8 ${visible ? 'is-visible' : ''}`}>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src="https://images.pexels.com/photos/13869899/pexels-photo-13869899.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="Chef préparant des sushis"
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sumi-950/60 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-kin-400/30 bg-sumi-900/90 p-6 backdrop-blur-sm sm:block">
              <p className="font-serif text-3xl text-kin-300">寿司</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-sumi-300">L'art du sushi</p>
            </div>
          </div>

          {/* Text */}
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.4em] text-kin-300/80">À propos</p>
            <h2 className="font-serif text-4xl font-light leading-tight text-sumi-50 sm:text-5xl">
              Une fusion entre
              <span className="text-kin-300"> tradition japonaise</span> et
              <span className="text-shu-400"> saveurs asiatiques</span>
            </h2>
            <p className="mt-6 text-base font-light leading-relaxed text-sumi-200">
              Chez Suchi For You, chaque plat est une invitation au voyage. Notre chef
              façonne des sushis avec une précision d'orfèvre, tandis que le wok
              chante pour des plats sautés minute. Nous marions l'élégance japonaise,
              l'exubérance thaïlandaise et la richesse de la cuisine asiatique dans
              une expérience gustative unique à Berkane.
            </p>
            <p className="mt-4 text-base font-light leading-relaxed text-sumi-300">
              Des produits frais, sélectionnés chaque matin, pour vous offrir le
              meilleur de l'Asie dans une ambiance zen et raffinée.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-6">
              {stats.map((s) => (
                <div key={s.label} className="border-l border-kin-400/30 pl-4">
                  <p className="font-serif text-3xl text-kin-300">{s.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-sumi-400">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
