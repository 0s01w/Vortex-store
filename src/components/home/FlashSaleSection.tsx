import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../products/ProductCard';
import { Zap, Timer } from 'lucide-react';

export const FlashSaleSection: React.FC = () => {
  const { flashSaleProducts } = useStore();

  // Live Countdown Timer (HH:MM:SS)
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 28, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 24, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (flashSaleProducts.length === 0) return null;

  return (
    <section className="py-12 w-full font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* Header with Timer */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-red-950/60 via-zinc-900 to-rose-950/60 border border-red-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(244,63,94,0.4)]">
              <Zap className="w-7 h-7 fill-current" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                2026 FLASH SALE
              </h2>
              <p className="text-xs text-rose-300 font-mono">
                Exclusive limited-time discounts up to 30% OFF
              </p>
            </div>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-2 font-mono">
            <Timer className="w-4 h-4 text-rose-400 animate-pulse" />
            <span className="text-xs text-zinc-400 mr-1 uppercase">Ends In:</span>
            
            <div className="px-3 py-1.5 rounded-xl bg-black border border-rose-500/40 text-rose-400 font-bold text-sm">
              {String(timeLeft.hours).padStart(2, '0')}h
            </div>
            <span className="text-rose-400 font-bold">:</span>
            <div className="px-3 py-1.5 rounded-xl bg-black border border-rose-500/40 text-rose-400 font-bold text-sm">
              {String(timeLeft.minutes).padStart(2, '0')}m
            </div>
            <span className="text-rose-400 font-bold">:</span>
            <div className="px-3 py-1.5 rounded-xl bg-black border border-rose-500/40 text-rose-400 font-bold text-sm">
              {String(timeLeft.seconds).padStart(2, '0')}s
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {flashSaleProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
