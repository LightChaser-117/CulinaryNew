/**
 * Unit Test Suite for GastronomyEngine
 * Tests deterministic Jaccard similarity, molecular pairing ranking,
 * substitution heuristics, adaptive recreation solver, and lineage tree construction.
 */

import { describe, it, expect } from 'vitest';
import { GastronomyEngine } from './gastronomyEngine';
import { LivingContribution } from '../types';

describe('GastronomyEngine - Jaccard Volatile Matcher', () => {
  it('correctly calculates Jaccard similarity between ingredients with shared volatiles', () => {
    // Smoked Paprika: ["Guaiacol", "Syringol", "Capsaicin", "Isovaleric acid"]
    // Mezcal: ["Guaiacol", "4-Methylguaiacol", "Eugenol", "Phenols"]
    // Intersection: ["Guaiacol"] (1)
    // Union: ["Guaiacol", "Syringol", "Capsaicin", "Isovaleric acid", "4-Methylguaiacol", "Eugenol", "Phenols"] (7)
    // Jaccard: 1 / 7 = ~14.28% -> rounded to 14%
    const similarity = GastronomyEngine.calculateCompoundSimilarity('Smoked Paprika', 'Mezcal / Peated Malt');

    expect(similarity).not.toBeNull();
    expect(similarity!.sharedCompounds).toContain('Guaiacol');
    expect(similarity!.score).toBe(14);
    expect(similarity!.explanation).toContain('Guaiacol');
  });

  it('returns 100% similarity when comparing an ingredient against itself', () => {
    const similarity = GastronomyEngine.calculateCompoundSimilarity('Cardamom', 'Cardamom');
    expect(similarity).not.toBeNull();
    expect(similarity!.score).toBe(100);
    expect(similarity!.sharedCompounds.length).toBe(similarity!.ingredientA.compounds.length);
  });

  it('returns 0% similarity for ingredients with completely disjoint aroma compounds', () => {
    // Coconut Milk: Delta-octalactone, Delta-decalactone, Lauric acid, Nonanoic acid
    // Cumin: Cuminaldehyde, Cymene, Terpenes, Pinene
    const similarity = GastronomyEngine.calculateCompoundSimilarity('Coconut Milk', 'Cumin');
    expect(similarity).not.toBeNull();
    expect(similarity!.score).toBe(0);
    expect(similarity!.sharedCompounds).toEqual([]);
    expect(similarity!.explanation).toContain('distinct aroma');
  });

  it('handles case-insensitivity and trim whitespace gracefully', () => {
    const similarity = GastronomyEngine.calculateCompoundSimilarity('  smoked paprika  ', 'mezcal / peated malt');
    expect(similarity).not.toBeNull();
    expect(similarity!.sharedCompounds).toContain('Guaiacol');
  });

  it('returns null if either ingredient is not in the FlavorDB catalog', () => {
    const similarity = GastronomyEngine.calculateCompoundSimilarity('Unknown Alien Spice', 'Ginger');
    expect(similarity).toBeNull();
  });
});

describe('GastronomyEngine - Pairing Matrix', () => {
  it('ranks nearest molecular pairings in descending order of shared volatile score', () => {
    const pairings = GastronomyEngine.findPairingsForIngredient('Smoked Paprika', 5);
    expect(pairings.length).toBeGreaterThan(0);
    expect(pairings.length).toBeLessThanOrEqual(5);

    // Verify sorted in descending order
    for (let i = 0; i < pairings.length - 1; i++) {
      expect(pairings[i].score).toBeGreaterThanOrEqual(pairings[i + 1].score);
    }

    // Verify self is never included in pairing suggestions
    const selfIncluded = pairings.some(p => p.target.name.toLowerCase() === 'smoked paprika');
    expect(selfIncluded).toBe(false);
  });
});

describe('GastronomyEngine - Substitution Engine', () => {
  it('returns verified chemistry-backed substitutions for indexed ingredients', () => {
    const sub = GastronomyEngine.getIngredientSubstitution('Tamarind');
    expect(sub.original).toBe('Tamarind');
    expect(sub.suggested).toBe('Lime Juice + Touch of Brown Sugar');
    expect(sub.confidence).toContain('Verified');
    expect(sub.reason).toContain('tartaric');
  });

  it('provides a sensible fallback heuristic for uncataloged ingredients without throwing', () => {
    const sub = GastronomyEngine.getIngredientSubstitution('Wild White Fish');
    expect(sub.original).toBe('Wild White Fish');
    expect(sub.suggested).toContain('Tofu');
    expect(sub.confidence).toContain('Functional');
  });
});

describe('GastronomyEngine - Adaptive Recreation Pathway Solver', () => {
  const sampleDish: LivingContribution = {
    id: 'test_dish',
    author: 'Chef Test',
    authorAvatar: 'C',
    title: 'Smoked Coconut Tamarind Broth',
    category: 'Heritage',
    story: 'Test story',
    image: 'test.jpg',
    ingredients: ['Coconut Milk', 'Tamarind', 'Ginger', 'Cumin'],
    sensory: {
      aroma: 'Smoky, Tart',
      taste: 'Tangy Heat',
      texture: 'Velvety'
    },
    parentId: null,
    variationType: 'Original',
    likes: 10,
    saved: false,
    createdAt: '1 day ago'
  };

  it('calculates optimal baseline when no ingredients are missing', () => {
    const result = GastronomyEngine.solveRecreationPathway(
      sampleDish,
      [],
      'whole',
      'standard',
      'unlimited'
    );

    expect(result.confidence).toBe(95);
    expect(result.substitutions.length).toBe(0);
    expect(result.tradeOffs.some(t => t.includes('95%'))).toBe(true);
    expect(result.steps.length).toBeGreaterThan(0);
  });

  it('determines penalty and provides transparent trade-offs when ingredients are missing', () => {
    const result = GastronomyEngine.solveRecreationPathway(
      sampleDish,
      ['Tamarind', 'Coconut Milk'],
      'whole',
      'standard',
      'unlimited'
    );

    // 95 - (2 * 9) = 77
    expect(result.confidence).toBe(77);
    expect(result.substitutions.length).toBe(2);
    expect(result.tradeOffs.some(t => t.includes('Lime Juice'))).toBe(true);
  });

  it('incorporates technique adaptations when smoker/charcoal is not available', () => {
    const result = GastronomyEngine.solveRecreationPathway(
      sampleDish,
      [],
      'whole',
      'no_smoker',
      'unlimited'
    );

    expect(result.confidence).toBe(87); // 95 - 8
    expect(result.steps.some(s => s.toLowerCase().includes('skillet') || s.toLowerCase().includes('charring'))).toBe(true);
    expect(result.tradeOffs.some(t => t.toLowerCase().includes('char'))).toBe(true);
  });

  it('adjusts workflow for express time limits', () => {
    const result = GastronomyEngine.solveRecreationPathway(
      sampleDish,
      [],
      'whole',
      'standard',
      'express_15'
    );

    expect(result.confidence).toBe(73); // 95 - 22
    expect(result.steps.some(s => s.toLowerCase().includes('flash') || s.toLowerCase().includes('hot'))).toBe(true);
  });

  it('respects target priority goals (aroma, texture, flavour)', () => {
    const aromaResult = GastronomyEngine.solveRecreationPathway(sampleDish, [], 'aroma');
    expect(aromaResult.steps.some(s => s.toLowerCase().includes('aroma'))).toBe(true);

    const textureResult = GastronomyEngine.solveRecreationPathway(sampleDish, [], 'texture');
    expect(textureResult.steps.some(s => s.toLowerCase().includes('texture') || s.toLowerCase().includes('mouthfeel'))).toBe(true);
  });

  it('enforces confidence score limits between 40 and 96', () => {
    const result = GastronomyEngine.solveRecreationPathway(
      sampleDish,
      ['Coconut Milk', 'Tamarind', 'Ginger', 'Cumin', 'Item5', 'Item6', 'Item7', 'Item8'],
      'whole',
      'minimal',
      'express_15'
    );

    expect(result.confidence).toBeGreaterThanOrEqual(40);
    expect(result.confidence).toBeLessThanOrEqual(96);
  });
});

describe('GastronomyEngine - Lineage Tree Constructor', () => {
  it('correctly builds ancestry tree connecting child variations to root source', () => {
    const testPosts: LivingContribution[] = [
      {
        id: 'root_1',
        author: 'Originator',
        authorAvatar: 'O',
        title: 'Original Rasam',
        category: 'Heritage',
        story: 'Origin story',
        image: 'img.jpg',
        ingredients: ['Tamarind', 'Cumin'],
        sensory: { aroma: 'Tart', taste: 'Sour', texture: 'Light' },
        parentId: null,
        variationType: 'Root',
        likes: 5,
        saved: false,
        createdAt: '3 days ago'
      },
      {
        id: 'child_1',
        author: 'Adapter 1',
        authorAvatar: 'A',
        title: 'Studio Apartment Rasam',
        category: 'Variation',
        story: 'Adapted for kettle',
        image: 'img.jpg',
        ingredients: ['Lime Juice', 'Cumin'],
        sensory: { aroma: 'Tart', taste: 'Sour', texture: 'Light' },
        parentId: 'root_1',
        variationType: 'Variation',
        likes: 3,
        saved: false,
        createdAt: '1 day ago'
      },
      {
        id: 'child_2',
        author: 'Adapter 2',
        authorAvatar: 'B',
        title: 'Smoked Rasam Cocktail',
        category: 'Variation',
        story: 'Drink adaptation',
        image: 'img.jpg',
        ingredients: ['Mezcal', 'Tamarind'],
        sensory: { aroma: 'Smoky', taste: 'Sour', texture: 'Smooth' },
        parentId: 'root_1',
        variationType: 'Variation',
        likes: 2,
        saved: false,
        createdAt: '4 hours ago'
      }
    ];

    const tree = GastronomyEngine.buildLineageTree(testPosts);

    expect(tree.length).toBe(1);
    expect(tree[0].id).toBe('root_1');
    expect(tree[0].children.length).toBe(2);
    expect(tree[0].children.map(c => c.id)).toContain('child_1');
    expect(tree[0].children.map(c => c.id)).toContain('child_2');
  });
});

describe('GastronomyEngine - Filter and Search', () => {
  const samplePosts: LivingContribution[] = [
    {
      id: 'p1',
      author: 'Ananya',
      authorAvatar: 'A',
      title: 'Grandmothers Tamarind Rasam',
      category: 'Heritage',
      story: 'Smoky neem leaves and monsoon memories',
      image: 'img1.jpg',
      ingredients: ['Tamarind', 'Cumin'],
      sensory: { aroma: 'Smoky, Tart', taste: 'Tangy Heat', texture: 'Velvety' },
      parentId: null,
      variationType: 'Root',
      likes: 12,
      saved: false,
      createdAt: 'Yesterday'
    },
    {
      id: 'p2',
      author: 'Mateo',
      authorAvatar: 'M',
      title: 'Oaxacan Mole',
      category: 'Heritage',
      story: 'Deep rich chocolate and smoked chilis',
      image: 'img2.jpg',
      ingredients: ['Smoked Paprika', 'Dark Chocolate'],
      sensory: { aroma: 'Smoky, Roasted Cocoa', taste: 'Deep Umami', texture: 'Dense' },
      parentId: null,
      variationType: 'Root',
      likes: 20,
      saved: false,
      createdAt: '2 days ago'
    }
  ];

  it('filters by sensory tag', () => {
    const tartPosts = GastronomyEngine.filterContributions(samplePosts, '', 'Tart');
    expect(tartPosts.length).toBe(1);
    expect(tartPosts[0].id).toBe('p1');
  });

  it('filters by compound name via FlavorDB link', () => {
    // Guaiacol is contained in Smoked Paprika
    const guaiacolMatches = GastronomyEngine.filterContributions(samplePosts, 'guaiacol');
    expect(guaiacolMatches.some(p => p.id === 'p2')).toBe(true);
  });
});
