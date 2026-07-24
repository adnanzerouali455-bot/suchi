import { useEffect, useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';

const links = [
  { href: '#accueil', label: 'Accueil' },
  { href: '#menu', label: 'Menu' },
  { href: '#galerie', label: 'Galerie' },
  { href: '#reservation', label: 'Réservation' },
  { href: '#contact', label: 'Contact' },
];

function Logo() {
  return (
    <div className="flex items-center gap-3">
      {/* Chopsticks holding a sushi roll logo */}
      <div className="relative flex h-11 w-11 items-center justify-center rounded-full border border-shu-500/50 bg-sumi-900 overflow-hidden">
        {/* Sushi roll (cross-section) */}
        <div className="relative h-6 w-6 rounded-full bg-gradient-to-br from-sumi-100 to-sumi-200 shadow-inner">
          {/* Nori ring */}
          <div className="absolute inset-0 rounded-full ring-2 ring-green-900" />
          {/* Salmon center */}
          <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-shu-400 to-shu-600">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/40 to-transparent" />
          </div>
        </div>
        {/* Chopstick 1 */}
        <div className="absolute h-0.5 w-7 rounded-full bg-gradient-to-r from-kin-600 to-kin-300 rotate-[-25deg] origin-center" style={{ top: '12px', left: '4px' }} />
        {/* Chopstick 2 */}
        <div className="absolute h-0.5 w-7 rounded-full bg-gradient-to-r from-kin-600 to-kin-300 rotate-[-20deg] origin-center" style={{ top: '22px', left: '4px' }} />
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-script text-xl font-bold text-sumi-50">
          Sushi For You
        </span>
        <span className="text-[10px] uppercase tracking-[0.3em] text-shu-400/80">
          Izakaya Japonaise
        </span>
      </div>
    </div>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-sumi-950/95 backdrop-blur-md py-3 shadow-lg shadow-black/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 lg:px-8">
        <a href="#accueil"><Logo /></a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative text-sm font-light tracking-wide text-sumi-100 transition-colors hover:text-shu-400"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-shu-500 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="#reservation"
            className="rounded-full border border-shu-400/50 px-5 py-2 text-sm font-light tracking-wide text-shu-200 transition-all hover:border-shu-300 hover:bg-shu-500/10"
          >
            Réserver
          </a>
          <a
            href="https://wa.me/212600000000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-green-600 px-5 py-2 text-sm font-medium text-white transition-all hover:bg-green-500"
          >
            <Phone size={15} />
            Commander
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center text-sumi-50 lg:hidden"
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden transition-all duration-500 lg:hidden ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="mx-4 mt-3 flex flex-col gap-1 rounded-2xl border border-sumi-700/50 bg-sumi-900/95 p-4 backdrop-blur-md">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-4 py-3 text-sm font-light text-sumi-100 transition-colors hover:bg-sumi-800 hover:text-shu-400"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#reservation"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-lg bg-shu-500 px-4 py-3 text-center text-sm font-medium text-white"
          >
            Réserver une table
          </a>
        </nav>
      </div>
    </header>
  );
}
