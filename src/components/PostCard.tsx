/**
 * PostCard Component
 * Displays a living culinary contribution with sensory characteristics,
 * lineage attribution, and direct Adaptive Recreation trigger.
 */

import React from 'react';
import { Heart, Bookmark, GitBranch, Sparkles, ChefHat, ArrowRight } from 'lucide-react';
import { LivingContribution } from '../types';

interface PostCardProps {
  post: LivingContribution;
  parentPost?: LivingContribution | null;
  onLike: (id: string) => void;
  onToggleSave: (id: string) => void;
  onOpenRecreation: (post: LivingContribution) => void;
  onInspectIngredient: (ingredientName: string) => void;
  onViewLineage: (postId: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  parentPost,
  onLike,
  onToggleSave,
  onOpenRecreation,
  onInspectIngredient,
  onViewLineage
}) => {
  const isVariation = Boolean(post.parentId);

  return (
    <article className="bg-white rounded-2xl border border-stone-200/90 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between">
      {/* Top Image Section */}
      <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden group">
        <img
          src={post.image}
          alt={post.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          onError={(e) => {
            // Elegant gradient fallback if network issue
            (e.currentTarget as HTMLElement).style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent pointer-events-none" />

        {/* Save/Bookmark Top Right Button */}
        <button
          onClick={() => onToggleSave(post.id)}
          className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-colors ${
            post.saved
              ? 'bg-amber-800 text-white shadow-xs'
              : 'bg-white/90 hover:bg-white text-stone-700 hover:text-stone-950 shadow-xs'
          }`}
          title={post.saved ? 'Saved in Personal Cabinet' : 'Save to Personal Cabinet'}
          aria-label="Save contribution"
        >
          <Bookmark className={`w-3.5 h-3.5 ${post.saved ? 'fill-current' : ''}`} />
        </button>

        {/* Lineage or Source tag top left */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          {isVariation && parentPost ? (
            <button
              onClick={() => onViewLineage(post.id)}
              className="px-2.5 py-1 rounded-lg bg-white/95 text-stone-900 text-[11px] font-semibold backdrop-blur-md shadow-xs flex items-center gap-1 hover:bg-white transition-colors"
            >
              <GitBranch className="w-3 h-3 text-amber-800" />
              <span>Echo of {parentPost.author}'s dish</span>
            </button>
          ) : (
            <span className="px-2.5 py-1 rounded-lg bg-stone-950/75 text-stone-200 text-[11px] font-medium backdrop-blur-md">
              {post.category}
            </span>
          )}
        </div>

        {/* Bottom Headline inside Image overlay */}
        <div className="absolute bottom-3 left-3 right-3 text-white pointer-events-none">
          <h3 className="text-base sm:text-lg font-serif font-bold leading-tight drop-shadow-sm text-balance">
            {post.title}
          </h3>
          <div className="flex items-center gap-2 mt-1 text-xs text-stone-200 drop-shadow-xs">
            <span className="w-4 h-4 rounded-full bg-amber-700 text-white font-bold text-[9px] flex items-center justify-center">
              {post.authorAvatar}
            </span>
            <span className="font-medium text-stone-100">{post.author}</span>
            <span aria-hidden="true">·</span>
            <span className="text-stone-300">{post.createdAt}</span>
          </div>
        </div>
      </div>

      {/* Card Content & Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        {/* Story or Memory excerpt */}
        <div>
          <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
            {post.story}
          </p>

          {/* If variation, show what changed */}
          {post.changedNotes && (
            <div className="mt-2.5 p-2.5 bg-amber-50/70 border border-amber-200/70 rounded-xl text-[11px] text-amber-950 leading-relaxed">
              <span className="font-semibold block mb-0.5">Adaptation Note:</span>
              {post.changedNotes}
            </div>
          )}
        </div>

        {/* Structured Sensory Triad (Unboxed text with structured layout) */}
        <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/70 grid grid-cols-3 gap-2 text-center text-xs">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block">
              Aroma
            </span>
            <span className="font-medium text-stone-800 text-[11px] line-clamp-1 mt-0.5">
              {post.sensory.aroma}
            </span>
          </div>
          <div className="border-x border-stone-200/70 px-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block">
              Taste
            </span>
            <span className="font-medium text-stone-800 text-[11px] line-clamp-1 mt-0.5">
              {post.sensory.taste}
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block">
              Texture
            </span>
            <span className="font-medium text-stone-800 text-[11px] line-clamp-1 mt-0.5">
              {post.sensory.texture}
            </span>
          </div>
        </div>

        {/* Ingredients (Clickable chips to trigger FlavorDB analysis) */}
        <div>
          <div className="flex items-center justify-between text-[11px] text-stone-400 mb-1.5 font-medium">
            <span>Ingredients & Aromatics</span>
            <span className="text-[10px] text-amber-900">Tap to inspect volatiles</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {post.ingredients.map(ing => (
              <button
                key={ing}
                onClick={() => onInspectIngredient(ing)}
                className="text-[11px] bg-stone-100 hover:bg-stone-200/80 text-stone-700 px-2.5 py-1 rounded-lg transition-colors font-medium text-left"
                title={`Inspect FlavorDB volatile chemistry for ${ing}`}
              >
                {ing}
              </button>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onLike(post.id)}
              className="flex items-center gap-1.5 text-stone-500 hover:text-rose-600 transition-colors p-1"
              aria-label="Appreciate contribution"
            >
              <Heart className={`w-4 h-4 ${post.likes > 0 ? 'text-rose-600 fill-rose-600' : ''}`} />
              <span className="font-mono text-xs tabular-nums text-stone-700">{post.likes}</span>
            </button>

            {isVariation && (
              <button
                onClick={() => onViewLineage(post.id)}
                className="text-[11px] text-stone-500 hover:text-stone-900 flex items-center gap-1"
                title="View in Lineage Tree"
              >
                <GitBranch className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Lineage</span>
              </button>
            )}
          </div>

          <button
            onClick={() => onOpenRecreation(post)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-900 hover:bg-stone-900 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
          >
            <ChefHat className="w-3.5 h-3.5" />
            <span>Adapt & Recreate</span>
          </button>
        </div>
      </div>
    </article>
  );
};
