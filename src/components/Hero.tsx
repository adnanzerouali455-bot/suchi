import { ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section id="accueil" className="relative flex h-screen min-h-[640px] items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/34690156/pexels-photo-34690156.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Plateau de sushis Suchi For You"
          className="h-full w-full object-cover animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-sumi-950/70 via-sumi-950/50 to-sumi-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-sumi-950/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <p className="mb-5 animate-fade-in text-xs uppercase tracking-[0.5em] text-kin-300/90">
          Restaurant Asiatique · Berkane
        </p>
        <h1 className="animate-fade-up font-serif text-5xl font-light leading-tight text-sumi-50 sm:text-6xl md:text-7xl lg:text-8xl">
          L'art culinaire asiatique
          <span className="block text-kin-300">entre tradition & raffinement</span>
        </h1>
        <p className="mx-auto mt-7 max-w-2xl animate-fade-up text-base font-light leading-relaxed text-sumi-200 sm:text-lg" style={{ animationDelay: '0.2s', opacity: 0 }}>
          Sushi, sashimi, wok et cuisine fusion — une expérience gastronomique
          où la précision japonaise rencontre les saveurs de l'Asie.
        </p>
        <div className="mt-10 flex animate-fade-up flex-col items-center justify-center gap-4 sm:flex-row" style={{ animationDelay: '0.4s', opacity: 0 }}>
          <a
            href="#menu"
            className="group flex items-center gap-2 rounded-full bg-shu-600 px-8 py-3.5 text-sm font-medium tracking-wide text-white transition-all hover:bg-shu-500 hover:shadow-lg hover:shadow-shu-600/30"
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

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in" style={{ animationDelay: '1s', opacity: 0 }}>
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-sumi-300/30 p-1.5">
          <div className="h-2 w-1 animate-bounce rounded-full bg-kin-300" />
        </div>
      </div>
    </section>
  );
}
