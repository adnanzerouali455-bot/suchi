import { MapPin, Phone, Mail, Instagram, Facebook, Clock } from 'lucide-react';

const quickLinks = [
  { href: '#accueil', label: 'Accueil' },
  { href: '#menu', label: 'Menu' },
  { href: '#galerie', label: 'Galerie' },
  { href: '#reservation', label: 'Réservation' },
];

const hours = [
  { day: 'Lundi — Jeudi', time: '12h00 – 23h00' },
  { day: 'Vendredi — Samedi', time: '12h00 – 00h00' },
  { day: 'Dimanche', time: '14h00 – 23h00' },
];

export default function Footer() {
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
                <p className="text-[10px] uppercase tracking-[0.3em] text-shu-400/80">Izakaya Japonaise</p>
              </div>
            </div>
            <p className="mt-5 text-sm font-light leading-relaxed text-sumi-400">
              L'art culinaire asiatique entre tradition et raffinement. Sushi, sashimi,
              wok et cuisine fusion à Berkane.
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
            <h4 className="mb-5 text-xs uppercase tracking-[0.3em] text-shu-400/80">Contact</h4>
            <ul className="space-y-4 text-sm font-light text-sumi-300">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-shu-500" />
                <span>Avenue Mohammed V, Berkane 35000, Maroc</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="shrink-0 text-shu-500" />
                <a href="tel:+212600000000" className="transition-colors hover:text-shu-400">+212 6 00 00 00 00</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="shrink-0 text-shu-500" />
                <a href="mailto:contact@sushiforyou.ma" className="transition-colors hover:text-shu-400">contact@sushiforyou.ma</a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="mb-5 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-shu-400/80">
              <Clock size={12} /> Horaires
            </h4>
            <ul className="space-y-3 text-sm font-light text-sumi-300">
              {hours.map((h) => (
                <li key={h.day} className="flex flex-col">
                  <span className="text-sumi-200">{h.day}</span>
                  <span className="text-sumi-500">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="mb-5 text-xs uppercase tracking-[0.3em] text-shu-400/80">Liens rapides</h4>
            <ul className="space-y-3 text-sm font-light text-sumi-300">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="group inline-flex items-center gap-2 transition-colors hover:text-shu-400">
                    <span className="h-px w-0 bg-shu-500 transition-all duration-300 group-hover:w-4" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="https://wa.me/212600000000"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-green-600 px-5 py-2 text-sm font-medium text-white transition-all hover:bg-green-500"
            >
              Commander sur WhatsApp
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-sumi-800/50 pt-6 sm:flex-row">
          <p className="text-xs font-light text-sumi-500">
            © {new Date().getFullYear()} Sushi For You. Tous droits réservés.
          </p>
          <p className="text-xs font-light text-sumi-500">
            Fait avec passion à Berkane, Maroc
          </p>
        </div>
      </div>
    </footer>
  );
}
