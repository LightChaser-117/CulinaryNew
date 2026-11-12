/**
 * Culinary Echo - Gastronomy & Recreation Engine
 * Deterministic computational algorithms:
 * 1. FlavorDB Jaccard Volatile Matcher
 * 2. Explainable Molecular Pairing Matrix
 * 3. Functional Substitution Calculator
 * 4. Constraint-Based Adaptive Recreation Solver
 * 5. Contribution Lineage Tree Constructor
 */

import {
  FlavorDBIngredient,
  LivingContribution,
  RecreationResult,
  SubstitutionResult,
  CompoundSimilarity,
  LineageNode
} from '../types';
import { FLAVOR_DB, RECIPE_DB } from '../data/culinaryDatabase';

export const GastronomyEngine = {
  /**
   * Find ingredient profile from FlavorDB
   */
  getIngredient(name: string): FlavorDBIngredient | undefined {
    const clean = name.toLowerCase().trim();
    return FLAVOR_DB.find(
      i => i.name.toLowerCase() === clean || i.name.toLowerCase().includes(clean) || clean.includes(i.name.toLowerCase())
    );
  },

  /**
   * Compute shared chemical volatiles between two FlavorDB ingredients
   * Uses Jaccard Similarity: |A ∩ B| / |A ∪ B|
   */
  calculateCompoundSimilarity(ingAName: string, ingBName: string): CompoundSimilarity | null {
    const ingA = this.getIngredient(ingAName);
    const ingB = this.getIngredient(ingBName);

    if (!ingA || !ingB) return null;

    const setA = new Set(ingA.compounds);
    const setB = new Set(ingB.compounds);
    const intersection = [...setA].filter(c => setB.has(c));
    const union = new Set([...setA, ...setB]);
    const jaccard = union.size === 0 ? 0 : intersection.length / union.size;

    let explanation = `Both ingredients occupy distinct aroma spectrums.`;
    if (intersection.length > 0) {
      explanation = `Shared chemical volatiles [${intersection.join(', ')}] bridge the ${ingA.sensory.aroma[0]} and ${ingB.sensory.aroma[0]} registers.`;
    }

    return {
      score: Math.round(jaccard * 100),
      sharedCompounds: intersection,
      explanation,
      ingredientA: ingA,
      ingredientB: ingB
    };
  },

  /**
   * Find nearest molecular pairings for a given anchor ingredient in FlavorDB
   */
  findPairingsForIngredient(anchorName: string, topN: number = 6): Array<{
    target: FlavorDBIngredient;
    score: number;
    sharedCompounds: string[];
    explanation: string;
  }> {
    const anchor = this.getIngredient(anchorName);
    if (!anchor) return [];

    const results: Array<{
      target: FlavorDBIngredient;
      score: number;
      sharedCompounds: string[];
      explanation: string;
    }> = [];

    FLAVOR_DB.forEach(candidate => {
      if (candidate.name.toLowerCase() === anchor.name.toLowerCase()) return;
      const sim = this.calculateCompoundSimilarity(anchor.name, candidate.name);
      if (sim) {
        results.push({
          target: candidate,
          score: sim.score,
          sharedCompounds: sim.sharedCompounds,
          explanation: sim.explanation
        });
      }
    });

    // Sort by highest shared volatile score, then alphabetical
    return results
      .sort((a, b) => b.score - a.score || a.target.name.localeCompare(b.target.name))
      .slice(0, topN);
  },

  /**
   * Deterministic Substitution Suggester
   * Recommends kitchen accessible replacements grounded in FlavorDB chemistry
   */
  getIngredientSubstitution(
    missingIngredientName: string,
    targetGoal: 'whole' | 'aroma' | 'flavour' | 'texture' = 'whole'
  ): SubstitutionResult {
    const found = this.getIngredient(missingIngredientName);

    if (found && found.substitutes && found.substitutes.length > 0) {
      const topSub = found.substitutes[0];
      const rationale =
        found.substituteRationale?.[topSub] ||
        `Preserves core ${found.category.toLowerCase()} functional properties and volatile aroma notes.`;

      return {
        original: missingIngredientName,
        suggested: topSub,
        allOptions: found.substitutes,
        confidence: "Verified Gastronomy Substitution",
        reason: rationale,
        sharedVolatiles: found.compounds.slice(0, 2)
      };
    }

    // Heuristic pantry substitution for non-indexed ingredients
    const lower = missingIngredientName.toLowerCase();
    let suggested = "Neutral oil + pinch of sea salt & toasted black pepper";
    let reason = "Provides thermal lipid base and aromatic warmth.";

    if (lower.includes("fish") || lower.includes("meat") || lower.includes("protein")) {
      suggested = "Extra-firm Pressed Tofu or King Oyster Mushrooms";
      reason = "Matches fibrous cellular texture and absorbs braising liquor efficiently.";
    } else if (lower.includes("onion") || lower.includes("garlic") || lower.includes("shallot")) {
      suggested = "Toasted Asafetida (Hing) or Leek Greens";
      reason = "Supplies organosulfur aroma volatiles without allium root bulbs.";
    } else if (lower.includes("chili") || lower.includes("pepper")) {
      suggested = "Cracked Black Peppercorns + Sweet Paprika";
      reason = "Delivers piperine heat and carotenoid color.";
    }

    return {
      original: missingIngredientName,
      suggested,
      allOptions: [suggested],
      confidence: "Functional Kitchen Approximation",
      reason
    };
  },

  /**
   * Adaptive Recreation Solver with Honest Trade-Off Analysis
   * Solves practical culinary routes based on user's real kitchen constraints
   */
  solveRecreationPathway(
    dishOrPost: LivingContribution,
    missingIngredients: string[] = [],
    targetGoal: 'whole' | 'aroma' | 'flavour' | 'texture' = 'whole',
    equipment: string = 'standard',
    timeLimit: string = 'unlimited'
  ): RecreationResult {
    const allIngredients = dishOrPost.ingredients || [];
    const retainedIngredients = allIngredients.filter(i => !missingIngredients.includes(i));
    const substitutions = missingIngredients.map(m => this.getIngredientSubstitution(m, targetGoal));

    const tradeOffs: string[] = [];
    const steps: string[] = [];
    let confidenceScore = 95;

    // 1. Evaluate missing ingredient impact & substitution trade-offs
    if (missingIngredients.length > 0) {
      confidenceScore -= missingIngredients.length * 9;
      substitutions.forEach(sub => {
        tradeOffs.push(
          `Substituting ${sub.original} with "${sub.suggested}": ${sub.reason}`
        );
      });
    } else {
      tradeOffs.push(
        "All original core ingredients preserved in your pantry; sensory baseline retained at ~95%."
      );
    }

    // 2. Equipment Constraints
    if (equipment === 'no_smoker') {
      confidenceScore -= 8;
      tradeOffs.push(
        "No smoker or tandoor available: simulating smoky phenols using cast-iron dry spice charring."
      );
      steps.push(
        "Thermal Charring Step: Heat a dry, ungreased heavy skillet until wisps of smoke appear. Toast whole seeds and spices for 45-60 seconds until fragrant and darkened to generate woodsy guaiacol phenols."
      );
    } else if (equipment === 'dhungar') {
      // Dhungar actually enhances authentic woodsmoke volatiles!
      confidenceScore += 1;
      tradeOffs.push(
        "Dhungar Live Charcoal Infusion: Captures genuine tandoor woodsmoke phenols (guaiacol & syringol) directly into the ghee layer in 3 minutes."
      );
      steps.push(
        "Dhungar Smoke Trapping: Heat a lump of natural wood charcoal on your stove until red-hot. Place in a small heatproof bowl on top of the dish, drizzle 1/2 tsp ghee and a pinch of kasuri methi over the hot coal, and seal lid airtight for 3 to 4 minutes."
      );
    } else if (equipment === 'dum_foil') {
      tradeOffs.push(
        "Dum Pukht Hermetic Steam Seal: Condenses escaping delicate safranal, kewra, and cardamom volatiles back down into the grain."
      );
      steps.push(
        "Dum Pukht Sealed Pot: Seal rim with double-layered heavy foil or dough rope, clamp lid tightly, and place a flat iron skillet (tawa) beneath the pot over ultra-low flame for 20-25 minutes."
      );
    } else if (equipment === 'pressure_cooker') {
      confidenceScore -= 4;
      tradeOffs.push(
        "Pressure Cooker / Instant Pot: High-pressure steam accelerates gelatin extraction and pulse softening in 1/3 the time."
      );
      steps.push(
        "Pressure Tenderization: Lock lid and cook under high pressure for 25 minutes. Allow natural pressure release so delicate terpene aromatics recondense into the liquid."
      );
    } else if (equipment === 'minimal') {
      confidenceScore -= 12;
      tradeOffs.push(
        "Single-pan constraint: cooking operations condensed sequentially in one pan; emulsification requires active swirling."
      );
      steps.push(
        "One-Pan Sequence: Brown your aromatics and temper spices directly in your single pan first; introduce liquids and simmer protein within the same vessel to preserve heat energy."
      );
    }

    // 3. Time Constraints
    if (timeLimit === 'quick_30') {
      confidenceScore -= 10;
      tradeOffs.push(
        "Under 30-minute rush: Accelerated simmer yields a lighter, fresher broth rather than deep gelatinous mouthfeel."
      );
      steps.push(
        "Surface Area Maximization: Finely grate rhizomes and slice aromatics thinly to multiply volatile diffusion rates in half the simmering time."
      );
    } else if (timeLimit === 'express_15') {
      confidenceScore -= 22;
      tradeOffs.push(
        "15-minute express: Focuses strictly on high-impact volatile aromas rather than long-cooked umami compounds."
      );
      steps.push(
        "Flash Infusion: Use pre-boiled hot water/broth and bloom aromatics in very hot oil for 60 seconds before combining immediately."
      );
    }

    // 4. Goal-specific priority adjustments
    if (targetGoal === 'aroma') {
      steps.push(
        "Aroma Retention: Preserve delicate volatile terpenes by adding fragile herbs, citrus zests, and ground spices in the final 90 seconds off the heat, keeping lid on for 3 minutes."
      );
      tradeOffs.push("Priority on volatile nose: intense top-notes, with milder background stew depth.");
    } else if (targetGoal === 'flavour') {
      steps.push(
        "Flavour Balance Calibration: Taste broth warm. Balance sweet, sour, and salinity before introducing protein; adjust with pinch of sugar or squeeze of acid."
      );
    } else if (targetGoal === 'texture') {
      steps.push(
        "Mouthfeel Emulsion: Blend 2 tablespoons of cooked solids or cashew paste with warm liquid and whisk vigorously to build a silky suspension."
      );
      tradeOffs.push("Priority on velvety viscosity: mouthfeel is prioritized over clear liquid translucency.");
    } else {
      // Complete dish pathway
      const keyItems = retainedIngredients.slice(0, 3).join(', ') || 'available staples';
      steps.push(
        `Assembly & Cohesion: Combine available foundations (${keyItems}) and gently simmer until flavours harmoniously integrate.`
      );
    }

    // Add finishing culinary advice
    steps.push(
      "Resting & Evaluation: Rest for 4-5 minutes before serving so volatile aroma vapors stabilize at optimal tasting temperature (~60°C)."
    );

    // Floor at 40%
    confidenceScore = Math.max(40, Math.min(96, confidenceScore));

    return {
      confidence: confidenceScore,
      targetGoal,
      substitutions,
      tradeOffs,
      steps,
      retainedIngredients,
      missingIngredients
    };
  },

  /**
   * Reconstruct Contribution Lineage Tree
   */
  buildLineageTree(posts: LivingContribution[]): LineageNode[] {
    const map: Record<string, LineageNode> = {};
    const roots: LineageNode[] = [];

    // Initialize nodes
    posts.forEach(p => {
      map[p.id] = { ...p, children: [] };
    });

    // Wire up parent-child relationships
    posts.forEach(p => {
      if (p.parentId && map[p.parentId]) {
        map[p.parentId].children.push(map[p.id]);
      } else {
        roots.push(map[p.id]);
      }
    });

    return roots;
  },

  /**
   * Filter contributions by sensory attributes and keywords
   */
  filterContributions(
    posts: LivingContribution[],
    query: string = '',
    sensoryTag: string | null = null
  ): LivingContribution[] {
    const q = query.toLowerCase().trim();
    const tag = sensoryTag ? sensoryTag.toLowerCase().trim() : null;

    return posts.filter(post => {
      // 1. Sensory Tag filter
      if (tag) {
        const matchesSensory =
          post.sensory.aroma.toLowerCase().includes(tag) ||
          post.sensory.taste.toLowerCase().includes(tag) ||
          post.sensory.texture.toLowerCase().includes(tag) ||
          (post.sensory.aftertaste && post.sensory.aftertaste.toLowerCase().includes(tag));
        if (!matchesSensory) return false;
      }

      // 2. Query text filter
      if (!q) return true;

      const matchesTitle = post.title.toLowerCase().includes(q);
      const matchesStory = post.story.toLowerCase().includes(q);
      const matchesAuthor = post.author.toLowerCase().includes(q);
      const matchesCategory = post.category.toLowerCase().includes(q);
      const matchesIngredients = post.ingredients.some(ing => ing.toLowerCase().includes(q));
      const matchesSensoryText =
        post.sensory.aroma.toLowerCase().includes(q) ||
        post.sensory.taste.toLowerCase().includes(q) ||
        post.sensory.texture.toLowerCase().includes(q);

      // Check if user queried a chemical compound present in FlavorDB
      const compoundMatch = FLAVOR_DB.some(
        f =>
          f.compounds.some(c => c.toLowerCase().includes(q)) &&
          post.ingredients.some(i => i.toLowerCase().includes(f.name.toLowerCase()))
      );

      return matchesTitle || matchesStory || matchesAuthor || matchesCategory || matchesIngredients || matchesSensoryText || compoundMatch;
    });
  },

  /**
   * Interactive Flavor Harmony Compass
   * Analyzes an entire dish's ingredients to compute its sensory spectrum,
   * overall harmony score, and an unexpected culinary twist.
   */
  computeDishSensoryProfile(ingredients: string[]): {
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
  } {
    let smoky = 0;
    let sourTart = 0;
    let warmSpice = 0;
    let velvety = 0;
    let brightCitrus = 0;
    let earthy = 0;

    const matchedCompounds = new Set<string>();
    const compoundFrequency: Record<string, number> = {};

    ingredients.forEach(ingName => {
      const ing = this.getIngredient(ingName);
      if (ing) {
        ing.compounds.forEach(c => {
          matchedCompounds.add(c);
          compoundFrequency[c] = (compoundFrequency[c] || 0) + 1;

          // Compute dimension points from natural volatiles
          if (c === 'Guaiacol' || c === 'Syringol') smoky += 35;
          if (c === 'Tartaric acid' || c === 'Citral' || c === 'Furfural') sourTart += 30;
          if (c === 'Eugenol' || c === 'Caryophyllene' || c === 'Terpinyl acetate' || c === 'Cuminaldehyde') warmSpice += 30;
          if (c === 'Delta-octalactone' || c === 'Delta-decalactone' || c === 'Lauric acid') velvety += 40;
          if (c === 'Citral' || c === 'Limonene' || c === 'Geraniol') brightCitrus += 35;
          if (c === 'Cuminaldehyde' || c === 'Tetramethylpyrazine' || c === 'Theobromine') earthy += 30;
        });

        // Also factor in sensory tags
        const aromaStr = ing.sensory.aroma.join(' ').toLowerCase();
        if (aromaStr.includes('smoky')) smoky += 20;
        if (aromaStr.includes('sour') || aromaStr.includes('tart')) sourTart += 20;
        if (aromaStr.includes('warm') || aromaStr.includes('spice')) warmSpice += 20;
        if (aromaStr.includes('creamy') || aromaStr.includes('sweet')) velvety += 20;
        if (aromaStr.includes('citrus') || aromaStr.includes('crisp')) brightCitrus += 20;
        if (aromaStr.includes('earthy') || aromaStr.includes('woodsy')) earthy += 20;
      } else {
        // Fallback for unindexed pantry items
        const lower = ingName.toLowerCase();
        if (lower.includes('smoke') || lower.includes('char')) smoky += 30;
        if (lower.includes('lime') || lower.includes('lemon') || lower.includes('vinegar')) sourTart += 35;
        if (lower.includes('chili') || lower.includes('pepper') || lower.includes('cinnamon')) warmSpice += 30;
        if (lower.includes('cream') || lower.includes('milk') || lower.includes('butter') || lower.includes('coconut')) velvety += 35;
        if (lower.includes('ginger') || lower.includes('grass') || lower.includes('mint')) brightCitrus += 30;
        if (lower.includes('mushroom') || lower.includes('chocolate') || lower.includes('cumin')) earthy += 30;
      }
    });

    // Clamp values 0 - 100
    const dimensions = {
      smoky: Math.min(100, Math.max(10, smoky)),
      sourTart: Math.min(100, Math.max(10, sourTart)),
      warmSpice: Math.min(100, Math.max(10, warmSpice)),
      velvety: Math.min(100, Math.max(10, velvety)),
      brightCitrus: Math.min(100, Math.max(10, brightCitrus)),
      earthy: Math.min(100, Math.max(10, earthy))
    };

    // Find bridging compounds (shared by 2 or more ingredients)
    const sharedVolatilesFound = Object.entries(compoundFrequency)
      .filter(([_, count]) => count >= 2)
      .map(([comp]) => comp);

    // Calculate overall culinary harmony score
    // Higher if there are shared volatiles, high sensory balance across acid/fat/spice
    const rawHarmony = 68 + sharedVolatilesFound.length * 9;
    const harmonyScore = Math.min(97, Math.max(65, rawHarmony));

    // Determine dominant bridge name
    let dominantBridge = 'Harmonious Pantry Blend';
    if (sharedVolatilesFound.includes('Guaiacol')) {
      dominantBridge = 'Campfire Phenol Bridge (Guaiacol)';
    } else if (sharedVolatilesFound.includes('Eugenol')) {
      dominantBridge = 'Warm Spiced Wood Bridge (Eugenol)';
    } else if (sharedVolatilesFound.includes('Citral')) {
      dominantBridge = 'Bright Lemon-Herb Bridge (Citral)';
    } else if (sharedVolatilesFound.includes('Limonene')) {
      dominantBridge = 'Zesty Citrus Peel Bridge (Limonene)';
    } else if (dimensions.sourTart > 60 && dimensions.velvety > 50) {
      dominantBridge = 'Velvety Acid-Lipid Balance';
    } else if (dimensions.smoky > 50 && dimensions.warmSpice > 50) {
      dominantBridge = 'Smoky Warm-Spice Harmony';
    }

    // Creative culinary twist based on chemistry gaps
    let funTwist = 'Garnish with freshly toasted cumin to elevate earthy warmth.';
    if (dimensions.sourTart < 30) {
      funTwist = 'Try finishing with a splash of tamarind or lime to create an energizing sweet-tart lift!';
    } else if (dimensions.smoky < 25) {
      funTwist = 'Toast your whole spices in a dry cast-iron skillet for 45s to unlock roasted campfire phenols.';
    } else if (dimensions.velvety < 30) {
      funTwist = 'Stir in a spoonful of cashew cream or coconut milk to soften the sharp spices with natural lipids.';
    } else if (sharedVolatilesFound.length > 0) {
      funTwist = `Notice how ${sharedVolatilesFound[0]} bridges your ingredients together with natural aromatic harmony!`;
    }

    return {
      dimensions,
      harmonyScore,
      dominantBridge,
      sharedVolatilesFound,
      funTwist
    };
  },

  /**
   * Secret Food Twins & Surprising Pairings
   * Curated pairings that seem unusual at first glance, but are validated by shared aroma chemistry.
   */
  getSecretPairings(): Array<{
    id: string;
    itemA: string;
    itemB: string;
    matchScore: number;
    badge: string;
    secretLink: string;
    kitchenTip: string;
    cuisineCrossover: string;
  }> {
    return [
      {
        id: 'sp_1',
        itemA: 'Dark Chocolate',
        itemB: 'Smoked Paprika',
        matchScore: 89,
        badge: 'Savory & Smoky',
        secretLink: 'Both share roasted pyrazines and earthy phenolic notes.',
        kitchenTip: 'Melt a single square of 80% dark chocolate into slow-simmered smoky chili or black beans.',
        cuisineCrossover: 'Mexican Mole × Spanish Charcuterie'
      },
      {
        id: 'sp_2',
        itemA: 'Cardamom',
        itemB: 'Coffee / Roasted Beans',
        matchScore: 94,
        badge: 'Aromatic Spark',
        secretLink: 'Both contain cooling terpinyl & cineole volatiles that cut through roasted bitterness.',
        kitchenTip: 'Crack 2 green cardamom pods directly into your morning french press or cold-brew pitcher.',
        cuisineCrossover: 'Middle Eastern Qahwa × Nordic Fika'
      },
      {
        id: 'sp_3',
        itemA: 'Tamarind',
        itemB: 'Mezcal / Peated Malt',
        matchScore: 86,
        badge: 'Campfire Tartness',
        secretLink: 'Furfural in cooked tamarind creates a stunning bridge with guaiacol in roasted agave.',
        kitchenTip: 'Shake a teaspoon of warm tamarind paste with mezcal, lime juice, and a rim of toasted cumin salt.',
        cuisineCrossover: 'South Indian Rasam × Oaxacan Agave Bar'
      },
      {
        id: 'sp_4',
        itemA: 'Coconut Milk',
        itemB: 'Lemongrass',
        matchScore: 92,
        badge: 'Velvety Citrus',
        secretLink: 'Rich lactone fats in coconut milk trap and gently amplify the volatile citral top-notes.',
        kitchenTip: 'Bruise fresh lemongrass stalks directly into simmering coconut milk for an instant soothing broth.',
        cuisineCrossover: 'Thai Tom Kha × Kerala Coastal Curries'
      },
      {
        id: 'sp_5',
        itemA: 'Clove',
        itemB: 'Ginger',
        matchScore: 88,
        badge: 'Warm Fire & Zing',
        secretLink: 'Eugenol in clove and zingiberene in ginger fuse into an intoxicating warm-spiced register.',
        kitchenTip: 'Simmer crushed fresh ginger with two whole cloves in apple cider or black tea.',
        cuisineCrossover: 'Indian Masala Chai × Caribbean Spiced Punch'
      }
    ];
  }
};
