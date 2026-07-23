import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, ShieldCheck, Zap } from 'lucide-react';

export const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('BOOTING VORTEX MATRIX v2.6...');

  useEffect(() => {
    const steps = [
      { p: 20, txt: 'CONNECTING NEURAL MESH NODE...' },
      { p: 45, txt: 'DECRYPTING 2026 QUANTUM ASSETS...' },
      { p: 75, txt: 'INITIALIZING AI SHOPPING ASSISTANT...' },
      { p: 95, txt: 'ESTABLISHING ZERO-LATENCY PROTOCOL...' },
      { p: 100, txt: 'VORTEX STORE READY' },
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setProgress(steps[currentStep].p);
        setStatusText(steps[currentStep].txt);
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 400);
      }
    }, 250);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white selection:bg-cyan-500/30 font-mono overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />
      
      {/* Glowing atmospheric orb */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-cyan-600/20 via-purple-600/20 to-blue-600/10 blur-[120px] pointer-events-none animate-pulse" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-md px-6">
        {/* Holographic Logo Mark */}
        <div className="relative mb-8 p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-[0_0_50px_rgba(0,240,255,0.2)]">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-md" />
          <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-black border border-cyan-500/50 text-cyan-400">
            <Zap className="w-9 h-9 animate-bounce" />
          </div>
        </div>

        <h1 className="text-3xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400 mb-2 font-sans">
          VORTEX STORE
        </h1>
        <p className="text-xs tracking-widest text-cyan-400/80 uppercase mb-8">
          2026 LUXURY E-COMMERCE DEMO
        </p>

        {/* Progress bar container */}
        <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden mb-4 border border-white/10 relative">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 shadow-[0_0_15px_#00f0ff]"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.2 }}
          />
        </div>

        {/* Progress & Status text */}
        <div className="flex items-center justify-between w-full text-xs text-zinc-400 mb-6">
          <span className="flex items-center gap-1.5 text-cyan-400">
            <Cpu className="w-3.5 h-3.5 animate-spin" />
            {statusText}
          </span>
          <span className="font-bold text-white">{progress}%</span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-zinc-400">
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          <span>Fictional Portfolio Showcase</span>
        </div>
      </div>
    </motion.div>
  );
};
