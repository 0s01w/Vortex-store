import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  X,
  Star,
  ShoppingBag,
  Heart,
  Check,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    formatPrice,
    setSelectedProduct,
  } = useStore();

  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const isWishlisted = isInWishlist(quickViewProduct.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-3xl rounded-3xl bg-zinc-900 border border-white/10 shadow-[0_0_50px_rgba(0,240,255,0.2)] overflow-hidden text-white font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-zinc-400 hover:text-white border border-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-square w-full bg-black">
            <img
              src={quickViewProduct.images[0]}
              alt={quickViewProduct.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono text-xs uppercase">
                {quickViewProduct.category}
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="p-6 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-amber-400 font-bold mb-1">
                <Star className="w-4 h-4 fill-current" />
                <span>{quickViewProduct.rating}</span>
                <span className="text-zinc-500">({quickViewProduct.reviewCount} reviews)</span>
              </div>

              <h2 className="text-xl font-bold text-white mb-1">
                {quickViewProduct.name}
              </h2>
              <p className="text-xs text-cyan-400 font-mono mb-3">
                SKU: {quickViewProduct.sku}
              </p>

              <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                {quickViewProduct.description}
              </p>

              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-2xl font-black text-white font-mono">
                  {formatPrice(quickViewProduct.price)}
                </span>
                {quickViewProduct.originalPrice > quickViewProduct.price && (
                  <span className="text-sm text-zinc-500 line-through font-mono">
                    {formatPrice(quickViewProduct.originalPrice)}
                  </span>
                )}
              </div>

              {/* Highlights */}
              <ul className="space-y-1.5 text-xs text-zinc-400 mb-6">
                {quickViewProduct.features.slice(0, 3).map((f, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <div className="flex items-center gap-3">
                <div className="flex items-center rounded-xl bg-black border border-white/10 p-1 font-mono text-xs">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 hover:text-cyan-400"
                  >
                    -
                  </button>
                  <span className="px-3 text-white font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 hover:text-cyan-400"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => {
                    addToCart(quickViewProduct, quantity);
                    setQuickViewProduct(null);
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-black font-extrabold text-xs hover:brightness-110 shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4 text-black" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={() => toggleWishlist(quickViewProduct)}
                  className={`p-3 rounded-xl border transition-all ${
                    isWishlisted
                      ? 'bg-rose-500 text-white border-rose-400'
                      : 'bg-black/60 text-zinc-300 border-white/10 hover:text-white'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              <button
                onClick={() => {
                  setSelectedProduct(quickViewProduct);
                  setQuickViewProduct(null);
                }}
                className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-cyan-300 flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Open Full Specification Page</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
