import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../products/ProductCard';
import { ProductFilters } from '../products/ProductFilters';
import {
  SlidersHorizontal,
  Search,
  Grid,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

export const ShopCatalogView: React.FC = () => {
  const { filteredProducts, filterState, setFilterState, resetFilters, products } = useStore();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 font-sans text-white">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="text-xs text-cyan-400 font-mono font-bold uppercase tracking-widest flex items-center gap-1.5 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>2026 Gear Catalog</span>
          </span>
          <h1 className="text-3xl font-black text-white">SHOP ALL VORTEX PRODUCTS</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Showing {filteredProducts.length} of {products.length} fictional sample items
          </p>
        </div>

        {/* Top Search & Controls Bar */}
        <div className="flex items-center gap-3">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs font-semibold flex items-center gap-1.5 text-zinc-300"
          >
            <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
            <span>Filters</span>
          </button>

          {/* Sort Dropdown */}
          <select
            value={filterState.sortBy}
            onChange={(e) =>
              setFilterState((prev) => ({
                ...prev,
                sortBy: e.target.value as any,
              }))
            }
            className="p-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-cyan-500"
          >
            <option value="featured">Sort: Featured 2026</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest Arrivals</option>
          </select>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Filters (Desktop) */}
        <div className="hidden lg:block lg:col-span-1">
          <ProductFilters />
        </div>

        {/* Mobile Filters Slide-over */}
        {mobileFiltersOpen && (
          <div className="lg:hidden p-4 rounded-3xl bg-zinc-900 border border-white/10 space-y-4">
            <ProductFilters />
          </div>
        )}

        {/* Product Cards Grid */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-zinc-900/50 border border-white/10 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white">No Products Matched Your Filter</h3>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                Try loosening your price range slider or clearing category selections.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 rounded-xl bg-cyan-500 text-black font-extrabold text-xs uppercase hover:bg-cyan-400 transition-colors inline-flex items-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset All Filters</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
