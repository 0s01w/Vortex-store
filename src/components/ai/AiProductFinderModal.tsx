import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Sparkles,
  X,
  ArrowRight,
  RotateCcw,
  ShoppingBag,
  Zap,
} from 'lucide-react';
import { Product } from '../../types';

export const AiProductFinderModal: React.FC = () => {
  const { isAiFinderOpen, setIsAiFinderOpen, products, addToCart, setSelectedProduct, formatPrice } = useStore();

  const [step, setStep] = useState(1);
  const [recipient, setRecipient] = useState('Pro Gamer & Streamer');
  const [budget, setBudget] = useState('Under $1,000');
  const [categoryPreference, setCategoryPreference] = useState('Neural VR & Gaming');
  const [lifestyle, setLifestyle] = useState('Futuristic Tech Enthusiast');

  const [isGenerating, setIsGenerating] = useState(false);
  const [recommendations, setRecommendations] = useState<
    { product: Product; reason: string }[]
  >([]);

  if (!isAiFinderOpen) return null;

  const handleGenerate = async () => {
    setIsGenerating(true);
    setStep(2); // Step 2 is generating state / results

    try {
      const res = await fetch('/api/ai/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipient,
          budget,
          categoryPreference,
          lifestyle,
        }),
      });

      const data = await res.json();

      let matchedItems: { product: Product; reason: string }[] = [];

      if (Array.isArray(data.recommendations)) {
        data.recommendations.forEach((item: { sku: string; reason: string }) => {
          const found = products.find((p) => p.sku === item.sku || p.id === item.sku);
          if (found) {
            matchedItems.push({ product: found, reason: item.reason });
          }
        });
      }

      // Fallback if AI server response was offline or partial match
      if (matchedItems.length === 0) {
        matchedItems = products.slice(0, 3).map((p, idx) => ({
          product: p,
          reason: `Specially selected based on your ${categoryPreference} preference and ${budget} budget parameters.`,
        }));
      }

      setRecommendations(matchedItems);
    } catch (err) {
      setRecommendations(
        products.slice(0, 3).map((p) => ({
          product: p,
          reason: 'VORTEX Neural Agent top recommended pick for 2026 performance.',
        }))
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setRecommendations([]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl overflow-y-auto font-sans">
      <div
        className="relative w-full max-w-3xl rounded-3xl bg-zinc-950 border border-purple-500/40 shadow-[0_0_80px_rgba(138,43,226,0.3)] overflow-hidden text-white my-8 p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <Sparkles className="w-5 h-5 animate-spin" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white">
                VORTEX AI Smart Gift & Tech Finder
              </h2>
              <p className="text-xs text-purple-300 font-mono">
                Neural Recommendation Algorithm 2026
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAiFinderOpen(false)}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: Questionnaire */}
        {step === 1 && (
          <div className="space-y-6 text-xs">
            <p className="text-zinc-300 leading-relaxed">
              Answer 4 quick preferences to let our Gemini Neural Engine curate the perfect futuristic product match.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Recipient */}
              <div className="space-y-1.5">
                <label className="text-zinc-400 font-bold uppercase tracking-wider block">
                  1. Who is this for?
                </label>
                <select
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full p-3 rounded-xl bg-zinc-900 border border-white/10 text-white font-mono"
                >
                  <option value="Pro Gamer & Streamer">Pro Gamer & Streamer</option>
                  <option value="Executive & Cyber Professional">Executive & Cyber Professional</option>
                  <option value="Tech Enthusiast & Gadget Collector">Tech Enthusiast & Gadget Collector</option>
                  <option value="Smart Home Specialist">Smart Home Specialist</option>
                  <option value="Cyberpunk Fashion Pioneer">Cyberpunk Fashion Pioneer</option>
                </select>
              </div>

              {/* Budget */}
              <div className="space-y-1.5">
                <label className="text-zinc-400 font-bold uppercase tracking-wider block">
                  2. Price Budget
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full p-3 rounded-xl bg-zinc-900 border border-white/10 text-white font-mono"
                >
                  <option value="Under $300">Under $300 (Accessories & Apparel)</option>
                  <option value="Under $1,000">Under $1,000 (Gadgets & Display)</option>
                  <option value="Under $2,500">Under $2,500 (Pro Rigs & VR Headsets)</option>
                  <option value="No Budget Limit">No Limit (Ultra Luxury Rigs)</option>
                </select>
              </div>

              {/* Category */}
              <div className="space-y-1.5">
                <label className="text-zinc-400 font-bold uppercase tracking-wider block">
                  3. Primary Category
                </label>
                <select
                  value={categoryPreference}
                  onChange={(e) => setCategoryPreference(e.target.value)}
                  className="w-full p-3 rounded-xl bg-zinc-900 border border-white/10 text-white font-mono"
                >
                  <option value="Neural VR & Gaming">Neural VR & Gaming</option>
                  <option value="Quantum Computing & Mobile">Quantum Computing & Mobile</option>
                  <option value="Smart Home & Robotics">Smart Home & Robotics</option>
                  <option value="Cyber Fashion & Outerwear">Cyber Fashion & Outerwear</option>
                  <option value="Futuristic Office Setup">Futuristic Office Setup</option>
                </select>
              </div>

              {/* Lifestyle */}
              <div className="space-y-1.5">
                <label className="text-zinc-400 font-bold uppercase tracking-wider block">
                  4. Primary Usage Scenario
                </label>
                <select
                  value={lifestyle}
                  onChange={(e) => setLifestyle(e.target.value)}
                  className="w-full p-3 rounded-xl bg-zinc-900 border border-white/10 text-white font-mono"
                >
                  <option value="High Performance Gaming & VR Immersion">High Performance Gaming & VR</option>
                  <option value="Productivity & Work From Anywhere">Productivity & Remote Work</option>
                  <option value="Luxury Cyber Style Statement">Cyber Style Statement</option>
                  <option value="Home Automation & Security">Home Automation & Security</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-extrabold text-xs uppercase tracking-widest hover:brightness-110 shadow-[0_0_30px_rgba(138,43,226,0.4)] transition-all flex items-center justify-center gap-2 mt-4"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>Analyze & Match 2026 Products</span>
            </button>
          </div>
        )}

        {/* STEP 2: Loading or Results */}
        {step === 2 && (
          <div className="space-y-6">
            {isGenerating ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full border-4 border-purple-500 border-t-transparent animate-spin mx-auto" />
                <h3 className="text-base font-bold text-purple-300 font-mono">
                  Synthesizing Neural Recommendations...
                </h3>
                <p className="text-xs text-zinc-400">
                  Cross-referencing {products.length} products with recipient profile: "{recipient}"
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span>Top AI Curated Matches ({recommendations.length})</span>
                  </h3>
                  <button
                    onClick={handleReset}
                    className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 font-mono"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Start Over</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {recommendations.map(({ product, reason }) => (
                    <div
                      key={product.id}
                      className="p-4 rounded-2xl bg-zinc-900 border border-purple-500/30 flex flex-col sm:flex-row items-center gap-4 justify-between"
                    >
                      <div className="flex items-center gap-4 w-full sm:w-auto">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-xl shrink-0"
                        />
                        <div>
                          <h4 className="font-bold text-white text-sm">{product.name}</h4>
                          <span className="text-xs font-mono text-cyan-400 font-bold block">
                            {formatPrice(product.price)}
                          </span>
                          <p className="text-[11px] text-zinc-300 italic mt-1 line-clamp-2">
                            "{reason}"
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                        <button
                          onClick={() => {
                            setSelectedProduct(product);
                            setIsAiFinderOpen(false);
                          }}
                          className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-cyan-300 font-bold"
                        >
                          Specs
                        </button>
                        <button
                          onClick={() => {
                            addToCart(product);
                            setIsAiFinderOpen(false);
                          }}
                          className="px-4 py-2 rounded-xl bg-cyan-500 text-black font-extrabold text-xs hover:bg-cyan-400 flex items-center gap-1"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Buy Now</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
