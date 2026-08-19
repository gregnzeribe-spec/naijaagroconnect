import { ProduceListing, ZoneMarketPrice, FarmerProfile, FarmerInventoryItem, DiasporaBundle, ShipmentOrder, PriceAlertNotification } from '../types';
import nsukkaYellowPepperImg from '../assets/images/nsukka_yellow_pepper_1785435294972.jpg';
import egusiImg from '../assets/images/hand_peeled_white_egusi_1785435749070.jpg';
import rawCashewImg from '../assets/images/ogbomoso_raw_cashew_nuts_1785436090849.jpg';
import exportWhiteYamsImg from '../assets/images/export_white_yams_1785436575826.jpg';
import idanreCocoaImg from '../assets/images/idanre_fermented_cocoa_1785436898983.jpg';
import pureSpecialPalmOilImg from '../assets/images/pure_special_palm_oil_1785439829080.jpg';
import kilnSmokedCatfishImg from '../assets/images/kiln_smoked_catfish_1785440142382.jpg';
import splitDriedGingerImg from '../assets/images/kaduna_split_dried_ginger_1785440689554.jpg';
import ijebuYellowWhiteGarriImg from '../assets/images/ijebu_yellow_white_garri_1785441916712.jpg';
import premiumOgbonoSeedsImg from '../assets/images/premium_ogbono_seeds_1785441932737.jpg';
import nativeOgbonoSeedsImg from '../assets/images/native_ogbono_seeds_1785444521826.jpg';
import sokotoRedOnionsImg from '../assets/images/sokoto_red_onions_1785441945199.jpg';
import orangeFleshedSweetPotatoesImg from '../assets/images/orange_fleshed_sweet_potatoes_1785442664083.jpg';
import roundSmokedCatfishImg from '../assets/images/round_smoked_catfish_1785444007450.jpg';
import largeWhitePigsImg from '../assets/images/large_white_pigs_1785445020713.jpg';
import sokotoRedGoatsImg from '../assets/images/sokoto_red_goats_1785445034243.jpg';
import balamiCattleRamsImg from '../assets/images/balami_cattle_rams_1785445047724.jpg';

export const INITIAL_FARMERS: FarmerProfile[] = [
  {
    id: 'f1',
    name: 'Mallam Usman Danladi',
    farmName: 'Danladi Grain & Livestock Ranch',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    phone: '+234 803 123 4567',
    whatsapp: '+2348031234567',
    zone: 'North-West',
    state: 'Kano',
    lga: 'Dawanau',
    ninVerified: true,
    bvnVerified: true,
    isExportCertified: true,
    rating: 4.9,
    reviewCount: 142,
    bio: 'Specialist in organic Sorghum, Sesame seeds, Sokoto Red Onions, Kano Garlic, and Balami Rams with over 18 years experience.',
    galleryImages: [
      'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=600&q=80'
    ],
    primaryProducts: ['Sesame Seeds', 'Sokoto Red Onions', 'White Garlic', 'Balami Rams']
  },
  {
    id: 'f2',
    name: 'Chief Mrs. Folake Adebayo',
    farmName: 'AgroGold Cocoa & Cashew Estates',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    phone: '+234 802 987 6543',
    whatsapp: '+2348029876543',
    zone: 'South-West',
    state: 'Ondo',
    lga: 'Idanre',
    ninVerified: true,
    bvnVerified: true,
    isExportCertified: true,
    rating: 4.8,
    reviewCount: 98,
    bio: 'Premier cocoa bean producer in Idanre Ondo State. Certified Grade-A fermented cocoa beans, raw cashew nuts, and poultry farming.',
    galleryImages: [
      'https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80'
    ],
    primaryProducts: ['Grade A Fermented Cocoa', 'Ogbomoso Raw Cashews', 'Broiler Chickens']
  },
  {
    id: 'f3',
    name: 'Chief Terver Ortom',
    farmName: 'Food Basket Yam & Grain Hub',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    phone: '+234 814 555 7890',
    whatsapp: '+2348145557890',
    zone: 'North-Central',
    state: 'Benue',
    lga: 'Gboko',
    ninVerified: true,
    bvnVerified: true,
    isExportCertified: true,
    rating: 5.0,
    reviewCount: 210,
    bio: 'Pioneer Yam tuber exporter from Gboko, Benue State. Supplying export-grade white yams, sweet potatoes, sesame, and yellow garri.',
    galleryImages: [
      'https://images.unsplash.com/photo-1628102491629-778571d893a3?auto=format&fit=crop&w=600&q=80'
    ],
    primaryProducts: ['Export White Yams', 'Benue Sesame', 'Sweet Potatoes']
  },
  {
    id: 'f4',
    name: 'Engr. Nnamdi Okonkwo',
    farmName: 'Enugu Bio-Agro & Fish Farms',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
    phone: '+234 806 333 2211',
    whatsapp: '+2348063332211',
    zone: 'South-East',
    state: 'Enugu',
    lga: 'Nsukka',
    ninVerified: true,
    bvnVerified: true,
    isExportCertified: false,
    rating: 4.7,
    reviewCount: 64,
    bio: 'Modern aquaculture and livestock farm in Nsukka producing organic kiln-dried smoked catfish, Nsukka yellow pepper, egusi, and pigs.',
    galleryImages: [
      'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&w=600&q=80'
    ],
    primaryProducts: ['Dried Smoked Catfish', 'Nsukka Yellow Pepper', 'Pigs', 'Egusi Melon']
  },
  {
    id: 'f5',
    name: 'Hajiya Amina Aliyu',
    farmName: 'Plateau Valley Fresh Horticulture',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    phone: '+234 805 777 4433',
    whatsapp: '+2348057774433',
    zone: 'North-Central',
    state: 'Plateau',
    lga: 'Jos South',
    ninVerified: true,
    bvnVerified: true,
    isExportCertified: true,
    rating: 4.9,
    reviewCount: 115,
    bio: 'Leading green-house and open field fresh vegetables farmer in Jos. Specializing in high-yield vine tomatoes, fresh peppers, garlic, and Irish/Sweet potatoes.',
    galleryImages: [
      'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80'
    ],
    primaryProducts: ['Jos Red Tomatoes', 'Atarodo Pepper', 'Sweet Potatoes', 'Garlic']
  },
  {
    id: 'f6',
    name: 'Chief Elder Obinna Ekwueme',
    farmName: 'Oil Palm & Ogbono Gold Plantations',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
    phone: '+234 803 888 9911',
    whatsapp: '+2348038889911',
    zone: 'South-East',
    state: 'Imo',
    lga: 'Mbaise',
    ninVerified: true,
    bvnVerified: true,
    isExportCertified: true,
    rating: 4.95,
    reviewCount: 180,
    bio: 'Heritage oil palm estate producer and wild mango seed (ogbono) exporter in Imo State. Guaranteed unadulterated red palm oil and hand-peeled egusi.',
    galleryImages: [
      'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=600&q=80'
    ],
    primaryProducts: ['Red Palm Oil', 'Ogbono Seeds', 'Egusi Melon', 'Live Pigs']
  }
];

export const INITIAL_PRODUCE_LISTINGS: ProduceListing[] = [
  {
    id: 'prod-1',
    title: 'Export Grade White Yams (Large Tubers)',
    category: 'Crop',
    subCategory: 'Tubers & Roots',
    zone: 'North-Central',
    state: 'Benue',
    marketLocation: 'Gboko Central Yam Market, Benue',
    priceNGN: 48000,
    unit: '100 Tubers',
    minOrderQty: 1,
    totalAvailable: 250,
    qualityGrade: 'Export Grade A',
    images: [
      exportWhiteYamsImg,
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80'
    ],
    harvestDate: '2026-07-15',
    farmer: INITIAL_FARMERS[2],
    isExportReady: true,
    supportsEscrow: true,
    description: 'Freshly harvested, hand-selected export quality white yams from Benue State. Free from decay or internal discoloration. Fumigated and ready for sea or air freight to UK/US/EU.',
    createdAt: '2026-07-28'
  },
  {
    id: 'prod-2',
    title: 'Organic White Sesame Seeds (Cleaned 99.5% Purity)',
    category: 'Crop',
    subCategory: 'Oil Seeds & Grains',
    zone: 'North-West',
    state: 'Kano',
    marketLocation: 'Dawanau International Grain Market, Kano',
    priceNGN: 1450000,
    unit: 'Metric Ton',
    minOrderQty: 1,
    totalAvailable: 45,
    qualityGrade: 'Export Grade A',
    images: [
      'https://images.unsplash.com/photo-1608797178974-15b35a64ede9?auto=format&fit=crop&w=800&q=80'
    ],
    harvestDate: '2026-06-30',
    farmer: INITIAL_FARMERS[0],
    isExportReady: true,
    supportsEscrow: true,
    description: 'First grade cleaned white sesame seeds with low moisture content (<6%). Fully compliant with EU and Asian phytosanitary standards. Bulk export container loading available.',
    createdAt: '2026-07-27'
  },
  {
    id: 'prod-3',
    title: 'Sokoto Red Goats & Balami Breeding Rams',
    category: 'Livestock',
    subCategory: 'Ruminants & Cattle',
    zone: 'North-West',
    state: 'Sokoto',
    marketLocation: 'Kara Cattle Market, Sokoto',
    priceNGN: 165000,
    unit: 'Head',
    minOrderQty: 2,
    totalAvailable: 80,
    qualityGrade: 'Organic Premium',
    images: [
      sokotoRedGoatsImg,
      balamiCattleRamsImg
    ],
    harvestDate: '2026-07-20',
    farmer: INITIAL_FARMERS[0],
    isExportReady: false,
    supportsEscrow: true,
    description: 'Healthy, fully vaccinated Sokoto Red Goats and Balami Rams. Highly sought after for meat yield, breeding, and leather hide quality. Nationwide truck logistics supported.',
    createdAt: '2026-07-26'
  },
  {
    id: 'prod-4',
    title: 'Idanre Grade-A Fermented Cocoa Beans',
    category: 'Crop',
    subCategory: 'Cash Crops & Spices',
    zone: 'South-West',
    state: 'Ondo',
    marketLocation: 'Idanre Cocoa Produce Depot, Ondo',
    priceNGN: 3200000,
    unit: 'Metric Ton',
    minOrderQty: 1,
    totalAvailable: 15,
    qualityGrade: 'Export Grade A',
    images: [
      idanreCocoaImg
    ],
    harvestDate: '2026-07-10',
    farmer: INITIAL_FARMERS[1],
    isExportReady: true,
    supportsEscrow: true,
    description: 'Well-fermented, sun-dried raw cocoa beans with rich chocolate aroma and bean count under 95/100g. NEPC Certified for international trade.',
    createdAt: '2026-07-25'
  },
  {
    id: 'prod-5',
    title: 'Kiln-Dried Oven Smoked Catfish (Export Sealed)',
    category: 'Processed',
    subCategory: 'Aquaculture & Poultry',
    zone: 'South-East',
    state: 'Enugu',
    marketLocation: 'Nsukka Central Market, Enugu',
    priceNGN: 35000,
    unit: 'Carton (5kg)',
    minOrderQty: 1,
    totalAvailable: 120,
    qualityGrade: 'Export Grade A',
    images: [
      roundSmokedCatfishImg,
      kilnSmokedCatfishImg
    ],
    harvestDate: '2026-07-22',
    farmer: INITIAL_FARMERS[3],
    isExportReady: true,
    supportsEscrow: true,
    description: 'Hygienically processed, sand-free, kiln-dried catfish. Vacuum packed in FDA/UK customs compliant pouches with 12-month shelf life.',
    createdAt: '2026-07-28'
  },
  {
    id: 'prod-6',
    title: 'Ogbomoso Jumbo Raw Cashew Nuts (Nut Count 180)',
    category: 'Crop',
    subCategory: 'Cash Crops & Spices',
    zone: 'South-West',
    state: 'Oyo',
    marketLocation: 'Ogbomoso Produce Hub, Oyo',
    priceNGN: 1850000,
    unit: 'Metric Ton',
    minOrderQty: 1,
    totalAvailable: 30,
    qualityGrade: 'Export Grade A',
    images: [
      rawCashewImg
    ],
    harvestDate: '2026-06-25',
    farmer: INITIAL_FARMERS[1],
    isExportReady: true,
    supportsEscrow: true,
    description: 'Jumbo raw cashew nuts from Ogbomoso with KOR (Kernel Output Ratio) > 48 lbs. High oil content and premium kernel recovery.',
    createdAt: '2026-07-20'
  },
  {
    id: 'prod-7',
    title: 'Fresh Ginger (Split & Dried Organic Kaduna Ginger)',
    category: 'Crop',
    subCategory: 'Cash Crops & Spices',
    zone: 'North-West',
    state: 'Kaduna',
    marketLocation: 'Kachia Ginger Market, Kaduna',
    priceNGN: 2400000,
    unit: 'Metric Ton',
    minOrderQty: 1,
    totalAvailable: 20,
    qualityGrade: 'Export Grade A',
    images: [
      splitDriedGingerImg
    ],
    harvestDate: '2026-07-02',
    farmer: INITIAL_FARMERS[0],
    isExportReady: true,
    supportsEscrow: true,
    description: 'Kaduna split dried ginger renowned globally for high pungency and oleoresin content. Tested and free from aflatoxins.',
    createdAt: '2026-07-24'
  },
  {
    id: 'prod-8',
    title: 'Ijebu Yellow Garri & Premium White Garri (50kg Bag)',
    category: 'Processed',
    subCategory: 'Tubers & Roots',
    zone: 'South-West',
    state: 'Ogun',
    marketLocation: 'Ijebu-Ode Produce Market, Ogun',
    priceNGN: 42000,
    unit: '50kg Bag',
    minOrderQty: 2,
    totalAvailable: 300,
    qualityGrade: 'Standard Grade B',
    images: [
      ijebuYellowWhiteGarriImg
    ],
    harvestDate: '2026-07-24',
    farmer: INITIAL_FARMERS[1],
    isExportReady: true,
    supportsEscrow: true,
    description: 'Authentic sour-crisp Ijebu Garri. Carefully fried with organic palm oil or pure cassava starch. Clean, gravel-free and long shelf life.',
    createdAt: '2026-07-28'
  },
  {
    id: 'prod-9',
    title: 'Pure Special Red Palm Oil (25L Jerrycan / Bulk Barrel)',
    category: 'Processed',
    subCategory: 'Cash Crops & Spices',
    zone: 'South-East',
    state: 'Imo',
    marketLocation: 'Mbaise Oil Palm Depot, Imo',
    priceNGN: 38000,
    unit: '25L Jerrycan',
    minOrderQty: 1,
    totalAvailable: 500,
    qualityGrade: 'Export Grade A',
    images: [
      pureSpecialPalmOilImg
    ],
    harvestDate: '2026-07-25',
    farmer: INITIAL_FARMERS[5],
    isExportReady: true,
    supportsEscrow: true,
    description: '100% unadulterated pure red palm oil milled directly from fresh oil palm fruit bunches in Mbaise. Free from chemical additives, artificial color, or water. Low free fatty acid (FFA < 5%).',
    createdAt: '2026-07-28'
  },
  {
    id: 'prod-10',
    title: 'Premium Ogbono Seeds (Wild Mango Seeds - 25kg Bag)',
    category: 'Crop',
    subCategory: 'Cash Crops & Spices',
    zone: 'South-East',
    state: 'Imo',
    marketLocation: 'Owerri Relief Market, Imo',
    priceNGN: 185000,
    unit: '25kg Bag',
    minOrderQty: 1,
    totalAvailable: 60,
    qualityGrade: 'Export Grade A',
    images: [
      nativeOgbonoSeedsImg,
      premiumOgbonoSeedsImg
    ],
    harvestDate: '2026-07-18',
    farmer: INITIAL_FARMERS[5],
    isExportReady: true,
    supportsEscrow: true,
    description: 'First grade sun-dried Ogbono seeds (Irvingia gabonensis) sourced directly from South-East forests. High mucilage content for superior soup viscosity. Tested for air export to Diaspora markets.',
    createdAt: '2026-07-27'
  },
  {
    id: 'prod-11',
    title: 'Hand-Peeled White Egusi Seeds (Melon Seeds - 50kg Bag)',
    category: 'Crop',
    subCategory: 'Oil Seeds & Grains',
    zone: 'North-Central',
    state: 'Benue',
    marketLocation: 'Gboko Central Market, Benue',
    priceNGN: 140000,
    unit: '50kg Bag',
    minOrderQty: 1,
    totalAvailable: 90,
    qualityGrade: 'Export Grade A',
    images: [
      egusiImg
    ],
    harvestDate: '2026-07-20',
    farmer: INITIAL_FARMERS[2],
    isExportReady: true,
    supportsEscrow: true,
    description: 'Clean, hand-peeled white egusi melon seeds with zero shell debris or bitterness. High oil content, ideal for domestic cooking and Diaspora food distribution.',
    createdAt: '2026-07-26'
  },
  {
    id: 'prod-12',
    title: 'Sokoto Cleaned Red Onions (50kg Mesh Bag)',
    category: 'Crop',
    subCategory: 'Cash Crops & Spices',
    zone: 'North-West',
    state: 'Sokoto',
    marketLocation: 'Kara Produce Market, Sokoto',
    priceNGN: 65000,
    unit: '50kg Bag',
    minOrderQty: 2,
    totalAvailable: 400,
    qualityGrade: 'Standard Grade B',
    images: [
      sokotoRedOnionsImg
    ],
    harvestDate: '2026-07-22',
    farmer: INITIAL_FARMERS[0],
    isExportReady: true,
    supportsEscrow: true,
    description: 'Pungent, dry-skin Sokoto red onions. Cured properly for long-distance transit to Southern Nigeria, West Africa, and overseas ports without sprouting.',
    createdAt: '2026-07-28'
  },
  {
    id: 'prod-13',
    title: 'Nsukka Yellow Pepper & Fresh Atarodo Scotch Bonnet',
    category: 'Crop',
    subCategory: 'Cash Crops & Spices',
    zone: 'South-East',
    state: 'Enugu',
    marketLocation: 'Nsukka Pepper Market, Enugu',
    priceNGN: 32000,
    unit: 'Raffia Basket (25kg)',
    minOrderQty: 1,
    totalAvailable: 150,
    qualityGrade: 'Organic Premium',
    images: [
      nsukkaYellowPepperImg
    ],
    harvestDate: '2026-07-28',
    farmer: INITIAL_FARMERS[3],
    isExportReady: false,
    supportsEscrow: true,
    description: 'Aromatic, highly spicy Nsukka Yellow Pepper and fresh fiery Atarodo. Harvested daily at full maturity for maximum flavor intensity.',
    createdAt: '2026-07-28'
  },
  {
    id: 'prod-14',
    title: 'Jos Plateau Farm Fresh Red Tomatoes (Large Raffia Basket)',
    category: 'Crop',
    subCategory: 'Cash Crops & Spices',
    zone: 'North-Central',
    state: 'Plateau',
    marketLocation: 'Jos Building Materials Market, Plateau',
    priceNGN: 45000,
    unit: 'Large Basket (40kg)',
    minOrderQty: 2,
    totalAvailable: 200,
    qualityGrade: 'Export Grade A',
    images: [
      'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80'
    ],
    harvestDate: '2026-07-28',
    farmer: INITIAL_FARMERS[4],
    isExportReady: true,
    supportsEscrow: true,
    description: 'Firm, deep-red vine-ripened tomatoes grown in cool Jos Plateau climate. Thick skin with high solids content, perfect for stews, processing, and long haul transport.',
    createdAt: '2026-07-29'
  },
  {
    id: 'prod-15',
    title: 'Orange-Fleshed Sweet Potatoes (50kg Bag)',
    category: 'Crop',
    subCategory: 'Tubers & Roots',
    zone: 'North-Central',
    state: 'Plateau',
    marketLocation: 'Jos Grain & Tuber Hub, Plateau',
    priceNGN: 28000,
    unit: '50kg Bag',
    minOrderQty: 2,
    totalAvailable: 180,
    qualityGrade: 'Organic Premium',
    images: [
      orangeFleshedSweetPotatoesImg
    ],
    harvestDate: '2026-07-24',
    farmer: INITIAL_FARMERS[4],
    isExportReady: true,
    supportsEscrow: true,
    description: 'Nutrient-rich, naturally sweet orange-fleshed sweet potatoes loaded with Vitamin A. Smooth skin, zero pest damage.',
    createdAt: '2026-07-27'
  },
  {
    id: 'prod-16',
    title: 'Kano Cleaned White Garlic Bulbs (50kg Mesh Bag)',
    category: 'Crop',
    subCategory: 'Cash Crops & Spices',
    zone: 'North-West',
    state: 'Kano',
    marketLocation: 'Dawanau Market, Kano',
    priceNGN: 85000,
    unit: '50kg Bag',
    minOrderQty: 1,
    totalAvailable: 110,
    qualityGrade: 'Export Grade A',
    images: [
      'https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?auto=format&fit=crop&w=800&q=80'
    ],
    harvestDate: '2026-07-16',
    farmer: INITIAL_FARMERS[0],
    isExportReady: true,
    supportsEscrow: true,
    description: 'Firm, sun-cured white garlic bulbs with strong aromatic potency. Dried thoroughly for long-term storage and cross-border shipment.',
    createdAt: '2026-07-25'
  },
  {
    id: 'prod-17',
    title: 'Large White Breed Piggery Livestock (Live Breeding Pigs)',
    category: 'Livestock',
    subCategory: 'Ruminants & Cattle',
    zone: 'South-East',
    state: 'Enugu',
    marketLocation: 'Nsukka Farm Gate, Enugu',
    priceNGN: 120000,
    unit: 'Head',
    minOrderQty: 2,
    totalAvailable: 45,
    qualityGrade: 'Organic Premium',
    images: [
      largeWhitePigsImg
    ],
    harvestDate: '2026-07-20',
    farmer: INITIAL_FARMERS[3],
    isExportReady: false,
    supportsEscrow: true,
    description: 'Healthy, rapid-growth Large White and Landrace pigs raised on balanced biosecure feed. Vaccinated against swine fever with full health certificates.',
    createdAt: '2026-07-26'
  },
  {
    id: 'prod-18',
    title: 'Live Jumbo Broiler Chickens & Layer Crates',
    category: 'Livestock',
    subCategory: 'Aquaculture & Poultry',
    zone: 'South-West',
    state: 'Ondo',
    marketLocation: 'Akure Poultry Depot, Ondo',
    priceNGN: 6500,
    unit: 'Bird',
    minOrderQty: 10,
    totalAvailable: 500,
    qualityGrade: 'Organic Premium',
    images: [
      'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80'
    ],
    harvestDate: '2026-07-28',
    farmer: INITIAL_FARMERS[1],
    isExportReady: false,
    supportsEscrow: true,
    description: 'Heavyweight 2.8kg - 3.2kg live broiler chickens. Raised organically on corn-based feed with zero antibiotics. Bulk crate transport available.',
    createdAt: '2026-07-28'
  }
];

export const ZONE_MARKET_PRICES: ZoneMarketPrice[] = [
  {
    id: 'p1',
    produceName: 'White Sesame Seeds',
    category: 'Crop',
    zone: 'North-West',
    primaryMarket: 'Dawanau Market, Kano',
    currentPriceNGN: 1450000,
    unit: 'Metric Ton',
    priceChange24h: 5.2,
    demandLevel: 'Extreme',
    lastUpdated: '10 mins ago',
    historicalTrend: [
      { date: 'Jul 23', price: 1380000 },
      { date: 'Jul 25', price: 1400000 },
      { date: 'Jul 27', price: 1420000 },
      { date: 'Jul 29', price: 1450000 }
    ]
  },
  {
    id: 'p2',
    produceName: 'Export White Yams',
    category: 'Crop',
    zone: 'North-Central',
    primaryMarket: 'Gboko Yam Market, Benue',
    currentPriceNGN: 48000,
    unit: '100 Tubers',
    priceChange24h: -1.8,
    demandLevel: 'High',
    lastUpdated: '25 mins ago',
    historicalTrend: [
      { date: 'Jul 23', price: 510000 },
      { date: 'Jul 25', price: 495000 },
      { date: 'Jul 27', price: 490000 },
      { date: 'Jul 29', price: 480000 }
    ]
  },
  {
    id: 'p3',
    produceName: 'Fermented Cocoa Beans',
    category: 'Crop',
    zone: 'South-West',
    primaryMarket: 'Bodija / Idanre Depot, Ondo/Oyo',
    currentPriceNGN: 3200000,
    unit: 'Metric Ton',
    priceChange24h: 3.4,
    demandLevel: 'Extreme',
    lastUpdated: '5 mins ago',
    historicalTrend: [
      { date: 'Jul 23', price: 3050000 },
      { date: 'Jul 25', price: 3100000 },
      { date: 'Jul 27', price: 3150000 },
      { date: 'Jul 29', price: 3200000 }
    ]
  },
  {
    id: 'p4',
    produceName: 'Sokoto Red Goats',
    category: 'Livestock',
    zone: 'North-West',
    primaryMarket: 'Kara Market, Sokoto',
    currentPriceNGN: 165000,
    unit: 'Head',
    priceChange24h: 2.1,
    demandLevel: 'High',
    lastUpdated: '1 hour ago',
    historicalTrend: [
      { date: 'Jul 23', price: 158000 },
      { date: 'Jul 25', price: 160000 },
      { date: 'Jul 27', price: 162000 },
      { date: 'Jul 29', price: 165000 }
    ]
  },
  {
    id: 'p5',
    produceName: 'Smoked Kiln Catfish',
    category: 'Processed',
    zone: 'South-East',
    primaryMarket: 'Onitsha Main / Nsukka Market',
    currentPriceNGN: 35000,
    unit: '5kg Carton',
    priceChange24h: 0.0,
    demandLevel: 'Moderate',
    lastUpdated: '40 mins ago',
    historicalTrend: [
      { date: 'Jul 23', price: 35000 },
      { date: 'Jul 25', price: 35000 },
      { date: 'Jul 27', price: 35000 },
      { date: 'Jul 29', price: 35000 }
    ]
  },
  {
    id: 'p6',
    produceName: 'Paddy Rice (Faray 14)',
    category: 'Crop',
    zone: 'North-East',
    primaryMarket: 'Maiduguri / Gombe Grain Hub',
    currentPriceNGN: 520000,
    unit: 'Metric Ton',
    priceChange24h: 4.8,
    demandLevel: 'Extreme',
    lastUpdated: '12 mins ago',
    historicalTrend: [
      { date: 'Jul 23', price: 490000 },
      { date: 'Jul 25', price: 500000 },
      { date: 'Jul 27', price: 510000 },
      { date: 'Jul 29', price: 520000 }
    ]
  },
  {
    id: 'p7',
    produceName: 'Crayfish (Oron Premium)',
    category: 'Processed',
    zone: 'South-South',
    primaryMarket: 'Oron Marine Market, Akwa Ibom',
    currentPriceNGN: 125000,
    unit: 'Big Bag',
    priceChange24h: 1.5,
    demandLevel: 'High',
    lastUpdated: '30 mins ago',
    historicalTrend: [
      { date: 'Jul 23', price: 120000 },
      { date: 'Jul 25', price: 122000 },
      { date: 'Jul 27', price: 123500 },
      { date: 'Jul 29', price: 125000 }
    ]
  },
  {
    id: 'p8',
    produceName: 'Special Red Palm Oil',
    category: 'Processed',
    zone: 'South-East',
    primaryMarket: 'Mbaise Depot, Imo',
    currentPriceNGN: 38000,
    unit: '25L Jerrycan',
    priceChange24h: 3.2,
    demandLevel: 'Extreme',
    lastUpdated: '15 mins ago',
    historicalTrend: [
      { date: 'Jul 23', price: 35000 },
      { date: 'Jul 25', price: 36000 },
      { date: 'Jul 27', price: 37000 },
      { date: 'Jul 29', price: 38000 }
    ]
  },
  {
    id: 'p9',
    produceName: 'Wild Mango Ogbono Seeds',
    category: 'Crop',
    zone: 'South-East',
    primaryMarket: 'Owerri Relief Market, Imo',
    currentPriceNGN: 185000,
    unit: '25kg Bag',
    priceChange24h: 4.1,
    demandLevel: 'Extreme',
    lastUpdated: '8 mins ago',
    historicalTrend: [
      { date: 'Jul 23', price: 172000 },
      { date: 'Jul 25', price: 178000 },
      { date: 'Jul 27', price: 181000 },
      { date: 'Jul 29', price: 185000 }
    ]
  },
  {
    id: 'p10',
    produceName: 'Hand-Peeled White Egusi',
    category: 'Crop',
    zone: 'North-Central',
    primaryMarket: 'Gboko Central Market, Benue',
    currentPriceNGN: 140000,
    unit: '50kg Bag',
    priceChange24h: 2.5,
    demandLevel: 'High',
    lastUpdated: '18 mins ago',
    historicalTrend: [
      { date: 'Jul 23', price: 132000 },
      { date: 'Jul 25', price: 135000 },
      { date: 'Jul 27', price: 138000 },
      { date: 'Jul 29', price: 140000 }
    ]
  },
  {
    id: 'p11',
    produceName: 'Sokoto Cleaned Red Onions',
    category: 'Crop',
    zone: 'North-West',
    primaryMarket: 'Kara Market, Sokoto',
    currentPriceNGN: 65000,
    unit: '50kg Bag',
    priceChange24h: -2.3,
    demandLevel: 'High',
    lastUpdated: '45 mins ago',
    historicalTrend: [
      { date: 'Jul 23', price: 70000 },
      { date: 'Jul 25', price: 68000 },
      { date: 'Jul 27', price: 66500 },
      { date: 'Jul 29', price: 65000 }
    ]
  },
  {
    id: 'p12',
    produceName: 'Jos Farm Fresh Tomatoes',
    category: 'Crop',
    zone: 'North-Central',
    primaryMarket: 'Building Materials Market, Jos',
    currentPriceNGN: 45000,
    unit: '40kg Basket',
    priceChange24h: 6.8,
    demandLevel: 'Extreme',
    lastUpdated: '5 mins ago',
    historicalTrend: [
      { date: 'Jul 23', price: 38000 },
      { date: 'Jul 25', price: 40000 },
      { date: 'Jul 27', price: 42000 },
      { date: 'Jul 29', price: 45000 }
    ]
  },
  {
    id: 'p13',
    produceName: 'Nsukka Yellow & Atarodo Pepper',
    category: 'Crop',
    zone: 'South-East',
    primaryMarket: 'Nsukka Pepper Market, Enugu',
    currentPriceNGN: 32000,
    unit: '25kg Basket',
    priceChange24h: 1.8,
    demandLevel: 'High',
    lastUpdated: '22 mins ago',
    historicalTrend: [
      { date: 'Jul 23', price: 30000 },
      { date: 'Jul 25', price: 30800 },
      { date: 'Jul 27', price: 31500 },
      { date: 'Jul 29', price: 32000 }
    ]
  },
  {
    id: 'p14',
    produceName: 'Orange-Fleshed Sweet Potatoes',
    category: 'Crop',
    zone: 'North-Central',
    primaryMarket: 'Jos Grain & Tuber Hub, Plateau',
    currentPriceNGN: 28000,
    unit: '50kg Bag',
    priceChange24h: 0.5,
    demandLevel: 'Moderate',
    lastUpdated: '35 mins ago',
    historicalTrend: [
      { date: 'Jul 23', price: 27500 },
      { date: 'Jul 25', price: 27800 },
      { date: 'Jul 27', price: 28000 },
      { date: 'Jul 29', price: 28000 }
    ]
  },
  {
    id: 'p15',
    produceName: 'Cleaned White Garlic Bulbs',
    category: 'Crop',
    zone: 'North-West',
    primaryMarket: 'Dawanau Market, Kano',
    currentPriceNGN: 85000,
    unit: '50kg Bag',
    priceChange24h: 3.0,
    demandLevel: 'High',
    lastUpdated: '12 mins ago',
    historicalTrend: [
      { date: 'Jul 23', price: 80000 },
      { date: 'Jul 25', price: 82000 },
      { date: 'Jul 27', price: 83500 },
      { date: 'Jul 29', price: 85000 }
    ]
  },
  {
    id: 'p16',
    produceName: 'Large White Piggery Livestock',
    category: 'Livestock',
    zone: 'South-East',
    primaryMarket: 'Nsukka Livestock Farm, Enugu',
    currentPriceNGN: 120000,
    unit: 'Head',
    priceChange24h: 1.2,
    demandLevel: 'High',
    lastUpdated: '50 mins ago',
    historicalTrend: [
      { date: 'Jul 23', price: 115000 },
      { date: 'Jul 25', price: 118000 },
      { date: 'Jul 27', price: 119000 },
      { date: 'Jul 29', price: 120000 }
    ]
  },
  {
    id: 'p17',
    produceName: 'Jumbo Broiler Poultry Chickens',
    category: 'Livestock',
    zone: 'South-West',
    primaryMarket: 'Akure Poultry Hub, Ondo',
    currentPriceNGN: 6500,
    unit: 'Bird',
    priceChange24h: 2.8,
    demandLevel: 'High',
    lastUpdated: '20 mins ago',
    historicalTrend: [
      { date: 'Jul 23', price: 6000 },
      { date: 'Jul 25', price: 6200 },
      { date: 'Jul 27', price: 6350 },
      { date: 'Jul 29', price: 6500 }
    ]
  }
];

export const DIASPORA_BUNDLES: DiasporaBundle[] = [
  {
    id: 'diaspora-1',
    title: 'The London & UK Mega Naija Food Box',
    targetRegion: 'UK',
    weightKg: 25,
    itemsIncluded: [
      '5 Export White Yams (Benue)',
      '5kg Ijebu Crispy Garri',
      '2kg Hand-peeled Egusi',
      '1kg Kiln Smoked Catfish',
      '1kg Oron Crayfish Powder',
      '500g Suya Spice Pepper Mix'
    ],
    priceUSD: 185,
    priceNGN: 285000,
    image: 'https://images.unsplash.com/photo-1628102491629-778571d893a3?auto=format&fit=crop&w=800&q=80',
    rating: 4.95,
    reviews: 312,
    shippingTimeDays: '3 - 5 Days Air Cargo',
    customsCleared: true,
    description: 'Pre-inspected UK DEFRA compliant agricultural box shipped direct to your doorstep anywhere in London, Manchester, Birmingham, or Scotland.'
  },
  {
    id: 'diaspora-2',
    title: 'Houston & Atlanta Texas Heritage Bundle',
    targetRegion: 'USA',
    weightKg: 30,
    itemsIncluded: [
      '10kg Ofada Rice (Unpolished)',
      '10 Export Benue White Yams',
      '2kg Ground Ogbono Seeds',
      '2kg Dried Bitterleaf & Ugu Flakes',
      '2 Cartons Smoked Goat Meat Flakes'
    ],
    priceUSD: 240,
    priceNGN: 360000,
    image: 'https://images.unsplash.com/photo-1608797178974-15b35a64ede9?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviews: 188,
    shippingTimeDays: '4 - 6 Days Express Air Freight',
    customsCleared: true,
    description: 'US FDA pre-inspected agricultural consignment. Perfect for Diaspora families celebrating traditional gatherings across Texas, Georgia, Maryland, and New York.'
  },
  {
    id: 'diaspora-3',
    title: 'Toronto & Calgary Canadian Comfort Box',
    targetRegion: 'Canada',
    weightKg: 20,
    itemsIncluded: [
      '4kg Yellow Garri (Ogun)',
      '3 Export Yams',
      '1kg Nsukka Yellow Pepper Powder',
      '1kg Kiln Dried Snails',
      '500g Cameroon Pepper'
    ],
    priceUSD: 160,
    priceNGN: 240000,
    image: 'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&w=800&q=80',
    rating: 4.88,
    reviews: 145,
    shippingTimeDays: '5 - 7 Days Air Cargo',
    customsCleared: true,
    description: 'CFIA Canada Compliant packaged box. Guaranteed fresh condition upon delivery.'
  }
];

export const SAMPLE_SHIPMENTS: ShipmentOrder[] = [
  {
    id: 'ship-101',
    trackingNumber: 'NGC-8849-UK',
    itemTitle: '20 Metric Tons Export White Yams & Sesame',
    buyerName: 'AfriGrocery UK Ltd (London)',
    sellerName: 'Danladi Grain & Benue Hub',
    quantity: '20 Metric Tons',
    totalValueNGN: 28500000,
    totalValueCryptoUSDT: 18750,
    currencyPaid: 'USDT',
    paymentStatus: 'Escrow Secured',
    shipmentStatus: 'In Transit - Local Logistics',
    logisticsPartner: 'Kobo360',
    originCity: 'Gboko, Benue State',
    destinationCity: 'Apapa Port Lagos -> London Gateway',
    temperatureCelsius: 14,
    coordinates: { lat: 7.3208, lng: 8.9926 },
    estimatedDelivery: 'Aug 04, 2026',
    timeline: [
      {
        title: 'Escrow Payment Secured',
        description: 'USDT 18,750 locked in smart contract escrow.',
        time: 'Jul 27, 09:30 AM',
        completed: true
      },
      {
        title: 'Phytosanitary & NEPC Quality Inspection',
        description: 'Grade A Export Certificate issued by Nigerian Agricultural Quarantine Service.',
        time: 'Jul 28, 02:15 PM',
        completed: true
      },
      {
        title: 'Kobo360 Cold-Chain Truck Loading',
        description: 'Truck #KB-902 departed Gboko depot heading to Lagos Sea Port.',
        time: 'Jul 29, 06:00 AM',
        completed: true
      },
      {
        title: 'Port Customs Clearance',
        description: 'Container sealing and vessel loading at Apapa Port.',
        time: 'Pending',
        completed: false
      }
    ]
  },
  {
    id: 'ship-102',
    trackingNumber: 'NGC-5521-US',
    itemTitle: 'London Mega Naija Food Box (5 Packs)',
    buyerName: 'Dr. Chidi Nwachukwu (Houston, TX)',
    sellerName: 'Enugu Bio-Agro & Gboko Hub',
    quantity: '125 KG Total',
    totalValueNGN: 1425000,
    totalValueCryptoUSDT: 935,
    currencyPaid: 'USD',
    paymentStatus: 'Funds Released',
    shipmentStatus: 'Air Cargo In-Flight',
    logisticsPartner: 'DHL Aviation',
    originCity: 'Murtala Muhammed Cargo Terminal, Lagos',
    destinationCity: 'George Bush Intercontinental Airport, Houston',
    temperatureCelsius: 20,
    coordinates: { lat: 25.7617, lng: -80.1918 },
    estimatedDelivery: 'Jul 31, 2026',
    timeline: [
      {
        title: 'Order Confirmed & Packed',
        description: 'Customs cleared and vacuum sealed.',
        time: 'Jul 26, 11:00 AM',
        completed: true
      },
      {
        title: 'DHL Cargo Flight #DH-402 Departed Lagos',
        description: 'En-route to Houston Cargo Hub.',
        time: 'Jul 28, 10:45 PM',
        completed: true
      },
      {
        title: 'US Customs Inspection',
        description: 'US USDA/FDA Agricultural clearance.',
        time: 'Estimated Jul 30',
        completed: false
      }
    ]
  }
];

export const INITIAL_INVENTORY: FarmerInventoryItem[] = [
  {
    id: 'inv-1',
    cropOrLivestock: 'Cleaned White Sesame Seeds',
    category: 'Crop',
    locationName: 'Dawanau Silo A, Kano',
    quantity: 18.5,
    unit: 'Tons',
    minThreshold: 5,
    expectedHarvestDate: '2026-10-15',
    estimatedYieldValueNGN: 26825000,
    healthOrQualityStatus: 'Excellent',
    lastSynced: 'Just now (Cached locally)'
  },
  {
    id: 'inv-2',
    cropOrLivestock: 'Sokoto Red Goats',
    category: 'Livestock',
    locationName: 'Kara Ranch 2, Sokoto',
    quantity: 42,
    unit: 'Heads',
    minThreshold: 10,
    estimatedYieldValueNGN: 6930000,
    healthOrQualityStatus: 'Excellent',
    lastSynced: '5 mins ago'
  },
  {
    id: 'inv-3',
    cropOrLivestock: 'Export Grade White Yams',
    category: 'Crop',
    locationName: 'Gboko Storage Barn B, Benue',
    quantity: 1200,
    unit: 'Tubers',
    minThreshold: 300,
    expectedHarvestDate: '2026-08-10',
    estimatedYieldValueNGN: 5760000,
    healthOrQualityStatus: 'Harvest Ready',
    lastSynced: '12 mins ago'
  }
];

export const SAMPLE_NOTIFICATIONS: PriceAlertNotification[] = [
  {
    id: 'notif-1',
    title: '🔥 Price Spike Alert: Sesame Seeds (+5.2%)',
    message: 'Dawanau Market Kano recorded a price surge to ₦1,450,000/Ton due to high Asian export demand.',
    zone: 'North-West',
    produceName: 'White Sesame Seeds',
    priceChangePct: 5.2,
    timestamp: '10 mins ago',
    isRead: false,
    type: 'PRICE_SPIKE'
  },
  {
    id: 'notif-2',
    title: '🚢 Shipment Update: NGC-8849-UK',
    message: 'Your 20 Ton Yam consignment has passed NEPC inspection and is now loaded on Kobo360 cold-chain truck.',
    zone: 'North-Central',
    produceName: 'Export White Yams',
    priceChangePct: 0,
    timestamp: '1 hour ago',
    isRead: false,
    type: 'SHIPMENT_UPDATE'
  },
  {
    id: 'notif-3',
    title: '💰 Escrow Payment Secured',
    message: 'USDT 18,750 escrow received for Order #NGC-8849-UK. Funds will be released upon delivery confirmation.',
    zone: 'South-West',
    produceName: 'Cocoa & Yam Export',
    priceChangePct: 0,
    timestamp: '2 hours ago',
    isRead: true,
    type: 'ESCROW_RELEASE'
  }
];
