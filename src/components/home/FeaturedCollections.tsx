import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../products/ProductCard';
import { Sparkles, Flame, Star, Zap } from 'lucide-react';

export const FeaturedCollections: React.FC = () => {
  const { products, setActiveView } = useStore();
  const [activeTab, setActiveTab] = useState<'trending' | 'new' | 'bestsellers'>('trending');

  let filteredProducts = products;
  if (activeTab === 'trending') {
    filteredProducts = products.filter((p) => p.isFeatured);
  } else if (activeTab === 'new') {
    filteredProducts = products.filter((p) => p.isNew);
  } else if (activeTab === 'bestsellers') {
    filteredProducts = products.filter((p) => p.rating >= 4.8);
  }

  return (
    <section className="py-12 w-full font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* Tab Headers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h2 className="text-2xl font-black text-white">2026 FEATURED GEAR</h2>
          </div>

          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-zinc-900 border border-white/10 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('trending')}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'trending'
                  ? 'bg-cyan-500 text-black font-extrabold shadow-[0_0_15px_#00f0ff]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Trending</span>
            </button>

            <button
              onClick={() => setActiveTab('new')}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'new'
                  ? 'bg-cyan-500 text-black font-extrabold shadow-[0_0_15px_#00f0ff]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>New 2026</span>
            </button>

            <button
              onClick={() => setActiveTab('bestsellers')}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'bestsellers'
                  ? 'bg-cyan-500 text-black font-extrabold shadow-[0_0_15px_#00f0ff]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Star className="w-3.5 h-3.5" />
              <span>Best Rated</span>
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All */}
        <div className="text-center pt-4">
          <button
            onClick={() => setActiveView('shop')}
            className="px-8 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-cyan-300 transition-all hover:border-cyan-500/50"
          >
            View All 40+ VORTEX Products →
          </button>
        </div>
      </div>
    </section>
  );
};
