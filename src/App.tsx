import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Marketplace } from './components/Marketplace';
import { ZonePrices } from './components/ZonePrices';
import { FarmerInventoryTool } from './components/FarmerInventoryTool';
import { DiasporaShopping } from './components/DiasporaShopping';
import { FarmerSpotlight } from './components/FarmerSpotlight';
import { ShipmentTracker } from './components/ShipmentTracker';
import { AgriAIAssistant } from './components/AgriAIAssistant';
import { Blog } from './components/Blog';
import { EscrowPaymentModal } from './components/EscrowPaymentModal';
import { NewListingModal } from './components/NewListingModal';
import { NotificationModal } from './components/NotificationModal';
import { UserVerificationModal } from './components/UserVerificationModal';
import { AdminPriceUpdateModal } from './components/AdminPriceUpdateModal';
import { AdminBlogModal } from './components/AdminBlogModal';
import { useLiveFxRates } from './services/fxService';

import { 
  ProduceListing, 
  ZoneMarketPrice, 
  FarmerInventoryItem, 
  DiasporaBundle, 
  ShipmentOrder, 
  PriceAlertNotification, 
  LanguageCode, 
  CurrencyCode, 
  GeopoliticalZone 
} from './types';

import { 
  INITIAL_PRODUCE_LISTINGS, 
  ZONE_MARKET_PRICES, 
  INITIAL_INVENTORY, 
  DIASPORA_BUNDLES, 
  INITIAL_FARMERS, 
  SAMPLE_SHIPMENTS, 
  SAMPLE_NOTIFICATIONS 
} from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('marketplace');
  const [selectedLang, setSelectedLang] = useState<LanguageCode>('en');
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>('NGN');
  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(false);
  const fxRates = useLiveFxRates();

  // Core Data States
  const [listings, setListings] = useState<ProduceListing[]>(INITIAL_PRODUCE_LISTINGS);
  const [zonePrices, setZonePrices] = useState<ZoneMarketPrice[]>(ZONE_MARKET_PRICES);
  const [inventory, setInventory] = useState<FarmerInventoryItem[]>(INITIAL_INVENTORY);
  const [diasporaBundles] = useState<DiasporaBundle[]>(DIASPORA_BUNDLES);
  const [farmers] = useState(INITIAL_FARMERS);
  const [shipments, setShipments] = useState<ShipmentOrder[]>(SAMPLE_SHIPMENTS);
  const [notifications, setNotifications] = useState<PriceAlertNotification[]>(SAMPLE_NOTIFICATIONS);

  // Modal States
  const [escrowItem, setEscrowItem] = useState<ProduceListing | DiasporaBundle | null>(null);
  const [newListingModalOpen, setNewListingModalOpen] = useState(false);
  const [notificationsModalOpen, setNotificationsModalOpen] = useState(false);
  const [verificationModalOpen, setVerificationModalOpen] = useState(false);
  const [adminPriceModalOpen, setAdminPriceModalOpen] = useState(false);
  const [adminBlogModalOpen, setAdminBlogModalOpen] = useState(false);

  const unreadNotificationsCount = notifications.filter((n) => !n.isRead).length;

  // Poll the server's live price feed and merge updates into the zone price ticker.
  useEffect(() => {
    const fetchLivePrices = async () => {
      try {
        const res = await fetch('/api/prices');
        if (!res.ok) return;
        const data = await res.json();
        const liveEntries: { zonePriceId?: string; price: number }[] = data.prices || [];
        if (liveEntries.length === 0) return;

        setZonePrices((prev) =>
          prev.map((zp) => {
            const match = liveEntries.find((e) => e.zonePriceId === zp.id);
            if (!match) return zp;
            const priceChange24h = ((match.price - zp.currentPriceNGN) / zp.currentPriceNGN) * 100;
            return {
              ...zp,
              currentPriceNGN: match.price,
              priceChange24h: Number(priceChange24h.toFixed(2)),
              lastUpdated: 'Just now',
              historicalTrend: [
                ...zp.historicalTrend.slice(-6),
                { date: 'Now', price: match.price }
              ]
            };
          })
        );
      } catch {
        // Silently ignore network errors; ticker keeps its last known values.
      }
    };

    fetchLivePrices();
    const interval = setInterval(fetchLivePrices, 15000);
    return () => clearInterval(interval);
  }, []);

  // Detect return from Paystack checkout redirect and finalize the escrow order.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const reference = params.get('reference') || params.get('trxref');
    if (!reference) return;

    const verifyAndFinalize = async () => {
      try {
        const res = await fetch(`/api/pay/verify/${encodeURIComponent(reference)}`);
        const data = await res.json();
        const pendingRaw = localStorage.getItem('ngc_pending_escrow');
        const pending = pendingRaw ? JSON.parse(pendingRaw) : null;

        if (data?.data?.status === 'success' && pending) {
          const newShipment: ShipmentOrder = {
            id: `ship-${Date.now()}`,
            trackingNumber: reference,
            itemTitle: pending.title,
            buyerName: 'Verified Escrow Buyer',
            sellerName: pending.sellerName,
            quantity: pending.quantityLabel,
            totalValueNGN: pending.totalValueNGN,
            totalValueCryptoUSDT: pending.totalValueUSD,
            currencyPaid: 'NGN',
            paymentStatus: 'Escrow Secured',
            shipmentStatus: 'Preparing Harvest',
            logisticsPartner: 'Kobo360',
            originCity: pending.originCity,
            destinationCity: 'Buyer Delivery Address',
            temperatureCelsius: 12,
            coordinates: { lat: 9.0765, lng: 7.3986 },
            estimatedDelivery: '3 - 5 Days',
            timeline: [
              {
                title: 'Escrow Funds Secured (Paystack Verified)',
                description: 'Payment confirmed via Paystack and locked in NaijaAgroConnect Escrow Smart Vault.',
                time: 'Just now',
                completed: true
              },
              {
                title: 'Producer Dispatch Confirmation',
                description: 'Farmer preparing produce batch for logistics pickup.',
                time: 'Pending',
                completed: false
              }
            ]
          };
          setShipments((prev) => [newShipment, ...prev]);
          setActiveTab('shipments');
        }
        localStorage.removeItem('ngc_pending_escrow');
      } catch (error) {
        console.error('Payment verification failed:', error);
      } finally {
        params.delete('reference');
        params.delete('trxref');
        const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`;
        window.history.replaceState({}, '', newUrl);
      }
    };

    verifyAndFinalize();
  }, []);

  const handleAddInventoryItem = (newItem: FarmerInventoryItem) => {
    setInventory((prev) => [newItem, ...prev]);
  };

  const handleAddProduceListing = (newListing: ProduceListing) => {
    setListings((prev) => [newListing, ...prev]);
  };

  const handleSetPriceAlert = (produceName: string, zone: GeopoliticalZone) => {
    const newNotif: PriceAlertNotification = {
      id: `notif-${Date.now()}`,
      title: `🔔 Price Alert Set: ${produceName} (${zone})`,
      message: `You will now receive real-time SMS & push alerts whenever price shifts occur for ${produceName} in ${zone}.`,
      zone,
      produceName,
      priceChangePct: 0,
      timestamp: 'Just now',
      isRead: false,
      type: 'PRICE_SPIKE'
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const handlePaymentSuccess = (orderId: string) => {
    if (!escrowItem) return;

    const isProduce = 'priceNGN' in escrowItem;
    const title = escrowItem.title;

    // Create a new shipment order
    const newShipment: ShipmentOrder = {
      id: `ship-${Date.now()}`,
      trackingNumber: orderId,
      itemTitle: title,
      buyerName: 'Verified Escrow Buyer',
      sellerName: isProduce ? (escrowItem as ProduceListing).farmer.name : 'NaijaAgroConnect Diaspora Hub',
      quantity: isProduce ? `1 ${(escrowItem as ProduceListing).unit}` : '1 Pack Box',
      totalValueNGN: isProduce ? (escrowItem as ProduceListing).priceNGN : (escrowItem as DiasporaBundle).priceNGN,
      totalValueCryptoUSDT: isProduce ? (escrowItem as ProduceListing).priceNGN * fxRates.USD : (escrowItem as DiasporaBundle).priceUSD,
      currencyPaid: selectedCurrency,
      paymentStatus: 'Escrow Secured',
      shipmentStatus: 'Preparing Harvest',
      logisticsPartner: 'Kobo360',
      originCity: isProduce ? (escrowItem as ProduceListing).marketLocation : 'Lagos Cargo Export Depot',
      destinationCity: 'Buyer Delivery Address',
      temperatureCelsius: 12,
      coordinates: { lat: 9.0765, lng: 7.3986 },
      estimatedDelivery: '3 - 5 Days',
      timeline: [
        {
          title: 'Escrow Funds Secured',
          description: 'Payment locked in NaijaAgroConnect Escrow Smart Vault.',
          time: 'Just now',
          completed: true
        },
        {
          title: 'Producer Dispatch Confirmation',
          description: 'Farmer preparing produce batch for logistics pickup.',
          time: 'Pending',
          completed: false
        }
      ]
    };

    setShipments((prev) => [newShipment, ...prev]);
    setEscrowItem(null);
    setActiveTab('shipments');
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-[#2C3327] font-sans selection:bg-[#A3B18A] selection:text-[#3A5A40] flex flex-col">
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedLang={selectedLang}
        setSelectedLang={setSelectedLang}
        selectedCurrency={selectedCurrency}
        setSelectedCurrency={setSelectedCurrency}
        isOfflineMode={isOfflineMode}
        setIsOfflineMode={setIsOfflineMode}
        unreadCount={unreadNotificationsCount}
        onOpenNotifications={() => setNotificationsModalOpen(true)}
        onOpenNewListingModal={() => setNewListingModalOpen(true)}
        onOpenVerificationModal={() => setVerificationModalOpen(true)}
      />

      {/* Main Workspace Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'marketplace' && (
          <Marketplace
            listings={listings}
            selectedCurrency={selectedCurrency}
            selectedLang={selectedLang}
            fxRates={fxRates}
            onSelectListingForEscrow={(item) => setEscrowItem(item)}
            onOpenNewListingModal={() => setNewListingModalOpen(true)}
          />
        )}

        {activeTab === 'prices' && (
          <ZonePrices
            prices={zonePrices}
            selectedCurrency={selectedCurrency}
            selectedLang={selectedLang}
            fxRates={fxRates}
            onSetAlert={handleSetPriceAlert}
          />
        )}

        {activeTab === 'inventory' && (
          <FarmerInventoryTool
            inventory={inventory}
            onAddInventoryItem={handleAddInventoryItem}
            isOfflineMode={isOfflineMode}
            selectedCurrency={selectedCurrency}
          />
        )}

        {activeTab === 'diaspora' && (
          <DiasporaShopping
            bundles={diasporaBundles}
            selectedCurrency={selectedCurrency}
            selectedLang={selectedLang}
            onOrderBundle={(bundle) => setEscrowItem(bundle)}
          />
        )}

        {activeTab === 'spotlight' && (
          <FarmerSpotlight farmers={farmers} />
        )}

        {activeTab === 'shipments' && (
          <ShipmentTracker shipments={shipments} />
        )}

        {activeTab === 'ai-advisory' && (
          <AgriAIAssistant />
        )}

        {activeTab === 'blog' && (
          <Blog />
        )}
      </main>

      {/* Modals */}
      {escrowItem && (
        <EscrowPaymentModal
          item={escrowItem}
          selectedCurrency={selectedCurrency}
          fxRates={fxRates}
          onClose={() => setEscrowItem(null)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

      {newListingModalOpen && (
        <NewListingModal
          farmers={farmers}
          onClose={() => setNewListingModalOpen(false)}
          onAddListing={handleAddProduceListing}
        />
      )}

      {notificationsModalOpen && (
        <NotificationModal
          notifications={notifications}
          onClose={() => setNotificationsModalOpen(false)}
          onClearNotifications={() =>
            setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
          }
        />
      )}

      {verificationModalOpen && (
        <UserVerificationModal onClose={() => setVerificationModalOpen(false)} />
      )}

      {adminPriceModalOpen && (
        <AdminPriceUpdateModal onClose={() => setAdminPriceModalOpen(false)} />
      )}

      {adminBlogModalOpen && (
        <AdminBlogModal onClose={() => setAdminBlogModalOpen(false)} />
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-[#E5E9D3] text-[#588157] py-6 text-xs mt-12 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <p className="font-serif font-bold text-[#3A5A40] text-sm">
              naijaagroconnect.com
            </p>
            <p className="text-[#588157]">
              Cross-border produce & livestock trade network across all 6 Nigerian Geopolitical Zones.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[10px] uppercase tracking-wider font-bold text-[#A3B18A]">
            <span>🔒 Crypto/Fiat Escrow Protected</span>
            <span>🇳🇬 NIN/BVN Identity Synchronized</span>
            <span>✈️ DEFRA / FDA Export Compliant</span>
            <button
              onClick={() => setAdminPriceModalOpen(true)}
              className="normal-case tracking-normal font-medium text-[#A3B18A] hover:text-[#3A5A40] underline underline-offset-2"
            >
              Admin: Update Prices
            </button>
            <button
              onClick={() => setAdminBlogModalOpen(true)}
              className="normal-case tracking-normal font-medium text-[#A3B18A] hover:text-[#3A5A40] underline underline-offset-2"
            >
              Admin: Manage Blog
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
