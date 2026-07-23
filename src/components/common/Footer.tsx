import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Zap,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  Send,
  Check,
  Copy,
  Sparkles,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveView, showNotification } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [copiedCoupon, setCopiedCoupon] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showNotification('Please enter a valid email address', 'warning');
      return;
    }
    setSubscribed(true);
    showNotification('Subscribed! Use code "VORTEX2026" for 20% off.');
  };

  const copyCode = () => {
    navigator.clipboard.writeText('VORTEX2026');
    setCopiedCoupon(true);
    showNotification('Promo code "VORTEX2026" copied to clipboard!');
    setTimeout(() => setCopiedCoupon(false), 3000);
  };

  return (
    <footer className="w-full bg-black text-zinc-400 font-sans border-t border-white/10 relative overflow-hidden mt-20">
      {/* Background radial glow */}
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Cyber Perks Strip */}
      <div className="border-b border-white/10 bg-zinc-900/40 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Quantum Delivery
              </h4>
              <p className="text-[11px] text-zinc-400">
                Fictional 1-Hour Hyper-Express Option
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                5-Year Cyber Warranty
              </h4>
              <p className="text-[11px] text-zinc-400">
                100% Comprehensive Coverage
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                30-Day Zero Hassle Return
              </h4>
              <p className="text-[11px] text-zinc-400">
                Free Return Shipping Pickups
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                24/7 AI Concierge
              </h4>
              <p className="text-[11px] text-zinc-400">
                Powered by Gemini Neural Agent
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand info */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(0,240,255,0.4)]">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <span className="text-xl font-black text-white tracking-widest">
              VORTEX STORE
            </span>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed pr-4">
            A luxury 2026 e-commerce portfolio demonstration. Discover next-generation neural VR headsets, quantum computing rigs, holographic displays, and cyber fashion.
          </p>

          <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-white/10 text-xs text-zinc-300 space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-cyan-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sample Portfolio Project Notice</span>
            </div>
            <p className="text-[11px] text-zinc-400">
              All brands, products, SKUs, reviews, and prices depicted on VORTEX STORE are 100% fictional for presentation purposes.
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">
            Explore Categories
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <button
                onClick={() => setActiveView('shop')}
                className="hover:text-cyan-400 transition-colors"
              >
                Gaming & Neural VR
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveView('shop')}
                className="hover:text-cyan-400 transition-colors"
              >
                Quantum Tech & Computing
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveView('shop')}
                className="hover:text-cyan-400 transition-colors"
              >
                Smart Home & Robotics
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveView('shop')}
                className="hover:text-cyan-400 transition-colors"
              >
                Cyber Fashion & Outerwear
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveView('shop')}
                className="hover:text-cyan-400 transition-colors"
              >
                Futuristic Office Setup
              </button>
            </li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">
            Navigation & Specs
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <button
                onClick={() => setActiveView('compare')}
                className="hover:text-cyan-400 transition-colors"
              >
                Product Comparison Matrix
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveView('wishlist')}
                className="hover:text-cyan-400 transition-colors"
              >
                Saved Wishlist Items
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveView('orders')}
                className="hover:text-cyan-400 transition-colors"
              >
                Sample Order History
              </button>
            </li>
            <li>
              <span className="text-zinc-500">2026 Tech Whitepaper (Demo)</span>
            </li>
            <li>
              <span className="text-zinc-500">Security & Privacy Protocol</span>
            </li>
          </ul>
        </div>

        {/* Newsletter Box */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">
            Claim 2026 Promo Code
          </h4>
          <p className="text-xs text-zinc-400 mb-3">
            Subscribe for sample product updates & receive an instant 20% discount coupon.
          </p>

          {!subscribed ? (
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter cyber mail..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500 pr-10"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-3 rounded-lg bg-cyan-500 text-black font-bold flex items-center justify-center hover:bg-cyan-400 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          ) : (
            <div className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-500/40 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-300">
                <Check className="w-4 h-4 text-cyan-400" />
                <span>Subscription Confirmed!</span>
              </div>
              <p className="text-[11px] text-zinc-300">
                Use code below at checkout:
              </p>
              <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-black border border-cyan-500/50 font-mono text-xs text-cyan-400">
                <span>VORTEX2026</span>
                <button
                  onClick={copyCode}
                  className="p-1 hover:text-white transition-colors"
                  title="Copy code"
                >
                  {copiedCoupon ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-black/80 py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© 2026 VORTEX STORE. Designed for Portfolio & Conceptual Demonstration.</p>
          
          <div className="flex items-center gap-4 text-zinc-400 font-mono text-[11px]">
            <span className="px-2 py-0.5 rounded bg-zinc-900 border border-white/10">CYBERPAY</span>
            <span className="px-2 py-0.5 rounded bg-zinc-900 border border-white/10">CRYPTO</span>
            <span className="px-2 py-0.5 rounded bg-zinc-900 border border-white/10">APPLE PAY</span>
            <span className="px-2 py-0.5 rounded bg-zinc-900 border border-white/10">VISA 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
