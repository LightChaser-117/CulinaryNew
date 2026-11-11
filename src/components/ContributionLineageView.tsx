/**
 * Contribution Lineage View
 * Visualizes the living evolution of dishes from traditional family records
 * to diaspora adaptations, campfire experiments, and cocktail translations.
 */

import React from 'react';
import { GitBranch, Plus, ArrowRight, CornerDownRight, ChefHat, Sparkles } from 'lucide-react';
import { LivingContribution, LineageNode } from '../types';
import { GastronomyEngine } from '../services/gastronomyEngine';

interface ContributionLineageViewProps {
  posts: LivingContribution[];
  onOpenRecreation: (dish: LivingContribution) => void;
  onAddVariation: (parentPost: LivingContribution) => void;
  highlightPostId?: string | null;
}

export const ContributionLineageView: React.FC<ContributionLineageViewProps> = ({
  posts,
  onOpenRecreation,
  onAddVariation,
  highlightPostId
}) => {
  const roots: LineageNode[] = GastronomyEngine.buildLineageTree(posts);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs">
        <div className="max-w-3xl">
          <span className="text-xs font-mono uppercase tracking-wider text-amber-900 block mb-1">
            Living Culinary Evolution
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 text-balance">
            Contribution Lineage Tree
          </h2>
          <p className="text-sm text-stone-600 mt-2 leading-relaxed">
            Dishes are not static museum pieces. In Culinary Echo, every recreation, substitution, or diaspora interpretation branches into a living family tree while crediting original creators.
          </p>
        </div>

        {/* Tree Container */}
        <div className="mt-8 space-y-8">
          {roots.map(root => (
            <div
              key={root.id}
              className={`p-5 sm:p-6 bg-stone-50 rounded-2xl border transition-all ${
                highlightPostId === root.id
                  ? 'border-amber-700 bg-amber-50/40 ring-1 ring-amber-700'
                  : 'border-stone-200'
              }`}
            >
              {/* Root Node Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-stone-900 text-white font-serif font-bold flex items-center justify-center text-sm shadow-xs shrink-0">
                    {root.authorAvatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-serif font-bold text-stone-900">
                        {root.title}
                      </h3>
                      <span className="text-[10px] bg-stone-200 text-stone-800 font-semibold px-2 py-0.5 rounded-md">
                        Root Source Seed
                      </span>
                    </div>
                    <div className="text-xs text-stone-500 mt-0.5">
                      Contributed by <strong className="text-stone-700">{root.author}</strong> · {root.createdAt}
                    </div>
                    <p className="text-xs text-stone-600 mt-2 leading-relaxed max-w-2xl">
                      "{root.story}"
                    </p>
                    <div className="mt-2 text-[11px] text-stone-500 flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-stone-700">Sensory registers:</span>
                      <span>Aroma: {root.sensory.aroma}</span>
                      <span>·</span>
                      <span>Taste: {root.sensory.taste}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start shrink-0">
                  <button
                    onClick={() => onOpenRecreation(root)}
                    className="px-3 py-1.5 bg-white hover:bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
                  >
                    <ChefHat className="w-3.5 h-3.5" />
                    <span>Recreate</span>
                  </button>
                  <button
                    onClick={() => onAddVariation(root)}
                    className="px-3 py-1.5 bg-amber-900 hover:bg-stone-900 text-white text-xs font-semibold rounded-xl transition-colors shadow-2xs flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Add Variation</span>
                  </button>
                </div>
              </div>

              {/* Children Branches */}
              {root.children && root.children.length > 0 ? (
                <div className="mt-6 pt-5 border-t border-stone-200/80 pl-4 sm:pl-8 border-l-2 border-stone-300 ml-3 sm:ml-5 space-y-4">
                  <div className="text-[11px] uppercase font-bold tracking-wider text-stone-500 flex items-center gap-1.5">
                    <GitBranch className="w-3.5 h-3.5 text-amber-800" />
                    <span>Derived Adaptations & Experiments ({root.children.length})</span>
                  </div>

                  {root.children.map(child => (
                    <div
                      key={child.id}
                      className={`p-4 bg-white rounded-xl border transition-all ${
                        highlightPostId === child.id
                          ? 'border-amber-700 bg-amber-50/50 ring-1 ring-amber-700'
                          : 'border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="w-6 h-6 rounded-md bg-amber-800 text-white font-bold text-xs flex items-center justify-center">
                              {child.authorAvatar}
                            </span>
                            <h4 className="text-sm font-bold text-stone-900">
                              {child.title}
                            </h4>
                            <span className="text-[10px] bg-amber-100 text-amber-900 font-semibold px-2 py-0.5 rounded-md">
                              {child.variationType || 'Variation'}
                            </span>
                          </div>

                          <div className="text-[11px] text-stone-500 mt-1">
                            Adapted by <strong className="text-stone-700">{child.author}</strong> · {child.createdAt}
                          </div>

                          <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                            "{child.story}"
                          </p>

                          {/* Specific Changes & Retained notes */}
                          {(child.changedNotes || child.retainedNotes) && (
                            <div className="mt-2.5 p-2.5 bg-stone-50 rounded-lg border border-stone-200/80 text-[11px] space-y-1">
                              {child.changedNotes && (
                                <p className="text-stone-700">
                                  <strong className="text-stone-900">What was changed:</strong> {child.changedNotes}
                                </p>
                              )}
                              {child.retainedNotes && (
                                <p className="text-stone-700">
                                  <strong className="text-stone-900">What was retained:</strong> {child.retainedNotes}
                                </p>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => onOpenRecreation(child)}
                            className="px-2.5 py-1 text-xs text-amber-900 hover:underline font-semibold flex items-center gap-1"
                          >
                            <span>Recreate</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-4 pt-3 border-t border-stone-200 text-xs text-stone-400 italic">
                  No community variations registered for this dish yet. Be the first to adapt it for your kitchen!
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
