import React, { useState } from 'react';
import { UserCheck, ShieldCheck, CheckCircle2, Award, Globe, Sparkles } from 'lucide-react';

interface UserVerificationModalProps {
  onClose: () => void;
}

export const UserVerificationModal: React.FC<UserVerificationModalProps> = ({ onClose }) => {
  const [ninNumber, setNinNumber] = useState('');
  const [bvnNumber, setBvnNumber] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white border border-[#E5E9D3] rounded-3xl max-w-lg w-full p-6 shadow-2xl text-[#2C3327] space-y-4">
        <div className="flex items-center justify-between border-b border-[#E5E9D3] pb-3">
          <div className="flex items-center space-x-2">
            <UserCheck className="w-5 h-5 text-[#3A5A40]" />
            <h3 className="text-lg font-serif font-bold text-[#3A5A40]">NIN / BVN Verification Status</h3>
          </div>
          <button onClick={onClose} className="text-[#3A5A40] hover:text-[#2C3327] font-bold p-1">
            ✕
          </button>
        </div>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-[#588157] mx-auto" />
            <h4 className="text-lg font-serif font-bold text-[#3A5A40]">Identity Submitted for NIMC Sync!</h4>
            <p className="text-xs text-[#588157]">
              Your profile has received the Verified Nigerian Producer & Diaspora Badge.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="bg-[#F8F9F1] p-4 rounded-2xl border border-[#E5E9D3] space-y-2">
              <div className="flex items-center space-x-2 text-[#3A5A40] font-bold">
                <ShieldCheck className="w-4 h-4 text-[#588157]" />
                <span>Why Verification Matters:</span>
              </div>
              <p className="text-[#2C3327] leading-relaxed">
                Verified farmers and buyers receive higher trust ratings, priority listing on international diaspora trade packs, and zero-delay escrow payouts.
              </p>
            </div>

            <div>
              <label className="block text-[#3A5A40] font-bold mb-1">
                National Identity Number (NIN - 11 Digits)
              </label>
              <input
                type="text"
                required
                maxLength={11}
                placeholder="23490182741"
                value={ninNumber}
                onChange={(e) => setNinNumber(e.target.value)}
                className="w-full bg-[#F8F9F1] border border-[#D8E2C3] rounded-xl p-2.5 text-[#2C3327] placeholder-[#A3B18A] font-mono focus:outline-none focus:border-[#3A5A40]"
              />
            </div>

            <div>
              <label className="block text-[#3A5A40] font-bold mb-1">
                Bank Verification Number (BVN - 11 Digits)
              </label>
              <input
                type="text"
                required
                maxLength={11}
                placeholder="22198034561"
                value={bvnNumber}
                onChange={(e) => setBvnNumber(e.target.value)}
                className="w-full bg-[#F8F9F1] border border-[#D8E2C3] rounded-xl p-2.5 text-[#2C3327] placeholder-[#A3B18A] font-mono focus:outline-none focus:border-[#3A5A40]"
              />
            </div>

            <div className="pt-2 flex justify-end space-x-2">
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
                Verify Profile Badge
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
