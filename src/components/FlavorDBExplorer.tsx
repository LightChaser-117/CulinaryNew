/**
 * FlavorDB Explorer Component
 * Simple, intuitive, and friendly flavor pairing tool.
 * Translates molecular gastronomy into everyday cooking language.
 */

import React, { useState, useMemo } from 'react';
import { FLAVOR_DB } from '../data/culinaryDatabase';
import { GastronomyEngine } from '../services/gastronomyEngine';
import { Sparkles, ArrowRight, Heart, HelpCircle, Utensils, Shuffle } from 'lucide-react';

interface FlavorDBExplorerProps {
  initialIngredient?: string;
  onExploreIngredientInFeed: (ingredientName: string) => void;
}

// Plain-English translations for common food aroma molecules
const PLAIN_SCENT_TRANSLATIONS: Record<string, string> = {
  Guaiacol: 'Toasted wood & campfire smoke',
  Syringol: 'Sweet hardwood smoke',
  Eugenol: 'Warm spiced clove & sweet wood',
  Capsaicin: 'Spicy chili warmth',
  Citral: 'Crisp fresh lemon zest',
  Limonene: 'Bright citrus peel',
  Vanillin: 'Sweet soothing vanilla',
  '1,8-Cineole': 'Cooling eucalyptus & herbal breeze',
  'Terpinyl acetate': 'Sweet floral cardamom spice',
  Geraniol: 'Delicate floral citrus',
  Zingiberene: 'Fresh zesty ginger note',
  Gingerol: 'Brisk tingling heat',
  'Delta-octalactone': 'Velvety coconut creaminess',
  Cuminaldehyde: 'Earthy warm toasted spice',
  Anethole: 'Sweet licorice & herbal warmth',
  Theobromine: 'Deep bittersweet dark chocolate',
  'Tartaric acid': 'Tangy fruit acidity',
  Sotolon: 'Warm toasted maple, fenugreek & brown sugar',
  '(E)-2-Alkenyl disulfides': 'Savory roasted allium & garlic warmth',
  'Allyl isothiocyanate': 'Pungent crackling mustard warmth',
  Caryophyllene: 'Spicy woody black pepper & herbal warmth',
  Maltol: 'Sweet toasted sugar & rich butter',
  'Alpha-pinene': 'Fresh pine forest & evergreen freshness',
  Diacetyl: 'Velvety melted butter & toasted cream',
  'Butyric acid': 'Aged buttery nuttiness & golden ghee aroma',
  Citronellol: 'Sweet floral citrus & fresh crushed leaf',
  Myrcene: 'Peppery green mango & herbal freshness'
};

export const FlavorDBExplorer: React.FC<FlavorDBExplorerProps> = ({
  initialIngredient,
  onExploreIngredientInFeed
}) => {
  const [selectedAnchor, setSelectedAnchor] = useState<string>(
    initialIngredient || FLAVOR_DB[0].name
  );
  const [compareTarget, setCompareTarget] = useState<string>(
    FLAVOR_DB[1]?.name || ''
  );
  const [showHowItWorks, setShowHowItWorks] = useState<boolean>(false);

  const anchor = useMemo(() => {
    return FLAVOR_DB.find(i => i.name.toLowerCase() === selectedAnchor.toLowerCase()) || FLAVOR_DB[0];
  }, [selectedAnchor]);

  const pairings = useMemo(() => {
    return GastronomyEngine.findPairingsForIngredient(anchor.name, 6);
  }, [anchor]);

  const directComparison = useMemo(() => {
    if (!compareTarget || compareTarget === anchor.name) return null;
    return GastronomyEngine.calculateCompoundSimilarity(anchor.name, compareTarget);
  }, [anchor, compareTarget]);

  // Pick a random pairing to inspire the user
  const handlePickRandomPair = () => {
    const randomAnchor = FLAVOR_DB[Math.floor(Math.random() * FLAVOR_DB.length)];
    const otherCandidates = FLAVOR_DB.filter(i => i.name !== randomAnchor.name);
    const randomTarget = otherCandidates[Math.floor(Math.random() * otherCandidates.length)];

    setSelectedAnchor(randomAnchor.name);
    setCompareTarget(randomTarget.name);
  };

  return (
    <div className="space-y-6">
      {/* Friendly Overview Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-900 font-semibold">
              The Flavor Matcher
            </span>
            <span className="text-stone-300">·</span>
            <span className="text-xs text-stone-500">Based on FlavorDB Chemistry</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 text-balance leading-tight">
            Why Ingredients Taste Great Together
          </h2>

          <p className="text-sm sm:text-base text-stone-600 mt-2.5 leading-relaxed">
            Ever wonder why foods from completely different cultures pair so well? It is because they share the same natural scent notes. Choose an ingredient below to see its natural partners in everyday cooking.
          </p>

          <button
            type="button"
            onClick={() => setShowHowItWorks(!showHowItWorks)}
            className="mt-3 text-xs text-amber-900 hover:text-stone-900 font-semibold flex items-center gap-1.5 transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{showHowItWorks ? 'Hide simple explanation' : 'How does this work? (Simple explanation)'}</span>
          </button>

          {showHowItWorks && (
            <div className="mt-4 p-4 bg-amber-50/60 rounded-2xl border border-amber-200/80 text-xs text-amber-950 space-y-2 leading-relaxed animate-in fade-in duration-150">
              <span className="font-bold block text-stone-900">How Flavor Pairing Works in Plain English:</span>
              <p>
                <strong>1. Scent is 80% of Taste:</strong> When you eat, most of what you enjoy actually comes from natural aroma molecules traveling to your nose.
              </p>
              <p>
                <strong>2. Shared Aroma Notes:</strong> Mexican Mezcal and Spanish Smoked Paprika come from different parts of the world, but both contain the exact same smoky wood note (called <em>Guaiacol</em>). That's why putting them in a marinade or cocktail tastes effortlessly harmonious!
              </p>
              <p>
                <strong>3. No Guesswork:</strong> We calculate these connections directly from peer-reviewed food science (FlavorDB), completely offline and transparently.
              </p>
            </div>
          )}
        </div>

        {/* Main Interactive Controls */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Column 1: Choose Ingredient & Its Profile */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                Pick Your Main Ingredient:
              </label>
              <select
                value={anchor.name}
                onChange={e => setSelectedAnchor(e.target.value)}
                className="w-full text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-amber-900 font-medium text-stone-800"
              >
                {FLAVOR_DB.map(ing => (
                  <option key={ing.name} value={ing.name}>
                    {ing.name} ({ing.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Simple Card for the Selected Ingredient */}
            <div className="p-4 sm:p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-serif font-bold text-stone-900">
                  {anchor.name}
                </h3>
                <span className="text-[11px] bg-stone-200 text-stone-700 px-2 py-0.5 rounded-md font-medium">
                  {anchor.category}
                </span>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">
                {anchor.description}
              </p>

              {/* Natural scent notes in plain words */}
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block mb-1">
                  What it smells & tastes like:
                </span>
                <div className="flex flex-wrap gap-1">
                  {anchor.sensory.aroma.map(aroma => (
                    <span
                      key={aroma}
                      className="text-[11px] bg-white border border-stone-200 text-stone-800 px-2.5 py-0.5 rounded-md font-medium"
                    >
                      {aroma}
                    </span>
                  ))}
                  {anchor.sensory.taste.map(taste => (
                    <span
                      key={taste}
                      className="text-[11px] bg-amber-50 border border-amber-200 text-amber-900 px-2.5 py-0.5 rounded-md font-medium"
                    >
                      {taste}
                    </span>
                  ))}
                </div>
              </div>

              {/* Natural key scents */}
              <div className="pt-2 border-t border-stone-200">
                <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block mb-1">
                  Key Natural Scent Notes:
                </span>
                <div className="space-y-1">
                  {anchor.compounds.slice(0, 3).map(c => (
                    <div key={c} className="text-[11px] flex items-center justify-between gap-2">
                      <span className="font-mono text-stone-700">{c}</span>
                      <span className="text-stone-500 text-[10px] text-right truncate">
                        {PLAIN_SCENT_TRANSLATIONS[c] || 'Natural aroma'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => onExploreIngredientInFeed(anchor.name)}
                className="w-full mt-2 py-2 text-xs font-semibold text-stone-800 bg-white hover:bg-stone-100 border border-stone-200 rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Find Recipes With {anchor.name}</span>
                <ArrowRight className="w-3.5 h-3.5 text-stone-500" />
              </button>
            </div>

            {/* Quick Pair Test Sandbox */}
            <div className="p-4 sm:p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                  <Utensils className="w-3.5 h-3.5 text-amber-800" />
                  Test a Pair
                </span>
                <button
                  type="button"
                  onClick={handlePickRandomPair}
                  className="text-[11px] text-amber-900 hover:underline flex items-center gap-1 font-medium"
                  title="Surprise me with a random combination"
                >
                  <Shuffle className="w-3 h-3" />
                  <span>Surprise Me</span>
                </button>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">
                Will <strong>{anchor.name}</strong> work well with another ingredient?
              </p>

              <select
                value={compareTarget}
                onChange={e => setCompareTarget(e.target.value)}
                className="w-full text-xs bg-white border border-stone-200 rounded-xl px-2.5 py-2 focus:outline-none focus:ring-1 focus:ring-amber-900 font-medium text-stone-800"
              >
                {FLAVOR_DB.filter(i => i.name !== anchor.name).map(i => (
                  <option key={i.name} value={i.name}>
                    {i.name} ({i.category})
                  </option>
                ))}
              </select>

              {directComparison && (
                <div className="pt-2 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-stone-700">Pairing Compatibility:</span>
                    <span
                      className={`font-semibold px-2 py-0.5 rounded-md text-[11px] ${
                        directComparison.score > 0
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-stone-200 text-stone-700'
                      }`}
                    >
                      {directComparison.score > 0 ? 'Natural Match' : 'Creative Contrast'}
                    </span>
                  </div>

                  <p className="text-[11px] text-stone-600 leading-relaxed bg-white p-2.5 rounded-xl border border-stone-200/80">
                    {directComparison.explanation}
                  </p>

                  {directComparison.sharedCompounds.length > 0 && (
                    <div className="text-[11px] text-stone-600">
                      <span className="font-semibold block text-stone-800 mb-0.5">
                        Shared Scent Bridge:
                      </span>
                      {directComparison.sharedCompounds.map(c => (
                        <div key={c} className="text-[10px] text-amber-950 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-700" />
                          <span>
                            <strong>{c}</strong>: {PLAIN_SCENT_TRANSLATIONS[c] || 'Harmonious natural aroma'}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Column 2 & 3: Top Natural Matches */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <h3 className="text-lg font-serif font-bold text-stone-900">
                Top Natural Partners for {anchor.name}
              </h3>
              <p className="text-xs text-stone-500">
                Ingredients that share natural scent notes with {anchor.name}, making them easy to combine in home cooking.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pairings.map(p => {
                const isStrong = p.score > 10;
                return (
                  <div
                    key={p.target.name}
                    className="p-4 sm:p-5 bg-white rounded-2xl border border-stone-200/90 hover:border-amber-700/60 shadow-2xs hover:shadow-xs transition-all space-y-3 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-base font-serif font-bold text-stone-900">
                            {p.target.name}
                          </h4>
                          <span className="text-[11px] text-stone-500 block">
                            {p.target.category}
                          </span>
                        </div>

                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                            isStrong
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : 'bg-stone-100 text-stone-700 border border-stone-200'
                          }`}
                        >
                          {isStrong ? 'Strong Match' : 'Subtle Harmony'}
                        </span>
                      </div>

                      {/* Plain-English Explanation */}
                      <p className="text-xs text-stone-600 mt-2.5 leading-relaxed">
                        {p.explanation}
                      </p>

                      {/* Display shared plain scent note if exists */}
                      {p.sharedCompounds.length > 0 && (
                        <div className="mt-2.5 p-2 bg-amber-50/60 rounded-xl border border-amber-200/60 text-[11px] text-amber-950">
                          <span className="font-semibold block text-[10px] uppercase tracking-wider text-amber-900">
                            Why it works:
                          </span>
                          <span className="text-stone-700 text-[11px]">
                            Both feature{' '}
                            <strong>{PLAIN_SCENT_TRANSLATIONS[p.sharedCompounds[0]] || p.sharedCompounds[0]}</strong>.
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => setSelectedAnchor(p.target.name)}
                        className="text-[11px] text-stone-500 hover:text-amber-900 font-medium"
                      >
                        Explore {p.target.name} →
                      </button>

                      <button
                        type="button"
                        onClick={() => onExploreIngredientInFeed(p.target.name)}
                        className="text-[11px] font-semibold text-amber-900 hover:underline"
                      >
                        Browse Dishes
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Section 2: Secret Food Twins (Fun Computational Gastronomy Discoveries) */}
        <div className="mt-12 pt-8 border-t border-stone-200">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-amber-900 font-bold">
                  Secret Food Twins
                </span>
                <span className="text-stone-300">·</span>
                <span className="text-xs text-stone-500">Unexpected Scientific Connections</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                Surprising Pairings That Work Wonders
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl leading-relaxed">
                These ingredients sound like an unusual match, but computational gastronomy proves they share vital aroma bridges. Tap any card to test their chemistry!
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {GastronomyEngine.getSecretPairings().map(twin => (
              <div
                key={twin.id}
                className="p-5 rounded-2xl bg-stone-50 hover:bg-white border border-stone-200 hover:border-amber-700/60 transition-all shadow-2xs hover:shadow-xs flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] mb-2">
                    <span className="font-semibold text-amber-900 bg-amber-100/70 px-2 py-0.5 rounded-md">
                      {twin.badge}
                    </span>
                    <span className="font-mono text-stone-600 font-bold tabular-nums">
                      {twin.matchScore}% Synergy
                    </span>
                  </div>

                  <h4 className="text-base font-serif font-bold text-stone-900">
                    {twin.itemA} + {twin.itemB}
                  </h4>

                  <span className="text-[11px] text-stone-500 block mt-0.5 font-medium">
                    {twin.cuisineCrossover}
                  </span>

                  <p className="text-xs text-stone-700 mt-2 leading-relaxed">
                    {twin.secretLink}
                  </p>

                  <div className="mt-3 p-2.5 rounded-xl bg-white border border-stone-200/90 text-[11px] text-stone-700">
                    <span className="font-bold text-stone-900 block mb-0.5">Kitchen Experiment:</span>
                    {twin.kitchenTip}
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-200/70 flex items-center justify-between text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedAnchor(twin.itemA);
                      setCompareTarget(twin.itemB);
                      window.scrollTo({ top: 350, behavior: 'smooth' });
                    }}
                    className="font-semibold text-amber-900 hover:underline flex items-center gap-1"
                  >
                    <span>Test In Pair Sandbox</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onExploreIngredientInFeed(twin.itemA)}
                    className="text-[11px] text-stone-500 hover:text-stone-900"
                  >
                    View Recipes
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
