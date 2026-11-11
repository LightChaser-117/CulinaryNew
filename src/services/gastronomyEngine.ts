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
  }
};
