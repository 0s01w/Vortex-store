import React from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Sparkles,
  Zap,
  Bot,
  ShieldCheck,
  ChevronRight,
  Flame,
} from 'lucide-react';
import { motion } from 'motion/react';

export const HeroBanner: React.FC = () => {
  const { setActiveView, setIsAiOpen, setIsAiFinderOpen, products, setSelectedProduct } = useStore();

  const heroFeaturedProduct = products[0]; // Neural VR-X Headset

  return (
    <section className="relative w-full py-12 lg:py-20 overflow-hidden font-sans">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-cyan-600/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-purple-600/15 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Headline Column */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            <Flame className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>2026 NEXT-GEN LUXURY TECH COLLECTION</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight">
            STEP INTO THE{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-500">
              FUTURE OF GEAR
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-zinc-300 max-w-2xl leading-relaxed mx-auto lg:mx-0">
            Discover ultra-premium neural VR headsets, quantum computing rigs, holographic displays, and cyber fashion engineered for the year 2026.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            <button
              onClick={() => setActiveView('shop')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-black font-extrabold text-xs uppercase tracking-widest hover:brightness-110 shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-all flex items-center justify-center gap-2"
            >
              <span>Explore 2026 Catalog</span>
              <ChevronRight className="w-4 h-4 text-black" />
            </button>

            <button
              onClick={() => setIsAiOpen(true)}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-cyan-500/30 text-cyan-300 font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.15)]"
            >
              <Bot className="w-4 h-4 text-cyan-400" />
              <span>Ask AI Concierge</span>
            </button>
          </div>

          {/* Trust Highlights */}
          <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-xs font-mono text-zinc-400">
            <div>
              <strong className="block text-white text-base font-black">40+</strong>
              <span>Fictional Products</span>
            </div>
            <div>
              <strong className="block text-cyan-400 text-base font-black">4.9/5</strong>
              <span>Sample Rating</span>
            </div>
            <div>
              <strong className="block text-purple-400 text-base font-black">2026</strong>
              <span>Showcase Demo</span>
            </div>
          </div>
        </div>

        {/* Right Floating Product Showcase Card */}
        <div className="lg:col-span-5 relative">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl bg-zinc-900/80 border border-cyan-500/40 backdrop-blur-2xl p-6 shadow-[0_0_60px_rgba(0,240,255,0.25)] space-y-4"
          >
            {/* Top Pill Tag */}
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-[10px] uppercase font-bold border border-cyan-500/30">
                ⭐ Featured Flagship
              </span>
              <button
                onClick={() => setIsAiFinderOpen(true)}
                className="text-[10px] text-purple-400 hover:text-purple-300 font-mono flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" />
                <span>AI Gift Finder</span>
              </button>
            </div>

            {/* Product Image */}
            <div
              onClick={() => setSelectedProduct(heroFeaturedProduct)}
              className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-white/10 group cursor-pointer"
            >
              <img
                src={heroFeaturedProduct.images[0]}
                alt={heroFeaturedProduct.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                <span className="text-xs font-bold font-mono">
                  {heroFeaturedProduct.name}
                </span>
                <span className="text-xs font-extrabold font-mono text-cyan-400">
                  ${heroFeaturedProduct.price}
                </span>
              </div>
            </div>

            {/* Tagline */}
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              {heroFeaturedProduct.tagline}
            </p>

            {/* View Specs Action */}
            <button
              onClick={() => setSelectedProduct(heroFeaturedProduct)}
              className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-cyan-300 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>Inspect 3D Specs</span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
