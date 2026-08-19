import React, { useState } from 'react';
import { 
  Package, 
  Plus, 
  Wifi, 
  WifiOff, 
  AlertTriangle, 
  TrendingUp, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Sparkles,
  BarChart3,
  Layers
} from 'lucide-react';
import { FarmerInventoryItem, CurrencyCode, LanguageCode } from '../types';

interface FarmerInventoryToolProps {
  inventory: FarmerInventoryItem[];
  onAddInventoryItem: (item: FarmerInventoryItem) => void;
  isOfflineMode: boolean;
  selectedCurrency: CurrencyCode;
}

export const FarmerInventoryTool: React.FC<FarmerInventoryToolProps> = ({
  inventory,
  onAddInventoryItem,
  isOfflineMode,
  selectedCurrency,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    cropOrLivestock: '',
    category: 'Crop' as 'Crop' | 'Livestock',
    locationName: '',
    quantity: 10,
    unit: 'Tons',
    minThreshold: 5,
    expectedHarvestDate: '2026-09-15',
    estimatedYieldValueNGN: 5000000,
    healthOrQualityStatus: 'Excellent' as 'Excellent' | 'Good' | 'Needs Attention' | 'Harvest Ready',
  });

  const totalValueNGN = inventory.reduce((sum, item) => sum + item.estimatedYieldValueNGN, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.cropOrLivestock || !formData.locationName) return;

    const newItem: FarmerInventoryItem = {
      id: `inv-${Date.now()}`,
      cropOrLivestock: formData.cropOrLivestock,
      category: formData.category,
      locationName: formData.locationName,
      quantity: Number(formData.quantity),
      unit: formData.unit,
      minThreshold: Number(formData.minThreshold),
      expectedHarvestDate: formData.expectedHarvestDate,
      estimatedYieldValueNGN: Number(formData.estimatedYieldValueNGN),
      healthOrQualityStatus: formData.healthOrQualityStatus,
      lastSynced: isOfflineMode ? 'Saved to Offline Device Cache' : 'Just now (Cloud Synced)',
    };

    onAddInventoryItem(newItem);
    setShowAddModal(false);
    setFormData({
      cropOrLivestock: '',
      category: 'Crop',
      locationName: '',
      quantity: 10,
      unit: 'Tons',
      minThreshold: 5,
      expectedHarvestDate: '2026-09-15',
      estimatedYieldValueNGN: 5000000,
      healthOrQualityStatus: 'Excellent',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Stat Board */}
      <div className="bg-[#3A5A40] border border-[#E5E9D3] rounded-3xl p-6 shadow-md space-y-4 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-[#F0F4E8] text-[#3A5A40] text-xs font-bold px-3 py-1 rounded-full border border-[#D8E2C3]">
                Automated Farm Engine
              </span>
              {isOfflineMode ? (
                <span className="bg-[#D4A373]/20 text-[#D4A373] text-xs font-semibold px-3 py-1 rounded-full border border-[#D4A373]/40 flex items-center">
                  <WifiOff className="w-3 h-3 mr-1" /> Remote Offline Storage Active
                </span>
              ) : (
                <span className="bg-[#F0F4E8] text-[#3A5A40] text-xs font-semibold px-3 py-1 rounded-full border border-[#D8E2C3] flex items-center">
                  <Wifi className="w-3 h-3 mr-1" /> Cloud Real-Time Sync
                </span>
              )}
            </div>

            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-tight mt-2">
              Farmer Inventory & Yield Optimization Tool
            </h2>
            <p className="text-sm text-[#DAD7CD] mt-1 max-w-2xl">
              Track multi-location farm stock levels, monitor crop harvest dates, prevent post-harvest losses, and auto-sync offline data when returning to network range.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 bg-[#A3B18A] hover:bg-[#588157] text-[#3A5A40] hover:text-white font-bold px-4 py-2.5 rounded-xl shadow-md transition-all shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Stock / Harvest Batch</span>
          </button>
        </div>

        {/* Overview Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-[#A3B18A]/30">
            <span className="text-xs text-[#A3B18A] uppercase font-bold tracking-wide">
              Total Farm Portfolio Value
            </span>
            <p className="text-2xl font-serif font-bold text-white mt-1">
              ₦{totalValueNGN.toLocaleString()}
            </p>
            <span className="text-[11px] text-[#DAD7CD]">Across {inventory.length} farm locations</span>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-[#A3B18A]/30">
            <span className="text-xs text-[#A3B18A] uppercase font-bold tracking-wide">
              Active Stock Batches
            </span>
            <p className="text-2xl font-serif font-bold text-[#A3B18A] mt-1">
              {inventory.length} Items
            </p>
            <span className="text-[11px] text-[#DAD7CD]">Crops & Livestock tracked</span>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-[#A3B18A]/30">
            <span className="text-xs text-[#A3B18A] uppercase font-bold tracking-wide">
              Yield Health Status
            </span>
            <p className="text-2xl font-serif font-bold text-[#A3B18A] mt-1">
              98.4% Optimal
            </p>
            <span className="text-[11px] text-[#DAD7CD]">Low spoilage vulnerability</span>
          </div>
        </div>
      </div>

      {/* Yield Optimization Advisory */}
      <div className="bg-[#F0F4E8] p-4 rounded-2xl border border-[#D8E2C3] flex items-start space-x-3 text-xs text-[#2C3327]">
        <Sparkles className="w-5 h-5 text-[#D4A373] shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-[#3A5A40] text-sm">Automated Yield Tip:</h4>
          <p className="mt-0.5 text-[#588157]">
            To prevent moisture build-up in Kano Sorghum & Sesame silos, maintain grain moisture content below 7.5%. In Benue yam storage, ensure well-ventilated bamboo racks to extend tuber shelf-life up to 5 months.
          </p>
        </div>
      </div>

      {/* Inventory Items List */}
      <div className="bg-white border border-[#E5E9D3] rounded-3xl overflow-hidden shadow-sm">
        <div className="p-4 bg-[#F8F9F1] border-b border-[#E5E9D3] flex items-center justify-between">
          <h3 className="font-bold text-[#3A5A40] text-sm flex items-center space-x-2">
            <Layers className="w-4 h-4 text-[#588157]" />
            <span>Tracked Farm Inventory Locations</span>
          </h3>
          <span className="text-xs text-[#588157] font-semibold">
            {inventory.length} Stock Records
          </span>
        </div>

        <div className="divide-y divide-[#E5E9D3]">
          {inventory.map((item) => {
            const isLowStock = item.quantity <= item.minThreshold;
            return (
              <div key={item.id} className="p-5 hover:bg-[#F8F9F1] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="bg-[#F0F4E8] text-[#3A5A40] text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-[#D8E2C3]">
                      {item.category}
                    </span>
                    <h4 className="font-serif font-bold text-[#3A5A40] text-base">
                      {item.cropOrLivestock}
                    </h4>
                    {isLowStock && (
                      <span className="bg-rose-100 text-rose-800 border border-rose-200 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center">
                        <AlertTriangle className="w-3 h-3 mr-1 text-rose-600" /> Low Stock Warning
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#588157]">
                    <span className="flex items-center">
                      <MapPin className="w-3.5 h-3.5 text-[#588157] mr-1" />
                      {item.locationName}
                    </span>
                    {item.expectedHarvestDate && (
                      <span className="flex items-center">
                        <Calendar className="w-3.5 h-3.5 text-[#588157] mr-1" />
                        Target Harvest: {item.expectedHarvestDate}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-6 text-right">
                  <div>
                    <span className="text-[10px] text-[#A3B18A] uppercase block font-bold">
                      Current Quantity
                    </span>
                    <span className="font-serif font-bold text-[#3A5A40] text-lg">
                      {item.quantity} {item.unit}
                    </span>
                    <span className="text-[10px] text-[#A3B18A] block font-medium">
                      Min Alert Threshold: {item.minThreshold} {item.unit}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-[#A3B18A] uppercase block font-bold">
                      Est. Market Value
                    </span>
                    <span className="font-serif font-bold text-[#3A5A40] text-base">
                      ₦{item.estimatedYieldValueNGN.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-[#588157] block font-medium">
                      {item.lastSynced}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white border border-[#E5E9D3] rounded-3xl max-w-lg w-full p-6 shadow-2xl text-[#2C3327] space-y-4">
            <div className="flex items-center justify-between border-b border-[#E5E9D3] pb-3">
              <h3 className="text-lg font-serif font-bold text-[#3A5A40]">Add Farm Stock / Harvest Batch</h3>
              <button onClick={() => setShowAddModal(false)} className="text-[#3A5A40] hover:text-[#2C3327]">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#3A5A40] font-bold mb-1">Crop or Livestock Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Benue White Yams, Sorghum, Cattle"
                  value={formData.cropOrLivestock}
                  onChange={(e) => setFormData({ ...formData, cropOrLivestock: e.target.value })}
                  className="w-full bg-[#F8F9F1] border border-[#D8E2C3] rounded-xl p-2.5 text-[#2C3327] placeholder-[#A3B18A] focus:outline-none focus:border-[#3A5A40]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#3A5A40] font-bold mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full bg-[#F8F9F1] border border-[#D8E2C3] rounded-xl p-2.5 text-[#2C3327]"
                  >
                    <option value="Crop">Crop Produce</option>
                    <option value="Livestock">Livestock</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#3A5A40] font-bold mb-1">Farm Storage Location</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Zaria Silo B, Sokoto Ranch 1"
                    value={formData.locationName}
                    onChange={(e) => setFormData({ ...formData, locationName: e.target.value })}
                    className="w-full bg-[#F8F9F1] border border-[#D8E2C3] rounded-xl p-2.5 text-[#2C3327]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[#3A5A40] font-bold mb-1">Quantity</label>
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                    className="w-full bg-[#F8F9F1] border border-[#D8E2C3] rounded-xl p-2.5 text-[#2C3327]"
                  />
                </div>

                <div>
                  <label className="block text-[#3A5A40] font-bold mb-1">Unit</label>
                  <input
                    type="text"
                    placeholder="Tons, Bags, Heads"
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full bg-[#F8F9F1] border border-[#D8E2C3] rounded-xl p-2.5 text-[#2C3327]"
                  />
                </div>

                <div>
                  <label className="block text-[#3A5A40] font-bold mb-1">Min Threshold</label>
                  <input
                    type="number"
                    value={formData.minThreshold}
                    onChange={(e) => setFormData({ ...formData, minThreshold: Number(e.target.value) })}
                    className="w-full bg-[#F8F9F1] border border-[#D8E2C3] rounded-xl p-2.5 text-[#2C3327]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#3A5A40] font-bold mb-1">Est. Value (NGN)</label>
                <input
                  type="number"
                  value={formData.estimatedYieldValueNGN}
                  onChange={(e) => setFormData({ ...formData, estimatedYieldValueNGN: Number(e.target.value) })}
                  className="w-full bg-[#F8F9F1] border border-[#D8E2C3] rounded-xl p-2.5 text-[#2C3327]"
                />
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-[#F0F4E8] text-[#3A5A40] rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#3A5A40] hover:bg-[#588157] text-white font-bold rounded-xl shadow-md"
                >
                  Save Stock Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
