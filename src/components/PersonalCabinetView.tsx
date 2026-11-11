/**
 * Personal Cabinet & Taste Profile View
 * Preserves user's bookmarked food memories, experiments,
 * and dynamically computed personal taste profile.
 */

import React, { useMemo } from 'react';
import { Bookmark, Compass, Heart, ChefHat, Sparkles, SlidersHorizontal } from 'lucide-react';
import { LivingContribution } from '../types';
import { PostCard } from './PostCard';

interface PersonalCabinetViewProps {
  posts: LivingContribution[];
  savedPostIds: Set<string>;
  onLike: (id: string) => void;
  onToggleSave: (id: string) => void;
  onOpenRecreation: (post: LivingContribution) => void;
  onInspectIngredient: (ingredientName: string) => void;
  onViewLineage: (postId: string) => void;
  onExploreFeed: () => void;
}

export const PersonalCabinetView: React.FC<PersonalCabinetViewProps> = ({
  posts,
  savedPostIds,
  onLike,
  onToggleSave,
  onOpenRecreation,
  onInspectIngredient,
  onViewLineage,
  onExploreFeed
}) => {
  const savedPosts = useMemo(() => {
    return posts.filter(p => savedPostIds.has(p.id));
  }, [posts, savedPostIds]);

  // Compute voluntary taste profile from saved items
  const tasteProfile = useMemo(() => {
    const aromaCounts: Record<string, number> = {};
    const tasteCounts: Record<string, number> = {};
    const ingredientCounts: Record<string, number> = {};

    savedPosts.forEach(post => {
      // Aromas
      const aromas = post.sensory.aroma.split(',').map(s => s.trim());
      aromas.forEach(a => {
        aromaCounts[a] = (aromaCounts[a] || 0) + 1;
      });

      // Tastes
      const tastes = post.sensory.taste.split(',').map(s => s.trim());
      tastes.forEach(t => {
        tasteCounts[t] = (tasteCounts[t] || 0) + 1;
      });

      // Ingredients
      post.ingredients.forEach(ing => {
        ingredientCounts[ing] = (ingredientCounts[ing] || 0) + 1;
      });
    });

    const topAromas = Object.entries(aromaCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(e => e[0]);

    const topTastes = Object.entries(tasteCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(e => e[0]);

    const topIngredients = Object.entries(ingredientCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(e => e[0]);

    return {
      topAromas,
      topTastes,
      topIngredients,
      totalSaved: savedPosts.length
    };
  }, [savedPosts]);

  return (
    <div className="space-y-6">
      {/* Overview & Organic Taste Profile */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-900 block mb-1">
              Personal Culinary Cabinet
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 text-balance">
              Saved Dishes, Variations & Taste Profile
            </h2>
            <p className="text-sm text-stone-600 mt-2 leading-relaxed">
              Your personal pantry of inspiring dishes, memory sparks, and adaptive recreation pathways saved for your next kitchen session.
            </p>
          </div>

          {/* Organic Taste Profile Summary Card */}
          <div className="p-4 sm:p-5 bg-stone-50 rounded-2xl border border-stone-200 min-w-[280px] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-amber-800" />
                Living Taste Profile
              </span>
              <span className="text-[10px] text-stone-400 font-mono">
                {tasteProfile.totalSaved} Saved
              </span>
            </div>

            {tasteProfile.totalSaved > 0 ? (
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-stone-400 block">
                    Favorite Aroma Registers
                  </span>
                  <p className="text-stone-800 font-medium">
                    {tasteProfile.topAromas.join(', ') || 'Smoky, Tart'}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-semibold text-stone-400 block">
                    Taste Alignments
                  </span>
                  <p className="text-stone-800 font-medium">
                    {tasteProfile.topTastes.join(', ') || 'Tangy & Umami'}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-semibold text-stone-400 block">
                    Frequent Pantry Staples
                  </span>
                  <p className="text-stone-700 text-[11px]">
                    {tasteProfile.topIngredients.join(', ')}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-xs text-stone-500 italic">
                Save dishes from the discover feed to organically generate your sensory profile without questionnaires.
              </p>
            )}
          </div>
        </div>

        {/* Saved Posts Grid */}
        <div className="mt-8">
          {savedPosts.length === 0 ? (
            <div className="py-16 text-center text-stone-500 space-y-3">
              <Bookmark className="w-8 h-8 text-stone-300 mx-auto" />
              <h3 className="text-base font-serif font-bold text-stone-800">
                Your culinary cabinet is currently empty
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Tap the bookmark icon on any dish or experiment in the discover feed to curate your personal tasting archive.
              </p>
              <button
                onClick={onExploreFeed}
                className="mt-3 px-4 py-2 bg-stone-900 hover:bg-amber-950 text-white text-xs font-semibold rounded-xl transition-colors shadow-2xs"
              >
                Browse Discover Feed
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedPosts.map(post => {
                const parent = post.parentId ? posts.find(p => p.id === post.parentId) : null;
                return (
                  <PostCard
                    key={post.id}
                    post={post}
                    parentPost={parent}
                    onLike={onLike}
                    onToggleSave={onToggleSave}
                    onOpenRecreation={onOpenRecreation}
                    onInspectIngredient={onInspectIngredient}
                    onViewLineage={onViewLineage}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
