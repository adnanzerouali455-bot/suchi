import { MapPin, Phone, Mail, Instagram, Facebook, Clock } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

const quickLinks = [
  { href: '#accueil', key: 'nav.home' },
  { href: '#menu', key: 'nav.menu' },
  { href: '#galerie', key: 'nav.gallery' },
  { href: '#apropos', key: 'nav.about' },
];

const hours = [
  { key: 'footer.mon-thu', time: '12h00 – 23h00' },
  { key: 'footer.fri-sat', time: '12h00 – 00h00' },
  { key: 'footer.sun', time: '14h00 – 23h00' },
];

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer id="contact" className="relative overflow-hidden bg-sumi-950 pt-20 pb-8">
      <div className="pointer-events-none absolute -left-10 bottom-0 select-none font-serif text-[16rem] leading-none text-sumi-800/30">
        味
      </div>

      {/* Flickering lantern */}
      <div className="pointer-events-none absolute right-[20%] top-10 h-24 w-24 rounded-full bg-shu-500/10 blur-3xl animate-lantern-flicker" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-shu-500/50 bg-sumi-900">
                <span className="font-serif text-xl font-semibold text-shu-400">寿</span>
              </div>
              <div>
                <p className="font-script text-xl font-bold text-sumi-50">Sushi For You</p>
                <p className="text-[10px] uppercase tracking-[0.3em] text-shu-400/80">{t('header.tagline')}</p>
              </div>
            </div>
            <p className="mt-5 text-sm font-light leading-relaxed text-sumi-400">
              {t('footer.desc')}
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-sumi-700/50 text-sumi-300 transition-all hover:border-shu-400/50 hover:text-shu-400"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-sumi-700/50 text-sumi-300 transition-all hover:border-shu-400/50 hover:text-shu-400"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-5 text-xs uppercase tracking-[0.3em] text-shu-400/80">{t('footer.contact')}</h4>
            <ul className="space-y-4 text-sm font-light text-sumi-300">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-shu-500" />
                <span>{t('footer.address')}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="shrink-0 text-shu-500" />
                <a href="tel:+212600000000" className="transition-colors hover:text-shu-400">{t('footer.phone')}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="shrink-0 text-shu-500" />
                <a href="mailto:contact@sushiforyou.ma" className="transition-colors hover:text-shu-400">{t('footer.email')}</a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="mb-5 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-shu-400/80">
              <Clock size={12} /> {t('footer.hours')}
            </h4>
            <ul className="space-y-3 text-sm font-light text-sumi-300">
              {hours.map((h) => (
                <li key={h.key} className="flex flex-col">
                  <span className="text-sumi-200">{t(h.key)}</span>
                  <span className="text-sumi-500">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="mb-5 text-xs uppercase tracking-[0.3em] text-shu-400/80">{t('footer.links')}</h4>
            <ul className="space-y-3 text-sm font-light text-sumi-300">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="group inline-flex items-center gap-2 transition-colors hover:text-shu-400">
                    <span className="h-px w-0 bg-shu-500 transition-all duration-300 group-hover:w-4" />
                    {t(l.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-sumi-800/50 pt-6 sm:flex-row">
          <p className="text-xs font-light text-sumi-500">
            © {new Date().getFullYear()} Sushi For You. {t('footer.rights')}
          </p>
          <p className="text-xs font-light text-sumi-500">
            {t('footer.made')}
          </p>
        </div>
      </div>
    </footer>
  );
}
