import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  WishlistItem,
  Coupon,
  FilterState,
  Order,
  Currency,
} from '../types';
import { DEMO_PRODUCTS } from '../data/products';

interface StoreContextType {
  products: Product[];
  filteredProducts: Product[];
  flashSaleProducts: Product[];
  cart: CartItem[];
  wishlist: WishlistItem[];
  compareList: Product[];
  recentlyViewed: Product[];
  appliedCoupon: Coupon | null;
  currency: Currency;
  themeMode: 'dark' | 'light';
  soundEnabled: boolean;
  filterState: FilterState;
  orders: Order[];
  isAiOpen: boolean;
  isAiFinderOpen: boolean;
  activeView: 'home' | 'shop' | 'cart' | 'wishlist' | 'compare' | 'orders';
  selectedProduct: Product | null;
  quickViewProduct: Product | null;
  notification: { message: string; type: 'success' | 'info' | 'warning' } | null;

  // Actions
  addToCart: (product: Product, quantity?: number, variant?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;

  toggleCompare: (product: Product) => void;
  isInCompare: (productId: string) => boolean;
  clearCompare: () => void;

  addRecentlyViewed: (product: Product) => void;
  
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  setCurrency: (currency: Currency) => void;
  formatPrice: (usdAmount: number) => string;

  toggleThemeMode: () => void;
  toggleSoundEnabled: () => void;
  playSound: (type?: 'click' | 'add' | 'remove' | 'success') => void;

  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;

  addOrder: (order: Order) => void;

  setIsAiOpen: (open: boolean) => void;
  setIsAiFinderOpen: (open: boolean) => void;
  setActiveView: (view: 'home' | 'shop' | 'cart' | 'wishlist' | 'compare' | 'orders') => void;
  setSelectedProduct: (product: Product | null) => void;
  setQuickViewProduct: (product: Product | null) => void;
  showNotification: (message: string, type?: 'success' | 'info' | 'warning') => void;
}

const VALID_COUPONS: Coupon[] = [
  { code: 'VORTEX2026', discountType: 'percent', discountValue: 20, minPurchase: 0, description: '20% off everything for 2026 launch!' },
  { code: 'FUTURE10', discountType: 'fixed', discountValue: 100, minPurchase: 500, description: '$100 off orders over $500' },
  { code: 'CYBER50', discountType: 'fixed', discountValue: 50, minPurchase: 250, description: '$50 off orders over $250' },
];

const CURRENCY_RATES: Record<Currency, { symbol: string; rate: number; decimals: number }> = {
  USD: { symbol: '$', rate: 1.0, decimals: 2 },
  EUR: { symbol: '€', rate: 0.92, decimals: 2 },
  GBP: { symbol: '£', rate: 0.78, decimals: 2 },
  JPY: { symbol: '¥', rate: 155, decimals: 0 },
  BTC: { symbol: '₿', rate: 0.000015, decimals: 4 },
};

const INITIAL_FILTERS: FilterState = {
  searchQuery: '',
  category: 'All',
  priceRange: [0, 4000],
  minRating: 0,
  stockStatus: 'all',
  tags: [],
  sortBy: 'featured',
  onSaleOnly: false,
  inStockOnly: false,
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(DEMO_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('vortex_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    try {
      const saved = localStorage.getItem('vortex_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [compareList, setCompareList] = useState<Product[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [currency, setCurrency] = useState<Currency>('USD');
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [filterState, setFilterState] = useState<FilterState>(INITIAL_FILTERS);
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('vortex_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isAiFinderOpen, setIsAiFinderOpen] = useState(false);
  const [activeView, setActiveView] = useState<'home' | 'shop' | 'cart' | 'wishlist' | 'compare' | 'orders'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' | 'warning' } | null>(null);

  const flashSaleProducts = React.useMemo(() => {
    return products.filter((p) => p.isFlashSale);
  }, [products]);

  const filteredProducts = React.useMemo(() => {
    return products
      .filter((p) => {
        if (filterState.searchQuery) {
          const q = filterState.searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchCat = p.category.toLowerCase().includes(q);
          const matchTags = p.tags ? p.tags.some((t) => t.toLowerCase().includes(q)) : false;
          if (!matchName && !matchDesc && !matchCat && !matchTags) return false;
        }

        if (filterState.category && filterState.category !== 'All') {
          if (p.category !== filterState.category) return false;
        }

        if (filterState.priceRange) {
          if (p.price < filterState.priceRange[0] || p.price > filterState.priceRange[1]) return false;
        }

        if (filterState.minRating > 0) {
          if (p.rating < filterState.minRating) return false;
        }

        if (filterState.onSaleOnly && !p.isOnSale && !p.isFlashSale) {
          return false;
        }

        if (
          (filterState.inStockOnly || filterState.stockStatus === 'in_stock') &&
          p.stockStatus === 'out_of_stock'
        ) {
          return false;
        }

        if (filterState.stockStatus === 'out_of_stock' && p.stockStatus !== 'out_of_stock') {
          return false;
        }

        if (filterState.tags && filterState.tags.length > 0) {
          const hasAllTags = filterState.tags.every((t) => p.tags?.includes(t));
          if (!hasAllTags) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filterState.sortBy === 'price_asc') return a.price - b.price;
        if (filterState.sortBy === 'price_desc') return b.price - a.price;
        if (filterState.sortBy === 'rating') return b.rating - a.rating;
        if (filterState.sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        return 0;
      });
  }, [products, filterState]);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('vortex_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('vortex_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('vortex_orders', JSON.stringify(orders));
  }, [orders]);

  // Apply dark/light class on body
  useEffect(() => {
    if (themeMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [themeMode]);

  // Notification Toast trigger
  const showNotification = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  // Web Audio synth synthesizer sound effects
  const playSound = (type: 'click' | 'add' | 'remove' | 'success' = 'click') => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      } else if (type === 'add') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      } else if (type === 'remove') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(500, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      } else if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08); // E5
        osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.16); // G5
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      }
    } catch {
      // Audio context policy safe guard
    }
  };

  // Cart actions
  const addToCart = (product: Product, quantity = 1, variant?: string) => {
    playSound('add');
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { product, quantity, selectedVariant: variant }];
    });
    showNotification(`Added "${product.name}" to cart`);
  };

  const removeFromCart = (productId: string) => {
    playSound('remove');
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showNotification('Item removed from cart', 'info');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Wishlist actions
  const toggleWishlist = (product: Product) => {
    playSound('click');
    setWishlist((prev) => {
      const exists = prev.some((item) => item.product.id === product.id);
      if (exists) {
        showNotification(`Removed "${product.name}" from wishlist`, 'info');
        return prev.filter((item) => item.product.id !== product.id);
      } else {
        showNotification(`Added "${product.name}" to wishlist`);
        return [...prev, { product, addedAt: new Date().toISOString() }];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.product.id === productId);
  };

  // Compare actions
  const toggleCompare = (product: Product) => {
    playSound('click');
    setCompareList((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showNotification(`Removed from comparison`, 'info');
        return prev.filter((p) => p.id !== product.id);
      }
      if (prev.length >= 4) {
        showNotification('Comparison list full (max 4 products)', 'warning');
        return prev;
      }
      showNotification(`Added "${product.name}" to comparison matrix`);
      return [...prev, product];
    });
  };

  const isInCompare = (productId: string) => {
    return compareList.some((p) => p.id === productId);
  };

  const clearCompare = () => setCompareList([]);

  // Recently viewed
  const addRecentlyViewed = (product: Product) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      return [product, ...filtered].slice(0, 8);
    });
  };

  // Coupons
  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = VALID_COUPONS.find((c) => c.code === cleanCode);
    if (!found) {
      return { success: false, message: 'Invalid promo code. Try "VORTEX2026"' };
    }
    setAppliedCoupon(found);
    playSound('success');
    showNotification(`Promo code "${found.code}" applied!`);
    return { success: true, message: `Applied: ${found.description}` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showNotification('Coupon removed', 'info');
  };

  // Formatting & Currency
  const formatPrice = (usdAmount: number) => {
    const config = CURRENCY_RATES[currency];
    const converted = usdAmount * config.rate;
    if (currency === 'BTC') {
      return `${config.symbol}${converted.toFixed(4)}`;
    }
    if (currency === 'JPY') {
      return `${config.symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${config.symbol}${converted.toLocaleString(undefined, {
      minimumFractionDigits: config.decimals,
      maximumFractionDigits: config.decimals,
    })}`;
  };

  const toggleThemeMode = () => {
    playSound('click');
    setThemeMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleSoundEnabled = () => {
    setSoundEnabled((prev) => !prev);
  };

  const resetFilters = () => setFilterState(INITIAL_FILTERS);

  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
    clearCart();
    playSound('success');
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        filteredProducts,
        flashSaleProducts,
        cart,
        wishlist,
        compareList,
        recentlyViewed,
        appliedCoupon,
        currency,
        themeMode,
        soundEnabled,
        filterState,
        orders,
        isAiOpen,
        isAiFinderOpen,
        activeView,
        selectedProduct,
        quickViewProduct,
        notification,

        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        toggleCompare,
        isInCompare,
        clearCompare,
        addRecentlyViewed,
        applyCoupon,
        removeCoupon,
        setCurrency,
        formatPrice,
        toggleThemeMode,
        toggleSoundEnabled,
        playSound,
        setFilterState,
        resetFilters,
        addOrder,
        setIsAiOpen,
        setIsAiFinderOpen,
        setActiveView,
        setSelectedProduct,
        setQuickViewProduct,
        showNotification,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return context;
};
