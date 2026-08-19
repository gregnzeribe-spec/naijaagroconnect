import React, { useState } from 'react';
import { 
  Truck, 
  Search, 
  MapPin, 
  Thermometer, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Plane, 
  Anchor, 
  ArrowRight,
  Package
} from 'lucide-react';
import { ShipmentOrder } from '../types';

interface ShipmentTrackerProps {
  shipments: ShipmentOrder[];
}

export const ShipmentTracker: React.FC<ShipmentTrackerProps> = ({ shipments }) => {
  const [searchTrackingNum, setSearchTrackingNum] = useState('');
  const [activeShipmentId, setActiveShipmentId] = useState<string>(shipments[0]?.id || '');

  const activeShipment = shipments.find((s) => s.id === activeShipmentId) || shipments[0];

  const filteredShipments = shipments.filter(s => 
    s.trackingNumber.toLowerCase().includes(searchTrackingNum.toLowerCase()) ||
    s.buyerName.toLowerCase().includes(searchTrackingNum.toLowerCase()) ||
    s.itemTitle.toLowerCase().includes(searchTrackingNum.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="bg-[#3A5A40] text-white border border-[#E5E9D3] p-6 rounded-3xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-2xl font-serif font-bold text-white tracking-tight">
              Real-Time Produce & Livestock Shipment Tracking
            </h2>
            <span className="bg-[#F0F4E8] text-[#3A5A40] text-xs font-bold px-3 py-1 rounded-full border border-[#D8E2C3]">
              Live Cold-Chain GPS
            </span>
          </div>
          <p className="text-sm text-[#DAD7CD] mt-1 max-w-2xl">
            Track nationwide truck freight and cross-border air/sea cargo. Monitor cold chain temperatures, customs clearance, and escrow payment release milestones.
          </p>
        </div>

        <div className="relative shrink-0">
          <Search className="w-4 h-4 text-[#A3B18A] absolute left-3 top-3" />
          <input
            type="text"
            value={searchTrackingNum}
            onChange={(e) => setSearchTrackingNum(e.target.value)}
            placeholder="Enter tracking number (e.g. NGC-8849-UK)..."
            className="bg-white/10 border border-[#A3B18A]/40 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-[#DAD7CD] focus:outline-none focus:border-white w-64"
          />
        </div>
      </div>

      {activeShipment ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Active Tracking Detail Board */}
          <div className="lg:col-span-8 bg-white border border-[#E5E9D3] rounded-3xl p-6 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E5E9D3] pb-4">
              <div>
                <span className="text-xs font-bold text-[#A3B18A] uppercase tracking-widest block">
                  Tracking #: {activeShipment.trackingNumber}
                </span>
                <h3 className="text-xl font-serif font-bold text-[#3A5A40] mt-0.5">
                  {activeShipment.itemTitle}
                </h3>
              </div>

              <div className="flex flex-col items-end">
                <span className="bg-[#F0F4E8] text-[#3A5A40] text-xs font-bold px-3 py-1 rounded-full border border-[#D8E2C3]">
                  {activeShipment.shipmentStatus}
                </span>
                <span className="text-[11px] text-[#588157] font-semibold mt-1">
                  Partner: {activeShipment.logisticsPartner}
                </span>
              </div>
            </div>

            {/* Route Summary */}
            <div className="bg-[#F8F9F1] p-4 rounded-2xl border border-[#E5E9D3] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-[#F0F4E8] rounded-xl text-[#3A5A40]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-[#A3B18A] uppercase block font-bold">Origin</span>
                  <span className="font-serif font-bold text-[#3A5A40] text-sm">{activeShipment.originCity}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-[#588157]">
                <div className="h-0.5 w-12 bg-[#D8E2C3]"></div>
                <Truck className="w-5 h-5 animate-pulse text-[#3A5A40]" />
                <div className="h-0.5 w-12 bg-[#D8E2C3]"></div>
              </div>

              <div className="flex items-center space-x-3 text-right">
                <div>
                  <span className="text-[10px] text-[#A3B18A] uppercase block font-bold">Destination</span>
                  <span className="font-serif font-bold text-[#3A5A40] text-sm">{activeShipment.destinationCity}</span>
                </div>
                <div className="p-2.5 bg-[#F0F4E8] rounded-xl text-[#3A5A40]">
                  <Plane className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-[#F0F4E8] p-4 rounded-2xl border border-[#D8E2C3]">
              <div>
                <span className="text-[#588157] block font-semibold">Quantity</span>
                <span className="font-bold text-[#3A5A40] text-sm">{activeShipment.quantity}</span>
              </div>

              <div>
                <span className="text-[#588157] block font-semibold">Escrow Status</span>
                <span className="font-bold text-[#3A5A40] text-sm">{activeShipment.paymentStatus}</span>
              </div>

              <div>
                <span className="text-[#588157] block font-semibold">Est. Delivery</span>
                <span className="font-bold text-[#D4A373] text-sm">{activeShipment.estimatedDelivery}</span>
              </div>

              <div>
                <span className="text-[#588157] block font-semibold flex items-center">
                  <Thermometer className="w-3.5 h-3.5 mr-1 text-[#588157]" /> Cold Chain Temp
                </span>
                <span className="font-bold text-[#3A5A40] text-sm">
                  {activeShipment.temperatureCelsius ? `${activeShipment.temperatureCelsius}°C` : 'N/A'}
                </span>
              </div>
            </div>

            {/* Timeline Milestones */}
            <div>
              <h4 className="font-serif font-bold text-[#3A5A40] text-sm mb-4">Milestone Progress Timeline</h4>
              <div className="space-y-4 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-[#D8E2C3]">
                {activeShipment.timeline.map((event, idx) => (
                  <div key={idx} className="flex items-start space-x-4 relative z-10">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                      event.completed 
                        ? 'bg-[#3A5A40] text-white shadow-sm' 
                        : 'bg-[#F0F4E8] text-[#588157] border border-[#D8E2C3]'
                    }`}>
                      {event.completed ? '✓' : idx + 1}
                    </div>

                    <div className="bg-[#F8F9F1] p-3.5 rounded-2xl border border-[#E5E9D3] flex-1">
                      <div className="flex items-center justify-between">
                        <h5 className={`font-bold text-xs ${event.completed ? 'text-[#3A5A40]' : 'text-[#A3B18A]'}`}>
                          {event.title}
                        </h5>
                        <span className="text-[10px] text-[#588157] font-semibold">{event.time}</span>
                      </div>
                      <p className="text-[11px] text-[#2C3327] mt-1">
                        {event.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* All Shipments List Selector */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-sm font-bold text-[#3A5A40] uppercase tracking-wide">
              Active Consignments ({filteredShipments.length})
            </h3>

            <div className="space-y-3">
              {filteredShipments.map((shipment) => (
                <button
                  key={shipment.id}
                  onClick={() => setActiveShipmentId(shipment.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all ${
                    activeShipment.id === shipment.id
                      ? 'bg-[#F0F4E8] border-[#3A5A40] shadow-sm'
                      : 'bg-white border-[#E5E9D3] hover:bg-[#F8F9F1]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#3A5A40]">{shipment.trackingNumber}</span>
                    <span className="bg-[#E5E9D3] text-[#3A5A40] px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                      {shipment.logisticsPartner}
                    </span>
                  </div>

                  <p className="text-xs text-[#2C3327] font-semibold mt-1 truncate">
                    {shipment.itemTitle}
                  </p>

                  <p className="text-[11px] text-[#588157] mt-1">
                    Buyer: {shipment.buyerName}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-[#588157]">
          No active shipments found matching your query.
        </div>
      )}
    </div>
  );
};
