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
import imgDal from '../assets/images/indian_dal_makhani_1794463371983.jpg';
import imgBiryani from '../assets/images/indian_dum_biryani_1794463371984.jpg';
import imgAlooParatha from '../assets/images/indian_aloo_paratha_1794464220835.jpg';
import imgDalTadka from '../assets/images/indian_dal_tadka_1794464220926.jpg';

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
  },
  {
    name: "Kasuri Methi",
    category: "Aromatic Herb",
    compounds: ["Sotolon", "Linalool", "Limonene", "Beta-caryophyllene"],
    sensory: {
      aroma: ["Caramelized Herb", "Warm Maple", "Nutty Curried"],
      taste: ["Bitter-Warm", "Savory Umami", "Earthy"]
    },
    substitutes: ["Toasted Celery Seed + Drop of Maple", "Mustard Greens + Dried Basil", "Crushed Fennel Fronds"],
    substituteRationale: {
      "Toasted Celery Seed + Drop of Maple": "Captures sotolon's distinctive sweet-herbal curry scent note.",
      "Mustard Greens + Dried Basil": "Replicates the bitter-savory foundation of brassica leaves."
    },
    description: "Sun-dried fenugreek leaves containing potent sotolon. Crushed between palms into warm ghee, it gives North Indian gravies their iconic restaurant aroma."
  },
  {
    name: "Asafetida (Hing)",
    category: "Savory Resin",
    compounds: ["Diallyl disulfide", "Dimethyl trisulfide", "Ferulic acid ester"],
    sensory: {
      aroma: ["Pungent Sulfur", "Toasted Allium", "Deep Savory"],
      taste: ["Sweet Leek-Garlic", "Rich Umami", "Warm"]
    },
    substitutes: ["Garlic Powder + Onion Powder", "Minced Shallots in Hot Ghee", "Toasted Leek Greens"],
    substituteRationale: {
      "Garlic Powder + Onion Powder": "Shares organosulfur disulfides that provide allium depth without root bulbs.",
      "Minced Shallots in Hot Ghee": "Provides natural sweet-sulfur notes when bloomed in hot oil."
    },
    description: "Dried resin of Ferula roots. Intensely pungent raw, blooming in hot oil instantly turns its sulfur volatiles into sweet, savory onion-garlic depth."
  },
  {
    name: "Black Cardamom",
    category: "Smoked Seed Pod",
    compounds: ["Guaiacol", "1,8-Cineole", "Alpha-terpineol", "Syringol"],
    sensory: {
      aroma: ["Campfire Smoke", "Cooling Eucalyptus", "Woodsy Resin"],
      taste: ["Camphoraceous Warmth", "Astringent", "Deep Bitter"]
    },
    substitutes: ["Green Cardamom + Drop of Liquid Smoke", "Allspice + Smoked Paprika", "Crushed Juniper Berries"],
    substituteRationale: {
      "Green Cardamom + Drop of Liquid Smoke": "Blends 1,8-cineole herbal top notes with guaiacol smoke.",
      "Allspice + Smoked Paprika": "Matches the heavy woody eugenol and campfire phenolic register."
    },
    description: "Cardamom pods dried over open wood fires in Himalayan foothills, fusing intense guaiacol smoke with cooling eucalyptus notes."
  },
  {
    name: "Curry Leaves",
    category: "Fresh Herbal Leaf",
    compounds: ["Alpha-pinene", "Caryophyllene", "Linalool", "Myrcene"],
    sensory: {
      aroma: ["Citrus Pine", "Nutty Crackle", "Herbaceous"],
      taste: ["Warm Herbal", "Pleasantly Bitter", "Zesty"]
    },
    substitutes: ["Lime Zest + Fresh Basil", "Lemon Verbena + Bay Leaf", "Kaffir Lime Leaves"],
    substituteRationale: {
      "Lime Zest + Fresh Basil": "Combines pinene and linalool volatiles to emulate the crackled leaf aroma.",
      "Lemon Verbena + Bay Leaf": "Herbaceous citral and cineole create a brisk, woody green profile."
    },
    description: "Fresh leaves of Murraya koenigii that release crackling citrus-pine terpene oils when tempered in hot oil (tadka)."
  },
  {
    name: "Kashmiri Red Chili",
    category: "Mild Pepper / Color",
    compounds: ["Capsanthin", "Capsorubin", "Beta-carotene", "Capsaicin"],
    sensory: {
      aroma: ["Fruity Earth", "Mild Toasted Pepper", "Sun-Dried"],
      taste: ["Gentle Warmth", "Fruity Sweetness", "Non-Pungent"]
    },
    substitutes: ["Sweet Hungarian Paprika + Pinch of Cayenne", "Ancho Chili Powder", "Gochugaru (Korean Chili Flakes)"],
    substituteRationale: {
      "Sweet Hungarian Paprika + Pinch of Cayenne": "Delivers vibrant crimson capsanthin carotenoids with controlled heat.",
      "Gochugaru (Korean Chili Flakes)": "Shares fruit-forward sweetness and rich red hue without scorching pungency."
    },
    description: "Dried chili valued across the subcontinent for vibrant natural scarlet hue and mild sweet warmth without burning heat."
  },
  {
    name: "Amchur",
    category: "Fruit Acid Powder",
    compounds: ["Citric acid", "Myrcene", "Ethyl butyrate", "Malic acid"],
    sensory: {
      aroma: ["Dry Fruity Tart", "Sour Herbal", "Zesty"],
      taste: ["Sharp Acidic", "Fruity Puckering", "Tangy"]
    },
    substitutes: ["Sumac Powder", "Pomegranate Powder (Anardana)", "Lemon Juice + Cornstarch"],
    substituteRationale: {
      "Sumac Powder": "Provides dry, tart fruit acidity and earthy berry notes without adding moisture.",
      "Pomegranate Powder (Anardana)": "Traditional Punjabi substitute with tartaric and citric fruit acidity."
    },
    description: "Unripe green mangoes sun-dried into powder, delivering bright citric and malic acidity without thinning curries with excess liquid."
  },
  {
    name: "Mustard Seeds",
    category: "Pungent Seed",
    compounds: ["Allyl isothiocyanate", "Sinigrin", "Erucic acid"],
    sensory: {
      aroma: ["Sharp Pungent", "Sinus-Clearing", "Nutty Toasted"],
      taste: ["Wasabi-like Zing", "Nutty Bitter", "Bold Warmth"]
    },
    substitutes: ["Horseradish Paste + Neutral Oil", "Brown Mustard Seeds", "Wasabi Pinch + Sesame Oil"],
    substituteRationale: {
      "Horseradish Paste + Neutral Oil": "Shares allyl isothiocyanate for that nasal clearing pungent heat.",
      "Brown Mustard Seeds": "Crackling seeds release milder nutty sinigrin notes."
    },
    description: "Brassica seeds rich in sinigrin. Popped in hot oil during tadka, raw pungency transforms into deep golden nutty warmth."
  },
  {
    name: "Desi Ghee",
    category: "Lipid / Cooking Medium",
    compounds: ["Delta-lactones", "Butyric acid", "Diacetyl", "Short-chain fatty acids"],
    sensory: {
      aroma: ["Toasted Nutty", "Caramelized Dairy", "Rich Warmth"],
      taste: ["Velvety", "Malty Sweet", "Nutty Roundness"]
    },
    substitutes: ["Brown Butter (Beurre Noisette)", "Coconut Oil + Touch of Butter", "Neutral Oil + Toasted Milk Powder"],
    substituteRationale: {
      "Brown Butter (Beurre Noisette)": "Identical caramelized milk fat solids delivering diacetyl and lactones.",
      "Coconut Oil + Touch of Butter": "Provides high-heat stability with creamy mouthfeel."
    },
    description: "Slow-simmered cultured butter where milk solids are caramelized and filtered. A supreme lipid solvent that extracts and preserves fat-soluble spice aromatics."
  },
  {
    name: "Paneer",
    category: "Dairy",
    compounds: ["Diacetyl", "Lactic acid", "Butyric acid", "Short-chain fatty acids"],
    sensory: {
      aroma: ["Mild Fresh Milk", "Sweet Cream"],
      taste: ["Gentle Milky", "Creamy", "Subtle Sweet"]
    },
    substitutes: ["Extra-firm Tofu (pressed)", "Halloumi Cheese", "Ricotta Salata"],
    substituteRationale: {
      "Extra-firm Tofu (pressed)": "Matches the spongy texture and absorbs gravies identically.",
      "Halloumi Cheese": "Holds shape when seared or simmered in curries."
    },
    description: "Fresh non-melting Indian cottage cheese. Spongy and gentle, it acts as a culinary canvas for bold spices."
  },
  {
    name: "Curd / Yogurt",
    category: "Dairy",
    compounds: ["Lactic acid", "Acetaldehyde", "Diacetyl", "Acetoin"],
    sensory: {
      aroma: ["Fresh Tangy", "Fermented Milk", "Cooling"],
      taste: ["Sour Creamy", "Refreshing", "Tangy"]
    },
    substitutes: ["Greek Yogurt + Water", "Coconut Yogurt", "Sour Cream thinned with milk"],
    substituteRationale: {
      "Greek Yogurt + Water": "Matches the refreshing lactic acidity and rich body perfectly.",
      "Coconut Yogurt": "Plant-based alternative providing creamy cooling texture."
    },
    description: "Traditional cultured whole milk dahi, providing probiotic tang, tenderizing enzymes for marinades, and cooling raitas."
  },
  {
    name: "Potatoes (Aloo)",
    category: "Vegetable / Starch",
    compounds: ["Methional", "2-Isobutyl-3-methoxypyrazine", "Starch", "Pyrazines"],
    sensory: {
      aroma: ["Earthy", "Steamed Starch", "Warm Comfort"],
      taste: ["Mild Savory", "Slightly Sweet Starch", "Hearty"]
    },
    substitutes: ["Sweet Potatoes (Shakarkandi)", "Arbi (Colocasia / Taro)", "Raw Green Banana"],
    substituteRationale: {
      "Sweet Potatoes (Shakarkandi)": "Delivers comforting dense texture with a mild sweet finish.",
      "Arbi (Colocasia / Taro)": "Traditional fasting substitute with dense, satisfying mouthfeel."
    },
    description: "The universal Indian comfort staple. Absorbs spices, thickens gravies, and stars in iconic stuffed parathas."
  },
  {
    name: "Onions (Pyaz)",
    category: "Alliums & Aromatics",
    compounds: ["Dipropyl disulfide", "Allicin", "Quercetin", "Pyrazines"],
    sensory: {
      aroma: ["Sweet Roasted", "Savory Allium", "Pungent when raw"],
      taste: ["Caramelized Sweetness", "Deep Umami", "Savory"]
    },
    substitutes: ["Shallots", "Hing (Asafetida) in Ghee", "Leeks (white and light green)"],
    substituteRationale: {
      "Shallots": "Sweet, concentrated allium sugars perfect for South Indian sambar and roasts.",
      "Hing (Asafetida) in Ghee": "The classic Jain substitute delivering savory allium aroma without bulbs."
    },
    description: "The foundation of Indian gravies. Slow browning (bhunao) transforms sharp sulfur notes into rich caramelized sweetness."
  },
  {
    name: "Tomatoes (Tamatar)",
    category: "Fruit / Vegetable",
    compounds: ["Glutamic acid", "Citric acid", "Hexenal", "Lycopene"],
    sensory: {
      aroma: ["Fresh Green Vine", "Cooked Umami", "Tangy"],
      taste: ["Savory Tart", "Juicy", "Sweet Acidic"]
    },
    substitutes: ["Tomato Puree + Squeeze of Lemon", "Amchur + Water paste", "Yogurt + Turmeric"],
    substituteRationale: {
      "Tomato Puree + Squeeze of Lemon": "Delivers rich natural glutamates and vibrant ruby color.",
      "Amchur + Water paste": "Provides pure fruit-derived tang for dry vegetable stir-fries."
    },
    description: "Juicy acidic workhorse rich in natural umami (glutamate) that creates the saucy gravy body in everyday curries."
  },
  {
    name: "Atta (Whole Wheat Flour)",
    category: "Grain & Flour",
    compounds: ["Maltol", "Ferulic acid", "Vanillin", "Toasted pyrazines"],
    sensory: {
      aroma: ["Nutty Toasted Grain", "Warm Bread", "Earthy"],
      taste: ["Wholesome Wheaty", "Gentle Sweet", "Comforting"]
    },
    substitutes: ["Whole Wheat Pastry Flour", "Maida + Wheat Bran", "Gluten-Free Multigrain Blend"],
    substituteRationale: {
      "Whole Wheat Pastry Flour": "Finely milled wheat flour that yields soft, pliable rotis.",
      "Maida + Wheat Bran": "Balances elastic gluten stretch with rustic bran texture."
    },
    description: "Stone-ground whole wheat chakki atta. Kneaded with water and rested, it puffs on a dry tawa into everyday rotis and parathas."
  },
  {
    name: "Basmati Rice",
    category: "Grain & Cereal",
    compounds: ["2-Acetyl-1-pyrroline", "Hexanal", "Linalool"],
    sensory: {
      aroma: ["Floral Pandan", "Toasted Popcorn", "Warm Sweet"],
      taste: ["Delicate Sweet", "Clean", "Light"]
    },
    substitutes: ["Jasmine Rice", "Sona Masoori", "Jeera Samba Rice"],
    substituteRationale: {
      "Jasmine Rice": "Shares 2-acetyl-1-pyrroline popcorn aroma with slightly softer texture.",
      "Sona Masoori": "Lightweight, fluffy everyday South Indian medium-grain rice."
    },
    description: "Aged long-grain rice famous for its natural floral 2-acetyl-1-pyrroline perfume and separate, non-sticky grains."
  },
  {
    name: "Toor Dal (Yellow Pigeon Peas)",
    category: "Pulses & Legumes",
    compounds: ["Hexanal", "Methional", "Legume pyrazines"],
    sensory: {
      aroma: ["Warm Nutty Pulse", "Earthy Steam"],
      taste: ["Hearty", "Comforting Nutty", "Savory"]
    },
    substitutes: ["Masoor Dal (Red Lentils)", "Yellow Moong Dal", "Chana Dal (split chickpeas)"],
    substituteRationale: {
      "Masoor Dal (Red Lentils)": "Cooks fast and breaks down into a silky homestyle broth.",
      "Yellow Moong Dal": "Extremely light and easy to digest with a gentle nutty profile."
    },
    description: "The supreme pulse of Indian home kitchens. Softens into golden comforting soup, ready for sizzling cumin-garlic tadka."
  },
  {
    name: "Moong Dal (Yellow Moong)",
    category: "Pulses & Legumes",
    compounds: ["Methional", "Pyrazines", "Starch"],
    sensory: {
      aroma: ["Light Nutty", "Clean Herbaceous"],
      taste: ["Mild Sweet", "Gentle", "Comforting"]
    },
    substitutes: ["Toor Dal", "Split Red Lentils (Masoor)", "Split Chickpeas"],
    substituteRationale: {
      "Split Red Lentils (Masoor)": "Cooks in under 15 minutes with a warm golden color.",
      "Toor Dal": "Offers a slightly denser, traditional body."
    },
    description: "Hulled and split yellow mung beans. The ultimate Ayurvedic comfort food, gentle on the stomach and cooking in minutes."
  },
  {
    name: "Eggs (Anda)",
    category: "Protein / Non-Veg",
    compounds: ["Hydrogen sulfide notes", "Ovalbumin", "Lipid-rich yolk volatiles"],
    sensory: {
      aroma: ["Savory Egg", "Rich Yolk", "Warm Custardy"],
      taste: ["Rich Umami", "Buttery", "Satisfying"]
    },
    substitutes: ["Crumbled Paneer", "Scrambled Tofu with Kala Namak", "Spiced Chickpea Batter"],
    substituteRationale: {
      "Crumbled Paneer": "Produces identical mouthfeel in spiced bhurji and wraps.",
      "Scrambled Tofu with Kala Namak": "Black salt (kala namak) supplies authentic eggy sulfur aroma."
    },
    description: "Quick household protein. Whisked with chopped onions, green chilies, and pav bhaji masala for iconic 10-minute bhurji."
  },
  {
    name: "Fresh Coriander (Dhania)",
    category: "Fresh Herb",
    compounds: ["Linalool", "Decanal", "Alpha-pinene"],
    sensory: {
      aroma: ["Fresh Citrus", "Bright Herbaceous", "Crisp Clean"],
      taste: ["Citrusy Herbal", "Refreshing", "Zesty"]
    },
    substitutes: ["Flat-Leaf Parsley + Lemon Zest", "Fresh Mint Leaves", "Crushed Coriander Seeds"],
    substituteRationale: {
      "Flat-Leaf Parsley + Lemon Zest": "Emulates the bright green color and fresh citrusy linalool lift.",
      "Fresh Mint Leaves": "Offers cooling herbal aroma for raitas and spicy curries."
    },
    description: "The ubiquitous crowning touch of Indian cookery. Stems hold concentrated citrus-pine oils, while leaves add vibrant color."
  },
  {
    name: "Green Chilies (Hari Mirch)",
    category: "Fresh Chili",
    compounds: ["Capsaicin", "2-Isobutyl-3-methoxypyrazine", "Hexenol"],
    sensory: {
      aroma: ["Crisp Green", "Fresh Grassy", "Pungent Heat"],
      taste: ["Bright Sharp Heat", "Tingling", "Crisp"]
    },
    substitutes: ["Serrano Pepper", "Jalapeño (seeds in)", "Pinch of Crushed Red Pepper"],
    substituteRationale: {
      "Serrano Pepper": "Nearly identical crisp green wall crunch and sharp heat index.",
      "Jalapeño (seeds in)": "Provides fresh green vegetable aroma with slightly milder warmth."
    },
    description: "Fresh slender green chilies. Slit or chopped, they add lively crisp heat that wakes up dals, poha, and curries."
  },
  {
    name: "Turmeric (Haldi)",
    category: "Aromatic Rhizome",
    compounds: ["Curcumin", "Tumerone", "Zingiberene", "Curlone"],
    sensory: {
      aroma: ["Warm Earthy", "Woodsy Ginger", "Mustard-like"],
      taste: ["Earthy Bitter", "Gentle Warmth", "Subtle Astringent"]
    },
    substitutes: ["Fresh Grated Turmeric", "Sweet Paprika (for golden red color)", "Mild Saffron in Warm Milk"],
    substituteRationale: {
      "Fresh Grated Turmeric": "Provides brighter, juicy citrus-earth notes.",
      "Sweet Paprika": "Offers gentle earthy warmth when looking for color without bitterness."
    },
    description: "The sacred golden root of India. Bloom in hot oil to dissolve lipophilic curcumin and coat food in brilliant warmth."
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
  },
  {
    id: "rec_4",
    title: "Dhungar-Smoked Dal Makhani",
    cuisine: "North Indian / Punjabi",
    prepTimeMinutes: 60,
    ingredients: ["Desi Ghee", "Black Cardamom", "Kasuri Methi", "Ginger", "Kashmiri Red Chili", "Mustard Seeds"],
    sensory: {
      aroma: "Smoky Wood, Toasted Kasuri Methi, Caramel Ghee",
      taste: "Velvety Rich Umami, Mellow Butter Heat",
      texture: "Creamy-Dense",
      aftertaste: "Lingering Dhungar Campfire & Clarified Butter"
    },
    process: [
      "Simmer soaked black urad dal and kidney beans with whole black cardamom and ginger paste until tender.",
      "Slowly emulsify in fresh dairy butter and Kashmiri red chili puree over low heat for 45 minutes.",
      "Perform Dhungar: Place glowing red-hot charcoal in an earthenware cup atop the dal; pour 1 tsp ghee over it and clamp the lid tightly for 3 minutes to infuse pure woodsmoke guaiacol.",
      "Crush kasuri methi between palms and stir in with heavy cream to seal the aroma volatiles."
    ],
    equipmentNeeded: ["Heavy Bottom Handi", "Small Metal Katori", "Charcoal Lump", "Tongs"],
    difficulty: "Slow Simmer"
  },
  {
    id: "rec_5",
    title: "Royal Awadhi Dum Biryani (Lucknowi Handi)",
    cuisine: "Awadhi / Uttar Pradesh",
    prepTimeMinutes: 70,
    ingredients: ["Cardamom", "Desi Ghee", "Star Anise", "Clove", "Ginger", "Curry Leaves"],
    sensory: {
      aroma: "Floral Saffron, Rose & Kewra, Sweet Spice Steam",
      taste: "Delicately Spiced, Sweet Hay & Savory Ghee",
      texture: "Fluffy Separate Grains",
      aftertaste: "Cooling Cineole & Toasted Butter"
    },
    process: [
      "Parboil aged long-grain basmati with whole cinnamon, cloves, and cracked green cardamom until 70% cooked.",
      "Layer marinated protein or spiced vegetables in heavy handi with golden caramelized onions (birista) and chopped mint.",
      "Drizzle saffron-steeped warm milk and melted desi ghee across the top rice layer.",
      "Dum Pukht Seal: Seal handi rim with wheat flour dough and heavy lid; slow cook over indirect low flame for 25 minutes so aroma vapors recirculate through the grains."
    ],
    equipmentNeeded: ["Heavy Brass Handi", "Wheat Dough for Dum Seal", "Flat Tawa (for indirect heat)"],
    difficulty: "Slow Simmer"
  },
  {
    id: "rec_6",
    title: "Chettinad Black Pepper & Curry Leaf Roast (Varuval)",
    cuisine: "Tamil Nadu / Chettinad",
    prepTimeMinutes: 30,
    ingredients: ["Mustard Seeds", "Curry Leaves", "Cumin", "Ginger", "Black Cardamom", "Kashmiri Red Chili"],
    sensory: {
      aroma: "Pungent Black Pepper, Crackling Curry Leaves, Toasted Seeds",
      taste: "Fiery Savory Heat with Citrus-Pine Herbaceous Finish",
      texture: "Dry-Roasted Tender Coat",
      aftertaste: "Sharp Piperine Warmth & Mustard Nutty Zing"
    },
    process: [
      "Dry roast black peppercorns, cumin, and fennel seeds in a cast iron skillet until fragrant, then coarse stone-grind.",
      "Tadka Tempering: Crackle brown mustard seeds and fresh curry leaves in hot oil until blistering and fragrant.",
      "Bhunao: Sauté shallots and ginger paste until oil separates; toss protein with the fresh coarse masala until dry, caramelized, and dark."
    ],
    equipmentNeeded: ["Cast Iron Kadai", "Mortar & Pestle"],
    difficulty: "Moderate"
  },
  {
    id: "rec_7",
    title: "Homestyle Aloo Paratha with Spiced Curd & Butter",
    cuisine: "North Indian / Everyday Breakfast",
    prepTimeMinutes: 25,
    ingredients: ["Atta (Whole Wheat Flour)", "Potatoes (Aloo)", "Green Chilies (Hari Mirch)", "Fresh Coriander (Dhania)", "Amchur", "Cumin", "Desi Ghee", "Curd / Yogurt"],
    sensory: {
      aroma: "Toasted Wheat, Ghee Sizzle, Tangy Spiced Potato",
      taste: "Savory Warmth with Pleasant Tang & Melting Butter",
      texture: "Crispy Golden Crust with Fluffy Spiced Center",
      aftertaste: "Satisfying Toasted Wheaty Comfort"
    },
    process: [
      "Mash boiled potatoes with finely chopped green chilies, coriander, amchur powder, cumin, and salt.",
      "Knead soft whole wheat atta dough with warm water; roll a ball, place potato stuffing inside, and pinch closed.",
      "Gently roll out on a floured board and roast on a hot tawa with generous desi ghee until golden crisp spots appear.",
      "Serve piping hot topped with a melting cube of white butter alongside chilled spiced curd."
    ],
    equipmentNeeded: ["Flat Cast Iron Tawa", "Rolling Pin (Belan)", "Potato Masher"],
    difficulty: "Simple"
  },
  {
    id: "rec_8",
    title: "Everyday Dal Tadka with Steaming Jeera Rice",
    cuisine: "Everyday Indian Comfort",
    prepTimeMinutes: 20,
    ingredients: ["Toor Dal (Yellow Pigeon Peas)", "Turmeric (Haldi)", "Tomatoes (Tamatar)", "Cumin", "Ginger", "Garlic", "Desi Ghee", "Hing (Asafetida)", "Fresh Coriander (Dhania)", "Basmati Rice"],
    sensory: {
      aroma: "Crackling Cumin, Fried Garlic, Golden Ghee Sizzle",
      taste: "Warm Comforting Lentil Umami with Tangy Tomato",
      texture: "Silky Broth with Fluffy Fragrant Rice Grains",
      aftertaste: "Clean Garlic & Toasted Cumin Lingering Warmth"
    },
    process: [
      "Boil toor dal with turmeric, salt, and water in a pressure cooker or pot until velvety soft.",
      "Sauté chopped onions, ginger, and tomatoes until juicy and soft; whisk into the cooked dal.",
      "Sizzling Tadka: Heat 2 tbsp desi ghee in a small pan, crackle cumin seeds, sliced garlic, a pinch of hing, and dried red chili for 15 seconds until golden.",
      "Pour the crackling tadka immediately over the dal, cover pot for 1 minute, and garnish with fresh coriander over jeera rice."
    ],
    equipmentNeeded: ["Pressure Cooker / Pot", "Small Tadka Pan"],
    difficulty: "Simple"
  },
  {
    id: "rec_9",
    title: "Quick 15-Minute Paneer Bhurji",
    cuisine: "Fast Indian Kitchen",
    prepTimeMinutes: 15,
    ingredients: ["Paneer", "Onions (Pyaz)", "Tomatoes (Tamatar)", "Green Chilies (Hari Mirch)", "Turmeric (Haldi)", "Cumin", "Kasuri Methi", "Desi Ghee"],
    sensory: {
      aroma: "Sautéed Onions, Fresh Paneer, Kasuri Methi",
      taste: "Savory Tangy Spiced Cottage Cheese",
      texture: "Soft, Juicy & Spongy Crumbles",
      aftertaste: "Warm Butter & Herbaceous Methi"
    },
    process: [
      "Heat ghee in a pan; crackle cumin seeds and sauté finely chopped onions and green chilies until translucent.",
      "Add chopped tomatoes and turmeric; cook for 3 minutes until juicy.",
      "Crumble fresh paneer by hand and fold into the pan on medium heat for just 2-3 minutes so it stays juicy.",
      "Finish with crushed kasuri methi and fresh coriander. Best enjoyed with hot rotis or toasted bread."
    ],
    equipmentNeeded: ["Frying Pan or Kadai", "Spatula"],
    difficulty: "Simple"
  },
  {
    id: "rec_10",
    title: "Street-Style Anda Masala (Egg Bhurji)",
    cuisine: "Mumbai Street Food",
    prepTimeMinutes: 12,
    ingredients: ["Eggs (Anda)", "Onions (Pyaz)", "Tomatoes (Tamatar)", "Green Chilies (Hari Mirch)", "Turmeric (Haldi)", "Kashmiri Red Chili", "Desi Ghee", "Fresh Coriander (Dhania)"],
    sensory: {
      aroma: "Sizzling Butter, Spiced Eggs, Fresh Coriander",
      taste: "Savory Eggy Richness with Tangy Street Heat",
      texture: "Tender, Juicy Scrambled Morsels",
      aftertaste: "Fiery Green Chili & Butter Warmth"
    },
    process: [
      "Melt butter/ghee on a skillet; vigorously sauté chopped onions, green chilies, and ginger for 2 minutes.",
      "Add tomatoes, turmeric, and red chili powder; cook until soft.",
      "Crack eggs directly into the skillet; scramble briskly over medium flame until soft curds form.",
      "Sprinkle chopped coriander and squeeze a dash of fresh lemon juice; scoop with warm buttered pav or rotis."
    ],
    equipmentNeeded: ["Flat Tawa or Pan", "Spatula"],
    difficulty: "Simple"
  },
  {
    id: "rec_11",
    title: "Grandma's Comforting Moong Dal Khichdi",
    cuisine: "Ayurvedic Indian Comfort",
    prepTimeMinutes: 20,
    ingredients: ["Moong Dal (Yellow Moong)", "Basmati Rice", "Turmeric (Haldi)", "Cumin", "Desi Ghee", "Hing (Asafetida)", "Ginger"],
    sensory: {
      aroma: "Warm Ghee, Toasted Jeera, Earthy Yellow Moong",
      taste: "Mild, Gentle, Light & Deeply Restorative",
      texture: "Silky Porridge-like Hug",
      aftertaste: "Clean Ginger & Clarified Butter Finish"
    },
    process: [
      "Wash equal parts yellow moong dal and rice; pressure cook with turmeric, salt, and 4 cups water for 3 whistles.",
      "In a small pan, warm desi ghee and add whole cumin seeds, a pinch of hing, and grated ginger.",
      "Swirl the hot fragrant ghee into the steaming khichdi; serve with a spoonful of cool curd and papad."
    ],
    equipmentNeeded: ["Pressure Cooker", "Small Tadka Pan"],
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
  },
  {
    id: "post_105",
    author: "Karan Singhania",
    authorAvatar: "K",
    title: "Dhungar-Smoked Dal Makhani with Kasuri Methi",
    category: "Heritage Slow Cooking",
    story: "My grandfather learned this in Amritsar: black lentils slow-simmered over low heat with whole black cardamom and tomatoes. Just before serving, we placed a red-hot charcoal in a brass katori on top of the dal, poured melted desi ghee over it, and sealed the lid for 3 minutes. The entire kitchen filled with rich woodsmoke, melting into the velvety butter cream.",
    image: imgDal,
    ingredients: ["Desi Ghee", "Black Cardamom", "Kasuri Methi", "Ginger", "Kashmiri Red Chili", "Mustard Seeds"],
    sensory: {
      aroma: "Woodsmoke, Toasted Methi, Ghee",
      taste: "Velvety Rich Umami with Gentle Heat",
      texture: "Creamy-Dense",
      aftertaste: "Lingering Dhungar Campfire & Butter"
    },
    parentId: null,
    variationType: "Heritage Benchmark",
    recreationTarget: "whole",
    likes: 94,
    saved: true,
    createdAt: "5 hours ago"
  },
  {
    id: "post_106",
    author: "Farzana Begum",
    authorAvatar: "F",
    title: "Royal Awadhi Dum Biryani (Lucknowi Handi)",
    category: "Awadhi Culinary Art",
    story: "True Awadhi biryani isn't tossed with heavy fiery gravy; it's a fragrant symphony of steam. We layered saffron-bloomed milk, golden caramelized onions (birista), crushed green cardamom, and kewra water with parboiled aged basmati in a heavy brass handi. The pot was sealed with wheat dough (dum pukht) so the steam recirculated every delicate volatile back into the rice.",
    image: imgBiryani,
    ingredients: ["Cardamom", "Desi Ghee", "Star Anise", "Clove", "Ginger", "Curry Leaves"],
    sensory: {
      aroma: "Floral Saffron, Rose & Kewra, Warm Ghee",
      taste: "Delicately Spiced, Sweet Hay & Savory",
      texture: "Fluffy Separate Rice Grains",
      aftertaste: "Cooling Cardamom & Toasted Butter"
    },
    parentId: null,
    variationType: "Heritage Benchmark",
    recreationTarget: "whole",
    likes: 112,
    saved: true,
    createdAt: "Yesterday"
  },
  {
    id: "post_107",
    author: "Rahul M.",
    authorAvatar: "R",
    title: "College Dorm Rice-Cooker Dum Biryani (Saffron Butter Twist)",
    category: "Adaptive Recreation",
    story: "Farzana's Awadhi dum biryani inspired me during finals week. I had no heavy handi or dough seal, so I used the 'warm' setting on my electric rice cooker with a damp towel under the glass lid to trap the steam. Replaced kewra with a splash of warm milk infused with crushed cardamom and butter. The grains came out wonderfully fragrant!",
    image: imgBiryani,
    ingredients: ["Cardamom", "Ginger", "Clove", "Lime Juice + Touch of Brown Sugar"],
    sensory: {
      aroma: "Sweet Cardamom, Butter Steam",
      taste: "Gentle Spiced Warmth",
      texture: "Tender Fluffy Grains",
      aftertaste: "Clean Cardamom Finish"
    },
    parentId: "post_106",
    variationType: "Dorm Room Adaptation",
    changedNotes: "Adapted dough-sealed brass handi to electric rice cooker with damp towel seal; used crushed cardamom butter.",
    retainedNotes: "Preserved trapped steam infusion (dum) and whole spice cardamom-clove synergy.",
    equipmentConstraint: "Minimal (Electric Rice Cooker)",
    timeConstraint: "Quick (< 30 mins)",
    recreationTarget: "aroma",
    likes: 43,
    saved: false,
    createdAt: "2 hours ago"
  },
  {
    id: "post_108",
    author: "Simran Kaur",
    authorAvatar: "S",
    title: "Sunday Morning Crispy Aloo Paratha (With Melting Makkhan)",
    category: "Punjabi Home Breakfast",
    story: "Nothing beats waking up to the sizzle of whole wheat parathas roasting on a heavy iron tawa. Stuffed generously with boiled potatoes, green chilies, lots of fresh coriander, and a pinch of tart amchur. Served straight from the flame onto a brass thali with a dollop of white butter and chilled dahi.",
    image: imgAlooParatha,
    ingredients: ["Atta (Whole Wheat Flour)", "Potatoes (Aloo)", "Green Chilies (Hari Mirch)", "Fresh Coriander (Dhania)", "Amchur", "Desi Ghee", "Curd / Yogurt"],
    sensory: {
      aroma: "Toasted Wheat, Ghee Sizzle, Spiced Potato",
      taste: "Savory Warmth, Tangy Potato, Melting Butter",
      texture: "Crispy Golden Edges & Fluffy Center",
      aftertaste: "Satisfying Wheaty Butter Warmth"
    },
    parentId: null,
    variationType: "Home Classic",
    recreationTarget: "whole",
    likes: 88,
    saved: true,
    createdAt: "Just now"
  },
  {
    id: "post_109",
    author: "Aditya Sharma",
    authorAvatar: "A",
    title: "Everyday Sizzling Dal Tadka & Jeera Rice (Ghee Tempered)",
    category: "Indian Comfort Food",
    story: "Whenever life gets chaotic, this is the meal I run to. Yellow toor dal simmered soft with turmeric, then crowned with a sizzling 15-second tadka of hot desi ghee, cracked cumin seeds, and golden fried garlic. The sizzling ghee traps the aroma right before you pour it over steaming basmati rice.",
    image: imgDalTadka,
    ingredients: ["Toor Dal (Yellow Pigeon Peas)", "Basmati Rice", "Turmeric (Haldi)", "Desi Ghee", "Cumin", "Garlic", "Hing (Asafetida)", "Fresh Coriander (Dhania)"],
    sensory: {
      aroma: "Crackling Cumin, Sizzling Garlic Ghee, Fresh Coriander",
      taste: "Rich Lentil Comfort with Tangy Garlic Sizzle",
      texture: "Silky Velvet Dal over Separate Long Grains",
      aftertaste: "Warm Garlic & Ghee Comfort"
    },
    parentId: null,
    variationType: "Everyday Staple",
    recreationTarget: "whole",
    likes: 96,
    saved: true,
    createdAt: "1 hour ago"
  },
  {
    id: "post_110",
    author: "Pooja V.",
    authorAvatar: "P",
    title: "12-Minute Quick Paneer Bhurji (Midnight Kitchen Run)",
    category: "Quick Pantry Fix",
    story: "Came home exhausted at 11 PM with just a block of paneer and standard onions and tomatoes. Crumbled the paneer roughly with my fingers, bloomed cumin and green chilies in ghee, and tossed it all for 3 minutes so the paneer stayed super soft and juicy. Scooped it with toasted bread!",
    image: imgCurry,
    ingredients: ["Paneer", "Onions (Pyaz)", "Tomatoes (Tamatar)", "Green Chilies (Hari Mirch)", "Turmeric (Haldi)", "Desi Ghee", "Kasuri Methi"],
    sensory: {
      aroma: "Sautéed Onions, Fresh Paneer, Kasuri Methi",
      taste: "Tangy Spiced Cottage Cheese",
      texture: "Juicy, Tender Crumbles",
      aftertaste: "Herbal Methi & Sweet Onion Warmth"
    },
    parentId: null,
    variationType: "Speedy Pantry Fix",
    recreationTarget: "flavour",
    likes: 54,
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
