import { useMemo, useState } from 'react';
import { Flame, Leaf, Star, Sparkles, ChefHat } from 'lucide-react';
import { categories, dishes, type Dish, type DishTag } from '../data/menu';
import { useReveal } from '../hooks/useReveal';

const tagConfig: Record<DishTag, { icon: typeof Flame; label: string; class: string }> = {
  spicy: { icon: Flame, label: 'Épicé', class: 'text-shu-400 bg-shu-950/60 border-shu-700/40' },
  vegetarian: { icon: Leaf, label: 'Végétarien', class: 'text-green-400 bg-green-950/40 border-green-800/40' },
  popular: { icon: Star, label: 'Populaire', class: 'text-kin-300 bg-kin-950/50 border-kin-700/40' },
  new: { icon: Sparkles, label: 'Nouveau', class: 'text-blue-300 bg-blue-950/40 border-blue-800/40' },
  chef: { icon: ChefHat, label: 'Chef', class: 'text-purple-300 bg-purple-950/40 border-purple-800/40' },
};

function DishCard({ dish, index }: { dish: Dish; index: number }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal group relative overflow-hidden rounded-2xl border border-sumi-700/40 bg-sumi-900/60 transition-all duration-500 hover:border-kin-400/40 hover:shadow-xl hover:shadow-black/40 ${visible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${(index % 3) * 80}ms` }}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={dish.image}
          alt={dish.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-sumi-950 via-sumi-950/20 to-transparent" />
        {/* Tags */}
        {dish.tags && dish.tags.length > 0 && (
          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            {dish.tags.map((t) => {
              const cfg = tagConfig[t];
              const Icon = cfg.icon;
              return (
                <span
                  key={t}
                  className={`flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium backdrop-blur-sm ${cfg.class}`}
                >
                  <Icon size={10} />
                  {cfg.label}
                </span>
              );
            })}
          </div>
        )}
        {/* Price badge */}
        <div className="absolute bottom-3 right-3 rounded-full bg-kin-400/90 px-3 py-1 font-serif text-sm font-semibold text-sumi-950">
          {dish.price} DH
        </div>
      </div>
      {/* Text */}
      <div className="p-4">
        <h3 className="font-serif text-lg font-medium text-sumi-50 transition-colors group-hover:text-kin-300">
          {dish.name}
        </h3>
        {dish.description && (
          <p className="mt-1.5 text-xs font-light leading-relaxed text-sumi-400">
            {dish.description}
          </p>
        )}
        {dish.ingredients && dish.ingredients.length > 0 && (
          <ul className="mt-3 space-y-1 border-t border-sumi-700/40 pt-3">
            {dish.ingredients.map((ing, idx) => (
              <li key={idx} className="flex items-start gap-2 text-[11px] font-light text-sumi-300">
                <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-kin-400" />
                {ing}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function MenuSection() {
  const [active, setActive] = useState(categories[0].id);
  const { ref, visible } = useReveal();

  const filtered = useMemo(
    () => dishes.filter((d) => d.category === active),
    [active],
  );

  const currentCat = categories.find((c) => c.id === active)!;

  return (
    <section id="menu" className="relative bg-sumi-900 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div ref={ref} className={`reveal mx-auto max-w-2xl text-center ${visible ? 'is-visible' : ''}`}>
          <p className="mb-3 text-xs uppercase tracking-[0.4em] text-kin-300/80">Notre Carte</p>
          <h2 className="font-serif text-4xl font-light text-sumi-50 sm:text-5xl">
            Le <span className="text-kin-300">Menu</span>
          </h2>
          <p className="mt-4 text-sm font-light text-sumi-300">
            Explorez nos créations par catégorie — du plateau festif au sashimi le plus pur.
          </p>
        </div>

        {/* Category tabs */}
        <div className="mt-12 flex flex-wrap justify-center gap-2 sm:gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`rounded-full px-5 py-2.5 text-sm font-light tracking-wide transition-all duration-300 ${
                active === cat.id
                  ? 'bg-shu-600 text-white shadow-lg shadow-shu-600/20'
                  : 'border border-sumi-700/50 text-sumi-300 hover:border-kin-400/50 hover:text-kin-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Subtitle */}
        <p className="mt-6 text-center text-xs uppercase tracking-[0.3em] text-sumi-500">
          {currentCat.subtitle}
        </p>

        {/* Dishes grid */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((dish, i) => (
            <DishCard key={dish.id} dish={dish} index={i} />
          ))}
        </div>

        {/* WhatsApp order CTA */}
        <div className="mt-16 text-center">
          <p className="text-sm font-light text-sumi-300">
            Envie de commander ? Passez directement par WhatsApp.
          </p>
          <a
            href="https://wa.me/212600000000"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-green-600 px-7 py-3 text-sm font-medium text-white transition-all hover:bg-green-500 hover:shadow-lg hover:shadow-green-600/30"
          >
            Commander sur WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
