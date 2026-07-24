export type DishTag = 'spicy' | 'vegetarian' | 'popular' | 'new' | 'chef';

export interface Dish {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  image: string;
  tags?: DishTag[];
  ingredients?: string[];
}

export interface MenuCategory {
  id: string;
  label: string;
  subtitle: string;
}

export const categories: MenuCategory[] = [
  { id: 'plateaux', label: 'Plateaux', subtitle: 'Combos généreux à partager' },
  { id: 'wok', label: 'Wok', subtitle: 'Sautés minute, feu vif' },
  { id: 'entrees', label: 'Entrées & Salades', subtitle: 'Fraîcheur et légèreté' },
  { id: 'tartares', label: 'Tartares & Sashimi', subtitle: 'Poisson cru, pureté' },
  { id: 'sushi', label: 'Sushi & Rolls', subtitle: "L'art du roulé et du façonné" },
  { id: 'desserts', label: 'Desserts & Boissons', subtitle: 'Sucré, frais & désaltérant' },
];

const img = (id: string) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop`;

export const dishes: Dish[] = [
  // ── Assortiments (Plateaux) ──
  { id: 'assortiment-a', name: 'Assortiment A', description: '14 pièces — découverte', price: 140, category: 'plateaux', image: img('4725578'), tags: ['popular'], ingredients: ['Roll for you (4 pcs)', 'Fry Ebi Fry (4 pcs)', 'Shaké roll (4 pcs)', 'Nigiri saumon (1 pc)', 'Nigiri crevette (1 pc)'] },
  { id: 'assortiment-b', name: 'Assortiment B', description: '24 pièces — équilibré', price: 235, category: 'plateaux', image: img('6531075'), ingredients: ['Nordic saumon (4 pcs)', 'Ebi tobico (4 pcs)', 'Maki saumon (6 pcs)', 'Fry Ebi Fry (4 pcs)', 'Golden eye (4 pcs)', 'Nigiri mi-cuit (1 pc)', 'Nigiri crevette (1 pc)'] },
  { id: 'assortiment-c', name: 'Assortiment C', description: '32 pièces — généreux', price: 315, category: 'plateaux', image: img('34303198'), ingredients: ['Avocado roll (4 pcs)', 'Yellow roll (4 pcs)', 'Aromaki crevette (6 pcs)', 'Maki avocat (6 pcs)', 'Nigiri crevette (2 pcs)', 'Nigiri saumon (2 pcs)', 'Roll for you (4 pcs)', 'Crunchy mango (4 pcs)'] },
  { id: 'assortiment-d', name: 'Assortiment D', description: '40 pièces — festif', price: 375, category: 'plateaux', image: img('34690156'), tags: ['popular'], ingredients: ['Aromaki pané (6 pcs)', 'Coco roll (6 pcs)', 'Fry Ebi Fry (4 pcs)', 'Crunchy mango (4 pcs)', 'California saumon cuit (4 pcs)', 'California thon cuit (4 pcs)', 'Crunchy crevette (4 pcs)', 'Crispy Roll (5 pcs)', 'Ebi fry (4 pcs)'] },
  { id: 'assortiment-e', name: 'Assortiment E', description: '40 pièces — premium', price: 390, category: 'plateaux', image: img('35543382'), ingredients: ['Naha Roll (8 pcs)', 'Nordic saumon (4 pcs)', 'Futomaki saumon (4 pcs)', 'Ebi tobico (4 pcs)', 'Roll for you (4 pcs)', 'Aromaki pané (6 pcs)', 'Gunkan crabe (2 pcs)', 'Nigiri saumon (2 pcs)', 'Nigiri crevette (2 pcs)', 'Sashimi saumon (4 pcs)'] },
  { id: 'assortiment-f', name: 'Assortiment F', description: '50 pièces — grand festin', price: 485, category: 'plateaux', image: img('29161607'), tags: ['popular'], ingredients: ['California crabe (4 pcs)', 'California cream cheese (4 pcs)', 'Boston roll (4 pcs)', 'Nigiri saumon (1 pc)', 'Nigiri thon (1 pc)', 'Nordic saumon (4 pcs)', 'Crunchy crevette (4 pcs)', 'Sunshine roll (8 pcs)', 'Coco roll (4 pcs)', 'Maki saumon (6 pcs)', 'Avocado roll (4 pcs)', 'Aromaki saumon (6 pcs)'] },
  { id: 'menu-kids', name: 'Menu Kids', description: 'Portion enfant — california rolls, nuggets et frites', price: 69, category: 'plateaux', image: img('28525152') },

  // ── Wok ──
  { id: 'wok-legumes-riz', name: 'Légumes & Riz', description: 'Riz sauté au wok avec légumes croquants', price: 65, category: 'wok', image: img('32845321'), tags: ['vegetarian'] },
  { id: 'wok-vermicelles', name: 'Vermicelles Sautées', description: 'Nouilles de riz sautées au wok — au choix: poulet, bœuf, fruits de mer, gambas, calamar, végétarien', price: 75, category: 'wok', image: img('15797948') },
  { id: 'wok-nouilles', name: 'Nouilles Sautées', description: 'Nouilles chinoises sautées — au choix: poulet, bœuf, fruits de mer, gambas, calamar, végétarien', price: 75, category: 'wok', image: img('37165674'), tags: ['popular'] },

  // ── Entrées & Salades ──
  { id: 'nems', name: 'Nems', description: 'Rouleaux de printemps frits, sauce nuoc-mâm', price: 35, category: 'entrees', image: img('840216'), tags: ['popular'] },
  { id: 'bouchees-vapeur', name: 'Bouchées Vapeur', description: 'Dim sum vapeur au porc et crevettes', price: 45, category: 'entrees', image: img('32393811') },
  { id: 'fresh-spring-roll', name: 'Fresh Spring Roll', description: 'Rouleaux de printemps frais, crevettes et légumes', price: 40, category: 'entrees', image: img('6832048'), tags: ['vegetarian'] },
  { id: 'croquettes', name: 'Croquettes', description: 'Croquettes de crevettes panées, sauce tonkatsu', price: 42, category: 'entrees', image: img('5639754') },
  { id: 'soupes', name: 'Soupes', description: 'Soupe miso ou bouillon pho aux choix', price: 30, category: 'entrees', image: img('8982387') },
  { id: 'salade-yam-kai', name: 'Salade Yam Kai', description: 'Salade thaï au bœuf, citronnelle et herbes fraîches', price: 55, category: 'entrees', image: img('35215472'), tags: ['spicy'] },
  { id: 'salade-wakame', name: 'Salade Wakame', description: 'Algues wakame, sésame, sauce ponzu', price: 45, category: 'entrees', image: img('7416286'), tags: ['vegetarian'] },

  // ── Tartares, Chirashi & Sashimi ──
  { id: 'tartare-saumon', name: 'Tartare de Saumon', description: 'Saumon cru mariné, avocat, sésame', price: 85, category: 'tartares', image: img('10296423'), tags: ['popular'] },
  { id: 'tartare-thon', name: 'Tartare de Thon', description: 'Thon rouge mariné, oignon, soja', price: 90, category: 'tartares', image: img('30153905') },
  { id: 'tartare-crevettes', name: 'Tartare de Crevettes', description: 'Crevettes crues, mangue, ciboulette', price: 80, category: 'tartares', image: img('24289165') },
  { id: 'chirashi', name: 'Chirashi', description: 'Bol de riz vinaigré garni de sashimi assortis', price: 110, category: 'tartares', image: img('37058820'), tags: ['popular'] },
  { id: 'sashimi', name: 'Sashimi', description: 'Fines tranches de poisson cru — saumon, thon, ou assortiment', price: 120, category: 'tartares', image: img('19639299'), tags: ['chef'] },

  // ── Sushi, Maki, California & Rolls ──
  { id: 'nigiri', name: 'Nigiri', description: 'Boule de riz garnie d\'une tranche de poisson', price: 18, category: 'sushi', image: img('4725627'), tags: ['popular'] },
  { id: 'futomaki', name: 'Futomaki', description: 'Grand maki roulé, garniture généreuse', price: 35, category: 'sushi', image: img('6531075') },
  { id: 'gunkan', name: 'Gunkan', description: 'Maki en forme de navire, garniture de poisson ou œufs', price: 25, category: 'sushi', image: img('20844820') },
  { id: 'temaki', name: 'Temaki', description: 'Cône d\'algue garni, à déguster des mains', price: 30, category: 'sushi', image: img('13869890') },
  { id: 'maki', name: 'Maki', description: 'Rouleaux classiques au saumon, thon ou concombre', price: 20, category: 'sushi', image: img('5208237') },
  { id: 'california', name: 'California Rolls', description: 'Riz à l\'extérieur, surimi, avocat, sésame', price: 28, category: 'sushi', image: img('4725578'), tags: ['popular'] },
  { id: 'aromaki', name: 'Aromaki', description: 'Maki aromatisé, créations parfumées du chef', price: 32, category: 'sushi', image: img('34303198'), tags: ['chef'] },
  { id: 'nordic', name: 'Nordic', description: 'Roll au saumon fumé et fromage frais', price: 35, category: 'sushi', image: img('34303194') },
  { id: 'fry-crunchy', name: 'Fry & Crunchy Rolls', description: 'Rouleaux frits et croustillants, sauce dynamite', price: 38, category: 'sushi', image: img('30776222'), tags: ['spicy'] },
  { id: 'creations-foryou', name: 'Créations "For You"', description: 'Spécialités signature de la maison', price: 45, category: 'sushi', image: img('13869899'), tags: ['chef', 'new'] },

  // ── Desserts ──
  { id: 'banoffee', name: 'Banoffee Pie', description: 'Tarte banane, caramel et chantilly', price: 20, category: 'desserts', image: img('9501718') },
  { id: 'cheesecake', name: 'Cheesecake + Glace', description: 'Cheesecake crémeux servi avec une boule de glace', price: 40, category: 'desserts', image: img('18416957'), tags: ['popular'] },
  { id: 'tiramisu', name: 'Tiramisu Classique', description: 'Tiramisu au café et mascarpone', price: 25, category: 'desserts', image: img('27305273') },

  // ── Cocktails & Jus Frais ──
  { id: 'virgin-mojito', name: 'Virgin Mojito / Bora Bora / Milkshake', description: 'Cocktails sans alcool au choix', price: 35, category: 'desserts', image: img('10153721'), tags: ['popular'] },
  { id: 'jus-orange', name: 'Jus d\'Orange', description: 'Jus d\'orange frais pressé', price: 20, category: 'desserts', image: img('1337824'), tags: ['vegetarian'] },
  { id: 'jus-citron', name: 'Jus de Citron', description: 'Nature, Menthe ou Gingembre', price: 25, category: 'desserts', image: img('9610828'), tags: ['vegetarian'] },
  { id: 'jus-mangue', name: 'Jus de Mangue', description: 'Jus de mangue frais', price: 30, category: 'desserts', image: img('1337825'), tags: ['vegetarian'] },

  // ── Softs ──
  { id: 'soda-oulmes', name: 'Soda / Oulmes 0.5L', description: 'Sodas au choix, bouteille 0.5L', price: 10, category: 'desserts', image: img('4113661') },
  { id: 'oasis', name: 'Oasis', description: 'Boisson aux fruits', price: 20, category: 'desserts', image: img('2983100') },
  { id: 'sidi-ali-05', name: 'Sidi Ali 0.5L', description: 'Eau minérale naturelle', price: 5, category: 'desserts', image: img('327090'), tags: ['vegetarian'] },
  { id: 'sidi-ali-1l', name: 'Sidi Ali 1L', description: 'Eau minérale naturelle, grand format', price: 10, category: 'desserts', image: img('327090'), tags: ['vegetarian'] },
];
