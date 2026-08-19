import React, { useState } from 'react';
import { 
  UserCheck, 
  ShieldCheck, 
  Star, 
  MapPin, 
  Phone, 
  MessageCircle, 
  Award, 
  CheckCircle2, 
  Sparkles,
  Image as ImageIcon
} from 'lucide-react';
import { FarmerProfile } from '../types';

interface FarmerSpotlightProps {
  farmers: FarmerProfile[];
}

export const FarmerSpotlight: React.FC<FarmerSpotlightProps> = ({ farmers }) => {
  const [selectedFarmer, setSelectedFarmer] = useState<FarmerProfile | null>(null);

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="bg-[#3A5A40] text-white border border-[#E5E9D3] p-6 rounded-3xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-2xl font-serif font-bold text-white tracking-tight">
              Verified Farmer & Livestock Producer Showcase
            </h2>
            <span className="bg-[#F0F4E8] text-[#3A5A40] text-xs font-bold px-3 py-1 rounded-full border border-[#D8E2C3]">
              Direct Producer Trade
            </span>
          </div>
          <p className="text-sm text-[#DAD7CD] mt-1 max-w-2xl">
            Meet Nigeria's top agricultural producers, grain ranch leaders, and livestock breeders across all 6 geopolitical zones. Every featured producer undergoes identity verification (NIN/BVN).
          </p>
        </div>
      </div>

      {/* Farmers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {farmers.map((farmer) => (
          <div
            key={farmer.id}
            className="bg-white border border-[#E5E9D3] hover:border-[#3A5A40] rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-4">
              {/* Header Info */}
              <div className="flex items-start space-x-4">
                <img
                  src={farmer.avatar}
                  alt={farmer.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#588157] shadow-sm shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-1.5">
                    <h3 className="text-lg font-serif font-bold text-[#3A5A40] truncate">{farmer.name}</h3>
                    {farmer.ninVerified && (
                      <ShieldCheck className="w-4 h-4 text-[#588157] shrink-0" title="NIN & BVN Verified" />
                    )}
                  </div>

                  <p className="text-xs text-[#588157] font-semibold">{farmer.farmName}</p>

                  <div className="flex items-center space-x-2 text-xs text-[#A3B18A] mt-1">
                    <span className="flex items-center font-medium">
                      <MapPin className="w-3.5 h-3.5 mr-1 text-[#588157]" />
                      {farmer.lga}, {farmer.state} ({farmer.zone})
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 text-xs mt-1.5">
                    <span className="flex items-center font-bold text-[#D4A373]">
                      <Star className="w-3.5 h-3.5 fill-[#D4A373] mr-1" />
                      {farmer.rating} / 5.0
                    </span>
                    <span className="text-[#A3B18A]">({farmer.reviewCount} rating reviews)</span>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <p className="text-xs text-[#2C3327] leading-relaxed bg-[#F8F9F1] p-3 rounded-2xl border border-[#E5E9D3]">
                "{farmer.bio}"
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 text-[11px]">
                {farmer.ninVerified && (
                  <span className="bg-[#F0F4E8] text-[#3A5A40] font-bold px-3 py-1 rounded-full border border-[#D8E2C3] flex items-center">
                    <CheckCircle2 className="w-3 h-3 text-[#588157] mr-1" /> NIN Verified
                  </span>
                )}
                {farmer.bvnVerified && (
                  <span className="bg-[#F0F4E8] text-[#3A5A40] font-bold px-3 py-1 rounded-full border border-[#D8E2C3] flex items-center">
                    <CheckCircle2 className="w-3 h-3 text-[#588157] mr-1" /> BVN Verified
                  </span>
                )}
                {farmer.isExportCertified && (
                  <span className="bg-[#D4A373]/20 text-[#D4A373] font-extrabold px-3 py-1 rounded-full border border-[#D4A373]/40 flex items-center">
                    <Award className="w-3 h-3 text-[#D4A373] mr-1" /> Export Certified
                  </span>
                )}
              </div>

              {/* Primary Products Tags */}
              <div>
                <span className="text-[10px] text-[#A3B18A] uppercase font-bold block mb-1">
                  Primary Produce & Livestock:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {farmer.primaryProducts.map((p, i) => (
                    <span key={i} className="bg-[#F0F4E8] text-[#3A5A40] text-xs px-3 py-1 rounded-full border border-[#D8E2C3] font-medium">
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              {/* Farm Photo Gallery Preview */}
              {farmer.galleryImages.length > 0 && (
                <div>
                  <span className="text-[10px] text-[#A3B18A] uppercase font-bold block mb-1">
                    Farm Gallery & Stock Footage:
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {farmer.galleryImages.map((img, i) => (
                      <div key={i} className="h-24 rounded-xl overflow-hidden bg-[#F0F4E8]">
                        <img
                          src={img}
                          alt="Farm"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover hover:scale-105 transition-transform"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Bar */}
            <div className="pt-4 mt-4 border-t border-[#E5E9D3] grid grid-cols-2 gap-2 text-xs">
              <a
                href={`tel:${farmer.phone}`}
                className="flex items-center justify-center space-x-1.5 bg-[#F0F4E8] hover:bg-[#E5E9D3] text-[#3A5A40] py-2.5 rounded-xl font-bold border border-[#D8E2C3] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#588157]" />
                <span>Call Producer</span>
              </a>

              <a
                href={`https://wa.me/${farmer.whatsapp}?text=Hello%20${encodeURIComponent(farmer.name)},%20I%20found%20your%20farm%20profile%20on%20naijaagroconnect.com.`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center space-x-1.5 bg-[#3A5A40] hover:bg-[#588157] text-white py-2.5 rounded-xl font-bold shadow-sm transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#A3B18A]" />
                <span>Direct WhatsApp</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
