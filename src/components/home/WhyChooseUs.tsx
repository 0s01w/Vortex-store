import React from 'react';
import { Truck, ShieldCheck, Headphones, Box, Cpu, Sparkles } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const perks = [
    {
      icon: <Truck className="w-6 h-6 text-cyan-400" />,
      title: 'Quantum Express Delivery',
      description: 'Fictional 1-hour hyper-speed drone dispatch options across all metropolis zones.',
    },
    {
      icon: <Box className="w-6 h-6 text-purple-400" />,
      title: '3D Hologram Preview',
      description: 'Inspect every circuit and micro-mesh layer with our interactive 3D holographic projection engine.',
    },
    {
      icon: <Headphones className="w-6 h-6 text-indigo-400" />,
      title: '24/7 Gemini Neural Agent',
      description: 'Real-time AI shopping assistant powered by Gemini 3.6 to answer technical gear questions.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      title: '5-Year Cyber Warranty',
      description: 'Zero-downtime hardware replacement and comprehensive neural protection.',
    },
  ];

  return (
    <section className="py-16 w-full font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs text-cyan-400 font-mono font-bold uppercase tracking-widest flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Built For 2026</span>
          </span>
          <h2 className="text-3xl font-black text-white">WHY VORTEX STORE?</h2>
          <p className="text-xs text-zinc-400">
            Engineered from the ground up for seamless, high-performance futuristic shopping.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {perks.map((perk, i) => (
            <div
              key={i}
              className="p-6 rounded-3xl bg-zinc-900/60 border border-white/10 hover:border-cyan-500/40 backdrop-blur-xl space-y-3 hover:scale-[1.02] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-black border border-white/10 flex items-center justify-center mb-2">
                {perk.icon}
              </div>
              <h3 className="text-base font-bold text-white">{perk.title}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">{perk.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
