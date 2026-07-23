import React from 'react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';
import {
  Star,
  ShoppingBag,
  Heart,
  Eye,
  Layers,
  Sparkles,
  Zap,
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    toggleCompare,
    isInCompare,
    setSelectedProduct,
    setQuickViewProduct,
    formatPrice,
  } = useStore();

  const isWishlisted = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  return (
    <div className="group relative rounded-3xl bg-zinc-900/60 hover:bg-zinc-900/90 border border-white/10 hover:border-cyan-500/50 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,240,255,0.25)] flex flex-col justify-between">
      {/* Top Media Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-black/40">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Overlay Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isFlashSale && (
            <span className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-red-600 to-rose-600 text-white font-extrabold text-[10px] tracking-wider uppercase shadow-md flex items-center gap-1">
              <Zap className="w-3 h-3 fill-current" />
              Flash Sale
            </span>
          )}
          {product.isNew && (
            <span className="px-2.5 py-1 rounded-lg bg-cyan-500 text-black font-extrabold text-[10px] tracking-wider uppercase shadow-md">
              2026 New
            </span>
          )}
          {product.discountPercent > 0 && (
            <span className="px-2.5 py-1 rounded-lg bg-purple-600 text-white font-bold text-[10px] shadow-md">
              -{product.discountPercent}%
            </span>
          )}
        </div>

        {/* Top Right Quick Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-90 group-hover:opacity-100 transition-opacity z-10">
          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product);
            }}
            className={`p-2.5 rounded-xl border backdrop-blur-md transition-all ${
              isWishlisted
                ? 'bg-rose-500 text-white border-rose-400 shadow-lg'
                : 'bg-black/60 text-zinc-300 border-white/20 hover:text-white hover:bg-black'
            }`}
            title="Toggle Wishlist"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>

          {/* Compare Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleCompare(product);
            }}
            className={`p-2.5 rounded-xl border backdrop-blur-md transition-all ${
              isCompared
                ? 'bg-cyan-500 text-black border-cyan-400 shadow-lg font-bold'
                : 'bg-black/60 text-zinc-300 border-white/20 hover:text-white hover:bg-black'
            }`}
            title="Compare Product"
          >
            <Layers className="w-4 h-4" />
          </button>

          {/* Quick View Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="p-2.5 rounded-xl bg-black/60 text-zinc-300 border border-white/20 backdrop-blur-md hover:text-white hover:bg-black transition-all"
            title="Quick Preview"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Hover Full Detail Overlay Banner */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between z-10">
          <button
            onClick={() => setSelectedProduct(product)}
            className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-xs font-semibold border border-white/20 transition-all flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>View Full 2026 Specs</span>
          </button>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-5 flex flex-col justify-between flex-1 gap-3">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-1.5 font-mono">
            <span className="uppercase tracking-wider text-[10px] text-cyan-400/90 font-bold">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{product.rating}</span>
              <span className="text-zinc-500 font-normal">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3
            onClick={() => setSelectedProduct(product)}
            className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1 cursor-pointer"
          >
            {product.name}
          </h3>

          {/* Tagline */}
          <p className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5 font-normal">
            {product.tagline}
          </p>
        </div>

        {/* Price & Add to Cart Action */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-base font-extrabold text-white font-mono">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-zinc-500 line-through font-mono">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-400 font-mono block">
              {product.stockStatus === 'in_stock'
                ? `In Stock (${product.stockCount})`
                : product.stockStatus === 'low_stock'
                ? `Only ${product.stockCount} left`
                : 'Limited Edition'}
            </span>
          </div>

          {/* Add to Cart button */}
          <button
            onClick={() => addToCart(product)}
            className="p-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-black font-extrabold hover:brightness-110 shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all flex items-center justify-center shrink-0"
            title="Add to Cart"
          >
            <ShoppingBag className="w-4 h-4 text-black" />
          </button>
        </div>
      </div>
    </div>
  );
};
