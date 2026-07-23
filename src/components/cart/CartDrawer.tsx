import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  ShoppingBag,
  Trash2,
  Tag,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
  Check,
  X,
} from 'lucide-react';

export const CartDrawer: React.FC<{ onProceedCheckout: () => void }> = ({ onProceedCheckout }) => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    formatPrice,
    setActiveView,
  } = useStore();

  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // Discount calculation
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percent') {
      discountAmount = (subtotal * appliedCoupon.discountValue) / 100;
    } else {
      discountAmount = Math.min(subtotal, appliedCoupon.discountValue);
    }
  }

  const freeShippingThreshold = 500;
  const shippingCost = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 25;
  const tax = Math.round((subtotal - discountAmount) * 0.08);
  const total = Math.max(0, subtotal - discountAmount + shippingCost + tax);

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponCodeInput) return;
    const res = applyCoupon(couponCodeInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponCodeInput('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center text-white font-sans">
        <div className="w-20 h-20 rounded-3xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto mb-4">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Your 2026 Cart is Empty</h2>
        <p className="text-xs text-zinc-400 mb-6 max-w-md mx-auto">
          Explore futuristic neural VR, quantum tech, and cyber fashion items in the shop catalog.
        </p>
        <button
          onClick={() => setActiveView('shop')}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-black font-extrabold text-xs tracking-wider uppercase hover:brightness-110 shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all"
        >
          Explore Shop Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-white font-sans">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-black tracking-wide flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-cyan-400" />
            <span>Shopping Cart ({cart.reduce((a, b) => a + b.quantity, 0)} Items)</span>
          </h1>
          <p className="text-xs text-zinc-400">
            Fictional demo checkout simulator
          </p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-rose-400 hover:text-rose-300 font-mono flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Empty Cart</span>
        </button>
      </div>

      {/* Free Shipping Meter */}
      <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10 mb-8 space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="flex items-center gap-2 text-cyan-400">
            <Truck className="w-4 h-4" />
            {subtotal >= freeShippingThreshold
              ? '🎉 You unlocked FREE Quantum Express Shipping!'
              : `Add ${formatPrice(freeShippingThreshold - subtotal)} more for Free Express Shipping`}
          </span>
          <span className="font-mono text-zinc-400">
            {subtotal >= freeShippingThreshold
              ? '100%'
              : `${Math.round((subtotal / freeShippingThreshold) * 100)}%`}
          </span>
        </div>

        <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-300"
            style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
          />
        </div>
      </div>

      {/* Cart Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items Column */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item.product.id}
              className="p-4 rounded-2xl bg-zinc-900/80 border border-white/10 flex flex-col sm:flex-row items-center gap-4 justify-between"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded-xl shrink-0"
                />
                <div>
                  <span className="text-[10px] text-cyan-400 font-mono uppercase block">
                    {item.product.category}
                  </span>
                  <h3 className="font-bold text-white text-sm">{item.product.name}</h3>
                  <span className="text-xs text-zinc-400 font-mono block mt-1">
                    {formatPrice(item.product.price)} each
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                {/* Quantity Controls */}
                <div className="flex items-center rounded-xl bg-black border border-white/10 p-1 font-mono text-xs">
                  <button
                    onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                    className="px-2.5 py-1 hover:text-cyan-400 font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 text-white font-bold">{item.quantity}</span>
                  <button
                    onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                    className="px-2.5 py-1 hover:text-cyan-400 font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Total Price for item */}
                <span className="font-mono font-extrabold text-sm text-white">
                  {formatPrice(item.product.price * item.quantity)}
                </span>

                {/* Trash */}
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="p-2 text-zinc-500 hover:text-rose-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Column */}
        <div className="space-y-6">
          {/* Summary Box */}
          <div className="p-6 rounded-3xl bg-zinc-900/90 border border-white/10 space-y-4">
            <h3 className="text-base font-bold text-white pb-3 border-b border-white/10">
              Order Summary
            </h3>

            {/* Subtotal */}
            <div className="flex justify-between text-xs text-zinc-300">
              <span>Subtotal</span>
              <span className="font-mono text-white font-bold">{formatPrice(subtotal)}</span>
            </div>

            {/* Coupon Discount */}
            {appliedCoupon && (
              <div className="flex justify-between text-xs text-emerald-400">
                <span className="flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" />
                  Promo ({appliedCoupon.code})
                </span>
                <span className="font-mono font-bold">-{formatPrice(discountAmount)}</span>
              </div>
            )}

            {/* Shipping */}
            <div className="flex justify-between text-xs text-zinc-300">
              <span>Shipping</span>
              <span className="font-mono text-white">
                {shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}
              </span>
            </div>

            {/* Tax */}
            <div className="flex justify-between text-xs text-zinc-300">
              <span>Estimated Tax (8%)</span>
              <span className="font-mono text-white">{formatPrice(tax)}</span>
            </div>

            {/* Total */}
            <div className="pt-3 border-t border-white/10 flex justify-between items-baseline">
              <span className="text-sm font-bold text-white">Total</span>
              <span className="text-2xl font-black text-cyan-400 font-mono">
                {formatPrice(total)}
              </span>
            </div>

            {/* Proceed Button */}
            <button
              onClick={onProceedCheckout}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-black font-extrabold text-xs tracking-wider uppercase hover:brightness-110 shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-all flex items-center justify-center gap-2 mt-4"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Promo Coupon Box */}
          <div className="p-5 rounded-2xl bg-zinc-900 border border-white/10 space-y-3">
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <Tag className="w-4 h-4 text-cyan-400" />
              <span>Have a Promo Coupon?</span>
            </h4>

            {appliedCoupon ? (
              <div className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-between text-xs text-cyan-300">
                <div className="flex items-center gap-1.5 font-mono">
                  <Check className="w-4 h-4 text-cyan-400" />
                  <span>{appliedCoupon.code} ({appliedCoupon.description})</span>
                </div>
                <button
                  onClick={removeCoupon}
                  className="p-1 text-zinc-400 hover:text-rose-400"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleCouponSubmit} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. VORTEX2026"
                    value={couponCodeInput}
                    onChange={(e) => setCouponCodeInput(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl bg-black border border-white/10 text-xs font-mono text-white placeholder-zinc-500 uppercase"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-bold text-cyan-300"
                  >
                    Apply
                  </button>
                </div>
                {couponError && (
                  <p className="text-[11px] text-rose-400 font-mono">{couponError}</p>
                )}
                <p className="text-[10px] text-zinc-500">
                  Try sample code: <strong className="text-cyan-400 font-mono">VORTEX2026</strong> (20% Off) or <strong className="text-cyan-400 font-mono">FUTURE10</strong> ($100 Off)
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
