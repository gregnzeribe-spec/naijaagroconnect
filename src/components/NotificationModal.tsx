import React from 'react';
import { Bell, Flame, Truck, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { PriceAlertNotification } from '../types';

interface NotificationModalProps {
  notifications: PriceAlertNotification[];
  onClose: () => void;
  onClearNotifications: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  notifications,
  onClose,
  onClearNotifications,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white border border-[#E5E9D3] rounded-3xl max-w-lg w-full p-6 shadow-2xl text-[#2C3327] space-y-4">
        <div className="flex items-center justify-between border-b border-[#E5E9D3] pb-3">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-[#D4A373]" />
            <h3 className="text-lg font-serif font-bold text-[#3A5A40]">Market & Shipment Alerts</h3>
          </div>
          <button onClick={onClose} className="text-[#3A5A40] hover:text-[#2C3327] font-bold p-1">
            ✕
          </button>
        </div>

        <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
          {notifications.length > 0 ? (
            notifications.map((n) => (
              <div
                key={n.id}
                className="bg-[#F8F9F1] p-3.5 rounded-2xl border border-[#E5E9D3] space-y-1"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-[#3A5A40] flex items-center space-x-1">
                    {n.type === 'PRICE_SPIKE' && <Flame className="w-3.5 h-3.5 text-[#D4A373] mr-1" />}
                    {n.type === 'SHIPMENT_UPDATE' && <Truck className="w-3.5 h-3.5 text-[#588157] mr-1" />}
                    {n.type === 'ESCROW_RELEASE' && <ShieldCheck className="w-3.5 h-3.5 text-[#3A5A40] mr-1" />}
                    <span>{n.title}</span>
                  </h4>
                  <span className="text-[10px] text-[#A3B18A] font-semibold">{n.timestamp}</span>
                </div>
                <p className="text-xs text-[#2C3327] leading-relaxed">
                  {n.message}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-[#A3B18A] text-xs">
              No unread notifications at the moment.
            </div>
          )}
        </div>

        <div className="pt-2 flex justify-between items-center text-xs">
          <button
            onClick={onClearNotifications}
            className="text-[#588157] hover:text-[#3A5A40] font-bold"
          >
            Mark All as Read
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#3A5A40] hover:bg-[#588157] text-white font-bold rounded-xl"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
