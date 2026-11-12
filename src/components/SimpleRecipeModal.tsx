/**
 * Simple Recipe Modal
 * Clean, visual, low-text recipe display for everyday Indian cooking.
 * Written in simple, friendly words with easy steps and zero jargon.
 */

import React, { useState } from 'react';
import { X, Clock, ChefHat, Sparkles, Check, ArrowRight } from 'lucide-react';
import { RecipeDBItem, LivingContribution } from '../types';

interface SimpleRecipeModalProps {
  recipe: RecipeDBItem | LivingContribution | null;
  onClose: () => void;
  onAdaptWithPantry?: (recipe: RecipeDBItem | LivingContribution) => void;
  userPantryItems?: Set<string>;
}

export const SimpleRecipeModal: React.FC<SimpleRecipeModalProps> = ({
  recipe,
  onClose,
  onAdaptWithPantry,
  userPantryItems = new Set()
}) => {
  if (!recipe) return null;

  const isDBItem = 'prepTimeMinutes' in recipe;
  const title = recipe.title;
  const ingredients = recipe.ingredients || [];
  const prepTime = isDBItem ? (recipe as RecipeDBItem).prepTimeMinutes : 25;
  const processSteps = isDBItem ? (recipe as RecipeDBItem).process : [recipe.story];

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase font-bold tracking-wider text-amber-900 bg-amber-100/70 px-2 py-0.5 rounded-md">
                Everyday Homestyle Recipe
              </span>
              <span className="text-xs text-stone-500 font-medium">
                ⏱ {prepTime} mins
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-serif font-bold text-stone-900 mt-1">
              {title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 p-2 rounded-xl hover:bg-stone-200/50 transition-colors cursor-pointer"
            aria-label="Close recipe"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm">
          {/* Visual sensory highlights in simple words */}
          <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200/80 flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-900 block mb-0.5">
                The Flavor Experience:
              </span>
              <p className="font-serif text-stone-900 font-semibold text-sm">
                {recipe.sensory.taste}
              </p>
              <span className="text-xs text-stone-500 mt-0.5 block">
                {recipe.sensory.aroma}
              </span>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[10px] uppercase font-bold text-stone-400 block mb-0.5">
                Mouthfeel:
              </span>
              <span className="text-xs font-semibold text-stone-800 bg-white border border-stone-200 px-2.5 py-1 rounded-lg">
                {recipe.sensory.texture}
              </span>
            </div>
          </div>

          {/* Ingredients Section with Pantry Checkmarks */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-700">
                Ingredients Needed ({ingredients.length}):
              </span>
              <span className="text-[11px] text-stone-400">
                ✓ = Already in your kitchen
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {ingredients.map(ing => {
                const userHasIt = Array.from(userPantryItems).some(
                  u => u.toLowerCase().includes(ing.toLowerCase()) || ing.toLowerCase().includes(u.toLowerCase())
                );
                return (
                  <div
                    key={ing}
                    className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 transition-all ${
                      userHasIt
                        ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950 font-medium'
                        : 'bg-stone-50 border-stone-200 text-stone-800'
                    }`}
                  >
                    <span className="text-xs">{ing}</span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                        userHasIt
                          ? 'bg-emerald-600 text-white'
                          : 'bg-stone-200 text-stone-500'
                      }`}
                    >
                      {userHasIt ? '✓ In Kitchen' : 'Needed'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step by Step Cooking Guide */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-3">
              Simple Step-by-Step Instructions:
            </span>
            <div className="space-y-3">
              {processSteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-stone-50 rounded-2xl border border-stone-100">
                  <span className="w-6 h-6 rounded-full bg-amber-900 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-xs text-stone-700 leading-relaxed pt-0.5">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Chef's Secret */}
          <div className="p-3.5 bg-white rounded-2xl border border-stone-200 text-xs text-stone-600 flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
            <p>
              <strong className="text-stone-900">Homestyle Secret: </strong>
              Always bloom whole spices like cumin and mustard seeds in warm ghee for 15 seconds to unlock their full natural sweetness.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          {onAdaptWithPantry ? (
            <button
              type="button"
              onClick={() => {
                onClose();
                onAdaptWithPantry(recipe);
              }}
              className="px-4 py-2 bg-amber-900 hover:bg-amber-950 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ChefHat className="w-3.5 h-3.5" />
              <span>Cook With What You Have (Swap Ingredients)</span>
            </button>
          ) : (
            <div />
          )}
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
