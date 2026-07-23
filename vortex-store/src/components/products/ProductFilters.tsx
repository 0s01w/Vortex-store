import React from 'react';
import { useStore } from '../../context/StoreContext';
import { CATEGORIES } from '../../data/categories';
import { SlidersHorizontal, RotateCcw, Check, Star } from 'lucide-react';

export const ProductFilters: React.FC = () => {
  const { filterState, setFilterState, resetFilters, formatPrice, products } = useStore();

  const handleCategoryChange = (catName: string) => {
    setFilterState((prev) => ({
      ...prev,
      category: prev.category === catName ? 'All' : catName,
    }));
  };

  return (
    <div className="w-full p-5 rounded-3xl bg-zinc-900/80 border border-white/10 backdrop-blur-xl text-white space-y-6 font-sans">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2 font-bold text-sm">
          <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
          <span>Filter 2026 Gear</span>
        </div>
        <button
          onClick={resetFilters}
          className="text-xs text-zinc-400 hover:text-cyan-400 flex items-center gap-1 transition-colors font-mono"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Category Filter */}
      <div>
        <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-3">
          Category
        </h4>
        <div className="space-y-1.5 text-xs">
          <button
            onClick={() => handleCategoryChange('All')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all ${
              filterState.category === 'All'
                ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>All Categories</span>
            <span className="font-mono text-[10px] text-zinc-500">{products.length}</span>
          </button>

          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all ${
                filterState.category === cat.id
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{cat.name}</span>
              <span className="font-mono text-[10px] text-zinc-500">{cat.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="pt-3 border-t border-white/10">
        <div className="flex items-center justify-between text-xs mb-2">
          <h4 className="font-bold text-zinc-300 uppercase tracking-wider">
            Max Price
          </h4>
          <span className="font-mono text-cyan-400 font-bold">
            {formatPrice(filterState.priceRange[1])}
          </span>
        </div>
        <input
          type="range"
          min={50}
          max={4000}
          step={50}
          value={filterState.priceRange[1]}
          onChange={(e) => {
            const val = Number(e.target.value);
            setFilterState((prev) => ({
              ...prev,
              priceRange: [prev.priceRange[0], val],
            }));
          }}
          className="w-full accent-cyan-400 cursor-pointer bg-zinc-800 rounded-lg"
        />
        <div className="flex justify-between text-[10px] text-zinc-500 font-mono mt-1">
          <span>{formatPrice(0)}</span>
          <span>{formatPrice(4000)}</span>
        </div>
      </div>

      {/* Minimum Rating */}
      <div className="pt-3 border-t border-white/10">
        <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
          Minimum Rating
        </h4>
        <div className="grid grid-cols-4 gap-1.5 text-xs font-mono">
          {[4.5, 4.0, 3.5, 0].map((ratingVal) => (
            <button
              key={ratingVal}
              onClick={() =>
                setFilterState((prev) => ({
                  ...prev,
                  minRating: prev.minRating === ratingVal ? 0 : ratingVal,
                }))
              }
              className={`py-1.5 rounded-lg border text-center transition-all ${
                filterState.minRating === ratingVal
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold'
                  : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
              }`}
            >
              {ratingVal === 0 ? 'All' : `${ratingVal}+★`}
            </button>
          ))}
        </div>
      </div>

      {/* Toggles */}
      <div className="pt-3 border-t border-white/10 space-y-2 text-xs">
        <label className="flex items-center gap-2 cursor-pointer text-zinc-300 hover:text-white">
          <input
            type="checkbox"
            checked={filterState.onSaleOnly}
            onChange={(e) =>
              setFilterState((prev) => ({ ...prev, onSaleOnly: e.target.checked }))
            }
            className="rounded accent-cyan-400"
          />
          <span>Flash Sale / Discounted Only</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer text-zinc-300 hover:text-white">
          <input
            type="checkbox"
            checked={filterState.inStockOnly}
            onChange={(e) =>
              setFilterState((prev) => ({ ...prev, inStockOnly: e.target.checked }))
            }
            className="rounded accent-cyan-400"
          />
          <span>In Stock Items Only</span>
        </label>
      </div>
    </div>
  );
};
