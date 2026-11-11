/**
 * Share Modal Component
 * Low-friction living contribution form.
 * Supports sharing fresh memories, recipes, campfire experiments,
 * and registering variations linked to existing lineage parents.
 */

import React, { useState, useEffect } from 'react';
import { X, Sparkles, GitBranch, HelpCircle, Image as ImageIcon, Check } from 'lucide-react';
import { LivingContribution, RecreationResult } from '../types';
import { FLAVOR_DB } from '../data/culinaryDatabase';

// Default appetizing imagery for fallback contributions
const DEFAULT_PRESET_IMAGES = [
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80'
];

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (post: Omit<LivingContribution, 'id' | 'likes' | 'saved' | 'createdAt'>) => void;
  parentDish?: LivingContribution | null;
  recreationResult?: RecreationResult | null;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  parentDish,
  recreationResult
}) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('Heritage Memory');
  const [story, setStory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [aroma, setAroma] = useState('');
  const [taste, setTaste] = useState('');
  const [texture, setTexture] = useState('');
  const [ingredientsText, setIngredientsText] = useState('');
  const [changedNotes, setChangedNotes] = useState('');
  const [retainedNotes, setRetainedNotes] = useState('');
  const [showPrompts, setShowPrompts] = useState(false);

  // Prepopulate if spawned from recreation result
  useEffect(() => {
    if (!isOpen) return;
    if (parentDish) {
      setTitle(`Variation: ${parentDish.title}`);
      setCategory('Community Variation');
      if (recreationResult) {
        setChangedNotes(
          recreationResult.tradeOffs.slice(0, 2).join(' ') ||
          `Adapted with available kitchen ingredients.`
        );
        setRetainedNotes(
          recreationResult.retainedIngredients.slice(0, 3).join(', ') ||
          'Core flavor profile'
        );
        setIngredientsText(
          [
            ...recreationResult.retainedIngredients,
            ...recreationResult.substitutions.map(s => s.suggested)
          ].join(', ')
        );
      } else {
        setIngredientsText(parentDish.ingredients.join(', '));
      }
      setAroma(parentDish.sensory.aroma);
      setTaste(parentDish.sensory.taste);
      setTexture(parentDish.sensory.texture);
    } else {
      setTitle('');
      setCategory('Heritage Memory');
      setStory('');
      setImageUrl('');
      setAroma('');
      setTaste('');
      setTexture('');
      setIngredientsText('');
      setChangedNotes('');
      setRetainedNotes('');
    }
  }, [parentDish, recreationResult, isOpen]);

  // Compute matched ingredients from FlavorDB
  const matchedFlavorDbCount = React.useMemo(() => {
    if (!ingredientsText) return 0;
    const items = ingredientsText.split(',').map(s => s.trim().toLowerCase());
    return items.filter(item =>
      FLAVOR_DB.some(f => f.name.toLowerCase().includes(item) || item.includes(f.name.toLowerCase()))
    ).length;
  }, [ingredientsText]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const parsedIngredients = ingredientsText
      ? ingredientsText.split(',').map(s => s.trim()).filter(Boolean)
      : ['Aromatics', 'Pantry staples'];

    const chosenImage = imageUrl.trim() || parentDish?.image || DEFAULT_PRESET_IMAGES[0];
    const chosenAuthor = author.trim() || 'You (Kitchen Explorer)';

    onSubmit({
      author: chosenAuthor,
      authorAvatar: chosenAuthor[0].toUpperCase(),
      title: title.trim(),
      category: parentDish ? 'Community Variation' : category,
      story: story.trim() || 'A shared food memory and kitchen experiment.',
      image: chosenImage,
      ingredients: parsedIngredients,
      sensory: {
        aroma: aroma.trim() || 'Aromatic Warmth',
        taste: taste.trim() || 'Balanced Heat & Acidity',
        texture: texture.trim() || 'Tender Broth'
      },
      parentId: parentDish ? parentDish.id : null,
      variationType: parentDish ? 'Accessible Recreation' : 'Original Experience',
      changedNotes: changedNotes.trim() || undefined,
      retainedNotes: retainedNotes.trim() || undefined
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-5 sm:px-6 py-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between gap-4">
          <div>
            <span className="text-[11px] uppercase font-bold tracking-wider text-amber-900 block">
              {parentDish ? 'Register Lineage Variation' : 'New Living Contribution'}
            </span>
            <h2 className="text-base sm:text-lg font-serif font-bold text-stone-900">
              {parentDish ? `Building Upon ${parentDish.author}'s Recipe` : 'Share a Dish, Memory, or Experiment'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 p-2 rounded-xl hover:bg-stone-200/50 transition-colors"
            aria-label="Close share dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 overflow-y-auto text-xs sm:text-sm">
          {/* Lineage banner if variation */}
          {parentDish && (
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5">
              <GitBranch className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Linked to Source Node:</span>
                <span>
                  "{parentDish.title}" by {parentDish.author}. This variation will be permanently attributed in the living lineage tree.
                </span>
              </div>
            </div>
          )}

          {/* Title & Author */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Dish or Experience Name *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Claypot Tamarind Rasam, Campfire Mole..."
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-900"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Your Name / Pseudonym
              </label>
              <input
                type="text"
                value={author}
                onChange={e => setAuthor(e.target.value)}
                placeholder="e.g. Maya Chen"
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-900"
              />
            </div>
          </div>

          {/* Memory / Story & Helper Prompts */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-stone-700">
                Personal Story, Memory, or Experiment Context
              </label>
              <button
                type="button"
                onClick={() => setShowPrompts(!showPrompts)}
                className="text-[11px] text-amber-900 hover:underline flex items-center gap-1"
              >
                <HelpCircle className="w-3 h-3" />
                <span>{showPrompts ? 'Hide prompt ideas' : 'Need inspiration?'}</span>
              </button>
            </div>

            {showPrompts && (
              <div className="mb-2 p-2.5 bg-stone-100 rounded-xl text-[11px] text-stone-600 space-y-1">
                <span className="font-semibold block text-stone-800">Lightweight Prompts:</span>
                <p>· Where did you first experience this flavor?</p>
                <p>· What stood out to you—the smell, the texture, or the company?</p>
                <p>· Did you substitute anything or try a shortcut?</p>
              </div>
            )}

            <textarea
              rows={3}
              value={story}
              onChange={e => setStory(e.target.value)}
              placeholder="What makes this taste memorable to you? A brief personal reflection or cooking discovery..."
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-900 leading-relaxed"
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Photo URL (Optional)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="url"
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
                placeholder="https://... (or leave blank to use heritage food visual)"
                className="flex-1 px-3 py-2 text-xs sm:text-sm rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-900"
              />
            </div>
          </div>

          {/* Variation Specific Details */}
          {parentDish && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-stone-50 rounded-2xl border border-stone-200">
              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-1">
                  What did you change?
                </label>
                <input
                  type="text"
                  value={changedNotes}
                  onChange={e => setChangedNotes(e.target.value)}
                  placeholder="e.g. Used lime juice instead of tamarind, cooked in single pan"
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-white border border-stone-200 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-1">
                  What did you retain?
                </label>
                <input
                  type="text"
                  value={retainedNotes}
                  onChange={e => setRetainedNotes(e.target.value)}
                  placeholder="e.g. Smoky toasted cumin aroma & sharp tart finish"
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-white border border-stone-200 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* Sensory Descriptors */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Sensory Registers (Optional observations)
            </label>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <span className="text-[10px] text-stone-500 uppercase font-semibold block mb-0.5">
                  Aroma
                </span>
                <input
                  type="text"
                  value={aroma}
                  onChange={e => setAroma(e.target.value)}
                  placeholder="e.g. Smoky, Woodsy"
                  className="w-full px-2.5 py-1.5 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:outline-none"
                />
              </div>
              <div>
                <span className="text-[10px] text-stone-500 uppercase font-semibold block mb-0.5">
                  Taste
                </span>
                <input
                  type="text"
                  value={taste}
                  onChange={e => setTaste(e.target.value)}
                  placeholder="e.g. Tangy, Umami"
                  className="w-full px-2.5 py-1.5 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:outline-none"
                />
              </div>
              <div>
                <span className="text-[10px] text-stone-500 uppercase font-semibold block mb-0.5">
                  Texture
                </span>
                <input
                  type="text"
                  value={texture}
                  onChange={e => setTexture(e.target.value)}
                  placeholder="e.g. Velvety, Crisp"
                  className="w-full px-2.5 py-1.5 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Ingredients with FlavorDB Counter */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-stone-700">
                Key Ingredients (comma separated)
              </label>
              {matchedFlavorDbCount > 0 && (
                <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  ✓ {matchedFlavorDbCount} linked to FlavorDB compounds
                </span>
              )}
            </div>
            <input
              type="text"
              value={ingredientsText}
              onChange={e => setIngredientsText(e.target.value)}
              placeholder="e.g. Tamarind, Coconut Milk, Ginger, Cumin, Smoked Paprika"
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-900"
            />
            <span className="text-[10px] text-stone-400 mt-1 block">
              Our local algorithm automatically maps these to volatile aroma compounds without black-box AI.
            </span>
          </div>

          {/* Footer Submit */}
          <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold bg-amber-900 hover:bg-stone-900 text-white rounded-xl shadow-xs transition-colors"
            >
              Publish Contribution
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
