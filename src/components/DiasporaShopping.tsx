import React from 'react';
import { 
  ShoppingBag, 
  Plane, 
  CheckCircle2, 
  ShieldCheck, 
  Star, 
  Sparkles, 
  Globe, 
  MapPin, 
  ArrowRight,
  PackageCheck
} from 'lucide-react';
import { DiasporaBundle, CurrencyCode, LanguageCode } from '../types';

interface DiasporaShoppingProps {
  bundles: DiasporaBundle[];
  selectedCurrency: CurrencyCode;
  selectedLang: LanguageCode;
  onOrderBundle: (bundle: DiasporaBundle) => void;
}

export const DiasporaShopping: React.FC<DiasporaShoppingProps> = ({
  bundles,
  selectedCurrency,
  selectedLang,
  onOrderBundle,
}) => {
  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-[#3A5A40] p-6 md:p-8 border border-[#E5E9D3] shadow-md text-white">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 bg-[#F0F4E8] text-[#3A5A40] text-xs font-bold px-3 py-1 rounded-full border border-[#D8E2C3]">
            <Globe className="w-4 h-4 text-[#588157]" />
            <span>Diaspora Direct Food Express (UK, USA, Canada & EU)</span>
          </div>

          <h2 className="text-2xl md:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
            Authentic Nigerian Farm Produce Shipped Direct to Your Doorstep Abroad
          </h2>

          <p className="text-sm md:text-base text-[#DAD7CD]">
            Bridging the gap for Nigerians in London, Houston, Toronto, Dublin, and Munich. Enjoy pre-inspected, customs-cleared Benue yams, Ijebu garri, Oron crayfish, and smoked catfish.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            <span className="bg-white/10 text-white text-xs font-semibold px-3 py-1 rounded-full border border-[#A3B18A]/40">
              🇬🇧 UK DEFRA Compliant
            </span>
            <span className="bg-white/10 text-white text-xs font-semibold px-3 py-1 rounded-full border border-[#A3B18A]/40">
              🇺🇸 US FDA/USDA Pre-Cleared
            </span>
            <span className="bg-white/10 text-white text-xs font-semibold px-3 py-1 rounded-full border border-[#A3B18A]/40">
              🇨🇦 CFIA Canada Approved
            </span>
          </div>
        </div>
      </div>

      {/* Bundles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {bundles.map((bundle) => (
          <div
            key={bundle.id}
            className="bg-white border border-[#E5E9D3] hover:border-[#3A5A40] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              {/* Image & Target Tag */}
              <div className="relative h-52 w-full bg-[#F0F4E8] overflow-hidden">
                <img
                  src={bundle.image}
                  alt={bundle.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute top-3 left-3 bg-white/90 text-[#3A5A40] font-bold text-xs px-3 py-1 rounded-full border border-[#D8E2C3] shadow-sm backdrop-blur-md">
                  Target: {bundle.targetRegion}
                </div>

                <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs text-[#2C3327] flex items-center justify-between border border-[#E5E9D3]">
                  <span className="flex items-center text-[#3A5A40] font-semibold">
                    <Plane className="w-3.5 h-3.5 mr-1 text-[#588157]" />
                    {bundle.shippingTimeDays}
                  </span>
                  <span className="font-bold text-[#D4A373]">{bundle.weightKg} KG Net</span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-[#D4A373] text-xs font-bold">
                    <Star className="w-4 h-4 fill-[#D4A373]" />
                    <span>{bundle.rating}</span>
                    <span className="text-[#A3B18A] font-normal">({bundle.reviews} reviews)</span>
                  </div>

                  <span className="text-[11px] bg-[#F0F4E8] text-[#3A5A40] px-2.5 py-0.5 rounded-full font-bold border border-[#D8E2C3]">
                    Customs Cleared
                  </span>
                </div>

                <h3 className="text-lg font-serif font-bold text-[#3A5A40] group-hover:text-[#588157] transition-colors">
                  {bundle.title}
                </h3>

                <p className="text-xs text-[#588157] line-clamp-2">
                  {bundle.description}
                </p>

                {/* Bundle Box Contents List */}
                <div className="bg-[#F8F9F1] p-3 rounded-2xl border border-[#E5E9D3] space-y-1.5">
                  <span className="text-[11px] font-bold text-[#3A5A40] uppercase tracking-wide block">
                    Inside This Export Box:
                  </span>
                  <ul className="text-xs text-[#2C3327] space-y-1">
                    {bundle.itemsIncluded.map((item, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#588157] shrink-0" />
                        <span className="truncate">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pricing Box */}
                <div className="flex items-center justify-between bg-[#F0F4E8] p-3 rounded-2xl border border-[#D8E2C3]">
                  <div>
                    <span className="text-[10px] text-[#A3B18A] uppercase font-bold">
                      Package Price
                    </span>
                    <p className="text-xl font-serif font-bold text-[#3A5A40]">
                      ${bundle.priceUSD} USD
                    </p>
                    <p className="text-[11px] text-[#588157]">
                      (₦{bundle.priceNGN.toLocaleString()})
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-[#A3B18A] uppercase block font-bold">
                      Logistics
                    </span>
                    <span className="text-xs font-bold text-[#2C3327]">
                      Door-to-Door Air Freight
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="p-5 pt-0">
              <button
                onClick={() => onOrderBundle(bundle)}
                className="w-full flex items-center justify-center space-x-2 bg-[#3A5A40] hover:bg-[#588157] text-white font-bold py-2.5 rounded-xl shadow-sm transition-all"
              >
                <PackageCheck className="w-4 h-4 text-[#A3B18A]" />
                <span>Order Bundle via Escrow</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
