import React from 'react';
import { useStore } from '../../context/StoreContext';
import { CATEGORIES } from '../../data/categories';
import { ArrowRight, Sparkles } from 'lucide-react';

export const CategoryGrid: React.FC = () => {
  const { setFilterState, setActiveView } = useStore();

  const handleCategorySelect = (catId: string) => {
    setFilterState((prev) => ({ ...prev, category: catId }));
    setActiveView('shop');
  };

  return (
    <section className="py-12 w-full font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2 border-b border-white/10 pb-4">
          <div>
            <span className="text-xs text-cyan-400 font-mono font-bold uppercase tracking-widest flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explore Ecosystem</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              2026 PRODUCT CATEGORIES
            </h2>
          </div>

          <button
            onClick={() => {
              setFilterState((prev) => ({ ...prev, category: 'All' }));
              setActiveView('shop');
            }}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-mono font-bold flex items-center gap-1.5 transition-colors"
          >
            <span>Browse Full Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id)}
              className="group relative h-60 rounded-3xl overflow-hidden border border-white/10 hover:border-cyan-500/50 cursor-pointer transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,240,255,0.25)] flex flex-col justify-end p-6"
            >
              {/* Background Image */}
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

              {/* Content */}
              <div className="relative z-10 space-y-1">
                <span className="text-[10px] text-cyan-400 font-mono uppercase tracking-widest font-bold">
                  {cat.count} ITEMS AVAILABLE
                </span>
                <h3 className="text-xl font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-zinc-300 line-clamp-1 font-sans">
                  {cat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
