/**
 * Kitchen Pantry Finder Component
 * "What's in Your Kitchen?"
 * Visual, intuitive pantry selector clustered into everyday household categories:
 * Dairy, Veggies, Dals & Flours, Eggs & Non-Veg, Spices, and Extras.
 * Lets users pick what they have at home and instantly shows what they can cook.
 */

import React, { useState, useMemo } from 'react';
import { PANTRY_CLUSTERS, ALL_PANTRY_ITEMS, EVERYDAY_HOME_STAPLES, PantryItem } from '../data/pantryDatabase';
import { LivingContribution, RecipeDBItem } from '../types';
import { RECIPE_DB } from '../data/culinaryDatabase';
import { Check, Sparkles, ChefHat, Search, X, ArrowRight, RotateCcw } from 'lucide-react';

interface KitchenPantryFinderProps {
  selectedItems: Set<string>;
  onToggleItem: (itemName: string) => void;
  onClearAll: () => void;
  onSelectStaples: () => void;
  onCookRecipe: (recipe: RecipeDBItem | LivingContribution) => void;
  posts: LivingContribution[];
}

export const KitchenPantryFinder: React.FC<KitchenPantryFinderProps> = ({
  selectedItems,
  onToggleItem,
  onClearAll,
  onSelectStaples,
  onCookRecipe,
  posts
}) => {
  const [activeClusterId, setActiveClusterId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeNiche, setActiveNiche] = useState<string | null>(null);

  // Filter pantry items by search query and cluster
  const filteredItems = useMemo(() => {
    return ALL_PANTRY_ITEMS.filter(item => {
      const matchSearch =
        searchQuery === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.hindiName.includes(searchQuery) ||
        item.flavorNotes.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCluster = activeClusterId === 'all' || item.category === activeClusterId;
      return matchSearch && matchCluster;
    });
  }, [activeClusterId, searchQuery]);

  // Compute recipes that match what user has in kitchen
  const recipeMatches = useMemo(() => {
    if (selectedItems.size === 0) return [];

    const selectedArray = Array.from(selectedItems).map(s => s.toLowerCase());

    return RECIPE_DB.map(recipe => {
      const totalIngs = recipe.ingredients.length;
      let matchedCount = 0;

      recipe.ingredients.forEach(ing => {
        const cleanIng = ing.toLowerCase();
        const has = selectedArray.some(
          sel => cleanIng.includes(sel) || sel.includes(cleanIng)
        );
        if (has) matchedCount++;
      });

      const matchPercent = Math.round((matchedCount / totalIngs) * 100);
      const missingCount = totalIngs - matchedCount;

      return {
        recipe,
        matchPercent,
        missingCount,
        matchedCount,
        totalIngs
      };
    })
      .filter(m => m.matchPercent >= 30)
      .sort((a, b) => b.matchPercent - a.matchPercent);
  }, [selectedItems]);

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 border border-stone-200 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-amber-900 font-bold bg-amber-100/70 px-2 py-0.5 rounded-md">
              Kitchen Pantry
            </span>
            <span className="text-xs text-stone-400">· Tap what you have at home</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mt-1">
            What's in Your Kitchen Today?
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Select your ingredients to instantly see comfort food you can cook right now.
          </p>
        </div>

        {/* Quick action controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onSelectStaples}
            className="px-3.5 py-2 bg-amber-50 hover:bg-amber-100/80 text-amber-950 border border-amber-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-800" />
            <span>+ Add Everyday Staples</span>
          </button>
          {selectedItems.size > 0 && (
            <button
              type="button"
              onClick={onClearAll}
              className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
              title="Reset kitchen selection"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Cluster Navigation Pills */}
      <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1">
        <button
          type="button"
          onClick={() => setActiveClusterId('all')}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
            activeClusterId === 'all'
              ? 'bg-stone-900 text-white shadow-2xs'
              : 'bg-stone-100 hover:bg-stone-200/70 text-stone-700'
          }`}
        >
          <span>All Items ({ALL_PANTRY_ITEMS.length})</span>
        </button>

        {PANTRY_CLUSTERS.map(cluster => {
          const isSelected = activeClusterId === cluster.id;
          const countInCluster = cluster.items.filter(i => selectedItems.has(i.name)).length;

          return (
            <button
              key={cluster.id}
              type="button"
              onClick={() => setActiveClusterId(cluster.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                isSelected
                  ? 'bg-amber-900 text-white shadow-2xs'
                  : 'bg-stone-100 hover:bg-stone-200/70 text-stone-700'
              }`}
            >
              <span>{cluster.emoji}</span>
              <span>{cluster.name}</span>
              {countInCluster > 0 && (
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-amber-700 text-white' : 'bg-amber-200 text-amber-950'
                  }`}
                >
                  {countInCluster}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Ingredient Search & Quick Filter */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search by ingredient or Hindi name (e.g. Aloo, Paneer, Dahi, Ghee)..."
          className="w-full pl-9 pr-8 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-900 focus:bg-white transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Interactive Ingredient Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
        {filteredItems.map(item => {
          const isSelected = selectedItems.has(item.name);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onToggleItem(item.name)}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[72px] relative group ${
                isSelected
                  ? 'border-emerald-600 bg-emerald-50/80 text-emerald-950 shadow-2xs'
                  : 'border-stone-200 hover:border-amber-700/60 bg-white hover:bg-amber-50/20 text-stone-800'
              }`}
            >
              <div className="flex items-start justify-between gap-1 w-full">
                <span className="font-semibold text-xs leading-snug line-clamp-2">
                  {item.name}
                </span>
                <span
                  className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] shrink-0 mt-0.5 transition-colors ${
                    isSelected
                      ? 'bg-emerald-600 text-white font-bold'
                      : 'border border-stone-300 text-stone-300 group-hover:border-stone-400'
                  }`}
                >
                  {isSelected ? '✓' : '+'}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-stone-500 mt-1">
                <span className="font-medium text-amber-900/80">{item.hindiName}</span>
                <span className="text-[10px] text-stone-400 truncate max-w-[80px]">
                  {item.flavorNotes.split(',')[0]}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Items Counter Bar */}
      <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
          <span className="font-semibold text-stone-900">
            {selectedItems.size} {selectedItems.size === 1 ? 'ingredient' : 'ingredients'} selected in your kitchen
          </span>
          {selectedItems.size === 0 && (
            <span className="text-stone-400">(Tap ingredients above or tap "+ Add Everyday Staples")</span>
          )}
        </div>

        {selectedItems.size > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] text-stone-500 font-medium">Quick remove:</span>
            {Array.from(selectedItems).slice(0, 4).map(name => (
              <span
                key={name}
                onClick={() => onToggleItem(name)}
                className="bg-white border border-stone-200 px-2 py-0.5 rounded-md text-[11px] text-stone-700 cursor-pointer hover:bg-rose-50 hover:text-rose-700 hover:border-rose-300 transition-colors"
                title="Remove from kitchen"
              >
                {name.split(' (')[0]} ✕
              </span>
            ))}
            {selectedItems.size > 4 && (
              <span className="text-[11px] text-stone-400">+{selectedItems.size - 4} more</span>
            )}
          </div>
        )}
      </div>

      {/* Matching Recipes Section */}
      {selectedItems.size > 0 && (
        <div className="pt-2 border-t border-stone-100 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900">
                Kitchen Recipe Matches
              </span>
              <h3 className="text-base font-serif font-bold text-stone-900">
                Dishes You Can Cook With What You Have ({recipeMatches.length})
              </h3>
            </div>
            <span className="text-xs text-stone-500 font-medium">
              Ranked by pantry overlap
            </span>
          </div>

          {recipeMatches.length === 0 ? (
            <div className="p-6 bg-stone-50 rounded-2xl text-center text-xs text-stone-500">
              Select a few more ingredients (like Dal, Atta, or Veggies) to unlock dish matches!
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {recipeMatches.map(({ recipe, matchPercent, missingCount, matchedCount, totalIngs }) => {
                const isReady = missingCount === 0;
                return (
                  <div
                    key={recipe.id}
                    className="p-4 bg-white rounded-2xl border border-stone-200/90 hover:border-amber-700/80 hover:shadow-xs transition-all flex flex-col justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                            isReady
                              ? 'bg-emerald-100 text-emerald-900'
                              : 'bg-amber-100 text-amber-900'
                          }`}
                        >
                          {isReady ? '✨ Ready to Cook!' : `${matchPercent}% pantry match`}
                        </span>
                        <span className="text-[11px] text-stone-400 font-medium">
                          ⏱ {recipe.prepTimeMinutes} mins
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-stone-900 text-sm leading-snug">
                        {recipe.title}
                      </h4>
                      <p className="text-[11px] text-stone-500 mt-1 line-clamp-1">
                        {recipe.cuisine} · {recipe.difficulty}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                      <span className="text-[10px] text-stone-500">
                        {isReady ? 'All ingredients in pantry' : `Need ${missingCount} more`}
                      </span>
                      <button
                        type="button"
                        onClick={() => onCookRecipe(recipe)}
                        className="text-amber-900 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>View Recipe</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
