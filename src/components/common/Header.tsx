import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Zap,
  Search,
  ShoppingBag,
  Heart,
  Bot,
  Sparkles,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Layers,
  Menu,
  X,
  Globe,
  SlidersHorizontal,
} from 'lucide-react';
import { Currency } from '../../types';

export const Header: React.FC = () => {
  const {
    cart,
    wishlist,
    compareList,
    orders,
    currency,
    setCurrency,
    themeMode,
    toggleThemeMode,
    soundEnabled,
    toggleSoundEnabled,
    setIsAiOpen,
    setIsAiFinderOpen,
    activeView,
    setActiveView,
    filterState,
    setFilterState,
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const cartTotalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeView !== 'shop') {
      setActiveView('shop');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full font-sans">
      {/* Top Demo Banner */}
      <div className="w-full bg-gradient-to-r from-cyan-950 via-zinc-900 to-purple-950 border-b border-cyan-500/20 py-1.5 px-4 text-center text-xs font-medium text-cyan-200/90 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0 animate-pulse" />
        <span>
          <strong className="text-white">DEMO SHOWCASE:</strong> All products, brands, reviews & prices are completely fictional sample content.
        </span>
      </div>

      {/* Floating Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <nav className="relative flex items-center justify-between gap-4 px-4 sm:px-6 py-3 rounded-2xl bg-zinc-900/80 dark:bg-black/80 backdrop-blur-2xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all">
          
          {/* Logo */}
          <button
            onClick={() => {
              setActiveView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 text-white shadow-[0_0_20px_rgba(0,240,255,0.4)] group-hover:scale-105 transition-transform">
              <Zap className="w-6 h-6 fill-current" />
            </div>
            <div>
              <span className="text-lg font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400">
                VORTEX
              </span>
              <span className="block text-[10px] font-mono tracking-widest text-cyan-400 uppercase leading-none">
                STORE 2026
              </span>
            </div>
          </button>

          {/* Desktop Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex items-center flex-1 max-w-sm relative"
          >
            <Search className="w-4 h-4 absolute left-3.5 text-zinc-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search 2026 gear, gaming, neural tech..."
              value={filterState.searchQuery}
              onChange={(e) => {
                setFilterState((prev) => ({ ...prev, searchQuery: e.target.value }));
                if (activeView !== 'shop') setActiveView('shop');
              }}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-400 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
            />
          </form>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1 font-medium text-xs text-zinc-300">
            <button
              onClick={() => setActiveView('home')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeView === 'home'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'hover:text-white hover:bg-white/5'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setActiveView('shop')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeView === 'shop'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'hover:text-white hover:bg-white/5'
              }`}
            >
              Shop Catalog
            </button>
            <button
              onClick={() => setActiveView('compare')}
              className={`px-3 py-1.5 rounded-xl transition-all relative ${
                activeView === 'compare'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="flex items-center gap-1">
                <Layers className="w-3.5 h-3.5" />
                Compare
                {compareList.length > 0 && (
                  <span className="w-4 h-4 rounded-full bg-cyan-500 text-black font-bold text-[10px] flex items-center justify-center">
                    {compareList.length}
                  </span>
                )}
              </span>
            </button>
            <button
              onClick={() => setActiveView('orders')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeView === 'orders'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'hover:text-white hover:bg-white/5'
              }`}
            >
              Orders
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            
            {/* AI Finder Button */}
            <button
              onClick={() => setIsAiFinderOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-medium transition-all shadow-[0_0_15px_rgba(138,43,226,0.2)]"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-spin" />
              <span>AI Finder</span>
            </button>

            {/* AI Assistant Drawer Trigger */}
            <button
              onClick={() => setIsAiOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold transition-all shadow-[0_0_15px_rgba(0,240,255,0.25)]"
            >
              <Bot className="w-4 h-4 text-cyan-400" />
              <span className="hidden sm:inline">VORTEX AI</span>
            </button>

            {/* Wishlist Icon */}
            <button
              onClick={() => setActiveView('wishlist')}
              className="relative p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition-all"
              title="Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-bold text-[10px] flex items-center justify-center shadow-md">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Drawer Icon */}
            <button
              onClick={() => setActiveView('cart')}
              className="relative p-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-black font-bold border border-cyan-400/50 hover:brightness-110 transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)]"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-black" />
              {cartTotalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 rounded-full bg-white text-black font-extrabold text-[10px] shadow-lg">
                  {cartTotalItems}
                </span>
              )}
            </button>

            {/* Currency Dropdown */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-mono border border-white/10"
              >
                <Globe className="w-3.5 h-3.5 text-zinc-400" />
                <span>{currency}</span>
              </button>

              {currencyDropdownOpen && (
                <div className="absolute right-0 mt-2 w-28 rounded-xl bg-zinc-900 border border-white/10 shadow-2xl p-1 z-50 text-xs">
                  {(['USD', 'EUR', 'GBP', 'JPY', 'BTC'] as Currency[]).map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setCurrency(c);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-lg transition-colors font-mono ${
                        currency === c ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-zinc-300 hover:bg-white/5'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Sound Toggle */}
            <button
              onClick={toggleSoundEnabled}
              className="hidden sm:flex p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10"
              title={soundEnabled ? 'Mute Audio Effects' : 'Enable Audio Effects'}
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-cyan-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-zinc-500" />
              )}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleThemeMode}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10"
              title="Toggle Theme"
            >
              {themeMode === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-400" />
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/5 text-zinc-300 border border-white/10"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 p-4 rounded-2xl bg-zinc-900/95 border border-white/10 backdrop-blur-2xl space-y-3 text-sm text-zinc-200">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-zinc-400" />
              <input
                type="text"
                placeholder="Search catalog..."
                value={filterState.searchQuery}
                onChange={(e) => {
                  setFilterState((prev) => ({ ...prev, searchQuery: e.target.value }));
                  if (activeView !== 'shop') setActiveView('shop');
                }}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
              />
            </form>

            <div className="grid grid-cols-2 gap-2 font-medium">
              <button
                onClick={() => {
                  setActiveView('home');
                  setMobileMenuOpen(false);
                }}
                className="px-3 py-2 rounded-xl bg-white/5 text-left"
              >
                Home
              </button>
              <button
                onClick={() => {
                  setActiveView('shop');
                  setMobileMenuOpen(false);
                }}
                className="px-3 py-2 rounded-xl bg-white/5 text-left"
              >
                Shop Catalog
              </button>
              <button
                onClick={() => {
                  setActiveView('wishlist');
                  setMobileMenuOpen(false);
                }}
                className="px-3 py-2 rounded-xl bg-white/5 text-left"
              >
                Wishlist ({wishlist.length})
              </button>
              <button
                onClick={() => {
                  setActiveView('compare');
                  setMobileMenuOpen(false);
                }}
                className="px-3 py-2 rounded-xl bg-white/5 text-left"
              >
                Compare ({compareList.length})
              </button>
              <button
                onClick={() => {
                  setActiveView('orders');
                  setMobileMenuOpen(false);
                }}
                className="px-3 py-2 rounded-xl bg-white/5 text-left col-span-2"
              >
                Order History ({orders.length})
              </button>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-zinc-400">Currency:</span>
              <div className="flex gap-1 font-mono">
                {(['USD', 'EUR', 'GBP', 'JPY', 'BTC'] as Currency[]).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCurrency(c)}
                    className={`px-2 py-1 rounded-lg ${
                      currency === c ? 'bg-cyan-500 text-black font-bold' : 'bg-white/5 text-zinc-300'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
