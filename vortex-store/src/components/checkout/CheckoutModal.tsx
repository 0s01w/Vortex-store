import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  X,
  CreditCard,
  Truck,
  ShieldCheck,
  Check,
  Lock,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Wallet,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Order } from '../../types';

export const CheckoutModal: React.FC<{ isOpen: boolean; onClose: () => void; onSuccessOrder: (order: Order) => void }> = ({
  isOpen,
  onClose,
  onSuccessOrder,
}) => {
  const { cart, appliedCoupon, formatPrice, addOrder } = useStore();

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [fullName, setFullName] = useState('Alex Mercer');
  const [email, setEmail] = useState('alex.mercer@cybernet.io');
  const [address, setAddress] = useState('777 Quantum Boulevard, Suite 2026');
  const [city, setCity] = useState('Neo Metropolis');
  const [country, setCountry] = useState('United States');
  const [postalCode, setPostalCode] = useState('90210');

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'crypto' | 'apple_pay'>('card');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8890');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percent') {
      discountAmount = (subtotal * appliedCoupon.discountValue) / 100;
    } else {
      discountAmount = Math.min(subtotal, appliedCoupon.discountValue);
    }
  }

  const shippingCost = subtotal >= 500 ? 0 : 25;
  const tax = Math.round((subtotal - discountAmount) * 0.08);
  const total = Math.max(0, subtotal - discountAmount + shippingCost + tax);

  const handleCompleteOrder = () => {
    // Fire confetti!
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#00f0ff', '#8a2be2', '#ffffff', '#10b981'],
    });

    const newOrder: Order = {
      orderId: `VTX-${Math.floor(10000 + Math.random() * 90000)}-2026`,
      date: new Date().toLocaleDateString(),
      items: [...cart],
      subtotal,
      discountAmount,
      shippingCost,
      tax,
      totalAmount: total,
      shippingAddress: {
        fullName,
        email,
        address,
        city,
        country,
        postalCode,
      },
      paymentMethod: paymentMethod === 'card' ? 'Credit Card' : paymentMethod === 'crypto' ? 'Crypto Wallet' : 'Apple Pay',
      estimatedDelivery: 'Tomorrow via Quantum Express',
      status: 'Out for Quantum Delivery',
    };

    addOrder(newOrder);
    onSuccessOrder(newOrder);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl overflow-y-auto font-sans">
      <div
        className="relative w-full max-w-4xl rounded-3xl bg-zinc-950 border border-cyan-500/30 shadow-[0_0_80px_rgba(0,240,255,0.25)] overflow-hidden text-white my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 bg-zinc-900 border-b border-white/10">
          <div>
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-cyan-400" />
              <span>VORTEX 2026 Secure Checkout</span>
            </h2>
            <p className="text-xs text-zinc-400">
              Fictional Demo Order Simulator
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Bar */}
        <div className="px-6 py-4 bg-black border-b border-white/10 flex items-center justify-around text-xs font-mono">
          <div className={`flex items-center gap-2 ${step >= 1 ? 'text-cyan-400 font-bold' : 'text-zinc-600'}`}>
            <span className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">1</span>
            <span>1. Shipping Info</span>
          </div>
          <div className="w-12 h-0.5 bg-white/10" />
          <div className={`flex items-center gap-2 ${step >= 2 ? 'text-cyan-400 font-bold' : 'text-zinc-600'}`}>
            <span className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">2</span>
            <span>2. Payment Method</span>
          </div>
          <div className="w-12 h-0.5 bg-white/10" />
          <div className={`flex items-center gap-2 ${step >= 3 ? 'text-cyan-400 font-bold' : 'text-zinc-600'}`}>
            <span className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">3</span>
            <span>3. Review & Submit</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* STEP 1: Shipping Info */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Shipping & Contact Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-zinc-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full p-3 rounded-xl bg-zinc-900 border border-white/10 text-white"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 rounded-xl bg-zinc-900 border border-white/10 text-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-zinc-400 mb-1">Delivery Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-3 rounded-xl bg-zinc-900 border border-white/10 text-white"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full p-3 rounded-xl bg-zinc-900 border border-white/10 text-white"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1">Postal Code</label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full p-3 rounded-xl bg-zinc-900 border border-white/10 text-white"
                  />
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full py-3.5 rounded-xl bg-cyan-500 text-black font-extrabold text-xs uppercase tracking-wider hover:bg-cyan-400 transition-colors flex items-center justify-center gap-2 mt-4"
              >
                <span>Continue to Payment Method</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: Payment Method */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Select Payment Method
              </h3>

              <div className="grid grid-cols-3 gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-2xl border text-center font-bold flex flex-col items-center gap-2 transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400'
                      : 'bg-zinc-900 text-zinc-400 border-white/10'
                  }`}
                >
                  <CreditCard className="w-6 h-6 text-cyan-400" />
                  <span>Credit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('crypto')}
                  className={`p-4 rounded-2xl border text-center font-bold flex flex-col items-center gap-2 transition-all ${
                    paymentMethod === 'crypto'
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400'
                      : 'bg-zinc-900 text-zinc-400 border-white/10'
                  }`}
                >
                  <Wallet className="w-6 h-6 text-purple-400" />
                  <span>Crypto Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple_pay')}
                  className={`p-4 rounded-2xl border text-center font-bold flex flex-col items-center gap-2 transition-all ${
                    paymentMethod === 'apple_pay'
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400'
                      : 'bg-zinc-900 text-zinc-400 border-white/10'
                  }`}
                >
                  <Sparkles className="w-6 h-6 text-emerald-400" />
                  <span>CyberPay Express</span>
                </button>
              </div>

              {/* Fictional Card Details */}
              {paymentMethod === 'card' && (
                <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10 space-y-3 text-xs">
                  <div>
                    <label className="block text-zinc-400 mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-black border border-white/10 font-mono text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-zinc-400 mb-1">Expiry</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-black border border-white/10 font-mono text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-zinc-400 mb-1">CVC</label>
                      <input
                        type="text"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-black border border-white/10 font-mono text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-xs text-zinc-300 flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  onClick={() => setStep(3)}
                  className="flex-1 py-3.5 rounded-xl bg-cyan-500 text-black font-extrabold text-xs uppercase tracking-wider hover:bg-cyan-400 transition-colors flex items-center justify-center gap-2"
                >
                  <span>Review Final Order</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Order Review & Submit */}
          {step === 3 && (
            <div className="space-y-6 text-xs">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Review Order Details
              </h3>

              <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10 space-y-2">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Recipient:</span>
                  <span className="text-white font-bold">{fullName} ({email})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Ship To:</span>
                  <span className="text-white font-bold">{address}, {city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Payment Method:</span>
                  <span className="text-cyan-400 font-bold uppercase">{paymentMethod}</span>
                </div>
              </div>

              {/* Items Summary */}
              <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="p-2.5 rounded-xl bg-black border border-white/10 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-10 h-10 object-cover rounded-lg"
                      />
                      <span className="font-bold text-white">{item.product.name} x{item.quantity}</span>
                    </div>
                    <span className="font-mono text-cyan-400 font-bold">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total Summary */}
              <div className="p-4 rounded-2xl bg-cyan-950/60 border border-cyan-500/40 flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-cyan-300 block">Total Due</span>
                  <span className="text-2xl font-black text-white font-mono">{formatPrice(total)}</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono">
                  Quantum Dispatch Verified
                </span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-xs text-zinc-300 flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  onClick={handleCompleteOrder}
                  className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-black font-extrabold text-xs tracking-wider uppercase hover:brightness-110 shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>Place Fictional Order</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
