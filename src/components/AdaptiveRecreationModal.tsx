/**
 * Adaptive Recreation Modal
 * Core MVP engine allowing users to adapt and recreate dishes according to
 * their real pantry ingredients, kitchen equipment, and time limits.
 * Uses deterministic FlavorDB & RecipeDB rules without black-box AI.
 */

import React, { useState, useMemo } from 'react';
import { X, Check, AlertCircle, Sparkles, Clock, Utensils, HelpCircle, ArrowRight } from 'lucide-react';
import { LivingContribution, RecreationResult } from '../types';
import { GastronomyEngine } from '../services/gastronomyEngine';

interface AdaptiveRecreationModalProps {
  dish: LivingContribution | null;
  onClose: () => void;
  onRecordVariation: (parentPost: LivingContribution, recreationResult: RecreationResult) => void;
}

export const AdaptiveRecreationModal: React.FC<AdaptiveRecreationModalProps> = ({
  dish,
  onClose,
  onRecordVariation
}) => {
  const [targetGoal, setTargetGoal] = useState<'whole' | 'aroma' | 'flavour' | 'texture'>('whole');
  const [missingIngredients, setMissingIngredients] = useState<Set<string>>(new Set());
  const [equipment, setEquipment] = useState<string>('standard');
  const [timeLimit, setTimeLimit] = useState<string>('unlimited');

  // Toggle ingredient missing state
  const toggleIngredient = (ing: string) => {
    setMissingIngredients(prev => {
      const next = new Set(prev);
      if (next.has(ing)) {
        next.delete(ing);
      } else {
        next.add(ing);
      }
      return next;
    });
  };

  // Compute pathway whenever constraints change
  const recreationResult: RecreationResult = useMemo(() => {
    if (!dish) {
      return {
        confidence: 0,
        targetGoal: 'whole',
        substitutions: [],
        tradeOffs: [],
        steps: [],
        retainedIngredients: [],
        missingIngredients: []
      };
    }
    return GastronomyEngine.solveRecreationPathway(
      dish,
      Array.from(missingIngredients),
      targetGoal,
      equipment,
      timeLimit
    );
  }, [dish, missingIngredients, targetGoal, equipment, timeLimit]);

  if (!dish) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-5 sm:px-6 py-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase font-bold tracking-wider text-amber-900">
                Adaptive Recreation Studio
              </span>
              <span className="text-[10px] text-stone-500 font-mono bg-stone-200/80 px-2 py-0.5 rounded-md">
                RecipeDB + FlavorDB
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-serif font-bold text-stone-900 mt-0.5">
              Adapting: {dish.title}
            </h2>
            <p className="text-xs text-stone-500">
              Original contribution by {dish.author} · {dish.category}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 p-2 rounded-xl hover:bg-stone-200/50 transition-colors"
            aria-label="Close recreation modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto text-xs sm:text-sm">
          {/* Step 1: Target Goal Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
              1. What part of the experience do you want to recreate?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'whole', label: 'Complete Dish', desc: 'Balanced overall meal' },
                { id: 'aroma', label: 'Aroma Register', desc: 'Smoky, citrus or floral' },
                { id: 'flavour', label: 'Flavour Core', desc: 'Tart, sweet-sour balance' },
                { id: 'texture', label: 'Mouthfeel', desc: 'Velvety emulsion' }
              ].map(opt => {
                const isSelected = targetGoal === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setTargetGoal(opt.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-amber-900 bg-amber-50/70 text-amber-950 font-semibold shadow-2xs'
                        : 'border-stone-200 hover:border-stone-300 text-stone-700 bg-white'
                    }`}
                  >
                    <span className="block text-xs font-bold text-stone-900">{opt.label}</span>
                    <span className="text-[11px] text-stone-500 block mt-0.5">{opt.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Ingredient Constraints (Effortless toggling) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-stone-600">
                  2. Your Kitchen Ingredients
                </label>
                <p className="text-[11px] text-stone-500">
                  Tap any item you do not currently have in your pantry
                </p>
              </div>
              {missingIngredients.size > 0 && (
                <button
                  onClick={() => setMissingIngredients(new Set())}
                  className="text-[11px] text-amber-900 hover:underline font-medium"
                >
                  I have all of them
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2 p-3 bg-stone-50 rounded-2xl border border-stone-200">
              {dish.ingredients.map(ing => {
                const isMissing = missingIngredients.has(ing);
                return (
                  <button
                    key={ing}
                    type="button"
                    onClick={() => toggleIngredient(ing)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all ${
                      isMissing
                        ? 'bg-rose-50 text-rose-700 border border-rose-300 line-through opacity-80'
                        : 'bg-white text-stone-800 border border-stone-200 hover:border-amber-700 shadow-2xs'
                    }`}
                  >
                    <span>{ing}</span>
                    <span className="text-[10px] font-bold">
                      {isMissing ? '✕ missing' : '✓ have'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Kitchen Realities (Equipment & Time Constraints) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5 flex items-center gap-1.5">
                <Utensils className="w-3.5 h-3.5 text-stone-500" />
                Equipment Constraints
              </label>
              <select
                value={equipment}
                onChange={e => setEquipment(e.target.value)}
                className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-amber-900"
              >
                <option value="standard">Standard Kitchen (Stovetop, Oven, Blender)</option>
                <option value="minimal">Minimal Setup (Single Pan or Electric Kettle)</option>
                <option value="no_smoker">No Smoker, Charcoal or Tandoor</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-stone-500" />
                Time Budget
              </label>
              <select
                value={timeLimit}
                onChange={e => setTimeLimit(e.target.value)}
                className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-amber-900"
              >
                <option value="unlimited">Authentic Timeline (Slow deliberate simmer)</option>
                <option value="quick_30">Quick Adaptation (&lt; 30 minutes)</option>
                <option value="express_15">Express Shortcut (&lt; 15 minutes)</option>
              </select>
            </div>
          </div>

          {/* Evidence-Informed Adaptation Results Panel */}
          <div className="border-t border-stone-200 pt-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-800" />
                Evidence-Informed Pathway
              </h3>
              <div className="flex items-center gap-2">
                <span
                  className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
                    recreationResult.confidence >= 75
                      ? 'text-emerald-800 bg-emerald-50 border-emerald-200'
                      : 'text-amber-800 bg-amber-50 border-amber-200'
                  }`}
                >
                  Profile Retention: ~{recreationResult.confidence}%
                </span>
              </div>
            </div>

            {/* Scientific disclaimer as mandated by product vision */}
            <p className="text-[11px] text-stone-500 leading-relaxed italic bg-stone-50 p-2.5 rounded-xl border border-stone-150">
              Note: This computational estimate is grounded in preserved aroma volatiles and cooking matrices; human perception varies, and results are honest explorations rather than guaranteed twins.
            </p>

            {/* Sourced Substitutions Breakdown */}
            {recreationResult.substitutions.length > 0 && (
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-600 block">
                  Identified Substitutions:
                </span>
                <div className="space-y-2">
                  {recreationResult.substitutions.map(sub => (
                    <div
                      key={sub.original}
                      className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-stone-900">
                          {sub.original} → <span className="text-amber-900">{sub.suggested}</span>
                        </span>
                        <span className="text-[10px] text-stone-500 font-mono">
                          {sub.confidence}
                        </span>
                      </div>
                      <p className="text-stone-600 text-[11px]">{sub.reason}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Transparent Trade-offs */}
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-2 text-xs text-amber-950">
              <span className="block font-bold uppercase tracking-wider text-[10px] text-amber-900">
                Transparent Trade-Off Analysis:
              </span>
              <ul className="list-disc list-inside space-y-1 leading-relaxed">
                {recreationResult.tradeOffs.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>

            {/* Step-by-Step Adapted Cooking Instructions */}
            <div className="p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
              <span className="text-xs font-bold uppercase text-stone-700 block">
                Practical Steps for Your Kitchen:
              </span>
              <div className="space-y-2.5 text-xs text-stone-700 leading-relaxed">
                {recreationResult.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-stone-200 text-stone-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="flex-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 sm:px-6 py-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-semibold text-stone-600 hover:text-stone-900"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onRecordVariation(dish, recreationResult);
            }}
            className="px-4 py-2 text-xs font-bold bg-amber-900 hover:bg-stone-900 text-white rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
          >
            <span>Record as Variation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
