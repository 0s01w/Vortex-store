import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Bot,
  X,
  Send,
  Sparkles,
  Zap,
  ShoppingBag,
  RotateCcw,
} from 'lucide-react';
import { Product } from '../../types';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  recommendedProducts?: Product[];
}

export const AiShoppingAssistant: React.FC = () => {
  const { isAiOpen, setIsAiOpen, products, setSelectedProduct, addToCart, formatPrice } = useStore();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: 'Greetings! I am VORTEX AI, your 2026 luxury concierge. How can I assist you in discovering neural headsets, quantum computing rigs, cyber apparel, or smart home gear today?',
    },
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isAiOpen) return null;

  const handleSendMessage = async (promptToSend?: string) => {
    const text = (promptToSend || inputPrompt).trim();
    if (!text || isLoading) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setIsLoading(true);

    try {
      const catalogSummary = products
        .map((p) => `${p.name} (SKU: ${p.sku}, $${p.price}, Category: ${p.category}): ${p.tagline}`)
        .join('\n');

      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          catalogSummary,
        }),
      });

      const data = await res.json();

      // Find recommended products by SKU if provided
      let recProducts: Product[] = [];
      if (Array.isArray(data.recommendedProductIds)) {
        recProducts = products.filter((p) =>
          data.recommendedProductIds.includes(p.sku) || data.recommendedProductIds.includes(p.id)
        );
      }

      // Fallback matching if text explicitly mentions SKUs
      if (recProducts.length === 0) {
        recProducts = products.filter((p) => data.reply?.includes(p.sku)).slice(0, 3);
      }

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.reply || 'I am analyzing VORTEX 2026 catalog items for you.',
        recommendedProducts: recProducts,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: 'ai',
          text: 'VORTEX Neural Agent is currently processing catalog requests in offline backup mode. I recommend checking out our Neural VR-X Headset or NovaFold Cyber Phone!',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const starterPrompts = [
    'Recommend a complete gaming setup under $2000',
    'What is the difference between Neural VR-X and NovaFold?',
    'Best smart home ambient lighting for my office desk',
    'Explain CyberWeave Jacket kinetic heating technology',
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
      <div
        className="w-full max-w-md h-full bg-zinc-950 border-l border-cyan-500/30 shadow-[0_0_50px_rgba(0,240,255,0.25)] flex flex-col justify-between font-sans text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-zinc-900 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-white shadow-[0_0_15px_#00f0ff]">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white flex items-center gap-1.5">
                <span>VORTEX AI Concierge</span>
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              </h3>
              <p className="text-[10px] text-cyan-400 font-mono">
                Gemini Neural Assistant v3.6
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAiOpen(false)}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-black font-semibold rounded-tr-none'
                    : 'bg-zinc-900 border border-white/10 text-zinc-200 rounded-tl-none shadow-md'
                }`}
              >
                {msg.text}
              </div>

              {/* Recommended Product Cards inside Chat */}
              {msg.recommendedProducts && msg.recommendedProducts.length > 0 && (
                <div className="w-full mt-3 space-y-2">
                  <span className="text-[10px] text-cyan-400 font-mono uppercase font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Recommended VORTEX Items:
                  </span>
                  {msg.recommendedProducts.map((p) => (
                    <div
                      key={p.id}
                      className="p-3 rounded-xl bg-black border border-cyan-500/30 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-2.5">
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-10 h-10 object-cover rounded-lg"
                        />
                        <div>
                          <h4 className="font-bold text-white text-xs line-clamp-1">{p.name}</h4>
                          <span className="font-mono text-cyan-400 font-extrabold text-xs">
                            {formatPrice(p.price)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setSelectedProduct(p)}
                          className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[10px] font-bold text-cyan-300"
                        >
                          Specs
                        </button>
                        <button
                          onClick={() => addToCart(p)}
                          className="p-1.5 rounded-lg bg-cyan-500 text-black font-bold"
                          title="Add to Cart"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono p-2">
              <Bot className="w-4 h-4 animate-spin" />
              <span>VORTEX Neural Agent is thinking...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Starter Suggestion Chips */}
        <div className="p-3 bg-black/60 border-t border-white/10 space-y-2">
          <span className="text-[10px] text-zinc-500 font-mono uppercase block">
            Suggested Prompts:
          </span>
          <div className="flex gap-1.5 overflow-x-auto pb-1 text-[11px]">
            {starterPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(prompt)}
                className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 whitespace-nowrap text-left"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 bg-zinc-900 border-t border-white/10 flex gap-2"
        >
          <input
            type="text"
            placeholder="Ask VORTEX AI about products, specs..."
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            className="flex-1 px-3.5 py-2.5 rounded-xl bg-black border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
          />
          <button
            type="submit"
            disabled={isLoading || !inputPrompt.trim()}
            className="px-4 rounded-xl bg-cyan-500 text-black font-bold flex items-center justify-center hover:bg-cyan-400 disabled:opacity-50 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
