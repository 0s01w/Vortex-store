export type CategoryId = 'Gaming' | 'Tech' | 'Smart Home' | 'Fashion' | 'Accessories' | 'Office' | 'Lifestyle';

export type StockStatus = 'in_stock' | 'low_stock' | 'pre_order' | 'limited_edition';

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  category: CategoryId;
  rating: number;
  reviewCount: number;
  stockCount: number;
  stockStatus: StockStatus;
  isFeatured?: boolean;
  isNew?: boolean;
  isFlashSale?: boolean;
  flashSaleEndsAt?: string; // ISO date or time
  isTrending?: boolean;
  isBestSeller?: boolean;
  images: string[];
  tags: string[];
  specifications: ProductSpecification[];
  reviews: Review[];
  features: string[];
}

export interface Category {
  id: CategoryId;
  name: string;
  iconName: string;
  count: number;
  description: string;
  image: string;
  gradient: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedVariant?: string;
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

export interface Coupon {
  code: string;
  discountType: 'percent' | 'fixed';
  discountValue: number; // e.g. 20 for 20% or 100 for $100
  minPurchase: number;
  description: string;
}

export interface ShippingMethod {
  id: string;
  name: string;
  deliveryDays: string;
  cost: number;
  ecoFriendly: boolean;
}

export interface FilterState {
  searchQuery: string;
  category: string; // 'All' or CategoryId
  priceRange: [number, number];
  minRating: number;
  stockStatus: string; // 'all', 'in_stock', 'sale', etc.
  tags: string[];
  sortBy: 'featured' | 'price_low' | 'price_high' | 'rating' | 'popular' | 'newest';
  onSaleOnly: boolean;
  inStockOnly: boolean;
}

export interface Order {
  orderId: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  shippingCost: number;
  tax: number;
  totalAmount: number;
  shippingAddress: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    country: string;
    postalCode: string;
  };
  paymentMethod: string;
  estimatedDelivery: string;
  status: 'Processing' | 'Shipped' | 'Out for Quantum Delivery' | 'Delivered';
}

export type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'BTC';
