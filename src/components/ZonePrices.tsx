import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Bell, 
  MapPin, 
  Filter, 
  CheckCircle2, 
  Flame, 
  Activity, 
  RefreshCw,
  Search
} from 'lucide-react';
import { ZoneMarketPrice, GeopoliticalZone, CategoryType, CurrencyCode, LanguageCode } from '../types';
import { t } from '../services/languageService';
import { FxRates } from '../services/fxService';

interface ZonePricesProps {
  prices: ZoneMarketPrice[];
  selectedCurrency: CurrencyCode;
  selectedLang: LanguageCode;
  fxRates: FxRates;
  onSetAlert: (produceName: string, zone: GeopoliticalZone) => void;
}

export const ZonePrices: React.FC<ZonePricesProps> = ({
  prices,
  selectedCurrency,
  selectedLang,
  fxRates,
  onSetAlert,
}) => {
  const [selectedZone, setSelectedZone] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [alertSuccessMessage, setAlertSuccessMessage] = useState<string | null>(null);

  const zones: (GeopoliticalZone | 'All')[] = [
    'All',
    'North-West',
    'North-East',
    'North-Central',
    'South-West',
    'South-East',
    'South-South',
  ];

  const categories: (CategoryType | 'All')[] = ['All', 'Crop', 'Livestock', 'Processed'];

  // Conversion rate helper (live NGN -> USD/EUR/GBP rates from /api/fx)
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

  const filteredPrices = prices.filter((p) => {
    const matchesZone = selectedZone === 'All' || p.zone === selectedZone;
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.produceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.primaryMarket.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.zone.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesZone && matchesCategory && matchesSearch;
  });

  const handleAlertClick = (item: ZoneMarketPrice) => {
    onSetAlert(item.produceName, item.zone);
    setAlertSuccessMessage(`Push price alert enabled for ${item.produceName} in ${item.zone}! You will receive real-time notifications.`);
    setTimeout(() => setAlertSuccessMessage(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Ticker Banner */}
      <div className="bg-[#3A5A40] text-white rounded-2xl p-3 shadow-md overflow-hidden border border-[#E5E9D3]">
        <div className="flex items-center space-x-3 text-xs">
          <span className="flex items-center font-bold text-[#3A5A40] bg-[#A3B18A] px-2.5 py-1 rounded-full shrink-0">
            <Activity className="w-3.5 h-3.5 mr-1 animate-spin" />
            LIVE ZONE TICKER
          </span>
          <div className="flex space-x-6 overflow-x-auto scrollbar-none py-1">
            {prices.map((p) => (
              <div key={p.id} className="flex items-center space-x-2 shrink-0 text-white">
                <span className="font-semibold text-[#DAD7CD]">{p.produceName}</span>
                <span className="text-[#A3B18A]">({p.zone})</span>
                <span className="font-mono text-white font-bold">{formatPrice(p.currentPriceNGN, selectedCurrency)}</span>
                <span className={`text-[11px] font-bold flex items-center ${p.priceChange24h >= 0 ? 'text-[#A3B18A]' : 'text-rose-300'}`}>
                  {p.priceChange24h >= 0 ? '+' : ''}{p.priceChange24h}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Header Info & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#E5E9D3] shadow-sm">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-2xl font-serif font-bold text-[#3A5A40] tracking-tight">
              Real-Time Produce & Livestock Zone Pricing
            </h2>
            <span className="bg-[#F0F4E8] text-[#588157] text-xs font-bold px-2.5 py-0.5 rounded-full border border-[#D8E2C3]">
              Updated Live
            </span>
          </div>
          <p className="text-sm text-[#588157] mt-1 max-w-2xl">
            Track daily market demand and wholesale commodity prices across all 6 Nigerian geopolitical zones. Set instant push alerts for price surges.
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button 
            onClick={() => window.location.reload()}
            className="flex items-center space-x-1.5 bg-[#F0F4E8] hover:bg-[#E5E9D3] text-[#3A5A40] text-xs font-bold px-3.5 py-2 rounded-xl border border-[#D8E2C3] transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#588157]" />
            <span>Refresh Rates</span>
          </button>
        </div>
      </div>

      {/* Alert Banner */}
      {alertSuccessMessage && (
        <div className="bg-[#F0F4E8] border border-[#D8E2C3] text-[#3A5A40] px-4 py-3 rounded-2xl shadow-sm flex items-center space-x-3 text-sm animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-[#588157] shrink-0" />
          <p className="font-medium">{alertSuccessMessage}</p>
        </div>
      )}

      {/* Search & Filters */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-white p-4 rounded-3xl border border-[#E5E9D3] shadow-sm">
        {/* Search */}
        <div className="md:col-span-4 relative">
          <Search className="w-4 h-4 text-[#588157] absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search produce, market, or state..."
            className="w-full bg-[#F8F9F1] border border-[#D8E2C3] rounded-xl pl-9 pr-3 py-2 text-xs text-[#2C3327] placeholder-[#A3B18A] focus:outline-none focus:border-[#3A5A40]"
          />
        </div>

        {/* Zone Selector Pills */}
        <div className="md:col-span-8 flex items-center space-x-1.5 overflow-x-auto scrollbar-none py-0.5">
          <span className="text-xs text-[#588157] font-bold mr-1 shrink-0 flex items-center">
            <Filter className="w-3 h-3 mr-1" /> Zone:
          </span>
          {zones.map((z) => (
            <button
              key={z}
              onClick={() => setSelectedZone(z)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedZone === z
                  ? 'bg-[#3A5A40] text-white shadow-sm font-bold'
                  : 'bg-[#F0F4E8] text-[#588157] hover:bg-[#E5E9D3] border border-[#D8E2C3]'
              }`}
            >
              {z}
            </button>
          ))}
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center space-x-2">
        <span className="text-xs text-[#588157] font-semibold">Category:</span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              selectedCategory === cat
                ? 'bg-[#3A5A40] text-white font-bold'
                : 'bg-[#F0F4E8] text-[#588157] hover:bg-[#E5E9D3]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Price Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPrices.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-[#E5E9D3] hover:border-[#3A5A40] rounded-3xl p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#3A5A40] bg-[#F0F4E8] px-2.5 py-1 rounded-full border border-[#D8E2C3]">
                    {item.zone}
                  </span>
                  <h3 className="text-lg font-serif font-bold text-[#3A5A40] mt-2">
                    {item.produceName}
                  </h3>
                </div>

                {/* Demand Badge */}
                <div className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold flex items-center space-x-1 ${
                  item.demandLevel === 'Extreme' 
                    ? 'bg-rose-100 text-rose-800 border border-rose-200' 
                    : item.demandLevel === 'High'
                    ? 'bg-[#D4A373]/20 text-[#D4A373] border border-[#D4A373]/40'
                    : 'bg-[#F0F4E8] text-[#588157] border border-[#D8E2C3]'
                }`}>
                  <Flame className="w-3 h-3" />
                  <span>{item.demandLevel} Demand</span>
                </div>
              </div>

              {/* Location Market */}
              <div className="flex items-center space-x-1 text-xs text-[#588157] mt-2 font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#588157] shrink-0" />
                <span>{item.primaryMarket}</span>
              </div>

              {/* Price & Trend */}
              <div className="mt-4 p-3 bg-[#F8F9F1] rounded-2xl border border-[#E5E9D3] flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-[#A3B18A] uppercase tracking-wide font-bold">
                    Current Rate / {item.unit}
                  </p>
                  <p className="text-xl font-serif font-bold text-[#3A5A40] mt-0.5">
                    {formatPrice(item.currentPriceNGN, selectedCurrency)}
                  </p>
                  {selectedCurrency !== 'NGN' && (
                    <p className="text-[11px] text-[#588157]">
                      (₦{item.currentPriceNGN.toLocaleString()})
                    </p>
                  )}
                </div>

                <div className={`text-right ${item.priceChange24h >= 0 ? 'text-[#588157]' : 'text-rose-600'}`}>
                  <div className="flex items-center justify-end font-bold text-sm">
                    {item.priceChange24h >= 0 ? <TrendingUp className="w-4 h-4 mr-0.5" /> : <TrendingDown className="w-4 h-4 mr-0.5" />}
                    <span>{item.priceChange24h >= 0 ? '+' : ''}{item.priceChange24h}%</span>
                  </div>
                  <span className="text-[10px] text-[#A3B18A] block mt-0.5 font-medium">24h Change</span>
                </div>
              </div>

              {/* Mini Trend Visualizer */}
              <div className="mt-3">
                <p className="text-[10px] text-[#A3B18A] font-bold mb-1">7-Day Trend History</p>
                <div className="flex items-end justify-between h-9 bg-[#F0F4E8] p-1 rounded-xl border border-[#D8E2C3]">
                  {item.historicalTrend.map((pt, idx) => {
                    const minP = Math.min(...item.historicalTrend.map(h => h.price));
                    const maxP = Math.max(...item.historicalTrend.map(h => h.price));
                    const heightPct = maxP === minP ? 50 : Math.max(20, ((pt.price - minP) / (maxP - minP)) * 100);
                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center mx-0.5" title={`${pt.date}: ₦${pt.price.toLocaleString()}`}>
                        <div 
                          className="w-full bg-[#588157] rounded-t transition-all hover:bg-[#3A5A40]" 
                          style={{ height: `${heightPct}%` }}
                        />
                        <span className="text-[8px] text-[#A3B18A] mt-0.5">{pt.date}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer Action */}
            <div className="mt-4 pt-3 border-t border-[#E5E9D3] flex items-center justify-between text-xs">
              <span className="text-[11px] text-[#A3B18A]">
                Updated {item.lastUpdated}
              </span>

              <button
                onClick={() => handleAlertClick(item)}
                className="flex items-center space-x-1.5 bg-[#F0F4E8] hover:bg-[#E5E9D3] text-[#3A5A40] px-3 py-1.5 rounded-xl font-bold transition-colors border border-[#D8E2C3]"
              >
                <Bell className="w-3.5 h-3.5 text-[#D4A373]" />
                <span>Get Push Alert</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
