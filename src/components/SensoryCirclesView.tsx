/**
 * Sensory Circles View
 * Community clusters that gather around shared aroma profiles,
 * culinary philosophies, and fermentation or mixology traditions.
 */

import React from 'react';
import { CommunityCircle } from '../types';
import { Users, Sparkles, Check, ArrowRight } from 'lucide-react';

interface SensoryCirclesViewProps {
  circles: CommunityCircle[];
  onToggleJoin: (circleId: string) => void;
  onExploreCircle: (sensoryFocusTag: string) => void;
}

export const SensoryCirclesView: React.FC<SensoryCirclesViewProps> = ({
  circles,
  onToggleJoin,
  onExploreCircle
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs">
        <div className="max-w-3xl">
          <span className="text-xs font-mono uppercase tracking-wider text-amber-900 block mb-1">
            Community Discovery Circles
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 text-balance">
            Explore by Sensory Communities
          </h2>
          <p className="text-sm text-stone-600 mt-2 leading-relaxed">
            Communities in Culinary Echo emerge around shared sensory curiosity—from campfire smoke devotees and ancient fermentation experimenters to zero-proof mixologists.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {circles.map(circle => (
            <div
              key={circle.id}
              className="bg-stone-50 rounded-2xl p-6 border border-stone-200/90 flex flex-col justify-between space-y-5 hover:border-stone-300 transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-md border ${circle.badgeColor}`}>
                    {circle.members} Explorers
                  </span>
                  <span className="text-[11px] text-stone-400">
                    Curated by {circle.curator}
                  </span>
                </div>

                <h3 className="text-lg font-serif font-bold text-stone-900">
                  {circle.name}
                </h3>

                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  {circle.description}
                </p>

                <div className="mt-4">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block mb-1.5">
                    Sensory Focus
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {circle.sensoryFocus.map(focus => (
                      <button
                        key={focus}
                        onClick={() => onExploreCircle(focus)}
                        className="text-[11px] bg-white border border-stone-200 hover:border-amber-700 text-stone-700 px-2 py-0.5 rounded-md font-medium transition-colors"
                      >
                        {focus}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200 flex items-center justify-between gap-3 text-xs">
                <button
                  onClick={() => onExploreCircle(circle.sensoryFocus[0])}
                  className="font-semibold text-amber-900 hover:underline flex items-center gap-1"
                >
                  <span>Explore Circle Posts</span>
                  <ArrowRight className="w-3 h-3" />
                </button>

                <button
                  onClick={() => onToggleJoin(circle.id)}
                  className={`px-3.5 py-1.5 rounded-xl font-semibold transition-colors flex items-center gap-1.5 ${
                    circle.joined
                      ? 'bg-stone-200 text-stone-800 hover:bg-stone-300'
                      : 'bg-stone-900 text-white hover:bg-amber-950'
                  }`}
                >
                  {circle.joined ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Member</span>
                    </>
                  ) : (
                    <span>Join Circle</span>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
