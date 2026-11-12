/**
 * Indian Cooking Techniques & Flavor Science Guide
 * Explains the 5 canonical Indian cooking methods through friendly,
 * accessible computational gastronomy: Tadka, Dhungar, Dum Pukht, Bhunao, and Negative Pairing.
 */

import React, { useState } from 'react';
import { X, Flame, Sparkles, ChefHat, ArrowRight, ShieldCheck } from 'lucide-react';

interface IndianTechniquesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTechniqueForRecreation?: (techniqueKey: string) => void;
}

export const INDIAN_TECHNIQUES = [
  {
    id: 'tadka',
    name: 'Tadka / Chhonk / Baghar',
    hindiName: 'तड़का',
    tagline: 'Hot Lipid Spice Tempering',
    whatItIs: 'Dropping whole spices and aromatics into 180°C hot ghee or oil until they blister and crackle, then pouring the hot oil over the dish.',
    flavorChemistry: 'Most aromatic volatiles in whole spices (like cuminaldehyde in cumin, cineole in cardamom, and sinigrin in mustard seeds) are lipophilic (fat-soluble). Water cannot extract them. Hot oil extracts these volatile oils in 15 seconds, creating an aromatic lipid coat that clings to your tongue.',
    stepByStep: [
      'Heat 1-2 tbsp of pure Desi Ghee or Mustard Oil in a small pan until shimmering.',
      'Drop whole brown mustard seeds; wait 5 seconds until they crackle like fireworks.',
      'Add cumin seeds, a pinch of hing (asafetida), and fresh curry leaves.',
      'Immediately pour the sizzling infused oil over your finished dal, curry, or raita and cover with a lid for 1 minute.'
    ],
    recommendedSpices: ['Mustard Seeds', 'Cumin', 'Curry Leaves', 'Asafetida (Hing)'],
    proTip: 'Never let the spices turn black. The sweet spot is 10-15 seconds of gentle crackling.'
  },
  {
    id: 'dhungar',
    name: 'Dhungar Technique',
    hindiName: 'धुँगार',
    tagline: 'Live Charcoal Smoke Infusion',
    whatItIs: 'Placing glowing natural charcoal in a small metal bowl inside dal or curry, drizzling hot ghee on the coal, and instantly trapping the smoke under a tight lid.',
    flavorChemistry: 'When hot fat drips on glowing carbon, it creates dense smoke rich in Guaiacol and Syringol phenols. Trapped in a sealed pot, these woodsmoke molecules dissolve directly into the fat droplets of the gravy, recreating an authentic tandoor campfire flavor without outdoor equipment.',
    stepByStep: [
      'Heat a small lump of natural wood charcoal with tongs directly over your stove burner until glowing red-hot (approx 3-4 mins).',
      'Place a small heatproof stainless steel or brass bowl (katori) right on top of your cooked dal or curry.',
      'Using tongs, transfer the red-hot charcoal into the small bowl.',
      'Drizzle 1/2 tsp of melted ghee and a pinch of kasuri methi over the hot coal. Dense white smoke will instantly burst forth!',
      'Immediately clamp the pot lid down tight. Keep sealed for 3 to 5 minutes, then remove the coal and discard.'
    ],
    recommendedSpices: ['Desi Ghee', 'Black Cardamom', 'Kasuri Methi'],
    proTip: 'Do not leave the lid on for more than 5 minutes, or the smoke will overpower the delicate spices.'
  },
  {
    id: 'dum',
    name: 'Dum Pukht',
    hindiName: 'दम पुख़्त',
    tagline: 'Hermetic Steam-Trapping Cooking',
    whatItIs: 'Sealing the rim of a heavy cooking pot with dough or foil so rising aromatic steam cannot escape and recirculates back down into the grains.',
    flavorChemistry: 'Fragile botanical volatiles like Safranal (saffron), Terpinyl acetate (cardamom), and Geraniol (rose/kewra) flash-evaporate at boiling point. By sealing the pot hermetically, steam pressure condenses these delicate perfume notes back down into the starch matrix of aged basmati.',
    stepByStep: [
      'Layer 70% parboiled basmati rice over marinated protein or spiced vegetables in a heavy-bottomed handi.',
      'Drizzle saffron milk, melted desi ghee, and golden caramelized onions (birista) on top.',
      'Roll whole wheat flour dough into a rope and press firmly along the rim of the pot.',
      'Press the heavy lid down onto the dough to create an airtight seal.',
      'Place the sealed pot over indirect heat (placing a flat iron tawa underneath) on low flame for 25 minutes.'
    ],
    recommendedSpices: ['Cardamom', 'Clove', 'Star Anise', 'Desi Ghee'],
    proTip: 'In a modern kitchen, two layers of heavy-duty aluminum foil clamped with the lid works just as well as dough!'
  },
  {
    id: 'bhunao',
    name: 'Bhunao',
    hindiName: 'भुनाओ',
    tagline: 'Gentle Wet-Spice Caramelization',
    whatItIs: 'Slowly sautéing a wet paste of onions, ginger, garlic, and ground spices until moisture evaporates and the oil separates (rogaan).',
    flavorChemistry: 'As water leaves the pan, temperature rises from 100°C to 140°C. This triggers the Maillard reaction between amino acids in ginger/alliums and sugars in caramelized onions, developing rich roasted pyrazines that give gravies their deep restaurant body.',
    stepByStep: [
      'Heat oil and add ground onion paste; cook over medium-low flame until golden brown (12-15 mins).',
      'Add freshly crushed ginger and garlic; sauté for 2 minutes until raw sulfur softens.',
      'Add Kashmiri red chili, coriander, and turmeric with a tablespoon of warm water so spices do not scorch.',
      'Cook patiently on low heat until tiny droplets of oil release around the edges of the paste.'
    ],
    recommendedSpices: ['Ginger', 'Kashmiri Red Chili', 'Cumin'],
    proTip: 'Splashing a single tablespoon of hot water when the paste sticks allows you to brown it further without scorching.'
  },
  {
    id: 'negative_pairing',
    name: 'Negative Food Pairing',
    hindiName: 'मसाला संतुलन',
    tagline: 'The Computational Secret of Indian Cuisine',
    whatItIs: 'Pairing spices with very few overlapping chemical compounds to create complex, multi-dimensional sensory layers.',
    flavorChemistry: 'Pioneering computational gastronomy studies (Jain, Bagler et al.) analyzed tens of thousands of Indian recipes and discovered that unlike Western food which often pairs ingredients with identical aroma compounds (positive pairing), Indian cuisine deliberately pairs spices from contrasting chemical spectrums. This prevents sensory fatigue and makes every bite taste dynamic.',
    stepByStep: [
      'Select a pungent seed foundation (Mustard Seeds or Cumin).',
      'Add an earthy resin (Asafetida/Hing) for savory allium depth.',
      'Balance with a cooling sweet terpene spice (Green Cardamom or Clove).',
      'Finish with dry acid (Amchur or Tamarind) to heighten the palate.'
    ],
    recommendedSpices: ['Mustard Seeds', 'Cardamom', 'Amchur', 'Asafetida (Hing)'],
    proTip: 'Combining just 3 contrasting spices (e.g. Mustard + Cardamom + Amchur) delivers more depth than 10 similar spices.'
  }
];

export const IndianTechniquesModal: React.FC<IndianTechniquesModalProps> = ({
  isOpen,
  onClose,
  onSelectTechniqueForRecreation
}) => {
  const [activeTechniqueId, setActiveTechniqueId] = useState<string>('tadka');

  if (!isOpen) return null;

  const current = INDIAN_TECHNIQUES.find(t => t.id === activeTechniqueId) || INDIAN_TECHNIQUES[0];

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase font-bold tracking-wider text-amber-900">
                Computational Gastronomy & Indian Cookery
              </span>
              <span className="text-[10px] text-stone-500 font-mono bg-stone-200/80 px-2 py-0.5 rounded-md">
                5 Canonical Methods
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-serif font-bold text-stone-900 mt-0.5">
              The Science of Indian Cooking Techniques
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 p-2 rounded-xl hover:bg-stone-200/50 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Technique Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1">
            {INDIAN_TECHNIQUES.map(tech => {
              const isSelected = tech.id === activeTechniqueId;
              return (
                <button
                  key={tech.id}
                  onClick={() => setActiveTechniqueId(tech.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all flex items-center gap-2 ${
                    isSelected
                      ? 'bg-amber-900 text-white shadow-xs'
                      : 'bg-stone-100 hover:bg-stone-200/80 text-stone-700'
                  }`}
                >
                  <span>{tech.name}</span>
                  <span className={`text-[10px] opacity-70 ${isSelected ? 'text-amber-200' : 'text-stone-500'}`}>
                    {tech.hindiName}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Technique Display Card */}
          <div className="p-5 sm:p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 border-b border-stone-200 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-serif font-bold text-stone-900">
                    {current.name}
                  </h3>
                  <span className="text-sm font-serif text-amber-900 font-semibold">
                    ({current.hindiName})
                  </span>
                </div>
                <span className="text-xs font-semibold text-amber-800 block mt-0.5">
                  {current.tagline}
                </span>
                <p className="text-xs text-stone-600 mt-1.5 leading-relaxed max-w-2xl">
                  {current.whatItIs}
                </p>
              </div>

              {/* Recommended Spices */}
              <div className="sm:text-right shrink-0">
                <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block mb-1">
                  Key Spices Used:
                </span>
                <div className="flex flex-wrap sm:justify-end gap-1">
                  {current.recommendedSpices.map(sp => (
                    <span
                      key={sp}
                      className="text-[11px] bg-white border border-stone-200 text-stone-800 px-2 py-0.5 rounded-md font-medium"
                    >
                      {sp}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Flavor Science Box */}
            <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-200/80 space-y-1.5 text-xs text-amber-950">
              <span className="font-bold text-[11px] uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-800" />
                The Flavor Chemistry Behind It:
              </span>
              <p className="text-stone-700 leading-relaxed text-xs">
                {current.flavorChemistry}
              </p>
            </div>

            {/* Step-by-Step Practical Kitchen Guide */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-3">
                How to Perform This Technique at Home:
              </span>
              <div className="space-y-2.5">
                {current.stepByStep.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs text-stone-700">
                    <span className="w-5 h-5 rounded-full bg-stone-200 text-stone-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="leading-relaxed flex-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pro Tip */}
            <div className="p-3 bg-white rounded-xl border border-stone-200 text-xs text-stone-600 flex items-center gap-2">
              <span className="font-bold text-stone-900 shrink-0">Chef's Secret:</span>
              <span>{current.proTip}</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <span className="text-xs text-stone-500">
            Culinary Echo · Traditional Kitchen Chemistry
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
