import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  ShieldCheck, 
  Star, 
  Calendar, 
  CheckCircle2, 
  Plus, 
  ChevronRight,
  Eye,
  Lock,
  Tag,
  Sparkles
} from 'lucide-react';
import { ProduceListing, CategoryType, GeopoliticalZone, CurrencyCode, LanguageCode } from '../types';
import { FxRates } from '../services/fxService';

interface MarketplaceProps {
  listings: ProduceListing[];
  selectedCurrency: CurrencyCode;
  selectedLang: LanguageCode;
  fxRates: FxRates;
  onSelectListingForEscrow: (listing: ProduceListing) => void;
  onOpenNewListingModal: () => void;
}

export const Marketplace: React.FC<MarketplaceProps> = ({
  listings,
  selectedCurrency,
  selectedLang,
  fxRates,
  onSelectListingForEscrow,
  onOpenNewListingModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedZone, setSelectedZone] = useState<string>('All');
  const [exportOnly, setExportOnly] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [detailModalListing, setDetailModalListing] = useState<ProduceListing | null>(null);

  const categories: (CategoryType | 'All')[] = ['All', 'Crop', 'Livestock', 'Processed', 'Export Bundle'];
  const zones: (GeopoliticalZone | 'All')[] = ['All', 'North-West', 'North-East', 'North-Central', 'South-West', 'South-East', 'South-South'];

  // Currency Converter (live NGN -> USD/EUR/GBP rates from /api/fx)
  const formatPrice = (amountNGN: number, currency: CurrencyCode): string => {
    switch (currency) {
      case 'USD':
        return `$${(amountNGN * fxRates.USD).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      case 'EUR':
        return `€${(amountNGN * fxRates.EUR).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      case 'GBP':
        return `£${(amountNGN * fxRates.GBP).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      case 'USDT':
        return `${(amountNGN * fxRates.USD).toFixed(2)} USDT`;
      case 'eNaira':
        return `e₦${amountNGN.toLocaleString()}`;
      case 'NGN':
      default:
        return `₦${amountNGN.toLocaleString()}`;
    }
  };

  const filteredListings = listings.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesZone = selectedZone === 'All' || item.zone === selectedZone;
    const matchesExport = !exportOnly || item.isExportReady;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.subCategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.marketLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.farmer.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesZone && matchesExport && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Banner / Callout */}
      <div className="relative overflow-hidden rounded-3xl bg-[#3A5A40] p-6 md:p-8 border border-[#E5E9D3] shadow-lg text-white">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 bg-[#F0F4E8] text-[#3A5A40] text-xs font-bold px-3 py-1 rounded-full mb-3 border border-[#D8E2C3]">
            <ShieldCheck className="w-4 h-4 text-[#588157]" />
            <span>NIN/BVN Verified Produce & Livestock Hub</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
            Nigerian Agricultural & Livestock Direct Trade
          </h1>
          <p className="text-sm md:text-base text-[#DAD7CD] mt-2">
            Buy verified crops, livestock, and agro-commodities directly from local Nigerian farmers across all 6 geopolitical zones with 100% Escrow Protection in NGN, USD, or Crypto.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenNewListingModal}
              className="flex items-center space-x-2 bg-[#A3B18A] hover:bg-[#588157] text-[#3A5A40] hover:text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-md transition-all transform hover:-translate-y-0.5"
            >
              <Plus className="w-4 h-4" />
              <span>List Your Produce / Livestock</span>
            </button>
            <span className="text-xs text-[#A3B18A] font-medium">
              ⚡ Over 1,200 verified farmers active this week
            </span>
          </div>
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="bg-white p-4 rounded-3xl border border-[#E5E9D3] space-y-3 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Box */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-[#588157] absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search palm oil, ogbono, egusi, onions, pepper, tomatoes, yams, garlic, pigs, chicken..."
              className="w-full bg-[#F8F9F1] border border-[#D8E2C3] rounded-xl pl-10 pr-3 py-2 text-xs text-[#2C3327] placeholder-[#A3B18A] focus:outline-none focus:border-[#3A5A40]"
            />
          </div>

          {/* Zone Selector */}
          <div className="md:col-span-4 flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-[#588157] shrink-0" />
            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className="w-full bg-[#F8F9F1] border border-[#D8E2C3] rounded-xl px-3 py-2 text-xs text-[#2C3327] focus:outline-none focus:border-[#3A5A40]"
            >
              {zones.map((z) => (
                <option key={z} value={z} className="bg-white text-[#2C3327]">
                  {z === 'All' ? 'All 6 Geopolitical Zones' : z}
                </option>
              ))}
            </select>
          </div>

          {/* Export Ready Toggle */}
          <div className="md:col-span-3 flex items-center justify-end">
            <label className="flex items-center space-x-2 text-xs text-[#3A5A40] cursor-pointer bg-[#F0F4E8] px-3 py-2 rounded-xl border border-[#D8E2C3] w-full justify-between">
              <span className="font-semibold flex items-center">
                <Sparkles className="w-3.5 h-3.5 text-[#D4A373] mr-1.5" /> Export Ready
              </span>
              <input
                type="checkbox"
                checked={exportOnly}
                onChange={(e) => setExportOnly(e.target.checked)}
                className="rounded accent-[#3A5A40] w-4 h-4 cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none pt-1">
          <span className="text-xs text-[#588157] font-bold shrink-0">Category:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#3A5A40] text-white shadow-sm'
                  : 'bg-[#F0F4E8] text-[#588157] hover:bg-[#E5E9D3] border border-[#D8E2C3]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-[#E5E9D3] hover:border-[#3A5A40] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              {/* Image & Badges Container */}
              <div className="relative h-48 w-full overflow-hidden bg-[#F0F4E8]">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  <span className="bg-white/90 text-[#3A5A40] text-[10px] font-extrabold px-2.5 py-1 rounded-full backdrop-blur-md border border-[#D8E2C3]">
                    {item.zone}
                  </span>
                  {item.isExportReady && (
                    <span className="bg-[#D4A373] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                      ✈️ Export Grade A
                    </span>
                  )}
                </div>

                <div className="absolute top-3 right-3">
                  <span className="bg-[#3A5A40] text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>

                <div className="absolute bottom-2 left-2 right-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-[11px] text-[#2C3327] flex items-center justify-between border border-[#E5E9D3]">
                  <span className="truncate font-medium">{item.marketLocation}</span>
                  <span className="font-bold text-[#3A5A40] shrink-0 ml-1">Grade: {item.qualityGrade}</span>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-5 space-y-3">
                <h3 className="text-lg font-serif font-bold text-[#3A5A40] line-clamp-1 group-hover:text-[#588157] transition-colors">
                  {item.title}
                </h3>

                {/* Price Display */}
                <div className="bg-[#F8F9F1] p-3 rounded-2xl border border-[#E5E9D3] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#A3B18A] uppercase tracking-wide font-bold">
                      Price / {item.unit}
                    </span>
                    <p className="text-xl font-serif font-bold text-[#3A5A40]">
                      {formatPrice(item.priceNGN, selectedCurrency)}
                    </p>
                    {selectedCurrency !== 'NGN' && (
                      <p className="text-[10px] text-[#588157]">
                        (₦{item.priceNGN.toLocaleString()})
                      </p>
                    )}
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-[#A3B18A] block font-bold">
                      Min Order
                    </span>
                    <span className="text-xs font-bold text-[#2C3327]">
                      {item.minOrderQty} {item.unit}
                    </span>
                  </div>
                </div>

                {/* Farmer Profile Card */}
                <div className="flex items-center space-x-3 pt-2 border-t border-[#E5E9D3]">
                  <img
                    src={item.farmer.avatar}
                    alt={item.farmer.name}
                    referrerPolicy="no-referrer"
                    className="w-9 h-9 rounded-full object-cover border-2 border-[#A3B18A]"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-1">
                      <p className="text-xs font-bold text-[#2C3327] truncate">{item.farmer.name}</p>
                      {item.farmer.ninVerified && (
                        <ShieldCheck className="w-3.5 h-3.5 text-[#588157] shrink-0" title="NIN & BVN Verified Farmer" />
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-[11px] text-[#A3B18A]">
                      <span className="flex items-center text-[#D4A373] font-bold">
                        <Star className="w-3 h-3 fill-[#D4A373] mr-0.5" />
                        {item.farmer.rating}
                      </span>
                      <span>({item.farmer.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-5 pt-0 grid grid-cols-2 gap-2 mt-1">
              <button
                onClick={() => setDetailModalListing(item)}
                className="flex items-center justify-center space-x-1 bg-[#F0F4E8] hover:bg-[#E5E9D3] text-[#3A5A40] text-xs font-bold py-2.5 rounded-xl border border-[#D8E2C3] transition-colors"
              >
                <Eye className="w-3.5 h-3.5 text-[#588157]" />
                <span>Specs</span>
              </button>

              <button
                onClick={() => onSelectListingForEscrow(item)}
                className="flex items-center justify-center space-x-1 bg-[#3A5A40] hover:bg-[#588157] text-white text-xs font-bold py-2.5 rounded-xl shadow-sm transition-all"
              >
                <Lock className="w-3.5 h-3.5 text-[#A3B18A]" />
                <span>Buy via Escrow</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Listing Detail Modal */}
      {detailModalListing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white border border-[#E5E9D3] rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-5 text-[#2C3327] max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs bg-[#F0F4E8] text-[#3A5A40] font-bold px-3 py-1 rounded-full border border-[#D8E2C3]">
                  {detailModalListing.zone} • {detailModalListing.category}
                </span>
                <h2 className="text-2xl font-serif font-bold text-[#3A5A40] mt-2">
                  {detailModalListing.title}
                </h2>
              </div>
              <button
                onClick={() => setDetailModalListing(null)}
                className="text-[#3A5A40] hover:text-[#2C3327] text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="h-64 w-full rounded-2xl overflow-hidden bg-[#F0F4E8] relative">
              <img
                src={detailModalListing.images[0]}
                alt={detailModalListing.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-sm text-[#2C3327] leading-relaxed">
              {detailModalListing.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-[#F8F9F1] p-4 rounded-2xl border border-[#E5E9D3]">
              <div>
                <span className="text-[#A3B18A] block font-bold uppercase text-[10px]">Price / Unit</span>
                <span className="font-serif font-bold text-[#3A5A40] text-base">
                  {formatPrice(detailModalListing.priceNGN, selectedCurrency)} / {detailModalListing.unit}
                </span>
              </div>
              <div>
                <span className="text-[#A3B18A] block font-bold uppercase text-[10px]">Available Quantity</span>
                <span className="font-bold text-[#2C3327] text-base">
                  {detailModalListing.totalAvailable} {detailModalListing.unit}
                </span>
              </div>
              <div>
                <span className="text-[#A3B18A] block font-bold uppercase text-[10px]">Harvest Date</span>
                <span className="font-bold text-[#2C3327] text-base">
                  {detailModalListing.harvestDate}
                </span>
              </div>
              <div>
                <span className="text-[#A3B18A] block font-bold uppercase text-[10px]">Quality Grade</span>
                <span className="font-bold text-[#3A5A40] text-base">
                  {detailModalListing.qualityGrade}
                </span>
              </div>
              <div>
                <span className="text-[#A3B18A] block font-bold uppercase text-[10px]">Escrow Protection</span>
                <span className="font-bold text-[#588157] text-base flex items-center">
                  <ShieldCheck className="w-4 h-4 mr-1 text-[#588157]" /> Guaranteed
                </span>
              </div>
              <div>
                <span className="text-[#A3B18A] block font-bold uppercase text-[10px]">Export Certified</span>
                <span className="font-bold text-[#D4A373] text-base">
                  {detailModalListing.isExportReady ? 'Yes (NEPC Approved)' : 'Local Market'}
                </span>
              </div>
            </div>

            {/* Farmer Direct Connect */}
            <div className="bg-[#F0F4E8] p-4 rounded-2xl border border-[#D8E2C3] flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={detailModalListing.farmer.avatar}
                  alt={detailModalListing.farmer.name}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#588157]"
                />
                <div>
                  <h4 className="font-bold text-[#3A5A40] text-sm">{detailModalListing.farmer.name}</h4>
                  <p className="text-xs text-[#588157]">{detailModalListing.farmer.farmName}</p>
                  <p className="text-[11px] text-[#A3B18A]">NIN & BVN Verified Producer</p>
                </div>
              </div>

              <div className="flex flex-col space-y-1.5">
                <a
                  href={`https://wa.me/${detailModalListing.farmer.whatsapp}?text=Hello%20${encodeURIComponent(detailModalListing.farmer.name)},%20I%20am%20interested%20in%20your%20${encodeURIComponent(detailModalListing.title)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#3A5A40] hover:bg-[#588157] text-white text-xs font-bold px-3 py-2 rounded-xl text-center shadow-sm"
                >
                  WhatsApp Farmer
                </a>
              </div>
            </div>

            <div className="pt-2 flex justify-end space-x-3">
              <button
                onClick={() => setDetailModalListing(null)}
                className="px-4 py-2 bg-[#F0F4E8] hover:bg-[#E5E9D3] text-[#3A5A40] text-xs font-bold rounded-xl"
              >
                Close
              </button>

              <button
                onClick={() => {
                  const listing = detailModalListing;
                  setDetailModalListing(null);
                  onSelectListingForEscrow(listing);
                }}
                className="px-5 py-2.5 bg-[#3A5A40] hover:bg-[#588157] text-white text-xs font-bold rounded-xl shadow-md"
              >
                Proceed to Escrow Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
