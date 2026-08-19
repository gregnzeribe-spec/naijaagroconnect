export type GeopoliticalZone = 
  | 'North-West'
  | 'North-East'
  | 'North-Central'
  | 'South-West'
  | 'South-East'
  | 'South-South';

export type CategoryType = 'Crop' | 'Livestock' | 'Processed' | 'Export Bundle';

export type CurrencyCode = 'NGN' | 'USD' | 'EUR' | 'GBP' | 'USDT' | 'eNaira';

export type LanguageCode = 'en' | 'ha' | 'yo' | 'ig' | 'pcm' | 'fr';

export interface FarmerProfile {
  id: string;
  name: string;
  farmName: string;
  avatar: string;
  phone: string;
  whatsapp: string;
  zone: GeopoliticalZone;
  state: string;
  lga: string;
  ninVerified: boolean;
  bvnVerified: boolean;
  isExportCertified: boolean;
  rating: number;
  reviewCount: number;
  bio: string;
  galleryImages: string[];
  primaryProducts: string[];
}

export interface ProduceListing {
  id: string;
  title: string;
  category: CategoryType;
  subCategory: string; // e.g. "Grains & Cereals", "Tubers", "Ruminants", "Spices", "Oil & Seeds"
  zone: GeopoliticalZone;
  state: string;
  marketLocation: string; // e.g., "Dawanau Grain Market, Kano"
  priceNGN: number;
  unit: string; // e.g., "100kg Bag", "Ton", "Head", "KG", "Crate"
  minOrderQty: number;
  totalAvailable: number;
  qualityGrade: 'Export Grade A' | 'Standard Grade B' | 'Organic Premium';
  images: string[];
  harvestDate: string;
  farmer: FarmerProfile;
  isExportReady: boolean;
  supportsEscrow: boolean;
  description: string;
  createdAt: string;
}

export interface ZoneMarketPrice {
  id: string;
  produceName: string;
  category: CategoryType;
  zone: GeopoliticalZone;
  primaryMarket: string;
  currentPriceNGN: number;
  unit: string;
  priceChange24h: number; // percentage, e.g. +4.5 or -2.1
  demandLevel: 'Extreme' | 'High' | 'Moderate' | 'Low';
  lastUpdated: string;
  historicalTrend: { date: string; price: number }[];
}

export interface FarmerInventoryItem {
  id: string;
  cropOrLivestock: string;
  category: 'Crop' | 'Livestock';
  locationName: string; // e.g., "Sokoto Farm 1", "Zaria Silo B"
  quantity: number;
  unit: string;
  minThreshold: number;
  expectedHarvestDate?: string;
  estimatedYieldValueNGN: number;
  healthOrQualityStatus: 'Excellent' | 'Good' | 'Needs Attention' | 'Harvest Ready';
  lastSynced: string;
}

export interface DiasporaBundle {
  id: string;
  title: string;
  targetRegion: 'UK' | 'USA' | 'Canada' | 'EU' | 'Worldwide';
  weightKg: number;
  itemsIncluded: string[];
  priceUSD: number;
  priceNGN: number;
  image: string;
  rating: number;
  reviews: number;
  shippingTimeDays: string;
  customsCleared: boolean;
  description: string;
}

export interface ShipmentOrder {
  id: string;
  trackingNumber: string;
  itemTitle: string;
  buyerName: string;
  sellerName: string;
  quantity: string;
  totalValueNGN: number;
  totalValueCryptoUSDT: number;
  currencyPaid: CurrencyCode;
  paymentStatus: 'Escrow Secured' | 'Processing' | 'Funds Released' | 'Refunded';
  shipmentStatus: 'Preparing Harvest' | 'In Transit - Local Logistics' | 'Customs Clearance' | 'Air Cargo In-Flight' | 'Out for Delivery' | 'Delivered';
  logisticsPartner: 'Kobo360' | 'Red Star Express' | 'GIG Logistics' | 'DHL Aviation' | 'GAC Logistics';
  originCity: string;
  destinationCity: string;
  temperatureCelsius?: number; // Cold chain tracking
  coordinates: { lat: number; lng: number };
  estimatedDelivery: string;
  timeline: {
    title: string;
    description: string;
    time: string;
    completed: boolean;
  }[];
}

export interface PriceAlertNotification {
  id: string;
  title: string;
  message: string;
  zone: GeopoliticalZone;
  produceName: string;
  priceChangePct: number;
  timestamp: string;
  isRead: boolean;
  type: 'PRICE_SPIKE' | 'DEMAND_ALERT' | 'SHIPMENT_UPDATE' | 'ESCROW_RELEASE';
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  authorName: string;
  farmName?: string;
  zone?: GeopoliticalZone;
  tags: string[];
  featured: boolean;
  publishedAt: string;
}

export interface TranslationDictionary {
  [key: string]: {
    [lang in LanguageCode]: string;
  };
}
