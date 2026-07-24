import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type Lang = 'fr' | 'ar';

type Dict = Record<string, { fr: string; ar: string }>;

const dict: Dict = {
  // Header
  'nav.home': { fr: 'Accueil', ar: 'الرئيسية' },
  'nav.menu': { fr: 'Menu', ar: 'القائمة' },
  'nav.gallery': { fr: 'Galerie', ar: 'المعرض' },
  'nav.about': { fr: 'À propos', ar: 'من نحن' },
  'nav.contact': { fr: 'Contact', ar: 'اتصل بنا' },
  'header.tagline': { fr: 'Izakaya Japonaise', ar: 'إيزاكايا يابانية' },

  // Hero
  'hero.location': { fr: 'Izakaya Japonaise · Berkane', ar: 'إيزاكايا يابانية · بركان' },
  'hero.title1': { fr: 'Sushi', ar: 'سوشي' },
  'hero.title2': { fr: 'For You', ar: 'فور يو' },
  'hero.subtitle': {
    fr: 'Sushi, sashimi, wok et cuisine fusion — une expérience gastronomique où la précision japonaise rencontre les saveurs de l\'Asie.',
    ar: 'سوشي، ساشيمي، وكوك ومطبخ فيوجن — تجربة gastronomique حيث يلتقي الدقة اليابانية بنكهات آسيا.',
  },
  'hero.cta.menu': { fr: 'Voir le menu', ar: 'شاهد القائمة' },
  'hero.drag': { fr: 'Faites glisser pour tourner', ar: 'اسحب للتدوير' },
  'hero.drag.hint': { fr: '↻ 360°', ar: '↻ ٣٦٠°' },

  // Sizzle
  'sizzle.phase1': { fr: 'Les baguettes se rapprochent...', ar: 'تقترب العيدان...' },
  'sizzle.phase2': { fr: 'On saisit le nigiri', ar: 'نمسك النيغيري' },
  'sizzle.phase3': { fr: 'Un plongeon dans la sauce soja', ar: 'غمس في صلصة الصويا' },
  'sizzle.phase4': { fr: 'Savourez...', ar: 'استمتع...' },

  // Ingredient assembly
  'assembly.eyebrow': { fr: "L'art du roulé", ar: 'فن اللف' },
  'assembly.title': { fr: 'Chaque ingrédient compte', ar: 'كل مكون يهم' },
  'assembly.subtitle': { fr: 'Faites défiler pour voir le maki se construire pièce par pièce.', ar: 'مرر لأسفل لترى الماكي يُبنى قطعة بقطعة.' },
  'assembly.nori.name': { fr: 'Nori', ar: 'نوري' },
  'assembly.nori.desc': { fr: 'Algue nori grillée', ar: 'طحالب النوري المحمصة' },
  'assembly.rice.name': { fr: 'Riz', ar: 'أرز' },
  'assembly.rice.desc': { fr: 'Riz vinaigré tiède', ar: 'أرز بالخل دافئ' },
  'assembly.wasabi.name': { fr: 'Wasabi', ar: 'واسابي' },
  'assembly.wasabi.desc': { fr: 'Wasabi frais râpé', ar: 'واسابي طازج مبشور' },
  'assembly.salmon.name': { fr: 'Saumon', ar: 'سلمون' },
  'assembly.salmon.desc': { fr: 'Saumon frais tranché', ar: 'سلمون طازج مقطع' },
  'assembly.sesame.name': { fr: 'Sésame', ar: 'سمسم' },
  'assembly.sesame.desc': { fr: 'Graines de sésame torréfiées', ar: 'بذور السمسم المحمصة' },

  // About
  'about.eyebrow': { fr: 'À propos', ar: 'من نحن' },
  'about.title1': { fr: 'Une fusion entre', ar: 'اندماج بين' },
  'about.title2': { fr: 'tradition japonaise', ar: 'التقاليد اليابانية' },
  'about.title3': { fr: 'et saveurs asiatiques', ar: 'والنكهات الآسيوية' },
  'about.p1': {
    fr: 'Chez Sushi For You, chaque plat est une invitation au voyage. Notre chef façonne des sushis avec une précision d\'orfèvre, tandis que le wok chante pour des plats sautés minute. Nous marions l\'élégance japonaise, l\'exubérance thaïlandaise et la richesse de la cuisine asiatique dans une expérience gustative unique à Berkane.',
    ar: 'في سوشي فور يو، كل طبق هو دعوة للسفر. الشيف لدينا يصنع السوشي بدقة الصائغ، بينما يغني الووك للأطباق المقلاة في الحال. نجمع بين أناقة اليابان وحيوية تايلاند وغنى المطبخ الآسيوي في تجربة تذوق فريدة في بركان.',
  },
  'about.p2': {
    fr: 'Des produits frais, sélectionnés chaque matin, pour vous offrir le meilleur de l\'Asie dans une ambiance zen et raffinée.',
    ar: 'منتجات طازجة، تُختار كل صباح، لنقدم لك أفضل ما في آسيا في أجواء زن راقية.',
  },
  'about.stat1.value': { fr: '50+', ar: '+٥٠' },
  'about.stat1.label': { fr: 'Pièces par plateau', ar: 'قطعة لكل طبق' },
  'about.stat2.value': { fr: '100%', ar: '٪١٠٠' },
  'about.stat2.label': { fr: 'Fait maison', ar: 'صناعة منزلية' },
  'about.stat3.value': { fr: '5★', ar: '★٥' },
  'about.stat3.label': { fr: 'Avis clients', ar: 'آراء العملاء' },
  'about.kanji': { fr: 'L\'art du sushi', ar: 'فن السوشي' },

  // Menu
  'menu.eyebrow': { fr: 'Notre Carte', ar: 'قائمتنا' },
  'menu.title': { fr: 'Le Menu', ar: 'القائمة' },
  'menu.subtitle': { fr: 'Explorez nos créations par catégorie — du plateau festif au sashimi le plus pur.', ar: 'استكشف إبداعاتنا حسب الفئة — من الطبق الاحتفالي إلى الساشيمي الأصفى.' },
  'menu.plateaux': { fr: 'Plateaux', ar: 'أطباق' },
  'menu.plateaux.sub': { fr: 'Combos généreux à partager', ar: 'وجبات وفيرة للمشاركة' },
  'menu.wok': { fr: 'Wok', ar: 'ووك' },
  'menu.wok.sub': { fr: 'Sautés minute, feu vif', ar: 'مقلاة سريعة، نار قوية' },
  'menu.entrees': { fr: 'Entrées & Salades', ar: 'المقبلات والسلطات' },
  'menu.entrees.sub': { fr: 'Fraîcheur et légèreté', ar: 'طزاجة وخفة' },
  'menu.tartares': { fr: 'Tartares & Sashimi', ar: 'تارتار وساشيمي' },
  'menu.tartares.sub': { fr: 'Poisson cru, pureté', ar: 'سمك نيء، نقاء' },
  'menu.sushi': { fr: 'Sushi & Rolls', ar: 'سوشي ورولز' },
  'menu.sushi.sub': { fr: "L'art du roulé et du façonné", ar: 'فن اللف والتشكيل' },
  'menu.desserts': { fr: 'Desserts & Boissons', ar: 'الحلويات والمشروبات' },
  'menu.desserts.sub': { fr: 'Sucré, frais & désaltérant', ar: 'حلو، طازج ومرطب' },
  'menu.tag.spicy': { fr: 'Épicé', ar: 'حار' },
  'menu.tag.vegetarian': { fr: 'Végétarien', ar: 'نباتي' },
  'menu.tag.popular': { fr: 'Populaire', ar: 'شائع' },
  'menu.tag.new': { fr: 'Nouveau', ar: 'جديد' },
  'menu.tag.chef': { fr: 'Chef', ar: 'الشيف' },

  // Gallery
  'gallery.eyebrow': { fr: 'Galerie', ar: 'المعرض' },
  'gallery.title': { fr: "L'ambiance & les plats", ar: 'الأجواء والأطباق' },
  'gallery.subtitle': { fr: "Un aperçu de l'expérience Sushi For You — entre assiettes soignées et atmosphère zen.", ar: 'لمحة عن تجربة سوشي فور يو — بين أطباق أنيقة وأجواء زن.' },
  'gallery.plateau': { fr: 'Plateau de sushis', ar: 'طبق سوشي' },
  'gallery.creation': { fr: 'Création du chef', ar: 'إبداع الشيف' },
  'gallery.nigiri': { fr: 'Nigiri de saumon', ar: 'نيغيري سلمون' },
  'gallery.wok': { fr: 'Wok de nouilles', ar: 'ووك نودلز' },
  'gallery.vapeur': { fr: 'Bouchées vapeur', ar: 'قطع البخار' },
  'gallery.soupe': { fr: 'Soupe miso', ar: 'حساء ميسو' },
  'gallery.sashimi': { fr: 'Sashimi', ar: 'ساشيمي' },
  'gallery.wakame': { fr: 'Salade wakame', ar: 'سلطة واكامي' },

  // Footer
  'footer.desc': {
    fr: "L'art culinaire asiatique entre tradition et raffinement. Sushi, sashimi, wok et cuisine fusion à Berkane.",
    ar: 'الفن الطهي الآسيوي بين التقاليد والرقي. سوشي، ساشيمي، ووك ومطبخ فيوجن في بركان.',
  },
  'footer.contact': { fr: 'Contact', ar: 'اتصل بنا' },
  'footer.hours': { fr: 'Horaires', ar: 'ساعات العمل' },
  'footer.links': { fr: 'Liens rapides', ar: 'روابط سريعة' },
  'footer.address': { fr: 'Avenue Mohammed V, Berkane 35000, Maroc', ar: 'شارع محمد الخامس، بركان ٣٥٠٠٠، المغرب' },
  'footer.phone': { fr: '+212 6 00 00 00 00', ar: '+٢١٢ ٦ ٠٠ ٠٠ ٠٠ ٠٠' },
  'footer.email': { fr: 'contact@sushiforyou.ma', ar: 'contact@sushiforyou.ma' },
  'footer.mon-thu': { fr: 'Lundi — Jeudi', ar: 'الإثنين — الخميس' },
  'footer.fri-sat': { fr: 'Vendredi — Samedi', ar: 'الجمعة — السبت' },
  'footer.sun': { fr: 'Dimanche', ar: 'الأحد' },
  'footer.rights': { fr: 'Tous droits réservés.', ar: 'جميع الحقوق محفوظة.' },
  'footer.made': { fr: 'Fait avec passion à Berkane, Maroc', ar: 'صُنع بشغف في بركان، المغرب' },
};

interface I18nContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('fr');

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const t = (key: string) => {
    const entry = dict[key];
    if (!entry) return key;
    return entry[lang];
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t, dir: lang === 'ar' ? 'rtl' : 'ltr' }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
