import React from 'react';
import { Star, CheckCircle2, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Dr. Elena Rostova',
      role: 'Neural Interface Designer',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
      rating: 5,
      comment: 'The Neural VR-X Headset completely redefined my workflow. Zero latency and the haptic feedback is beyond anything available before 2026.',
    },
    {
      name: 'Kaelen Vance',
      role: 'Cyberpunk Content Creator',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      rating: 5,
      comment: 'VORTEX STORE is the cleanest e-commerce experience I have ever seen. Ordered the NovaFold Cyber Phone and it arrived in under an hour!',
    },
    {
      name: 'Marcus Thorne',
      role: 'Quantum Systems Architect',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      rating: 5,
      comment: 'The AI Concierge recommended the exact CyberWeave Jacket that fits my climate controls. Exceptional quality and futuristic aesthetics.',
    },
  ];

  return (
    <section className="py-12 w-full font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center space-y-1">
          <span className="text-xs text-cyan-400 font-mono font-bold uppercase tracking-widest">
            Fictional Customer Feedback
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            TESTIMONIALS & REVIEWS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-zinc-900/60 border border-white/10 backdrop-blur-xl space-y-4 relative overflow-hidden"
            >
              <Quote className="w-10 h-10 text-cyan-500/10 absolute top-4 right-4" />

              <div className="flex text-amber-400">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed italic">
                "{t.comment}"
              </p>

              <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-white text-xs flex items-center gap-1">
                    <span>{t.name}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  </h4>
                  <span className="text-[10px] text-zinc-400 font-mono">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
