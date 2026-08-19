import React, { useState } from 'react';
import { Sprout, Plus, Image as ImageIcon, MapPin, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { ProduceListing, CategoryType, GeopoliticalZone, FarmerProfile } from '../types';
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

interface NewListingModalProps {
  farmers: FarmerProfile[];
  onClose: () => void;
  onAddListing: (listing: ProduceListing) => void;
}

export const NewListingModal: React.FC<NewListingModalProps> = ({
  farmers,
  onClose,
  onAddListing,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<CategoryType>('Crop');
  const [subCategory, setSubCategory] = useState('Grains & Cereals');
  const [zone, setZone] = useState<GeopoliticalZone>('North-West');
  const [state, setState] = useState('Kano');
  const [marketLocation, setMarketLocation] = useState('Dawanau Grain Market, Kano');
  const [priceNGN, setPriceNGN] = useState<number>(150000);
  const [unit, setUnit] = useState('100kg Bag');
  const [minOrderQty, setMinOrderQty] = useState<number>(1);
  const [totalAvailable, setTotalAvailable] = useState<number>(50);
  const [qualityGrade, setQualityGrade] = useState<'Export Grade A' | 'Standard Grade B' | 'Organic Premium'>('Export Grade A');
  const [imageUrl, setImageUrl] = useState('');
  const [presetImage, setPresetImage] = useState(exportWhiteYamsImg);
  const [harvestDate, setHarvestDate] = useState('2026-07-28');
  const [description, setDescription] = useState('');

  const presetImages = [
    { label: 'Benue White Yams', url: exportWhiteYamsImg },
    { label: 'Kano White Sesame', url: 'https://images.unsplash.com/photo-1608797178974-15b35a64ede9?auto=format&fit=crop&w=800&q=80' },
    { label: 'Red Palm Oil', url: pureSpecialPalmOilImg },
    { label: 'Native Ogbono Seeds', url: nativeOgbonoSeedsImg },
    { label: 'Ijebu Garri Flakes', url: ijebuYellowWhiteGarriImg },
    { label: 'Egusi Melon', url: egusiImg },
    { label: 'Red Onions', url: sokotoRedOnionsImg },
    { label: 'Nsukka Yellow Pepper', url: nsukkaYellowPepperImg },
    { label: 'Jos Red Tomatoes', url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80' },
    { label: 'Orange-Fleshed Sweet Potatoes', url: orangeFleshedSweetPotatoesImg },
    { label: 'White Garlic Bulbs', url: 'https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?auto=format&fit=crop&w=800&q=80' },
    { label: 'Large White Pigs', url: largeWhitePigsImg },
    { label: 'Broiler Chickens', url: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80' },
    { label: 'Raw Cashew Nuts', url: rawCashewImg },
    { label: 'Sokoto Cattle & Balami Rams', url: balamiCattleRamsImg },
    { label: 'Sokoto Red Goats', url: sokotoRedGoatsImg },
    { label: 'Fermented Cocoa Beans', url: idanreCocoaImg },
    { label: 'Smoked Catfish (Round Wheel)', url: roundSmokedCatfishImg },
    { label: 'Kaduna Split Dried Ginger', url: splitDriedGingerImg },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const selectedImage = imageUrl.trim() ? imageUrl.trim() : presetImage;

    const newProduce: ProduceListing = {
      id: `prod-new-${Date.now()}`,
      title,
      category,
      subCategory,
      zone,
      state,
      marketLocation,
      priceNGN: Number(priceNGN),
      unit,
      minOrderQty: Number(minOrderQty),
      totalAvailable: Number(totalAvailable),
      qualityGrade,
      images: [selectedImage],
      harvestDate,
      farmer: farmers[0] || {
        id: 'f-user',
        name: 'Verified Farmer User',
        farmName: 'NaijaAgroConnect Certified Farm',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
        phone: '+234 803 000 0000',
        whatsapp: '+2348030000000',
        zone: zone,
        state: state,
        lga: 'Central',
        ninVerified: true,
        bvnVerified: true,
        isExportCertified: true,
        rating: 5.0,
        reviewCount: 1,
        bio: 'Certified farmer producer on naijaagroconnect.com.',
        galleryImages: [selectedImage],
        primaryProducts: [title]
      },
      isExportReady: qualityGrade === 'Export Grade A',
      supportsEscrow: true,
      description: description || `Freshly harvested ${title} sourced directly from ${marketLocation}. High quality produce compliant with market standards.`,
      createdAt: 'Just now'
    };

    onAddListing(newProduce);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white border border-[#E5E9D3] rounded-3xl max-w-xl w-full p-6 shadow-2xl text-[#2C3327] space-y-4 my-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-[#E5E9D3] pb-3">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-[#F0F4E8] rounded-2xl text-[#3A5A40]">
              <Sprout className="w-5 h-5 text-[#588157]" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#3A5A40]">List Produce or Livestock</h3>
          </div>
          <button onClick={onClose} className="text-[#3A5A40] hover:text-[#2C3327] font-bold p-1">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block text-[#3A5A40] font-bold mb-1">Produce or Livestock Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Export White Yams, Sorghum, Sokoto Balami Rams"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#F8F9F1] border border-[#D8E2C3] rounded-xl p-2.5 text-[#2C3327] placeholder-[#A3B18A] focus:outline-none focus:border-[#3A5A40]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[#3A5A40] font-bold mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CategoryType)}
                className="w-full bg-[#F8F9F1] border border-[#D8E2C3] rounded-xl p-2.5 text-[#2C3327]"
              >
                <option value="Crop">Crop Produce</option>
                <option value="Livestock">Livestock</option>
                <option value="Processed">Processed Food</option>
                <option value="Export Bundle">Export Bundle</option>
              </select>
            </div>

            <div>
              <label className="block text-[#3A5A40] font-bold mb-1">Quality Grade</label>
              <select
                value={qualityGrade}
                onChange={(e) => setQualityGrade(e.target.value as any)}
                className="w-full bg-[#F8F9F1] border border-[#D8E2C3] rounded-xl p-2.5 text-[#2C3327]"
              >
                <option value="Export Grade A">Export Grade A (NEPC Standard)</option>
                <option value="Standard Grade B">Standard Grade B (Local Wholesale)</option>
                <option value="Organic Premium">Organic Premium</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[#3A5A40] font-bold mb-1">Geopolitical Zone</label>
              <select
                value={zone}
                onChange={(e) => setZone(e.target.value as GeopoliticalZone)}
                className="w-full bg-[#F8F9F1] border border-[#D8E2C3] rounded-xl p-2.5 text-[#2C3327]"
              >
                <option value="North-West">North-West (Kano, Sokoto, Kaduna...)</option>
                <option value="North-East">North-East (Borno, Gombe, Taraba...)</option>
                <option value="North-Central">North-Central (Benue, Niger, FCT...)</option>
                <option value="South-West">South-West (Lagos, Oyo, Ondo...)</option>
                <option value="South-East">South-East (Enugu, Anambra, Abia...)</option>
                <option value="South-South">South-South (Rivers, Akwa Ibom...)</option>
              </select>
            </div>

            <div>
              <label className="block text-[#3A5A40] font-bold mb-1">Primary Market Location</label>
              <input
                type="text"
                required
                value={marketLocation}
                onChange={(e) => setMarketLocation(e.target.value)}
                className="w-full bg-[#F8F9F1] border border-[#D8E2C3] rounded-xl p-2.5 text-[#2C3327]"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[#3A5A40] font-bold mb-1">Price (NGN)</label>
              <input
                type="number"
                required
                value={priceNGN}
                onChange={(e) => setPriceNGN(Number(e.target.value))}
                className="w-full bg-[#F8F9F1] border border-[#D8E2C3] rounded-xl p-2.5 text-[#2C3327]"
              />
            </div>

            <div>
              <label className="block text-[#3A5A40] font-bold mb-1">Unit</label>
              <input
                type="text"
                required
                placeholder="100kg Bag, Ton, Head"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full bg-[#F8F9F1] border border-[#D8E2C3] rounded-xl p-2.5 text-[#2C3327]"
              />
            </div>

            <div>
              <label className="block text-[#3A5A40] font-bold mb-1">Min Order Qty</label>
              <input
                type="number"
                required
                value={minOrderQty}
                onChange={(e) => setMinOrderQty(Number(e.target.value))}
                className="w-full bg-[#F8F9F1] border border-[#D8E2C3] rounded-xl p-2.5 text-[#2C3327]"
              />
            </div>
          </div>

          {/* Image Picker */}
          <div>
            <label className="block text-[#3A5A40] font-bold mb-1">Produce Image</label>
            <div className="space-y-2">
              <input
                type="url"
                placeholder="Paste Image URL or pick preset below..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full bg-[#F8F9F1] border border-[#D8E2C3] rounded-xl p-2.5 text-[#2C3327] placeholder-[#A3B18A]"
              />

              <span className="text-[10px] text-[#588157] block font-bold">Or Pick Stated Produce Photo Preset:</span>
              <div className="grid grid-cols-3 gap-2">
                {presetImages.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setPresetImage(p.url);
                      setImageUrl('');
                    }}
                    className={`p-1.5 rounded-xl border text-left flex items-center space-x-2 ${
                      presetImage === p.url && !imageUrl ? 'border-[#3A5A40] bg-[#F0F4E8]' : 'border-[#E5E9D3] bg-white'
                    }`}
                  >
                    <img src={p.url} alt="" className="w-8 h-8 rounded-lg object-cover" />
                    <span className="text-[10px] font-bold text-[#3A5A40] truncate">{p.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[#3A5A40] font-bold mb-1">Produce Description</label>
            <textarea
              rows={2}
              placeholder="Describe quality, fumigation status, packaging, moisture level..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#F8F9F1] border border-[#D8E2C3] rounded-xl p-2.5 text-[#2C3327] placeholder-[#A3B18A]"
            />
          </div>

          <div className="pt-3 flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#F0F4E8] text-[#3A5A40] rounded-xl font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#3A5A40] hover:bg-[#588157] text-white font-bold rounded-xl shadow-md transition-colors"
            >
              Publish Produce Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
