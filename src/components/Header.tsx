import { useEffect, useState } from 'react';
import { Menu, X, Languages } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

const links = [
  { href: '#accueil', key: 'nav.home' },
  { href: '#menu', key: 'nav.menu' },
  { href: '#galerie', key: 'nav.gallery' },
  { href: '#apropos', key: 'nav.about' },
  { href: '#contact', key: 'nav.contact' },
];

function Logo() {
  const { t } = useI18n();
  return (
    <div className="flex items-center gap-3">
      {/* Chopsticks holding a sushi roll logo */}
      <div className="relative flex h-11 w-11 items-center justify-center rounded-full border border-shu-500/50 bg-sumi-900 overflow-hidden">
        {/* Sushi roll (cross-section) */}
        <div className="relative h-6 w-6 rounded-full bg-gradient-to-br from-sumi-100 to-sumi-200 shadow-inner">
          <div className="absolute inset-0 rounded-full ring-2 ring-green-900" />
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
          {t('header.tagline')}
        </span>
      </div>
    </div>
  );
}

export default function Header() {
  const { lang, setLang, t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleLang = () => setLang(lang === 'fr' ? 'ar' : 'fr');

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
              {t(l.key)}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-shu-500 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Language toggle + mobile toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleLang}
            className="flex items-center gap-2 rounded-full border border-kin-400/40 px-4 py-2 text-sm font-light tracking-wide text-kin-200 transition-all hover:border-kin-300 hover:bg-kin-400/10"
            aria-label="Switch language"
          >
            <Languages size={16} />
            {lang === 'fr' ? 'العربية' : 'Français'}
          </button>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 items-center justify-center text-sumi-50 lg:hidden"
            aria-label="Menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
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
              {t(l.key)}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
