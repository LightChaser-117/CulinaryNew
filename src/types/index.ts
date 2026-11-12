/**
 * Culinary Echo - Domain Types
 * Computational Gastronomy & Living Social Knowledge
 */

export interface SensoryProfile {
  aroma: string;
  taste: string;
  texture: string;
  aftertaste?: string;
}

export interface FlavorDBIngredient {
  name: string;
  category: string;
  compounds: string[]; // Documented volatile chemical compounds
  sensory: {
    aroma: string[];
    taste: string[];
  };
  substitutes: string[];
  substituteRationale?: Record<string, string>;
  description: string;
}

export interface RecipeDBItem {
  id: string;
  title: string;
  cuisine: string;
  prepTimeMinutes: number;
  ingredients: string[];
  sensory: SensoryProfile;
  process: string[];
  equipmentNeeded: string[];
  difficulty: 'Simple' | 'Moderate' | 'Slow Simmer';
}

export interface CocktailDBItem {
  id: string;
  title: string;
  category: string;
  isAlcoholic: boolean;
  ingredients: string[];
  sensory: SensoryProfile;
  method: string;
  glassware: string;
  flavorBridge: string;
}

export interface LivingContribution {
  id: string;
  author: string;
  authorAvatar: string;
  title: string;
  category: string;
  story: string;
  image: string;
  ingredients: string[];
  sensory: SensoryProfile;
  parentId: string | null;
  variationType: string;
  recreationTarget?: 'whole' | 'aroma' | 'flavour' | 'texture';
  changedNotes?: string;
  retainedNotes?: string;
  equipmentConstraint?: string;
  timeConstraint?: string;
  likes: number;
  saved: boolean;
  createdAt: string;
}

export interface CommunityCircle {
  id: string;
  name: string;
  curator: string;
  members: number;
  description: string;
  badgeColor: string;
  sensoryFocus: string[];
  joined?: boolean;
}

export interface SubstitutionResult {
  original: string;
  suggested: string;
  allOptions: string[];
  confidence: string;
  reason: string;
  sharedVolatiles?: string[];
}

export interface RecreationResult {
  confidence: number;
  targetGoal: 'whole' | 'aroma' | 'flavour' | 'texture';
  substitutions: SubstitutionResult[];
  tradeOffs: string[];
  steps: string[];
  retainedIngredients: string[];
  missingIngredients: string[];
}

export interface CompoundSimilarity {
  score: number;
  sharedCompounds: string[];
  explanation: string;
  ingredientA: FlavorDBIngredient;
  ingredientB: FlavorDBIngredient;
}

export interface LineageNode extends LivingContribution {
  children: LineageNode[];
}

export interface DishSensoryProfile {
  dimensions: {
    smoky: number;
    sourTart: number;
    warmSpice: number;
    velvety: number;
    brightCitrus: number;
    earthy: number;
  };
  harmonyScore: number;
  dominantBridge: string;
  sharedVolatilesFound: string[];
  funTwist: string;
}

export interface SecretPairing {
  id: string;
  itemA: string;
  itemB: string;
  matchScore: number;
  badge: string;
  secretLink: string;
  kitchenTip: string;
  cuisineCrossover: string;
}

