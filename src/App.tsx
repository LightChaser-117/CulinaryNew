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
  RecreationResult,
  RecipeDBItem
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
import { IndianTechniquesModal } from './components/IndianTechniquesModal';
import { KitchenPantryFinder } from './components/KitchenPantryFinder';
import { SimpleRecipeModal } from './components/SimpleRecipeModal';
import { EVERYDAY_HOME_STAPLES } from './data/pantryDatabase';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Sparkles, GitBranch, ChefHat, Check, Heart, BookOpen, Compass, Flame, ShoppingBag } from 'lucide-react';

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

  // User Kitchen Pantry selection
  const [userPantryItems, setUserPantryItems] = useState<Set<string>>(
    () => new Set(EVERYDAY_HOME_STAPLES.slice(0, 9))
  );
  const [activeRecipeModalItem, setActiveRecipeModalItem] = useState<RecipeDBItem | LivingContribution | null>(null);
  const [showPantryFinder, setShowPantryFinder] = useState<boolean>(true);

  // Filter & Search state
  const [selectedSensoryTag, setSelectedSensoryTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals state
  const [activeRecreationDish, setActiveRecreationDish] = useState<LivingContribution | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [isTechniquesModalOpen, setIsTechniquesModalOpen] = useState<boolean>(false);
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

  const handleTogglePantryItem = (itemName: string) => {
    setUserPantryItems(prev => {
      const next = new Set(prev);
      if (next.has(itemName)) {
        next.delete(itemName);
        showToast(`Removed ${itemName} from your kitchen`);
      } else {
        next.add(itemName);
        showToast(`Added ${itemName} to your kitchen`);
      }
      return next;
    });
  };

  const handleClearPantry = () => {
    setUserPantryItems(new Set());
    showToast('Kitchen pantry reset');
  };

  const handleSelectEverydayStaples = () => {
    setUserPantryItems(new Set(EVERYDAY_HOME_STAPLES));
    showToast('Added 15 everyday home cooking staples!');
  };

  const handleOpenRecipe = (recipe: RecipeDBItem | LivingContribution) => {
    setActiveRecipeModalItem(recipe);
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
            {/* Editorial Hero Intro Banner - Simple, Catchy, Warm */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs">
              <div className="max-w-3xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-900 font-bold bg-amber-100/70 px-2 py-0.5 rounded-md">
                    Everyday Kitchen Magic
                  </span>
                  <span className="text-stone-300">·</span>
                  <span className="text-xs text-stone-500">Cook With What You Have</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight text-balance leading-tight">
                  Delicious Home Cooking, Made Simple.
                </h1>
                <p className="text-sm sm:text-base text-stone-600 mt-2.5 leading-relaxed">
                  Got potatoes, onions, dal, or paneer? Pick your ingredients below to discover comforting family recipes, quick swaps for missing items, and the little secrets that make home food taste incredible.
                </p>

                {/* Subtitle anchor points */}
                <div className="mt-5 pt-5 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-stone-600">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-700" />
                    <span>Everyday Pantry Ingredients</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-700" />
                    <span>Easy Swaps If You're Missing Something</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-700" />
                    <span>Simple Step-by-Step Recipes</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Kitchen Pantry Finder: Clustered by Dairy, Veggies, Dals & Flours, Spices, etc. */}
            <KitchenPantryFinder
              selectedItems={userPantryItems}
              onToggleItem={handleTogglePantryItem}
              onClearAll={handleClearPantry}
              onSelectStaples={handleSelectEverydayStaples}
              onCookRecipe={handleOpenRecipe}
              posts={posts}
            />

            {/* The 5 Secrets of Indian Cooking Spotlight */}
            <div className="bg-gradient-to-r from-amber-50/90 via-stone-50 to-orange-50/70 rounded-3xl p-5 sm:p-6 border border-amber-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-amber-900 font-bold bg-amber-100/80 px-2 py-0.5 rounded-md">
                    Home Chef Spotlight
                  </span>
                  <span className="text-xs text-stone-500">· Traditional Kitchen Secrets</span>
                </div>
                <h2 className="text-lg sm:text-xl font-serif font-bold text-stone-900">
                  The 5 Little Secrets of Great Indian Cooking
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Why crackling cumin in hot ghee (tadka), trapping charcoal smoke (dhungar), and slow browning (bhunao) make everyday home meals taste unforgettable.
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                  <span className="text-[11px] font-semibold text-stone-500">Quick comfort favorites:</span>
                  <button
                    onClick={() => {
                      setSearchQuery('Aloo Paratha');
                      setSelectedSensoryTag(null);
                    }}
                    className="px-2.5 py-1 bg-white hover:bg-stone-100 border border-stone-200 rounded-lg text-stone-700 font-medium transition-colors cursor-pointer"
                  >
                    🫓 Crispy Aloo Paratha
                  </button>
                  <button
                    onClick={() => {
                      setSearchQuery('Dal Tadka');
                      setSelectedSensoryTag(null);
                    }}
                    className="px-2.5 py-1 bg-white hover:bg-stone-100 border border-stone-200 rounded-lg text-stone-700 font-medium transition-colors cursor-pointer"
                  >
                    🍛 Sizzling Dal Tadka
                  </button>
                  <button
                    onClick={() => {
                      setSearchQuery('Paneer Bhurji');
                      setSelectedSensoryTag(null);
                    }}
                    className="px-2.5 py-1 bg-white hover:bg-stone-100 border border-stone-200 rounded-lg text-stone-700 font-medium transition-colors cursor-pointer"
                  >
                    🧀 15-Min Paneer Bhurji
                  </button>
                </div>
              </div>

              <button
                onClick={() => setIsTechniquesModalOpen(true)}
                className="px-5 py-3 bg-amber-900 hover:bg-amber-950 text-white text-xs font-semibold rounded-2xl shadow-sm transition-all flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Flame className="w-4 h-4 text-amber-300" />
                <span>The 5 Kitchen Secrets</span>
              </button>
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

      {/* Indian Cooking Techniques & Flavor Science Guide */}
      {isTechniquesModalOpen && (
        <IndianTechniquesModal
          isOpen={isTechniquesModalOpen}
          onClose={() => setIsTechniquesModalOpen(false)}
        />
      )}

      {/* Simple Homestyle Recipe Modal */}
      {activeRecipeModalItem && (
        <SimpleRecipeModal
          recipe={activeRecipeModalItem}
          onClose={() => setActiveRecipeModalItem(null)}
          onAdaptWithPantry={(rec) => {
            if ('parentId' in rec) {
              setActiveRecreationDish(rec as LivingContribution);
            } else {
              const asPost: LivingContribution = {
                id: (rec as RecipeDBItem).id,
                author: 'Indian Home Kitchen',
                authorAvatar: 'H',
                title: rec.title,
                category: (rec as RecipeDBItem).cuisine,
                story: (rec as RecipeDBItem).process.join(' '),
                image: '',
                ingredients: rec.ingredients,
                sensory: rec.sensory,
                parentId: null,
                variationType: 'Home Recipe',
                likes: 50,
                saved: false,
                createdAt: 'Traditional'
              };
              setActiveRecreationDish(asPost);
            }
          }}
          userPantryItems={userPantryItems}
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
