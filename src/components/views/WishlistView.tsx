import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../products/ProductCard';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';

export const WishlistView: React.FC = () => {
  const { wishlist, clearWishlist, setActiveView } = useStore();

  if (wishlist.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center text-white font-sans">
        <div className="w-20 h-20 rounded-3xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mx-auto mb-4">
          <Heart className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Your Wishlist is Empty</h2>
        <p className="text-xs text-zinc-400 mb-6 max-w-md mx-auto">
          Click the heart icon on any product card in the VORTEX catalog to bookmark items for later.
        </p>
        <button
          onClick={() => setActiveView('shop')}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-black font-extrabold text-xs uppercase hover:brightness-110 shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all"
        >
          Explore Shop Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6 font-sans text-white">
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Heart className="w-6 h-6 text-rose-500 fill-current" />
            <span>Saved Wishlist Items ({wishlist.length})</span>
          </h1>
          <p className="text-xs text-zinc-400">
            Bookmark items and add them to cart when ready
          </p>
        </div>

        <button
          onClick={clearWishlist}
          className="text-xs text-rose-400 hover:text-rose-300 font-mono flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Wishlist</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
