/**
 * Everyday Indian Household Pantry Database
 * Organizes basic Indian home ingredients into intuitive, everyday clusters:
 * Dairy, Vegetables, Non-Veg & Eggs, Cereals & Pulses, Spices & Condiments, Fruits & Sweeteners, Extras.
 * Designed with simple, catchy language without academic jargon.
 */

export interface PantryItem {
  id: string;
  name: string;
  hindiName: string;
  category: 'dairy' | 'vegetables' | 'non_veg' | 'cereals_pulses' | 'spices_condiments' | 'fruits_sweeteners' | 'extras';
  subCategory?: string;
  commonInHomes: boolean;
  flavorNotes: string;
  quickTip: string;
}

export interface PantryCluster {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  items: PantryItem[];
}

export const PANTRY_CLUSTERS: PantryCluster[] = [
  {
    id: 'dairy',
    name: 'Dairy & Milk',
    emoji: '🥛',
    tagline: 'Fresh, rich & cooling staples',
    items: [
      {
        id: 'paneer',
        name: 'Paneer',
        hindiName: 'पनीर',
        category: 'dairy',
        commonInHomes: true,
        flavorNotes: 'Mild, milky & spongy',
        quickTip: 'Soak fried cubes in warm water for 5 mins to keep them pillow-soft.'
      },
      {
        id: 'curd',
        name: 'Curd / Yogurt',
        hindiName: 'दही',
        category: 'dairy',
        commonInHomes: true,
        flavorNotes: 'Tangy, creamy & cooling',
        quickTip: 'Whisk well before adding to hot gravies so it never splits.'
      },
      {
        id: 'desi_ghee',
        name: 'Desi Ghee',
        hindiName: 'देसी घी',
        category: 'dairy',
        commonInHomes: true,
        flavorNotes: 'Nutty, golden & aromatic',
        quickTip: 'A single spoonful on hot dal or parathas elevates everything.'
      },
      {
        id: 'milk',
        name: 'Milk',
        hindiName: 'दूध',
        category: 'dairy',
        commonInHomes: true,
        flavorNotes: 'Sweet & creamy foundation',
        quickTip: 'Simmer on low with crushed cardamom and ginger for instant chai bliss.'
      },
      {
        id: 'butter',
        name: 'Butter / White Butter',
        hindiName: 'मक्खन',
        category: 'dairy',
        commonInHomes: true,
        flavorNotes: 'Melting, rich & savory',
        quickTip: 'Add a dollop on hot stuffed paratha right off the tawa.'
      },
      {
        id: 'malai',
        name: 'Fresh Cream / Malai',
        hindiName: 'मलाई',
        category: 'dairy',
        commonInHomes: false,
        flavorNotes: 'Velvety & luxurious',
        quickTip: 'Whisk homemade boiled milk skin for natural restaurant-style gravy.'
      }
    ]
  },
  {
    id: 'vegetables',
    name: 'Everyday Veggies & Greens',
    emoji: '🥔',
    tagline: 'The daily kitchen workhorses',
    items: [
      {
        id: 'potatoes',
        name: 'Potatoes (Aloo)',
        hindiName: 'आलू',
        category: 'vegetables',
        commonInHomes: true,
        flavorNotes: 'Comforting, hearty & flavor sponge',
        quickTip: 'Boil with skins on and steam dry before mashing for crispy parathas.'
      },
      {
        id: 'onions',
        name: 'Onions (Pyaz)',
        hindiName: 'प्याज़',
        category: 'vegetables',
        commonInHomes: true,
        flavorNotes: 'Sweet when browned, sharp when raw',
        quickTip: 'Slow golden sautéing (bhunao) builds the backbone of every Indian curry.'
      },
      {
        id: 'tomatoes',
        name: 'Tomatoes (Tamatar)',
        hindiName: 'टमाटर',
        category: 'vegetables',
        commonInHomes: true,
        flavorNotes: 'Juicy, tangy & naturally savory',
        quickTip: 'Cook until oil separates on the sides to remove raw acidic sharpness.'
      },
      {
        id: 'ginger',
        name: 'Ginger (Adrak)',
        hindiName: 'अदरक',
        category: 'vegetables',
        commonInHomes: true,
        flavorNotes: 'Zesty, warming & brisk',
        quickTip: 'Crush fresh in mortar and pestle for 3x more flavor than store-bought paste.'
      },
      {
        id: 'garlic',
        name: 'Garlic (Lehsun)',
        hindiName: 'लहसुन',
        category: 'vegetables',
        commonInHomes: true,
        flavorNotes: 'Pungent & savory magic',
        quickTip: 'Fry in hot ghee for 15 seconds until light golden for unforgettable dal tadka.'
      },
      {
        id: 'green_chilies',
        name: 'Green Chilies (Hari Mirch)',
        hindiName: 'हरी मिर्च',
        category: 'vegetables',
        commonInHomes: true,
        flavorNotes: 'Crisp, fiery & fresh heat',
        quickTip: 'Slit lengthwise so you get fresh chili perfume without blazing heat.'
      },
      {
        id: 'coriander',
        name: 'Fresh Coriander (Dhania)',
        hindiName: 'हरा धनिया',
        category: 'vegetables',
        commonInHomes: true,
        flavorNotes: 'Crisp citrusy herbal splash',
        quickTip: 'Chop the tender stems too! They hold twice the aroma of the leaves.'
      },
      {
        id: 'green_peas',
        name: 'Green Peas (Matar)',
        hindiName: 'मटर',
        category: 'vegetables',
        commonInHomes: true,
        flavorNotes: 'Sweet, juicy & tender pop',
        quickTip: 'Pairs effortlessly with aloo, paneer, or tossed with jeera rice.'
      },
      {
        id: 'spinach',
        name: 'Spinach (Palak)',
        hindiName: 'पालक',
        category: 'vegetables',
        commonInHomes: true,
        flavorNotes: 'Earthy, lush & nutrient-packed',
        quickTip: 'Blanch in boiling water for 90 seconds then ice bath to lock vibrant emerald green.'
      }
    ]
  },
  {
    id: 'non_veg',
    name: 'Eggs & Non-Veg',
    emoji: '🍗',
    tagline: 'Wholesome protein favorites',
    items: [
      {
        id: 'eggs',
        name: 'Eggs (Anda)',
        hindiName: 'अंडे',
        category: 'non_veg',
        commonInHomes: true,
        flavorNotes: 'Custardy, rich & comforting',
        quickTip: 'Whip eggs with chopped onions, green chili and pinch of pav bhaji masala for iconic bhurji.'
      },
      {
        id: 'chicken',
        name: 'Chicken',
        hindiName: 'चिकन',
        category: 'non_veg',
        commonInHomes: true,
        flavorNotes: 'Juicy, savory & absorbs spices deeply',
        quickTip: 'Marinate 15 minutes with curd, turmeric and ginger garlic for super tender bites.'
      },
      {
        id: 'mutton',
        name: 'Mutton / Lamb',
        hindiName: 'मटन',
        category: 'non_veg',
        commonInHomes: false,
        flavorNotes: 'Deep, rich & gamey umami',
        quickTip: 'Slow pressure-cook with mustard oil, cloves, and whole black cardamom.'
      },
      {
        id: 'fish',
        name: 'Fish / Prawns',
        hindiName: 'मछली / झींगा',
        category: 'non_veg',
        commonInHomes: false,
        flavorNotes: 'Delicate, sweet & coastal fresh',
        quickTip: 'Simmer gently for only 5-7 minutes at the end of the curry so it stays flaky.'
      }
    ]
  },
  {
    id: 'cereals_pulses',
    name: 'Flours, Rice & Dals',
    emoji: '🌾',
    tagline: 'The heart & soul of Indian meals',
    items: [
      {
        id: 'atta',
        name: 'Atta (Whole Wheat Flour)',
        hindiName: 'गेहूँ का आटा',
        category: 'cereals_pulses',
        commonInHomes: true,
        flavorNotes: 'Nutty, wholesome & earthy',
        quickTip: 'Rest kneaded dough for 15 minutes under a damp cloth for pillow-soft rotis.'
      },
      {
        id: 'basmati_rice',
        name: 'Basmati Rice',
        hindiName: 'बासमती चावल',
        category: 'cereals_pulses',
        commonInHomes: true,
        flavorNotes: 'Floral, sweet & long aromatic grains',
        quickTip: 'Soak for 20 minutes before boiling; grains cook up twice as long and fluffy.'
      },
      {
        id: 'toor_dal',
        name: 'Toor Dal (Yellow Pigeon Peas)',
        hindiName: 'अरहर / तूर दाल',
        category: 'cereals_pulses',
        commonInHomes: true,
        flavorNotes: 'Earthy, comforting & classic',
        quickTip: 'The base for everyday Dal Tadka and South Indian Sambar.'
      },
      {
        id: 'moong_dal',
        name: 'Moong Dal (Yellow Moong)',
        hindiName: 'पीली मूंग दाल',
        category: 'cereals_pulses',
        commonInHomes: true,
        flavorNotes: 'Light, sweet & gentle on stomach',
        quickTip: 'Cooks in 15 minutes without soaking; ideal for comforting Khichdi.'
      },
      {
        id: 'chana_dal',
        name: 'Chana / Chickpeas (Kabuli / Kala)',
        hindiName: 'चना / छोले',
        category: 'cereals_pulses',
        commonInHomes: true,
        flavorNotes: 'Nutty, dense & deeply satisfying',
        quickTip: 'Boil with a tea bag or amchur to give street-style dark color and tang.'
      },
      {
        id: 'urad_dal',
        name: 'Urad Dal (Black Gram)',
        hindiName: 'उड़द दाल',
        category: 'cereals_pulses',
        commonInHomes: true,
        flavorNotes: 'Creamy, earthy & rich',
        quickTip: 'Simmered slow with butter and kasuri methi for world-famous Dal Makhani.'
      },
      {
        id: 'poha',
        name: 'Poha (Flattened Rice)',
        hindiName: 'पोहा',
        category: 'cereals_pulses',
        commonInHomes: true,
        flavorNotes: 'Light, chewy & takes flavors quickly',
        quickTip: 'Rinse in colander for just 30 seconds; don’t soak or it turns mushy.'
      },
      {
        id: 'suji',
        name: 'Suji / Rava (Semolina)',
        hindiName: 'सूजी / रवा',
        category: 'cereals_pulses',
        commonInHomes: true,
        flavorNotes: 'Grainy, toasted & versatile',
        quickTip: 'Dry roast for 3 mins before making Upma or sweet Halwa.'
      }
    ]
  },
  {
    id: 'spices_condiments',
    name: 'Spices & Seasonings',
    emoji: '🌿',
    tagline: 'A pinch of everyday magic',
    items: [
      {
        id: 'cumin',
        name: 'Cumin (Jeera)',
        hindiName: 'जीरा',
        category: 'spices_condiments',
        commonInHomes: true,
        flavorNotes: 'Warm, nutty & toasted aroma',
        quickTip: 'Drop in hot ghee; wait for it to dance and pop before adding veggies.'
      },
      {
        id: 'turmeric',
        name: 'Turmeric (Haldi)',
        hindiName: 'हल्दी',
        category: 'spices_condiments',
        commonInHomes: true,
        flavorNotes: 'Golden, earthy & gentle warmth',
        quickTip: 'Bloom in hot oil with aromatics so its natural fat-soluble colors activate.'
      },
      {
        id: 'mustard_seeds',
        name: 'Mustard Seeds (Rai)',
        hindiName: 'राई / सरसों',
        category: 'spices_condiments',
        commonInHomes: true,
        flavorNotes: 'Sharp, nutty & crackling pop',
        quickTip: 'Must crackle in hot oil to unlock that iconic South Indian tempering flavor.'
      },
      {
        id: 'garam_masala',
        name: 'Garam Masala',
        hindiName: 'गरम मसाला',
        category: 'spices_condiments',
        commonInHomes: true,
        flavorNotes: 'Warm sweet spice blend (cinnamon, cloves, cardamom)',
        quickTip: 'Sprinkle 1/2 tsp at the very end of cooking and cover pot to lock in perfume.'
      },
      {
        id: 'kasuri_methi',
        name: 'Kasuri Methi (Dried Fenugreek)',
        hindiName: 'कसूरी मेथी',
        category: 'spices_condiments',
        commonInHomes: true,
        flavorNotes: 'Toasted maple & restaurant aroma',
        quickTip: 'Rub between your palms to crush before sprinkling over curries or dals.'
      },
      {
        id: 'hing',
        name: 'Hing (Asafetida)',
        hindiName: 'हींग',
        category: 'spices_condiments',
        commonInHomes: true,
        flavorNotes: 'Savory, allium & digestive comfort',
        quickTip: 'A tiny pinch in hot oil delivers deep onion-garlic depth to simple dals.'
      },
      {
        id: 'kashmiri_chili',
        name: 'Kashmiri Red Chili Powder',
        hindiName: 'कश्मीरी लाल मिर्च',
        category: 'spices_condiments',
        commonInHomes: true,
        flavorNotes: 'Mild warmth & gorgeous ruby red color',
        quickTip: 'Add to hot oil off the flame to get glowing red restaurant color without burning.'
      },
      {
        id: 'coriander_powder',
        name: 'Coriander Powder (Dhania Powder)',
        hindiName: 'धनिया पाउडर',
        category: 'spices_condiments',
        commonInHomes: true,
        flavorNotes: 'Mild, citrusy & thickens gravies',
        quickTip: 'Gives homestyle curries their comforting body and balance.'
      },
      {
        id: 'amchur',
        name: 'Amchur (Dry Mango Powder)',
        hindiName: 'आमचूर',
        category: 'spices_condiments',
        commonInHomes: true,
        flavorNotes: 'Dry fruity tang without extra liquid',
        quickTip: 'The secret ingredient in aloo paratha stuffing and street chaats.'
      },
      {
        id: 'black_pepper',
        name: 'Black Pepper (Kali Mirch)',
        hindiName: 'काली मिर्च',
        category: 'spices_condiments',
        commonInHomes: true,
        flavorNotes: 'Woody, sharp & throat-warming heat',
        quickTip: 'Freshly cracked black pepper in ghee gives Chettinad and egg dishes pure magic.'
      }
    ]
  },
  {
    id: 'fruits_sweeteners',
    name: 'Fruits & Sweeteners',
    emoji: '🍋',
    tagline: 'Bright sour & sweet balance',
    items: [
      {
        id: 'lemon',
        name: 'Lemon (Nimbu)',
        hindiName: 'नींबू',
        category: 'fruits_sweeteners',
        commonInHomes: true,
        flavorNotes: 'Bright sunshine acidity',
        quickTip: 'Always squeeze off the heat right before eating to preserve fresh vitamin zing.'
      },
      {
        id: 'jaggery',
        name: 'Jaggery (Gur)',
        hindiName: 'गुड़',
        category: 'fruits_sweeteners',
        commonInHomes: true,
        flavorNotes: 'Earthy, caramel & unrefined sweetness',
        quickTip: 'A tiny pebble of gur in spicy curries balances sharp chilies and sour tamarind.'
      },
      {
        id: 'coconut',
        name: 'Fresh / Grated Coconut',
        hindiName: 'ताज़ा नारियल',
        category: 'fruits_sweeteners',
        commonInHomes: true,
        flavorNotes: 'Creamy, nutty & sweet coastal flavor',
        quickTip: 'Grind with green chilies and roasted chana dal for the ultimate 2-min chutney.'
      }
    ]
  },
  {
    id: 'extras',
    name: 'Pantry Extras & Oils',
    emoji: '✨',
    tagline: 'Everyday companions',
    items: [
      {
        id: 'chai_patti',
        name: 'Tea Leaves (Chai Patti)',
        hindiName: 'चाय पत्ती',
        category: 'extras',
        commonInHomes: true,
        flavorNotes: 'Robust, malty & energizing',
        quickTip: 'Boil water with ginger and cardamom first, then add tea leaves and milk.'
      },
      {
        id: 'mustard_oil',
        name: 'Mustard Oil (Sarson Ka Tel)',
        hindiName: 'सरसों का तेल',
        category: 'extras',
        commonInHomes: true,
        flavorNotes: 'Pungent, smoky & authentic regional zing',
        quickTip: 'Heat until it smokes lightly, then cool before cooking to mellow raw pungency.'
      },
      {
        id: 'cashews',
        name: 'Cashews (Kaju)',
        hindiName: 'काजू',
        category: 'extras',
        commonInHomes: true,
        flavorNotes: 'Sweet, buttery & luxurious body',
        quickTip: 'Soak in warm water and blend into silky paste to make any gravy instantly rich.'
      }
    ]
  }
];

/**
 * Returns flat array of all pantry items
 */
export const ALL_PANTRY_ITEMS: PantryItem[] = PANTRY_CLUSTERS.flatMap(c => c.items);

/**
 * Quick preset of universal basic Indian home staples
 */
export const EVERYDAY_HOME_STAPLES: string[] = [
  'Potatoes (Aloo)',
  'Onions (Pyaz)',
  'Tomatoes (Tamatar)',
  'Ginger (Adrak)',
  'Garlic (Lehsun)',
  'Green Chilies (Hari Mirch)',
  'Fresh Coriander (Dhania)',
  'Atta (Whole Wheat Flour)',
  'Basmati Rice',
  'Toor Dal (Yellow Pigeon Peas)',
  'Desi Ghee',
  'Cumin (Jeera)',
  'Turmeric (Haldi)',
  'Kashmiri Red Chili Powder',
  'Garam Masala'
];
