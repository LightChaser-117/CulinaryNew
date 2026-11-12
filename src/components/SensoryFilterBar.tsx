/**
 * Sensory Filter Bar
 * Allows discovering food experiences through aroma, taste, texture, and mood
 */

import React from 'react';
import { Search, X, SlidersHorizontal, Sparkles } from 'lucide-react';

interface SensoryFilterBarProps {
  selectedTag: string | null;
  searchQuery: string;
  onSelectTag: (tag: string | null) => void;
  onSearchChange: (query: string) => void;
  onReset: () => void;
  totalResults: number;
}

const SENSORY_TAGS = [
  { label: 'Smoky', hint: 'Charcoal & Campfire' },
  { label: 'Tart & Sour', hint: 'Tangy Lemon & Tamarind' },
  { label: 'Comforting', hint: 'Warm Dal & Toasted Ghee' },
  { label: 'Citrus', hint: 'Fresh Herbs & Lime' },
  { label: 'Velvety', hint: 'Melting Butter & Cream' },
  { label: 'Woodsy Warmth', hint: 'Cardamom & Cloves' },
  { label: 'Earthy', hint: 'Toasted Cumin & Mustard' }
];

export const SensoryFilterBar: React.FC<SensoryFilterBarProps> = ({
  selectedTag,
  searchQuery,
  onSelectTag,
  onSearchChange,
  onReset,
  totalResults
}) => {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/90 shadow-xs space-y-4">
      {/* Top search & quick status row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="Search by dish, ingredient or taste (e.g. Aloo, Dal, Paneer, Biryani, smoky)..."
            className="w-full pl-9 pr-9 py-2 text-xs sm:text-sm bg-stone-50 hover:bg-stone-100/70 focus:bg-white border border-stone-200 focus:border-stone-400 rounded-xl focus:outline-none focus:ring-1 focus:ring-stone-400 transition-colors placeholder:text-stone-400"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-stone-500">
          <span className="tabular-nums font-mono text-[11px] text-stone-600">
            {totalResults} {totalResults === 1 ? 'dish' : 'dishes'} found
          </span>
          {(selectedTag || searchQuery) && (
            <button
              onClick={onReset}
              className="text-stone-700 hover:text-amber-900 underline font-medium text-xs transition-colors"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {/* Sensory filter buttons */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400" />
            Explore by Taste & Mood
          </span>
          <span className="text-[11px] text-stone-400 hidden sm:inline">
            Tap a flavor to filter recipes
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1">
          <button
            onClick={() => onSelectTag(null)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
              selectedTag === null
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            All Registers
          </button>
          {SENSORY_TAGS.map(tag => {
            const isActive = selectedTag === tag.label;
            return (
              <button
                key={tag.label}
                onClick={() => onSelectTag(isActive ? null : tag.label)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap shrink-0 transition-colors flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-amber-900 text-white shadow-xs'
                    : 'bg-stone-100 hover:bg-stone-200/80 text-stone-700'
                }`}
                title={tag.hint}
              >
                <span>{tag.label}</span>
                <span
                  className={`text-[10px] opacity-70 ${
                    isActive ? 'text-amber-200' : 'text-stone-500'
                  }`}
                >
                  · {tag.hint.split('/')[0].trim()}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
