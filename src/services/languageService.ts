import { LanguageCode } from '../types';

export interface LanguageInfo {
  code: LanguageCode;
  name: string;
  flag: string;
  nativeName: string;
}

export const LANGUAGES: LanguageInfo[] = [
  { code: 'en', name: 'English', flag: '🇳🇬', nativeName: 'English' },
  { code: 'ha', name: 'Hausa', flag: '🇳🇬', nativeName: 'Harshen Hausa' },
  { code: 'yo', name: 'Yoruba', flag: '🇳🇬', nativeName: 'Èdè Yorùbá' },
  { code: 'ig', name: 'Igbo', flag: '🇳🇬', nativeName: 'Asụsụ Igbo' },
  { code: 'pcm', name: 'Pidgin', flag: '🇳🇬', nativeName: 'Naija Pidgin' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', nativeName: 'Français (West Africa)' },
];

export const TRANSLATIONS: Record<string, Record<LanguageCode, string>> = {
  appTitle: {
    en: 'naijaagroconnect.com',
    ha: 'naijaagroconnect.com',
    yo: 'naijaagroconnect.com',
    ig: 'naijaagroconnect.com',
    pcm: 'naijaagroconnect.com',
    fr: 'naijaagroconnect.com',
  },
  heroSubtitle: {
    en: 'Connecting Farmers, Buyers & Diaspora with Real-Time Zone Prices, Crypto/Fiat Escrow & Live Shipment Tracking.',
    ha: 'Hada manoma da masu saye tare da farashin kasuwa na gaskiya, biyan kudi na amintacce da bin diddigin kaya.',
    yo: 'Sopọ àwọn àgbẹ̀, àwọn oníbàárà pẹ̀lú iye owo ọjà gidi, súnmọ́ àwọn àgbègbè àti títọpa ẹrù gidi.',
    ig: 'Njikọ ndị ọrụ ugbo na ndị na-azụ ihe nwerenụ ọnụahịa ahịa gboo, nchekwa ego na nsuso ngwaahịa.',
    pcm: 'Connect farmers, buyers and Diaspora people with real-time market price, crypto/fiat escrow and live shipment tracking.',
    fr: 'Connecter les agriculteurs, acheteurs et la diaspora avec des prix en temps réel, un tiers de confiance crypto/fiat et un suivi de livraison.',
  },
  tabMarketplace: {
    en: 'Produce & Livestock Market',
    ha: 'Kasuwar Amfanin Gona & Dabbobi',
    yo: 'Ọjà Eko & Ẹran Ọsìn',
    ig: 'Ahịa Ngwaahịa Ugbo & Anụ Ụlọ',
    pcm: 'Produce & Livestock Market',
    fr: 'Marché des Produits & Bétail',
  },
  tabZonePrices: {
    en: '6-Zone Real-Time Prices',
    ha: 'Farashin Shiyya 6',
    yo: 'Iye Owo Àgbègbè 6',
    ig: 'Ọnụahịa Mpaghara 6',
    pcm: '6-Zone Real Price Ticker',
    fr: 'Prix en Temps Réel 6 Zones',
  },
  tabInventoryTool: {
    en: 'Farmer Inventory & Yield Tool',
    ha: 'Gudanar da Kayan Noma',
    yo: 'Atọka Ọja Àgbẹ̀',
    ig: 'Ihe Ndekọ Kọmputa Onye Ugbo',
    pcm: 'Farmer Inventory Manager',
    fr: 'Gestion de Stock Agricole',
  },
  tabDiaspora: {
    en: 'Diaspora Produce Bundles',
    ha: 'Kayan Abinci na Kasashen Waje',
    yo: 'Kẹ́sì Onjẹ Fún Awọn Òkè Òkun',
    ig: 'Ngwugwu Nri Ndị Bịara Abịa',
    pcm: 'Diaspora Food Packs',
    fr: 'Colis Alimentaires Diaspora',
  },
  tabSpotlight: {
    en: 'Farmer & Livestock Spotlight',
    ha: 'Gidajen Noma da Dabbobi',
    yo: 'Ibùdó Àwọn Àgbẹ̀',
    ig: 'Ebe Ndị Ọrụ Ugbo Nọ',
    pcm: 'Verified Farmers Showcase',
    fr: 'Vitrines des Producteurs',
  },
  tabShipments: {
    en: 'Live Shipment Tracker',
    ha: 'Bin Diddigin Kaya',
    yo: 'Títọpa Ẹrù Ọjà',
    ig: 'Nsuso Ngwaahịa Uzo',
    pcm: 'Live Shipment Tracking',
    fr: 'Suivi des Expéditions',
  },
  tabAIAssistant: {
    en: 'NaijaAgri AI Advisory',
    ha: 'Shawarwari Masu Waya AI',
    yo: 'Oluṣatunṣe Agbẹ AI',
    ig: 'Onye Ndụmọdụ Ugbo AI',
    pcm: 'NaijaAgri AI Assistant',
    fr: 'Conseiller Agricole IA',
  },
  tabBlog: {
    en: 'Farm Stories & Innovation',
    ha: 'Labaran Gona & Sabbin Fasaha',
    yo: 'Ìtàn Oko & Ĕ̀wẹ́ Tuntun',
    ig: 'Akụkọ Ugbo & Nchọpụta Ọhụrụ',
    pcm: 'Farm Stories & Innovation',
    fr: 'Histoires de Fermes & Innovation',
  },
  selectZone: {
    en: 'Select Geopolitical Zone',
    ha: 'Zabi Shiyya',
    yo: 'Aṣayan Àgbègbè',
    ig: 'Họrọ Mpaghara',
    pcm: 'Choose Zone',
    fr: 'Sélectionner la Zone',
  },
  escrowProtected: {
    en: '100% Escrow Protected',
    ha: 'Tsaron Biyan Kudi 100%',
    yo: 'Àabo Biyan Owo 100%',
    ig: 'Ego Gị Na-echekwa 100%',
    pcm: '100% Escrow Safe',
    fr: 'Paiement Escrow 100% Sécurisé',
  },
  verifiedFarmer: {
    en: 'NIN/BVN Verified Farmer',
    ha: 'Manomi Mai Tabbaci (NIN/BVN)',
    yo: 'Àgbẹ̀ ti o ni NIN/BVN',
    ig: 'Onye Ugbo Egosipụtara NIN/BVN',
    pcm: 'NIN/BVN Verified Farmer',
    fr: 'Agriculteur Vérifié (NIN/BVN)',
  },
  offlineMode: {
    en: 'Offline Sync Active',
    ha: 'Kayan aiki yana aiki ba tare da Intanet ba',
    yo: 'Ailopin intanẹẹti ti ṣiṣẹ',
    ig: 'Ihe Ndekọ Ahịa Na-arụ Na-enweghị Netwọk',
    pcm: 'Offline Mode Active',
    fr: 'Mode Hors Ligne Actif',
  },
  cryptoFiatSupport: {
    en: 'Fiat (NGN, USD, EUR) & Crypto (USDT, BTC, eNaira)',
    ha: 'Kudin Fiat da Crypto (USDT, eNaira)',
    yo: 'Owo Fiat & Crypto (USDT, eNaira)',
    ig: 'Ego Fiat & Crypto (USDT, eNaira)',
    pcm: 'Naira, Dollar & Crypto (USDT, eNaira)',
    fr: 'Devises Fiat & Cryptomonnaies (USDT, eNaira)',
  },
};

export function t(key: string, lang: LanguageCode): string {
  if (TRANSLATIONS[key] && TRANSLATIONS[key][lang]) {
    return TRANSLATIONS[key][lang];
  }
  if (TRANSLATIONS[key] && TRANSLATIONS[key]['en']) {
    return TRANSLATIONS[key]['en'];
  }
  return key;
}
