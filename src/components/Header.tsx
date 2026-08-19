import React, { useState } from 'react';
import { 
  Sprout, 
  Globe, 
  Bell, 
  Wifi, 
  WifiOff, 
  ShieldCheck, 
  Coins, 
  Menu, 
  X, 
  PlusCircle, 
  Truck, 
  TrendingUp, 
  Package, 
  UserCheck, 
  Sparkles,
  ShoppingBag,
  Newspaper
} from 'lucide-react';
import { LanguageCode, CurrencyCode } from '../types';
import { LANGUAGES, t } from '../services/languageService';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedLang: LanguageCode;
  setSelectedLang: (lang: LanguageCode) => void;
  selectedCurrency: CurrencyCode;
  setSelectedCurrency: (currency: CurrencyCode) => void;
  isOfflineMode: boolean;
  setIsOfflineMode: (offline: boolean) => void;
  unreadCount: number;
  onOpenNotifications: () => void;
  onOpenNewListingModal: () => void;
  onOpenVerificationModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  selectedLang,
  setSelectedLang,
  selectedCurrency,
  setSelectedCurrency,
  isOfflineMode,
  setIsOfflineMode,
  unreadCount,
  onOpenNotifications,
  onOpenNewListingModal,
  onOpenVerificationModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [currencyMenuOpen, setCurrencyMenuOpen] = useState(false);

  const navItems = [
    { id: 'marketplace', label: t('tabMarketplace', selectedLang), icon: Sprout },
    { id: 'prices', label: t('tabZonePrices', selectedLang), icon: TrendingUp },
    { id: 'inventory', label: t('tabInventoryTool', selectedLang), icon: Package },
    { id: 'diaspora', label: t('tabDiaspora', selectedLang), icon: ShoppingBag },
    { id: 'spotlight', label: t('tabSpotlight', selectedLang), icon: UserCheck },
    { id: 'shipments', label: t('tabShipments', selectedLang), icon: Truck },
    { id: 'ai-advisory', label: t('tabAIAssistant', selectedLang), icon: Sparkles },
    { id: 'blog', label: t('tabBlog', selectedLang), icon: Newspaper },
  ];

  const currencies: CurrencyCode[] = ['NGN', 'USD', 'EUR', 'GBP', 'USDT', 'eNaira'];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E5E9D3] text-[#2C3327] shadow-sm">
      {/* Top Utility Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between text-xs border-b border-[#E5E9D3]/80">
        <div className="flex items-center space-x-3 text-[#588157] overflow-x-auto scrollbar-none py-1">
          <span className="flex items-center text-[#3A5A40] font-semibold bg-[#F0F4E8] px-2.5 py-0.5 rounded-full border border-[#D8E2C3] text-[11px] whitespace-nowrap">
            <ShieldCheck className="w-3.5 h-3.5 mr-1 text-[#588157]" />
            {t('escrowProtected', selectedLang)}
          </span>
          <span className="hidden md:inline text-[#A3B18A]">•</span>
          <span className="hidden md:inline text-[#3A5A40] font-medium whitespace-nowrap">
            🇳🇬 All 6 Geopolitical Zones Covered (NW, NE, NC, SW, SE, SS)
          </span>
          <span className="hidden lg:inline text-[#A3B18A]">•</span>
          <span className="hidden lg:inline text-[#3A5A40] font-medium whitespace-nowrap">
            ✈️ Cross-Border & Diaspora Logistics Ready
          </span>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          {/* Offline Mode Sync Toggle */}
          <button
            onClick={() => setIsOfflineMode(!isOfflineMode)}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
              isOfflineMode 
                ? 'bg-[#D4A373]/20 text-[#D4A373] border border-[#D4A373]/40 animate-pulse' 
                : 'bg-[#F0F4E8] text-[#588157] border border-[#D8E2C3] hover:bg-[#E5E9D3]'
            }`}
            title="Toggle offline data syncing for remote farm areas"
          >
            {isOfflineMode ? (
              <>
                <WifiOff className="w-3 h-3 text-[#D4A373]" />
                <span>Offline Sync</span>
              </>
            ) : (
              <>
                <Wifi className="w-3 h-3 text-[#588157]" />
                <span>Online</span>
              </>
            )}
          </button>

          {/* Verification Badge Trigger */}
          <button
            onClick={onOpenVerificationModal}
            className="flex items-center space-x-1 text-[#3A5A40] hover:text-[#2C3327] transition-colors text-[11px] font-medium bg-[#F0F4E8] hover:bg-[#E5E9D3] px-2.5 py-1 rounded-full border border-[#D8E2C3]"
          >
            <UserCheck className="w-3.5 h-3.5 text-[#588157]" />
            <span className="hidden sm:inline">NIN/BVN Status</span>
          </button>

          {/* Currency Dropdown */}
          <div className="relative">
            <button
              onClick={() => setCurrencyMenuOpen(!currencyMenuOpen)}
              className="flex items-center space-x-1 bg-[#F0F4E8] hover:bg-[#E5E9D3] px-2.5 py-1 rounded-full border border-[#D8E2C3] text-[#3A5A40] text-[11px] font-semibold"
            >
              <Coins className="w-3 h-3 text-[#588157]" />
              <span>{selectedCurrency}</span>
            </button>
            {currencyMenuOpen && (
              <div className="absolute right-0 mt-1 w-28 bg-white border border-[#E5E9D3] rounded-2xl shadow-xl py-1 z-50">
                {currencies.map((curr) => (
                  <button
                    key={curr}
                    onClick={() => {
                      setSelectedCurrency(curr);
                      setCurrencyMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs hover:bg-[#F0F4E8] transition-colors flex items-center justify-between ${
                      selectedCurrency === curr ? 'text-[#3A5A40] font-bold bg-[#F0F4E8]' : 'text-[#2C3327]'
                    }`}
                  >
                    <span>{curr}</span>
                    {selectedCurrency === curr && <span className="text-[10px] text-[#588157]">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center space-x-1 bg-[#F0F4E8] hover:bg-[#E5E9D3] px-2.5 py-1 rounded-full border border-[#D8E2C3] text-[#3A5A40] text-[11px] font-medium"
            >
              <Globe className="w-3.5 h-3.5 text-[#588157]" />
              <span className="uppercase">{selectedLang}</span>
            </button>
            {langMenuOpen && (
              <div className="absolute right-0 mt-1 w-44 bg-white border border-[#E5E9D3] rounded-2xl shadow-xl py-1 z-50">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLang(lang.code);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs hover:bg-[#F0F4E8] transition-colors flex items-center space-x-2 ${
                      selectedLang === lang.code ? 'text-[#3A5A40] font-bold bg-[#F0F4E8]' : 'text-[#2C3327]'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.nativeName}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications Bell */}
          <button
            onClick={onOpenNotifications}
            className="relative p-1.5 text-[#588157] hover:text-[#3A5A40] transition-colors"
            title="Market Price & Shipment Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#D4A373] text-white font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-bounce shadow">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('marketplace')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#3A5A40] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <Sprout className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-serif font-bold text-2xl tracking-tight text-[#3A5A40]">
                naijaagroconnect<span className="text-[#A3B18A]">.com</span>
              </span>
            </div>
            <p className="text-[11px] text-[#588157] hidden sm:block font-medium">
              Produce, Livestock & Diaspora Trade Network
            </p>
          </div>
        </div>

        {/* Desktop Nav Tabs */}
        <nav className="hidden lg:flex items-center space-x-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#3A5A40] text-white shadow-sm'
                    : 'text-[#588157] hover:text-[#3A5A40] hover:bg-[#F0F4E8]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#A3B18A]' : 'text-[#588157]'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center space-x-3">
          <button
            onClick={onOpenNewListingModal}
            className="flex items-center space-x-2 bg-[#A3B18A] hover:bg-[#588157] text-[#3A5A40] hover:text-white font-bold px-4 py-2 rounded-xl text-xs shadow-sm transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>List Produce / Livestock</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-[#3A5A40] hover:bg-[#F0F4E8]"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-[#E5E9D3] px-4 py-4 space-y-2 shadow-lg">
          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center space-x-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium ${
                    isActive
                      ? 'bg-[#3A5A40] text-white font-bold'
                      : 'text-[#3A5A40] hover:bg-[#F0F4E8]'
                  }`}
                >
                  <Icon className="w-4 h-4 text-[#A3B18A]" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#E5E9D3]">
            <button
              onClick={() => {
                onOpenNewListingModal();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center space-x-2 bg-[#3A5A40] text-white font-bold py-2.5 rounded-xl text-sm shadow-md"
            >
              <PlusCircle className="w-4 h-4 text-[#A3B18A]" />
              <span>List Produce or Livestock</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
