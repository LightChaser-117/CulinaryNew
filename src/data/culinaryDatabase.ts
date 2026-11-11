/**
 * Culinary Echo - Knowledge Base
 * Structured Gastronomic Layer from FlavorDB (molecules/volatiles),
 * RecipeDB (regional recipes & processes), and CocktailDB (mixology).
 */

import { FlavorDBIngredient, RecipeDBItem, CocktailDBItem, LivingContribution, CommunityCircle } from '../types';

// Real generated high-fidelity image assets
import imgCurry from '../assets/images/culinary_curry_1794401313436.jpg';
import imgMole from '../assets/images/culinary_mole_1794401312255.jpg';
import imgBroth from '../assets/images/culinary_broth_1794401314113.jpg';
import imgCocktail from '../assets/images/culinary_cocktail_1794401315066.jpg';

export const FLAVOR_DB: FlavorDBIngredient[] = [
  {
    name: "Smoked Paprika",
    category: "Spice",
    compounds: ["Guaiacol", "Syringol", "Capsaicin", "Isovaleric acid"],
    sensory: {
      aroma: ["Smoky", "Woodsy", "Pungent"],
      taste: ["Warm", "Pungent", "Slightly Bitter"]
    },
    substitutes: ["Chipotle Powder", "Toasted Cumin + Black Pepper", "Liquid Smoke + Sweet Paprika"],
    substituteRationale: {
      "Chipotle Powder": "Matches smoky phenols (Guaiacol) with additional capsaicin heat.",
      "Toasted Cumin + Black Pepper": "Emulates earthy warmth and pyrazines through cast-iron pan roasting.",
      "Liquid Smoke + Sweet Paprika": "Provides artificial syringol smoke notes while preserving carotenoid red color."
    },
    description: "Oak-smoked ground Capsicum annuum, rich in phenolic smoke volatiles and red carotenoids."
  },
  {
    name: "Tamarind",
    category: "Fruit / Acid",
    compounds: ["Tartaric acid", "Furfural", "2-Phenylacetaldehyde", "Limonene"],
    sensory: {
      aroma: ["Sour", "Fruity", "Caramelized"],
      taste: ["Sharp Tart", "Sweet-Sour", "Astringent"]
    },
    substitutes: ["Lime Juice + Touch of Brown Sugar", "Pomegranate Molasses", "Amchur (Dried Green Mango)"],
    substituteRationale: {
      "Lime Juice + Touch of Brown Sugar": "Balances citric acid with sucrose to approximate tartaric acid profile.",
      "Pomegranate Molasses": "Shares deep caramelized furfural notes and astringent fruitiness.",
      "Amchur (Dried Green Mango)": "Provides pure fruit-derived acidity with dry herbal undertones."
    },
    description: "Pod fruit paste packed with tartaric acid and sweet furfurals, essential for coastal Indian and Southeast Asian broths."
  },
  {
    name: "Cardamom",
    category: "Aromatic Seed",
    compounds: ["Terpinyl acetate", "1,8-Cineole", "Linalool", "Geraniol"],
    sensory: {
      aroma: ["Eucalyptus", "Floral", "Warm Herbal"],
      taste: ["Sweet Spice", "Pungent", "Cooling"]
    },
    substitutes: ["Cinnamon + Allspice", "Crushed Coriander Seed + Nutmeg", "Fresh Ginger + Lemon Peel"],
    substituteRationale: {
      "Cinnamon + Allspice": "Bridges sweet warmth through shared eugenol and linalool.",
      "Crushed Coriander Seed + Nutmeg": "Replicates terpene floral register with woody myristicin undertone.",
      "Fresh Ginger + Lemon Peel": "Provides the sharp citrus-eucalyptus top note."
    },
    description: "Queen of spices, rich in cooling 1,8-cineole and sweet floral terpinyl acetate."
  },
  {
    name: "Clove",
    category: "Aromatic Bud",
    compounds: ["Eugenol", "Caryophyllene", "Vanillin", "Humulene"],
    sensory: {
      aroma: ["Woodsy", "Sweet Medicinal", "Warm"],
      taste: ["Numbing", "Warm Pungent", "Slightly Bitter"]
    },
    substitutes: ["Allspice", "Nutmeg", "Cinnamon"],
    substituteRationale: {
      "Allspice": "Contains high concentration of eugenol, matching clove's signature chemical signature.",
      "Nutmeg": "Woody aromatic backbone with milder numbing sensation.",
      "Cinnamon": "Warm cinnamaldehyde paired with traces of eugenol."
    },
    description: "Dried flower buds containing up to 90% eugenol, giving potent numbing warmth and woodsy sweetness."
  },
  {
    name: "Coconut Milk",
    category: "Fat / Emulsion",
    compounds: ["Delta-octalactone", "Delta-decalactone", "Lauric acid", "Nonanoic acid"],
    sensory: {
      aroma: ["Nutty", "Sweet Creamy", "Tropical"],
      taste: ["Rich", "Velvety", "Mild Sweet"]
    },
    substitutes: ["Cashew Paste + Water", "Greek Yogurt / Cream", "Oat Milk + Coconut Oil"],
    substituteRationale: {
      "Cashew Paste + Water": "Matches the high lipid emulsion and mild sweet nutty mouthfeel.",
      "Greek Yogurt / Cream": "Adds creamy fat body; note that lactic acid introduces mild sourness.",
      "Oat Milk + Coconut Oil": "Provides grain silkiness with authentic coconut lipid volatiles."
    },
    description: "Lipid-rich emulsion containing lactones that impart rich velvety mouthfeel and heat buffering."
  },
  {
    name: "Cumin",
    category: "Seed Spice",
    compounds: ["Cuminaldehyde", "Cymene", "Terpenes", "Pinene"],
    sensory: {
      aroma: ["Earthy", "Warm", "Spicy Woodsy"],
      taste: ["Bitter-Warm", "Savory Earth", "Toasty"]
    },
    substitutes: ["Ground Coriander", "Caraway Seeds", "Fennel Seed"],
    substituteRationale: {
      "Ground Coriander": "Shares terpene volatile compounds; floral and citrusy rather than deeply earthy.",
      "Caraway Seeds": "Close botanical cousin with carvone providing similar pungency.",
      "Fennel Seed": "Sweeter anethole register, but provides structural seed warmth."
    },
    description: "Pivotal seed in Mexican, Indian, and Middle Eastern cookery, centered on pungent cuminaldehyde."
  },
  {
    name: "Lemongrass",
    category: "Herb / Stalk",
    compounds: ["Citral", "Geraniol", "Myrcene", "Linalool"],
    sensory: {
      aroma: ["Crisp Citrus", "Herbal", "Bright Green"],
      taste: ["Zesty", "Slightly Grassy", "Clean Sour"]
    },
    substitutes: ["Lemon Zest + Fresh Ginger", "Kaffir Lime Leaf", "Lemon Balm + Coriander Stems"],
    substituteRationale: {
      "Lemon Zest + Fresh Ginger": "Citral from lemon flavedo paired with ginger's zingiberene mimics bruised stalks.",
      "Kaffir Lime Leaf": "High in citronellal; sharper and more floral but equally aromatic.",
      "Lemon Balm + Coriander Stems": "Fresh grassy herbal foundation with bright citrus top note."
    },
    description: "Perennial tropical grass rich in citral isomers (neral and geranial), offering perfume-like citrus lift."
  },
  {
    name: "Ginger",
    category: "Rhizome",
    compounds: ["Gingerol", "Zingiberene", "Citral", "Shogaol"],
    sensory: {
      aroma: ["Pungent", "Zesty Citrus", "Peppery"],
      taste: ["Hot Pungent", "Brisk Warm", "Fresh"]
    },
    substitutes: ["Ground Ginger Powder", "Galangal", "Black Pepper + Lemon Zest"],
    substituteRationale: {
      "Ground Ginger Powder": "Higher in shogaol (formed during dehydration), hotter but less aromatic.",
      "Galangal": "Woodier, pine-camphor notes; denser texture.",
      "Black Pepper + Lemon Zest": "Peppery heat coupled with citral volatiles simulates fresh grating."
    },
    description: "Underground rhizome providing spicy gingerol that transforms to pungent zingerone upon cooking."
  },
  {
    name: "Mezcal / Peated Malt",
    category: "Distillate",
    compounds: ["Guaiacol", "4-Methylguaiacol", "Eugenol", "Phenols"],
    sensory: {
      aroma: ["Campfire Smoke", "Earthy Vegetal", "Charred Agave"],
      taste: ["Pungent", "Woody", "Mineral Earth"]
    },
    substitutes: ["Tequila + Drop of Lapsang Souchong Tea", "Rauchbier reduction", "Charred Wood Infusion"],
    substituteRationale: {
      "Tequila + Drop of Lapsang Souchong Tea": "Blends agave base spirit with pine-smoked tea leaves rich in guaiacol.",
      "Rauchbier reduction": "Malted barley smoked over beechwood wood logs.",
      "Charred Wood Infusion": "Direct thermal extraction of oak lignins into high-proof alcohol."
    },
    description: "Agave spirit roasted underground in volcanic rock pits, saturated with phenolic guaiacol."
  },
  {
    name: "Dark Chocolate",
    category: "Fermented Confection",
    compounds: ["Vanillin", "Tetramethylpyrazine", "Phenethylamine", "Theobromine"],
    sensory: {
      aroma: ["Roasted", "Earthy Cocoa", "Deep Bittersweet"],
      taste: ["Rich Umami-Sweet", "Bitter", "Velvety Sheen"]
    },
    substitutes: ["Cocoa Powder + Butter", "Carob Powder", "Toasted Chicory + Brown Sugar"],
    substituteRationale: {
      "Cocoa Powder + Butter": "Reconstructs cocoa solids and cocoa butter lipid ratio.",
      "Carob Powder": "Naturally sweet roasted pulp, caffeine-free alternative with earthy pyrazines.",
      "Toasted Chicory + Brown Sugar": "Deep roasted bitterness with caramelized caramel undertone."
    },
    description: "Fermented and roasted cacao seeds containing complex pyrazines, imparting savory depth to Mexican mole."
  },
  {
    name: "Star Anise",
    category: "Spice",
    compounds: ["Anethole", "Estragole", "Foeniculin", "Linalool"],
    sensory: {
      aroma: ["Sweet Licorice", "Warm Herb", "Balsamic"],
      taste: ["Sweet Pungent", "Numbing Warmth"]
    },
    substitutes: ["Fennel Seed", "Aniseed", "Chinese Five Spice"],
    substituteRationale: {
      "Fennel Seed": "Contains trans-anethole, giving identical sweet licorice top-notes.",
      "Aniseed": "Virtually identical aroma profile in a smaller seed.",
      "Chinese Five Spice": "Contains star anise as the dominant botanical component."
    },
    description: "Pericarp of Illicium verum containing potent trans-anethole, core of Chinese master stocks and Vietnamese pho."
  },
  {
    name: "Coffee / Roasted Beans",
    category: "Brewed Seed",
    compounds: ["Furfuryl mercaptan", "2-Ethyl-3,5-dimethylpyrazine", "Guaiacol", "Methional"],
    sensory: {
      aroma: ["Roasted", "Smoky Caramel", "Earthy"],
      taste: ["Pleasantly Bitter", "Rich Dark", "Astringent"]
    },
    substitutes: ["Roasted Chicory", "Black Barley Tea", "Dark Molasses + Touch of Cocoa"],
    substituteRationale: {
      "Roasted Chicory": "Classic New Orleans pairing with deep earthy roasted inulin bitterness.",
      "Black Barley Tea": "Korean bori-cha roasted cereal pyrazines provide toasted body.",
      "Dark Molasses + Touch of Cocoa": "Caramelized sulfur notes and dark bitter finish."
    },
    description: "Pyrolyzed coffea arabica beans delivering roasted pyrazines and sulfur volatiles that pair famously with chili."
  }
];

export const RECIPE_DB: RecipeDBItem[] = [
  {
    id: "rec_1",
    title: "Smoked Kerala Coconut & Tamarind Fish Curry (Meen Kari)",
    cuisine: "South Indian / Kerala",
    prepTimeMinutes: 40,
    ingredients: ["Coconut Milk", "Tamarind", "Ginger", "Cumin", "Cardamom", "Smoked Paprika"],
    sensory: {
      aroma: "Smoky, Coconut, Tart",
      taste: "Tangy-Rich with Warm Spice",
      texture: "Velvety",
      aftertaste: "Lingering Tamarind Acid with Coconut Lipids"
    },
    process: [
      "Infuse tamarind pulp in warm water to extract sour tartaric base.",
      "Temper cumin seeds, ginger, and curry leaves in cold-pressed oil until aromatic volatiles release.",
      "Whisk in coconut milk with the tamarind reduction until natural oils separate lightly.",
      "Gently poach fish or firm tofu for 7 minutes to preserve tender cellular texture."
    ],
    equipmentNeeded: ["Earthenware Clay Pot / Heavy Pan", "Ladle"],
    difficulty: "Moderate"
  },
  {
    id: "rec_2",
    title: "Oaxacan Smoked Chili & Cacao Mole Stew",
    cuisine: "Mexican / Oaxacan",
    prepTimeMinutes: 75,
    ingredients: ["Smoked Paprika", "Dark Chocolate", "Clove", "Cumin", "Ginger", "Star Anise"],
    sensory: {
      aroma: "Smoky, Roasted Cacao, Warm Spice",
      taste: "Deep Umami, Subtle Bitterness, Sweet Earth",
      texture: "Silky-Dense",
      aftertaste: "Warm Phenolic Clove with Roasted Cocoa"
    },
    process: [
      "Dry roast cumin seeds and whole cloves in cast iron until fragrant pyrazines develop.",
      "Blend charred tomatoes, pumpkin seeds, and smoked aromatics into a dense paste.",
      "Slow simmer paste with vegetable stock for 45 minutes to meld complex volatiles.",
      "Melt in dark chocolate off the flame to impart a glossy velvety sheen."
    ],
    equipmentNeeded: ["Cast Iron Skillet", "Heavy Pot", "High-Speed Blender"],
    difficulty: "Slow Simmer"
  },
  {
    id: "rec_3",
    title: "Aromatic Cardamom & Lemongrass Spiced Broth",
    cuisine: "Pan-Asian Coastal",
    prepTimeMinutes: 25,
    ingredients: ["Lemongrass", "Ginger", "Cardamom", "Coconut Milk", "Cumin"],
    sensory: {
      aroma: "Citrus, Eucalyptus, Herbal",
      taste: "Light, Refreshing, Zesty Heat",
      texture: "Clear-Light",
      aftertaste: "Clean Citral & Cooling Cardamom"
    },
    process: [
      "Bruise lemongrass stalks and crush cardamom pods with flat knife blade to release essential oils.",
      "Simmer bruised aromatics and sliced ginger in salted water for 15 minutes.",
      "Strain solids or leave whole; finish with mushrooms and a splash of coconut milk."
    ],
    equipmentNeeded: ["Medium Saucepan", "Strainer"],
    difficulty: "Simple"
  }
];

export const COCKTAIL_DB: CocktailDBItem[] = [
  {
    id: "cocktail_1",
    title: "Smoked Cardamom Mezcalita",
    category: "Agave Cocktail",
    isAlcoholic: true,
    ingredients: ["Mezcal / Peated Malt", "Cardamom", "Tamarind", "Lemongrass"],
    sensory: {
      aroma: "Smoky, Citrus, Floral Warmth",
      taste: "Tart & Woodsy",
      texture: "Effervescent-Smooth",
      aftertaste: "Lingering Guaiacol Campfire & Zesty Lime"
    },
    method: "Shake tamarind reduction and fresh lime with artisanal mezcal; double strain over a hand-carved clear ice block; smoke glass with toasted green cardamom pods.",
    glassware: "Heavy Lowball Tumbler",
    flavorBridge: "Bridges guaiacol in roasted agave with terpinyl acetate in crushed cardamom."
  },
  {
    id: "cocktail_2",
    title: "Botanical Lemongrass & Spiced Ginger Fizz",
    category: "Zero-Proof Tonic",
    isAlcoholic: false,
    ingredients: ["Lemongrass", "Ginger", "Clove", "Cardamom"],
    sensory: {
      aroma: "Crisp Citrus, Warm Clove",
      taste: "Sharp-Sweet & Effervescent",
      texture: "Brisk & Sparkling",
      aftertaste: "Cooling Zingiberene Tingles"
    },
    method: "Muddle bruised lemongrass and young ginger with warm spiced clove nectar; top with highly carbonated mountain spring soda and express fresh lemon oils over the surface.",
    glassware: "Highball Collins Glass",
    flavorBridge: "Balances high citral volatility against heavy eugenol depth."
  }
];

export const INITIAL_POSTS: LivingContribution[] = [
  {
    id: "post_101",
    author: "Ananya Iyer",
    authorAvatar: "A",
    title: "Grandmother's Sun-Smoked Tamarind Rasam",
    category: "Heritage Memory",
    story: "Every monsoon in Palakkad, my grandmother sun-cured tamarind over dry neem leaves. The aroma of woodsmoke and tart fruit in humid air is a visceral memory I carry everywhere. When cooking this, the kitchen smells like rain hitting warm brick.",
    image: imgCurry,
    ingredients: ["Tamarind", "Cumin", "Ginger", "Cardamom", "Coconut Milk"],
    sensory: {
      aroma: "Smoky, Tart, Warm",
      taste: "Sharp Tangy Heat with Coconut Softness",
      texture: "Velvety Light Broth",
      aftertaste: "Clean Tamarind Zing"
    },
    parentId: null,
    variationType: "Original Heritage Record",
    recreationTarget: "whole",
    likes: 54,
    saved: true,
    createdAt: "2 days ago"
  },
  {
    id: "post_102",
    author: "Mateo Rivera",
    authorAvatar: "M",
    title: "Campfire Mole Poblano with Charred Pepitas",
    category: "Regional Exploration",
    story: "Experimented with recreating our family's Puebla mole over an open campfire in Oregon. We didn't have mulato chilis, so we toasted smoked paprika with local bitter chocolate and toasted squash seeds on a cast iron pan.",
    image: imgMole,
    ingredients: ["Smoked Paprika", "Dark Chocolate", "Clove", "Cumin", "Ginger"],
    sensory: {
      aroma: "Smoky, Roasted Cacao, Warm Spice",
      taste: "Deep Umami & Warm Bitterness",
      texture: "Silky-Dense",
      aftertaste: "Earthy Cocoa & Guaiacol"
    },
    parentId: null,
    variationType: "Field Experiment",
    recreationTarget: "whole",
    likes: 81,
    saved: false,
    createdAt: "Yesterday"
  },
  {
    id: "post_103",
    author: "Devin K.",
    authorAvatar: "D",
    title: "Studio Apartment Tamarind Broth (No-Stove Variation)",
    category: "Adaptive Recreation",
    story: "Loved Ananya's Palakkad Tamarind Rasam but lived in a dorm with only an electric kettle. Indian grocers were out of block tamarind, so I substituted fresh lime juice and a dash of dark brown sugar. Retained the smoky note by blooming toasted cumin seeds.",
    image: imgBroth,
    ingredients: ["Lime Juice + Touch of Brown Sugar", "Cumin", "Ginger", "Lemongrass"],
    sensory: {
      aroma: "Toasted Earth, Citrus Tart",
      taste: "Bright Acidic Heat",
      texture: "Light Broth",
      aftertaste: "Crisp Peppery Finish"
    },
    parentId: "post_101",
    variationType: "Accessible Recreation",
    changedNotes: "Substituted dry tamarind pulp with Lime Juice + Brown Sugar; adapted stove simmer to kettle flash extraction.",
    retainedNotes: "Kept cumin-ginger aromatic bridge and sharp acidic finish.",
    equipmentConstraint: "Minimal (Electric Kettle / Single Bowl)",
    timeConstraint: "Express (< 15 mins)",
    recreationTarget: "flavour",
    likes: 38,
    saved: true,
    createdAt: "6 hours ago"
  },
  {
    id: "post_104",
    author: "Elena Rostova",
    authorAvatar: "E",
    title: "Smoked Cardamom Mezcalita & Charred Citrus",
    category: "Botanical Mixology",
    story: "Inspired by the smoky phenol overlap between Oaxacan mezcal and toasted black cardamom. We torched the cardamom pods over open flame to release 1,8-cineole vapors right into the glass.",
    image: imgCocktail,
    ingredients: ["Mezcal / Peated Malt", "Cardamom", "Tamarind", "Smoked Paprika"],
    sensory: {
      aroma: "Smoky, Floral Citrus, Eucalyptus",
      taste: "Tart, Woodsy & Crisp",
      texture: "Silky Over Hand-Carved Ice",
      aftertaste: "Smoky Agave Warmth"
    },
    parentId: "post_102",
    variationType: "Cross-Domain Translation",
    changedNotes: "Translated mole's smoked aroma into an agave cocktail formulation.",
    retainedNotes: "Preserved Guaiacol and Eugenol molecular harmony.",
    recreationTarget: "aroma",
    likes: 47,
    saved: false,
    createdAt: "3 hours ago"
  }
];

export const COMMUNITIES: CommunityCircle[] = [
  {
    id: "comm_smoky",
    name: "Smoked Aromas & Fire-Char",
    curator: "Fire & Fenugreek Group",
    members: 1420,
    description: "Exploring woodsmoke, charred spices, peat, guaiacol aroma volatiles, and cast-iron kitchen charring techniques.",
    badgeColor: "text-amber-800 bg-amber-50 border-amber-200",
    sensoryFocus: ["Smoky", "Woodsy", "Charred", "Earthy"],
    joined: true
  },
  {
    id: "comm_ferment",
    name: "Living Fermentations",
    curator: "Wild Cultures Guild",
    members: 980,
    description: "Koji, dosas, sour broths, fermented tamarind, wild yeast tonics, and lacto-preservation without black-box methods.",
    badgeColor: "text-emerald-800 bg-emerald-50 border-emerald-200",
    sensoryFocus: ["Tart & Sour", "Umami", "Tangy", "Living"],
    joined: false
  },
  {
    id: "comm_mixology",
    name: "Culinary Mixology & Tonics",
    curator: "Botanical Spirits Circle",
    members: 650,
    description: "Translating kitchen aromas into botanical non-alcoholic infusions, craft cordials, and small-batch cocktails.",
    badgeColor: "text-purple-800 bg-purple-50 border-purple-200",
    sensoryFocus: ["Effervescent", "Floral", "Aromatic", "Bright"],
    joined: false
  },
  {
    id: "comm_diaspora",
    name: "Diaspora Kitchen Adaptations",
    curator: "Memory & Spice Collective",
    members: 1120,
    description: "Rebuilding grandmother recipes with pantry items found 6,000 miles from home. Practical, honest, heartfelt.",
    badgeColor: "text-orange-800 bg-orange-50 border-orange-200",
    sensoryFocus: ["Comfort", "Earthy", "Spicy", "Warm"],
    joined: true
  }
];
