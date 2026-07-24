import { useReveal } from '../hooks/useReveal';
import { useI18n } from '../i18n/I18nContext';

const stats = [
  { valueKey: 'about.stat1.value', labelKey: 'about.stat1.label' },
  { valueKey: 'about.stat2.value', labelKey: 'about.stat2.label' },
  { valueKey: 'about.stat3.value', labelKey: 'about.stat3.label' },
];

export default function About() {
  const { t } = useI18n();
  const { ref, visible } = useReveal();

  return (
    <section id="apropos" className="relative overflow-hidden bg-sumi-900 py-24 lg:py-32">
      {/* Decorative kanji */}
      <div className="pointer-events-none absolute -right-10 top-10 select-none font-serif text-[20rem] leading-none text-sumi-800/40">
        和
      </div>

      {/* Floating sushi */}
      <div className="pointer-events-none absolute right-[15%] top-[20%] hidden lg:block">
        <div className="animate-drift">
          <img
            src="https://images.pexels.com/photos/13869890/pexels-photo-13869890.jpeg?auto=compress&cs=tinysrgb&w=200"
            alt=""
            className="h-24 w-24 rounded-full object-cover shadow-2xl ring-1 ring-white/10 animate-glow-pulse"
          />
        </div>
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
              {/* Gloss sweep */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-y-0 -left-full w-1/2 animate-gloss-sweep bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-shu-500/30 bg-sumi-900/90 p-6 backdrop-blur-sm sm:block">
              <p className="font-serif text-3xl text-shu-400">寿司</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-sumi-300">{t('about.kanji')}</p>
            </div>
          </div>

          {/* Text */}
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.4em] text-shu-400/80">{t('about.eyebrow')}</p>
            <h2 className="font-serif text-4xl font-light leading-tight text-sumi-50 sm:text-5xl">
              {t('about.title1')}
              <span className="text-shu-500"> {t('about.title2')}</span>{' '}
              {t('about.title3')}
            </h2>
            <p className="mt-6 text-base font-light leading-relaxed text-sumi-200">
              {t('about.p1')}
            </p>
            <p className="mt-4 text-base font-light leading-relaxed text-sumi-300">
              {t('about.p2')}
            </p>

            <div className="mt-10 grid grid-cols-3 gap-6">
              {stats.map((s) => (
                <div key={s.labelKey} className="border-l border-shu-500/30 pl-4">
                  <p className="font-serif text-3xl text-shu-400">{t(s.valueKey)}</p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-sumi-400">{t(s.labelKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
