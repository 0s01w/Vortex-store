import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  X,
  Star,
  ShoppingBag,
  Heart,
  Layers,
  Check,
  ShieldCheck,
  Truck,
  Sparkles,
  Zap,
  MessageSquare,
  ThumbsUp,
  Box,
} from 'lucide-react';
import { Review } from '../../types';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    toggleCompare,
    isInCompare,
    formatPrice,
    showNotification,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'specs' | 'features' | 'reviews'>('specs');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [hologramMode, setHologramMode] = useState(false);

  // New review form
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewName, setReviewName] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewsList, setReviewsList] = useState<Review[]>(selectedProduct?.reviews || []);

  if (!selectedProduct) return null;

  const isWishlisted = isInWishlist(selectedProduct.id);
  const isCompared = isInCompare(selectedProduct.id);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewComment) {
      showNotification('Please fill in your name and review', 'warning');
      return;
    }

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      userName: `${reviewName} (Verified Customer)`,
      userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      rating: reviewRating,
      date: new Date().toISOString().split('T')[0],
      comment: reviewComment,
      verifiedPurchase: true,
      helpfulCount: 1,
    };

    setReviewsList([newRev, ...reviewsList]);
    setReviewName('');
    setReviewComment('');
    showNotification('Thank you for submitting your 2026 review!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl overflow-y-auto font-sans">
      <div
        className="relative w-full max-w-5xl rounded-3xl bg-zinc-950 border border-cyan-500/30 shadow-[0_0_80px_rgba(0,240,255,0.25)] overflow-hidden text-white my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Controls */}
        <div className="sticky top-0 z-20 flex items-center justify-between p-4 px-6 bg-zinc-900/90 border-b border-white/10 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs uppercase border border-cyan-500/30">
              {selectedProduct.category}
            </span>
            <span className="text-xs text-zinc-400 font-mono">
              SKU: {selectedProduct.sku}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setHologramMode(!hologramMode)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                hologramMode
                  ? 'bg-cyan-500 text-black border-cyan-400 shadow-[0_0_20px_#00f0ff]'
                  : 'bg-white/5 text-cyan-300 border-white/10 hover:bg-white/10'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              <span>{hologramMode ? 'Exit Hologram 3D' : '3D Hologram Mode'}</span>
            </button>

            <button
              onClick={() => setSelectedProduct(null)}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Content Body */}
        <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column: Image Gallery & Hologram Simulation */}
          <div className="space-y-4">
            <div
              className={`relative aspect-square w-full rounded-2xl overflow-hidden border border-white/10 bg-black flex items-center justify-center ${
                hologramMode ? 'ring-2 ring-cyan-400 shadow-[0_0_50px_rgba(0,240,255,0.4)]' : ''
              }`}
            >
              {hologramMode ? (
                <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[radial-gradient(#00f0ff_1px,transparent_1px)] [background-size:16px_16px]">
                  <div className="absolute inset-0 bg-cyan-500/10 animate-pulse pointer-events-none" />
                  <img
                    src={selectedProduct.images[selectedImageIndex]}
                    alt={selectedProduct.name}
                    className="w-4/5 h-4/5 object-contain filter drop-shadow-[0_0_25px_rgba(0,240,255,0.8)] animate-pulse"
                  />
                  <div className="absolute bottom-4 inset-x-4 p-2 rounded-xl bg-black/80 border border-cyan-500/40 text-[10px] font-mono text-cyan-300 flex items-center justify-between">
                    <span>NEURAL 3D MESH PROJECTION</span>
                    <span>144 FPS / HOLOGRAPHIC</span>
                  </div>
                </div>
              ) : (
                <img
                  src={selectedProduct.images[selectedImageIndex] || selectedProduct.images[0]}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
              )}

              {/* Discount Tag */}
              {selectedProduct.discountPercent > 0 && (
                <div className="absolute top-4 left-4 px-3 py-1 rounded-xl bg-purple-600 text-white font-extrabold text-xs shadow-lg">
                  -{selectedProduct.discountPercent}% OFF
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {selectedProduct.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {selectedProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                      selectedImageIndex === idx
                        ? 'border-cyan-400 scale-105 shadow-[0_0_15px_#00f0ff]'
                        : 'border-white/10 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Quick Guarantees */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2.5 text-xs text-zinc-300">
                <Truck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Quantum Express 1-Hour Dispatch</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2.5 text-xs text-zinc-300">
                <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0" />
                <span>5-Year Cyber Security Coverage</span>
              </div>
            </div>
          </div>

          {/* Right Column: Product Core Details & Specs */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              {/* Name & Tagline */}
              <h1 className="text-2xl font-black text-white mb-1">
                {selectedProduct.name}
              </h1>
              <p className="text-xs text-cyan-400 font-mono mb-3">
                {selectedProduct.tagline}
              </p>

              {/* Rating & Stock */}
              <div className="flex items-center justify-between text-xs mb-4 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(selectedProduct.rating)
                            ? 'fill-current'
                            : 'text-zinc-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-bold text-white">{selectedProduct.rating}</span>
                  <span className="text-zinc-500">({reviewsList.length} reviews)</span>
                </div>

                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[11px] font-bold border border-emerald-500/30">
                  {selectedProduct.stockStatus === 'in_stock'
                    ? `In Stock (${selectedProduct.stockCount})`
                    : 'Limited Stock'}
                </span>
              </div>

              {/* Price Banner */}
              <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10 flex items-baseline justify-between mb-4">
                <div>
                  <span className="text-xs text-zinc-400 block mb-0.5">VORTEX Price</span>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-black text-white font-mono">
                      {formatPrice(selectedProduct.price)}
                    </span>
                    {selectedProduct.originalPrice > selectedProduct.price && (
                      <span className="text-sm text-zinc-500 line-through font-mono">
                        {formatPrice(selectedProduct.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-cyan-400 font-mono block">
                    Use Coupon "VORTEX2026"
                  </span>
                  <span className="text-xs text-emerald-400 font-bold">
                    Save {formatPrice(selectedProduct.originalPrice - selectedProduct.price)}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-zinc-300 leading-relaxed mb-6">
                {selectedProduct.description}
              </p>

              {/* Quantity Picker & Primary Action Buttons */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center rounded-xl bg-black border border-white/10 p-1.5 font-mono text-xs">
                    <span className="text-zinc-500 px-2">QTY:</span>
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1 hover:text-cyan-400 font-bold"
                    >
                      -
                    </button>
                    <span className="px-3 text-white font-bold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1 hover:text-cyan-400 font-bold"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      addToCart(selectedProduct, quantity);
                      setSelectedProduct(null);
                    }}
                    className="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-black font-extrabold text-xs tracking-wider uppercase hover:brightness-110 shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4 text-black" />
                    <span>Add {quantity} to Cart</span>
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => toggleWishlist(selectedProduct)}
                    className={`flex-1 py-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      isWishlisted
                        ? 'bg-rose-500 text-white border-rose-400'
                        : 'bg-white/5 text-zinc-300 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                    <span>{isWishlisted ? 'In Wishlist' : 'Add to Wishlist'}</span>
                  </button>

                  <button
                    onClick={() => toggleCompare(selectedProduct)}
                    className={`flex-1 py-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      isCompared
                        ? 'bg-cyan-500 text-black border-cyan-400 font-bold'
                        : 'bg-white/5 text-zinc-300 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <Layers className="w-4 h-4" />
                    <span>{isCompared ? 'In Compare' : 'Add to Compare'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Tabs for Specs / Features / Reviews */}
        <div className="p-6 md:p-8 border-t border-white/10 bg-zinc-900/50">
          <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-6 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('specs')}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeTab === 'specs'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Technical Specifications
            </button>

            <button
              onClick={() => setActiveTab('features')}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeTab === 'features'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Key Innovations
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeTab === 'reviews'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Customer Reviews ({reviewsList.length})
            </button>
          </div>

          {/* Specs Tab */}
          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {selectedProduct.specifications.map((spec, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-black/60 border border-white/10 flex items-center justify-between"
                >
                  <span className="text-zinc-400 font-medium">{spec.label}</span>
                  <span className="text-white font-mono font-bold">{spec.value}</span>
                </div>
              ))}
            </div>
          )}

          {/* Features Tab */}
          {activeTab === 'features' && (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {selectedProduct.features.map((feat, i) => (
                <li
                  key={i}
                  className="p-3.5 rounded-xl bg-black/60 border border-white/10 flex items-start gap-3"
                >
                  <Zap className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-zinc-200">{feat}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="space-y-6 text-xs">
              {/* Existing Reviews */}
              <div className="space-y-3">
                {reviewsList.length === 0 ? (
                  <p className="text-zinc-500">No reviews submitted yet for this demo product. Be the first!</p>
                ) : (
                  reviewsList.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-4 rounded-xl bg-black/60 border border-white/10 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src={rev.userAvatar}
                            alt={rev.userName}
                            className="w-7 h-7 rounded-full object-cover"
                          />
                          <span className="font-bold text-white">{rev.userName}</span>
                          {rev.verifiedPurchase && (
                            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px]">
                              Verified
                            </span>
                          )}
                        </div>
                        <span className="text-zinc-500 font-mono">{rev.date}</span>
                      </div>

                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < rev.rating ? 'fill-current' : 'text-zinc-700'
                            }`}
                          />
                        ))}
                      </div>

                      <p className="text-zinc-300 leading-relaxed">{rev.comment}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Add Review Form */}
              <div className="p-4 rounded-2xl bg-black border border-cyan-500/30 space-y-3">
                <h4 className="font-bold text-white flex items-center gap-2 text-sm">
                  <MessageSquare className="w-4 h-4 text-cyan-400" />
                  <span>Submit Fictional 2026 Customer Review</span>
                </h4>

                <form onSubmit={handleAddReview} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-zinc-400 text-[11px] mb-1">Your Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Cyber Gamer"
                        value={reviewName}
                        onChange={(e) => setReviewName(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-400 text-[11px] mb-1">Rating</label>
                      <select
                        value={reviewRating}
                        onChange={(e) => setReviewRating(Number(e.target.value))}
                        className="w-full p-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs font-mono"
                      >
                        <option value={5}>5 Stars - Outstanding</option>
                        <option value={4}>4 Stars - Great Gear</option>
                        <option value={3}>3 Stars - Average</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-zinc-400 text-[11px] mb-1">Your Review</label>
                    <textarea
                      rows={2}
                      placeholder="Share your experience with this futuristic VORTEX item..."
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-cyan-500 text-black font-bold text-xs hover:bg-cyan-400 transition-colors"
                  >
                    Post Review
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
