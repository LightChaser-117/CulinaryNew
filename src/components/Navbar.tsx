/**
 * Top Navigation Bar following the Top Bar Contract:
 * Zone 1: Single brand wordmark
 * Zone 2: Concise single-line navigation links
 * Zone 3: Single primary action + Personal Cabinet bookmark button
 */

import React from 'react';
import { Bookmark, Sparkles, Plus } from 'lucide-react';

interface NavbarProps {
  activeTab: 'feed' | 'graph' | 'lineage' | 'circles' | 'cabinet';
  onSelectTab: (tab: 'feed' | 'graph' | 'lineage' | 'circles' | 'cabinet') => void;
  onOpenShareModal: () => void;
  savedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  onOpenShareModal,
  savedCount
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#faf8f5]/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element wordmark in display face) */}
        <button
          onClick={() => onSelectTab('feed')}
          className="text-left cursor-pointer group flex items-center gap-2.5 focus:outline-none"
        >
          <div className="w-8 h-8 rounded-lg bg-stone-900 text-[#faf8f5] flex items-center justify-center font-serif font-bold text-base shadow-xs group-hover:bg-amber-900 transition-colors">
            CE
          </div>
          <span className="text-xl font-serif font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0 group-hover:text-amber-950 transition-colors">
            Culinary Echo
          </span>
        </button>

        {/* Zone 2: 4 Concise Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
          <button
            onClick={() => onSelectTab('feed')}
            className={`whitespace-nowrap shrink-0 pb-1 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'feed'
                ? 'border-amber-800 text-stone-900 font-semibold'
                : 'border-transparent hover:text-stone-900 hover:border-stone-300'
            }`}
          >
            Discover Recipes
          </button>
          <button
            onClick={() => onSelectTab('graph')}
            className={`whitespace-nowrap shrink-0 pb-1 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'graph'
                ? 'border-amber-800 text-stone-900 font-semibold'
                : 'border-transparent hover:text-stone-900 hover:border-stone-300'
            }`}
          >
            Flavor Pairs
          </button>
          <button
            onClick={() => onSelectTab('lineage')}
            className={`whitespace-nowrap shrink-0 pb-1 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'lineage'
                ? 'border-amber-800 text-stone-900 font-semibold'
                : 'border-transparent hover:text-stone-900 hover:border-stone-300'
            }`}
          >
            Recipe Family Tree
          </button>
          <button
            onClick={() => onSelectTab('circles')}
            className={`whitespace-nowrap shrink-0 pb-1 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'circles'
                ? 'border-amber-800 text-stone-900 font-semibold'
                : 'border-transparent hover:text-stone-900 hover:border-stone-300'
            }`}
          >
            Food Circles
          </button>
        </nav>

        {/* Zone 3: Primary Action & Cabinet */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onSelectTab('cabinet')}
            className={`p-2 rounded-xl border transition-colors relative cursor-pointer ${
              activeTab === 'cabinet'
                ? 'bg-stone-900 text-white border-stone-900'
                : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300 hover:bg-stone-50'
            }`}
            title="Saved Recipes"
            aria-label="Saved Recipes"
          >
            <Bookmark className="w-4 h-4" />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-700 text-white text-[9px] font-bold rounded-full flex items-center justify-center tabular-nums">
                {savedCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenShareModal}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-stone-900 rounded-xl hover:bg-amber-950 transition-colors shadow-xs whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Share Dish</span>
          </button>
        </div>
      </div>

      {/* Mobile subnavigation bar */}
      <div className="md:hidden flex items-center justify-around px-2 py-2 border-t border-stone-200 text-xs font-medium text-stone-600 bg-white/70 overflow-x-auto hide-scrollbar">
        <button
          onClick={() => onSelectTab('feed')}
          className={`px-2.5 py-1 rounded-lg ${activeTab === 'feed' ? 'bg-stone-200 text-stone-900 font-bold' : ''}`}
        >
          Discover
        </button>
        <button
          onClick={() => onSelectTab('graph')}
          className={`px-2.5 py-1 rounded-lg ${activeTab === 'graph' ? 'bg-stone-200 text-stone-900 font-bold' : ''}`}
        >
          Flavor Pairs
        </button>
        <button
          onClick={() => onSelectTab('lineage')}
          className={`px-2.5 py-1 rounded-lg ${activeTab === 'lineage' ? 'bg-stone-200 text-stone-900 font-bold' : ''}`}
        >
          Family Tree
        </button>
        <button
          onClick={() => onSelectTab('circles')}
          className={`px-2.5 py-1 rounded-lg ${activeTab === 'circles' ? 'bg-stone-200 text-stone-900 font-bold' : ''}`}
        >
          Food Circles
        </button>
      </div>
    </header>
  );
};
