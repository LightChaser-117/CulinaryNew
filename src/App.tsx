/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Culinary Echo - Main Application Controller
 * Connects community food experiences with structured culinary knowledge
 * from RecipeDB, FlavorDB, and CocktailDB via deterministic algorithms.
 */

import React, { useState, useMemo } from 'react';
import {
  INITIAL_POSTS,
  COMMUNITIES,
  FLAVOR_DB,
  RECIPE_DB,
  COCKTAIL_DB
} from './data/culinaryDatabase';
import {
  LivingContribution,
  CommunityCircle,
  RecreationResult
} from './types';
import { GastronomyEngine } from './services/gastronomyEngine';
import { Navbar } from './components/Navbar';
import { SensoryFilterBar } from './components/SensoryFilterBar';
import { PostCard } from './components/PostCard';
import { AdaptiveRecreationModal } from './components/AdaptiveRecreationModal';
import { FlavorDBExplorer } from './components/FlavorDBExplorer';
import { ContributionLineageView } from './components/ContributionLineageView';
import { SensoryCirclesView } from './components/SensoryCirclesView';
import { PersonalCabinetView } from './components/PersonalCabinetView';
import { ShareModal } from './components/ShareModal';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Sparkles, GitBranch, ChefHat, Check, Heart, BookOpen, Compass } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'feed' | 'graph' | 'lineage' | 'circles' | 'cabinet'>('feed');
  const [posts, setPosts] = useState<LivingContribution[]>(INITIAL_POSTS);
  const [communities, setCommunities] = useState<CommunityCircle[]>(COMMUNITIES);
  const [savedPostIds, setSavedPostIds] = useState<Set<string>>(() => {
    const initialSaved = new Set<string>();
    INITIAL_POSTS.forEach(p => {
      if (p.saved) initialSaved.add(p.id);
    });
    return initialSaved;
  });

  // Filter & Search state
  const [selectedSensoryTag, setSelectedSensoryTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals state
  const [activeRecreationDish, setActiveRecreationDish] = useState<LivingContribution | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [shareParentDish, setShareParentDish] = useState<LivingContribution | null>(null);
  const [recreationResultForVariation, setRecreationResultForVariation] = useState<RecreationResult | null>(null);

  // Cross-tab deep links
  const [selectedFlavorIngredient, setSelectedFlavorIngredient] = useState<string>(FLAVOR_DB[0].name);
  const [highlightLineageId, setHighlightLineageId] = useState<string | null>(null);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 3200);
  };

  // Filtered posts for discover feed
  const filteredPosts = useMemo(() => {
    return GastronomyEngine.filterContributions(posts, searchQuery, selectedSensoryTag);
  }, [posts, searchQuery, selectedSensoryTag]);

  // Actions
  const handleLike = (id: string) => {
    setPosts(prev =>
      prev.map(p => {
        if (p.id === id) {
          const isLiked = p.likes % 2 === 1; // simple toggle demonstration
          return { ...p, likes: p.likes + 1 };
        }
        return p;
      })
    );
    showToast('Echoed appreciation for this food experience');
  };

  const handleToggleSave = (id: string) => {
    setSavedPostIds(prev => {
      const next = new Set(prev);
      const isCurrentlySaved = next.has(id);
      if (isCurrentlySaved) {
        next.delete(id);
        showToast('Removed from Personal Cabinet');
      } else {
        next.add(id);
        showToast('Saved to your Personal Cabinet');
      }
      return next;
    });

    setPosts(prev =>
      prev.map(p => (p.id === id ? { ...p, saved: !p.saved } : p))
    );
  };

  const handleOpenRecreation = (dish: LivingContribution) => {
    setActiveRecreationDish(dish);
  };

  const handleCloseRecreation = () => {
    setActiveRecreationDish(null);
  };

  const handleRecordVariationFromRecreation = (
    parent: LivingContribution,
    recreationResult: RecreationResult
  ) => {
    setActiveRecreationDish(null);
    setShareParentDish(parent);
    setRecreationResultForVariation(recreationResult);
    setIsShareModalOpen(true);
  };

  const handleOpenAddVariationDirect = (parent: LivingContribution) => {
    setShareParentDish(parent);
    setRecreationResultForVariation(null);
    setIsShareModalOpen(true);
  };

  const handleOpenGeneralShare = () => {
    setShareParentDish(null);
    setRecreationResultForVariation(null);
    setIsShareModalOpen(true);
  };

  const handlePublishContribution = (
    newPostData: Omit<LivingContribution, 'id' | 'likes' | 'saved' | 'createdAt'>
  ) => {
    const newId = `post_${Date.now()}`;
    const newPost: LivingContribution = {
      ...newPostData,
      id: newId,
      likes: 1,
      saved: false,
      createdAt: 'Just now'
    };

    setPosts(prev => [newPost, ...prev]);
    showToast(
      newPostData.parentId
        ? 'Variation registered in the Contribution Lineage tree!'
        : 'Your food experience is now live on the Discover Feed!'
    );

    if (newPostData.parentId) {
      setHighlightLineageId(newId);
      setActiveTab('lineage');
    } else {
      setActiveTab('feed');
    }
  };

  const handleInspectIngredient = (ingredientName: string) => {
    setSelectedFlavorIngredient(ingredientName);
    setActiveTab('graph');
    showToast(`Loaded FlavorDB molecular volatile matrix for ${ingredientName}`);
  };

  const handleViewLineage = (postId: string) => {
    setHighlightLineageId(postId);
    setActiveTab('lineage');
  };

  const handleToggleJoinCircle = (circleId: string) => {
    setCommunities(prev =>
      prev.map(c => {
        if (c.id === circleId) {
          const nextState = !c.joined;
          showToast(nextState ? `Joined ${c.name} circle` : `Left ${c.name}`);
          return {
            ...c,
            joined: nextState,
            members: nextState ? c.members + 1 : c.members - 1
          };
        }
        return c;
      })
    );
  };

  const handleExploreCircle = (sensoryTag: string) => {
    setSelectedSensoryTag(sensoryTag);
    setActiveTab('feed');
    showToast(`Filtering experiences for "${sensoryTag}"`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5] text-stone-900 selection:bg-amber-100 selection:text-amber-950">
      {/* Top Bar Navigation */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenShareModal={handleOpenGeneralShare}
        savedCount={savedPostIds.size}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <ErrorBoundary fallbackTitle="Could not load this culinary view">
        {/* Tab 1: Discover Feed */}
        {activeTab === 'feed' && (
          <div className="space-y-6 sm:space-y-8">
            {/* Editorial Hero Intro Banner */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs">
              <div className="max-w-3xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-900 font-semibold">
                    Living Culinary Network
                  </span>
                  <span className="text-stone-300">·</span>
                  <span className="text-xs text-stone-500">Zero Black-Box AI Dependency</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight text-balance leading-tight">
                  Where Food Memories, Volatiles & Kitchen Realities Meet.
                </h1>
                <p className="text-sm sm:text-base text-stone-600 mt-2.5 leading-relaxed">
                  Discover regional dishes, family heritage flavours, and culinary experiments. Connect them with peer-reviewed aroma volatiles from <strong>FlavorDB</strong>, authentic processes from <strong>RecipeDB</strong>, and practical adaptive recreation pathways that work with what you have.
                </p>

                {/* Subtitle anchor points */}
                <div className="mt-5 pt-5 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-stone-600">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-700" />
                    <span>Deterministic Jaccard Aroma Pairing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-700" />
                    <span>Transparent Substitution Trade-Offs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-700" />
                    <span>Traceable Lineage & Creator Attribution</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sensory Filter Bar */}
            <SensoryFilterBar
              selectedTag={selectedSensoryTag}
              searchQuery={searchQuery}
              onSelectTag={setSelectedSensoryTag}
              onSearchChange={setSearchQuery}
              onReset={() => {
                setSelectedSensoryTag(null);
                setSearchQuery('');
              }}
              totalResults={filteredPosts.length}
            />

            {/* Grid of living contributions */}
            {filteredPosts.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-stone-200 space-y-3">
                <Compass className="w-8 h-8 text-stone-400 mx-auto" />
                <h3 className="text-base font-serif font-bold text-stone-800">
                  No culinary experiences found for this sensory filter
                </h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  Try searching for aroma volatiles like "guaiacol", "citral", "smoky", or tap clear to view all contributions.
                </p>
                <button
                  onClick={() => {
                    setSelectedSensoryTag(null);
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded-xl hover:bg-stone-800 transition-colors shadow-2xs"
                >
                  Clear search parameters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map(post => {
                  const parent = post.parentId
                    ? posts.find(p => p.id === post.parentId)
                    : null;
                  return (
                    <PostCard
                      key={post.id}
                      post={post}
                      parentPost={parent}
                      onLike={handleLike}
                      onToggleSave={handleToggleSave}
                      onOpenRecreation={handleOpenRecreation}
                      onInspectIngredient={handleInspectIngredient}
                      onViewLineage={handleViewLineage}
                    />
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: FlavorDB Molecular Connection Matrix */}
        {activeTab === 'graph' && (
          <FlavorDBExplorer
            initialIngredient={selectedFlavorIngredient}
            onExploreIngredientInFeed={(ing) => {
              setSearchQuery(ing);
              setActiveTab('feed');
              showToast(`Showing community dishes with ${ing}`);
            }}
          />
        )}

        {/* Tab 3: Contribution Lineage View */}
        {activeTab === 'lineage' && (
          <ContributionLineageView
            posts={posts}
            onOpenRecreation={handleOpenRecreation}
            onAddVariation={handleOpenAddVariationDirect}
            highlightPostId={highlightLineageId}
          />
        )}

        {/* Tab 4: Sensory Circles / Communities */}
        {activeTab === 'circles' && (
          <SensoryCirclesView
            circles={communities}
            onToggleJoin={handleToggleJoinCircle}
            onExploreCircle={handleExploreCircle}
          />
        )}

        {/* Tab 5: Personal Cabinet */}
        {activeTab === 'cabinet' && (
          <PersonalCabinetView
            posts={posts}
            savedPostIds={savedPostIds}
            onLike={handleLike}
            onToggleSave={handleToggleSave}
            onOpenRecreation={handleOpenRecreation}
            onInspectIngredient={handleInspectIngredient}
            onViewLineage={handleViewLineage}
            onExploreFeed={() => setActiveTab('feed')}
          />
        )}
        </ErrorBoundary>
      </main>

      {/* Adaptive Recreation Modal Studio */}
      {activeRecreationDish && (
        <AdaptiveRecreationModal
          dish={activeRecreationDish}
          onClose={handleCloseRecreation}
          onRecordVariation={handleRecordVariationFromRecreation}
        />
      )}

      {/* Low-Friction Living Contribution Modal */}
      {isShareModalOpen && (
        <ShareModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          onSubmit={handlePublishContribution}
          parentDish={shareParentDish}
          recreationResult={recreationResultForVariation}
        />
      )}

      {/* Footer */}
      <footer className="mt-auto border-t border-stone-200/90 bg-white py-8 text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-serif font-bold text-stone-800 text-sm">Culinary Echo</span>
            <span className="text-stone-300">·</span>
            <span>A Living Record of Taste, Food Memory & Adaptation</span>
          </div>
          <div className="flex items-center gap-4 text-stone-400">
            <span>FlavorDB Molecule Mappings</span>
            <span>·</span>
            <span>RecipeDB Processes</span>
            <span>·</span>
            <span>CocktailDB Formulations</span>
          </div>
        </div>
      </footer>

      {/* Global Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-stone-900 text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs animate-in slide-in-from-bottom-3 duration-200">
          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
