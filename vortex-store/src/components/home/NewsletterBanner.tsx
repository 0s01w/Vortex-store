import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Sparkles, Send, Check } from 'lucide-react';

export const NewsletterBanner: React.FC = () => {
  const { showNotification } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showNotification('Please enter a valid email address', 'warning');
      return;
    }
    setSubscribed(true);
    showNotification('Subscribed! Promo code VORTEX2026 unlocked.');
  };

  return (
    <section className="py-12 w-full font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl bg-gradient-to-r from-cyan-950 via-zinc-900 to-purple-950 border border-cyan-500/40 p-8 sm:p-12 overflow-hidden shadow-[0_0_60px_rgba(0,240,255,0.2)]">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>JOIN THE 2026 MATRIX</span>
            </span>

            <h2 className="text-2xl sm:text-4xl font-black text-white">
              GET 20% OFF YOUR FIRST ORDER
            </h2>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Subscribe to the VORTEX newsletter for sample product drops, cyber tech updates, and exclusive VIP demo coupon codes.
            </p>

            {!subscribed ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 pt-2">
                <input
                  type="email"
                  placeholder="Enter your email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-3 rounded-xl bg-black border border-white/20 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500 flex-1"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-cyan-500 text-black font-extrabold text-xs uppercase tracking-wider hover:bg-cyan-400 transition-colors flex items-center justify-center gap-2"
                >
                  <span>Subscribe</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <div className="p-4 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center gap-3 text-xs text-cyan-300">
                <Check className="w-5 h-5 text-cyan-400 shrink-0" />
                <span>
                  Subscription active! Use code <strong className="text-white font-mono">VORTEX2026</strong> at checkout for 20% off.
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
