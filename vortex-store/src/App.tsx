import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { LoadingScreen } from './components/common/LoadingScreen';
import { NotificationToast } from './components/common/NotificationToast';
import { CursorEffect } from './components/common/CursorEffect';

// Home Section Components
import { HeroBanner } from './components/home/HeroBanner';
import { FlashSaleSection } from './components/home/FlashSaleSection';
import { CategoryGrid } from './components/home/CategoryGrid';
import { FeaturedCollections } from './components/home/FeaturedCollections';
import { WhyChooseUs } from './components/home/WhyChooseUs';
import { Testimonials } from './components/home/Testimonials';
import { NewsletterBanner } from './components/home/NewsletterBanner';

// Views
import { ShopCatalogView } from './components/views/ShopCatalogView';
import { WishlistView } from './components/views/WishlistView';
import { ProductCompareModal } from './components/products/ProductCompareModal';
import { OrdersView } from './components/views/OrdersView';
import { CartDrawer } from './components/cart/CartDrawer';

// Modals
import { ProductDetailModal } from './components/products/ProductDetailModal';
import { QuickViewModal } from './components/products/QuickViewModal';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { OrderSuccessModal } from './components/checkout/OrderSuccessModal';
import { AiShoppingAssistant } from './components/ai/AiShoppingAssistant';
import { AiProductFinderModal } from './components/ai/AiProductFinderModal';
import { Order } from './types';

const MainAppContent: React.FC = () => {
  const { activeView, themeMode } = useStore();

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 ${
        themeMode === 'dark'
          ? 'bg-black text-white'
          : 'bg-zinc-950 text-zinc-100'
      }`}
    >
      <CursorEffect />
      <NotificationToast />

      {/* Floating Header */}
      <Header />

      {/* Main Dynamic View Content */}
      <main className="min-h-[70vh]">
        {activeView === 'home' && (
          <>
            <HeroBanner />
            <FlashSaleSection />
            <CategoryGrid />
            <FeaturedCollections />
            <WhyChooseUs />
            <Testimonials />
            <NewsletterBanner />
          </>
        )}

        {activeView === 'shop' && <ShopCatalogView />}
        {activeView === 'wishlist' && <WishlistView />}
        {activeView === 'compare' && <ProductCompareModal />}
        {activeView === 'orders' && <OrdersView />}
        {activeView === 'cart' && (
          <CartDrawer onProceedCheckout={() => setIsCheckoutOpen(true)} />
        )}
      </main>

      {/* Modals & Overlays */}
      <ProductDetailModal />
      <QuickViewModal />
      <AiShoppingAssistant />
      <AiProductFinderModal />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onSuccessOrder={(order) => {
          setIsCheckoutOpen(false);
          setCompletedOrder(order);
        }}
      />

      <OrderSuccessModal
        order={completedOrder}
        onClose={() => setCompletedOrder(null)}
      />

      {/* Luxury Footer */}
      <Footer />
    </div>
  );
};

export function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <StoreProvider>
      {!loadingComplete && (
        <LoadingScreen onComplete={() => setLoadingComplete(true)} />
      )}
      <MainAppContent />
    </StoreProvider>
  );
}

export default App;
