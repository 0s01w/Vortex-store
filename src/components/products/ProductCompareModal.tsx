import React from 'react';
import { useStore } from '../../context/StoreContext';
import { X, ShoppingBag, Trash2, Layers } from 'lucide-react';

export const ProductCompareModal: React.FC = () => {
  const {
    compareList,
    toggleCompare,
    clearCompare,
    addToCart,
    formatPrice,
    setActiveView,
  } = useStore();

  if (compareList.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center text-white font-sans">
        <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto mb-4">
          <Layers className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold mb-2">No Products Selected for Comparison</h2>
        <p className="text-xs text-zinc-400 mb-6">
          Add up to 4 items from the shop catalog to compare specs, prices, ratings, and stock status side-by-side.
        </p>
        <button
          onClick={() => setActiveView('shop')}
          className="px-6 py-3 rounded-xl bg-cyan-500 text-black font-extrabold text-xs hover:bg-cyan-400 transition-colors"
        >
          Explore Shop Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 text-white font-sans">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-black tracking-wide flex items-center gap-2">
            <Layers className="w-6 h-6 text-cyan-400" />
            <span>2026 Product Comparison Matrix</span>
          </h1>
          <p className="text-xs text-zinc-400">
            Comparing {compareList.length} of 4 max selected products
          </p>
        </div>

        <button
          onClick={clearCompare}
          className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-rose-400 flex items-center gap-1.5 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          <span>Clear All</span>
        </button>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr>
              <th className="p-4 bg-zinc-900 border border-white/10 text-left font-mono text-zinc-400 w-44">
                Feature / Spec
              </th>
              {compareList.map((prod) => (
                <th
                  key={prod.id}
                  className="p-4 bg-zinc-900/80 border border-white/10 min-w-[220px] text-center relative"
                >
                  <button
                    onClick={() => toggleCompare(prod)}
                    className="absolute top-2 right-2 p-1 rounded-full bg-black/60 hover:bg-rose-500 text-zinc-400 hover:text-white transition-colors"
                    title="Remove from comparison"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>

                  <img
                    src={prod.images[0]}
                    alt={prod.name}
                    className="w-24 h-24 object-cover rounded-xl mx-auto mb-2"
                  />
                  <h3 className="font-bold text-white text-xs line-clamp-2">{prod.name}</h3>
                  <span className="text-[10px] text-cyan-400 font-mono block mt-1">
                    {prod.category}
                  </span>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {/* Price */}
            <tr>
              <td className="p-4 bg-zinc-900/40 border border-white/10 font-bold text-zinc-300">
                Price
              </td>
              {compareList.map((prod) => (
                <td key={prod.id} className="p-4 border border-white/10 text-center font-mono text-base font-extrabold text-cyan-400">
                  {formatPrice(prod.price)}
                </td>
              ))}
            </tr>

            {/* Rating */}
            <tr>
              <td className="p-4 bg-zinc-900/40 border border-white/10 font-bold text-zinc-300">
                Customer Rating
              </td>
              {compareList.map((prod) => (
                <td key={prod.id} className="p-4 border border-white/10 text-center font-mono font-bold text-amber-400">
                  ★ {prod.rating} ({prod.reviewCount} reviews)
                </td>
              ))}
            </tr>

            {/* Stock Status */}
            <tr>
              <td className="p-4 bg-zinc-900/40 border border-white/10 font-bold text-zinc-300">
                Stock Status
              </td>
              {compareList.map((prod) => (
                <td key={prod.id} className="p-4 border border-white/10 text-center font-mono text-emerald-400">
                  {prod.stockStatus === 'in_stock' ? `In Stock (${prod.stockCount})` : 'Limited'}
                </td>
              ))}
            </tr>

            {/* Tagline */}
            <tr>
              <td className="p-4 bg-zinc-900/40 border border-white/10 font-bold text-zinc-300">
                Core Innovation
              </td>
              {compareList.map((prod) => (
                <td key={prod.id} className="p-4 border border-white/10 text-center text-zinc-300 font-mono">
                  {prod.tagline}
                </td>
              ))}
            </tr>

            {/* Action */}
            <tr>
              <td className="p-4 bg-zinc-900/40 border border-white/10 font-bold text-zinc-300">
                Add to Cart
              </td>
              {compareList.map((prod) => (
                <td key={prod.id} className="p-4 border border-white/10 text-center">
                  <button
                    onClick={() => addToCart(prod)}
                    className="w-full py-2.5 px-3 rounded-xl bg-cyan-500 text-black font-extrabold text-xs hover:bg-cyan-400 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-black" />
                    <span>Add to Cart</span>
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
