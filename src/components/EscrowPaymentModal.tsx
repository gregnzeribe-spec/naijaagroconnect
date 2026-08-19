import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Coins, 
  CreditCard, 
  QrCode, 
  CheckCircle2, 
  ArrowRight, 
  AlertCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import { ProduceListing, DiasporaBundle, CurrencyCode } from '../types';
import { FxRates } from '../services/fxService';

interface EscrowPaymentModalProps {
  item: ProduceListing | DiasporaBundle | null;
  selectedCurrency: CurrencyCode;
  fxRates: FxRates;
  onClose: () => void;
  onPaymentSuccess: (orderId: string) => void;
}

export const EscrowPaymentModal: React.FC<EscrowPaymentModalProps> = ({
  item,
  selectedCurrency,
  fxRates,
  onClose,
  onPaymentSuccess,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'crypto' | 'fiat'>('crypto');
  const [cryptoAsset, setCryptoAsset] = useState<'USDT' | 'eNaira' | 'BTC'>('USDT');
  const [fiatProvider, setFiatProvider] = useState<'Paystack' | 'Flutterwave' | 'BankTransfer'>('Paystack');
  const [quantity, setQuantity] = useState<number>(1);
  const [step, setStep] = useState<'details' | 'paying' | 'confirmed'>('details');
  const [email, setEmail] = useState<string>('');
  const [payError, setPayError] = useState<string | null>(null);

  if (!item) return null;

  const isProduce = 'priceNGN' in item;
  const unitPriceNGN = isProduce ? (item as ProduceListing).priceNGN : (item as DiasporaBundle).priceNGN;
  const unitPriceUSD = isProduce ? (item as ProduceListing).priceNGN * fxRates.USD : (item as DiasporaBundle).priceUSD;
  
  const totalPriceNGN = unitPriceNGN * quantity;
  const totalPriceUSD = unitPriceUSD * quantity;
  const totalPriceUSDT = totalPriceUSD;

  const handleSimulatePayment = () => {
    setStep('paying');
    setTimeout(() => {
      setStep('confirmed');
      const generatedOrderId = `NGC-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
      setTimeout(() => {
        onPaymentSuccess(generatedOrderId);
      }, 1800);
    }, 2000);
  };

  const handlePaystackPayment = async () => {
    if (!email || !email.includes('@')) {
      setPayError('Please enter a valid email address to receive your Paystack receipt.');
      return;
    }
    setPayError(null);
    setStep('paying');

    try {
      const isProduceItem = 'priceNGN' in item;
      localStorage.setItem(
        'ngc_pending_escrow',
        JSON.stringify({
          title: item.title,
          sellerName: isProduceItem ? (item as ProduceListing).farmer.name : 'NaijaAgroConnect Diaspora Hub',
          quantityLabel: isProduceItem ? `${quantity} ${(item as ProduceListing).unit}` : `${quantity} Pack Box`,
          totalValueNGN: totalPriceNGN,
          totalValueUSD: totalPriceUSD,
          originCity: isProduceItem ? (item as ProduceListing).marketLocation : 'Lagos Cargo Export Depot',
        })
      );

      const response = await fetch('/api/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: totalPriceNGN,
          email,
          callback_url: window.location.origin + window.location.pathname
        })
      });

      const data = await response.json();
      const authorizationUrl = data?.data?.authorization_url;

      if (!authorizationUrl) {
        throw new Error(data?.error || 'Failed to initialize Paystack checkout.');
      }

      window.location.href = authorizationUrl;
    } catch (error: any) {
      localStorage.removeItem('ngc_pending_escrow');
      setStep('details');
      setPayError(error?.message || 'Unable to start Paystack checkout. Please try again.');
    }
  };

  const handleConfirmPayment = () => {
    if (paymentMethod === 'fiat' && fiatProvider === 'Paystack') {
      handlePaystackPayment();
    } else {
      handleSimulatePayment();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white border border-[#E5E9D3] rounded-3xl max-w-xl w-full p-6 shadow-2xl text-[#2C3327] space-y-5 my-8">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#E5E9D3] pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-[#F0F4E8] rounded-2xl text-[#3A5A40]">
              <ShieldCheck className="w-6 h-6 text-[#588157]" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-[#3A5A40]">
                NaijaAgroConnect Escrow Payment
              </h3>
              <p className="text-xs text-[#588157] font-medium">
                100% Buyer & Farmer Funds Protection Vault
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-[#3A5A40] hover:text-[#2C3327] font-bold p-1">
            ✕
          </button>
        </div>

        {step === 'details' && (
          <div className="space-y-4 text-xs">
            {/* Order Summary Item Box */}
            <div className="bg-[#F8F9F1] p-4 rounded-2xl border border-[#E5E9D3] space-y-2">
              <span className="text-[10px] text-[#A3B18A] uppercase font-bold tracking-wider">
                Order Summary
              </span>
              <div className="flex items-center justify-between">
                <h4 className="font-serif font-bold text-[#3A5A40] text-base truncate max-w-xs">
                  {item.title}
                </h4>
                <span className="bg-[#F0F4E8] text-[#3A5A40] px-3 py-1 rounded-full text-xs font-bold border border-[#D8E2C3]">
                  Escrow Locked
                </span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#E5E9D3] text-xs">
                <span className="text-[#588157] font-medium">Quantity / Units:</span>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-6 h-6 bg-[#F0F4E8] border border-[#D8E2C3] rounded font-bold text-[#3A5A40]"
                  >
                    -
                  </button>
                  <span className="font-bold text-[#3A5A40] text-sm">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-6 h-6 bg-[#F0F4E8] border border-[#D8E2C3] rounded font-bold text-[#3A5A40]"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-semibold pt-1">
                <span className="text-[#588157]">Total Escrow Amount:</span>
                <span className="text-lg font-serif font-bold text-[#3A5A40]">
                  ₦{totalPriceNGN.toLocaleString()} (~${totalPriceUSD.toFixed(2)} USD)
                </span>
              </div>
            </div>

            {/* Payment Method Switcher */}
            <div>
              <label className="block text-[#3A5A40] font-bold mb-1.5">
                Select Payment Mode (Crypto or Fiat)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('crypto')}
                  className={`flex items-center justify-center space-x-2 py-3 rounded-xl font-bold border transition-all ${
                    paymentMethod === 'crypto'
                      ? 'bg-[#3A5A40] text-white border-[#3A5A40] shadow-sm'
                      : 'bg-[#F8F9F1] text-[#3A5A40] border-[#E5E9D3]'
                  }`}
                >
                  <Coins className="w-4 h-4 text-[#D4A373]" />
                  <span>Crypto / eNaira</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('fiat')}
                  className={`flex items-center justify-center space-x-2 py-3 rounded-xl font-bold border transition-all ${
                    paymentMethod === 'fiat'
                      ? 'bg-[#3A5A40] text-white border-[#3A5A40] shadow-sm'
                      : 'bg-[#F8F9F1] text-[#3A5A40] border-[#E5E9D3]'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-[#A3B18A]" />
                  <span>Fiat (Paystack/Card)</span>
                </button>
              </div>
            </div>

            {/* Asset Selection */}
            {paymentMethod === 'crypto' ? (
              <div className="bg-[#F8F9F1] p-4 rounded-2xl border border-[#E5E9D3] space-y-3">
                <span className="text-[#3A5A40] font-bold block">Choose Crypto Asset:</span>
                <div className="grid grid-cols-3 gap-2">
                  {(['USDT', 'eNaira', 'BTC'] as const).map((asset) => (
                    <button
                      key={asset}
                      type="button"
                      onClick={() => setCryptoAsset(asset)}
                      className={`p-2.5 rounded-xl border text-center font-bold ${
                        cryptoAsset === asset
                          ? 'bg-[#3A5A40] text-white border-[#3A5A40]'
                          : 'bg-white text-[#3A5A40] border-[#E5E9D3]'
                      }`}
                    >
                      {asset}
                    </button>
                  ))}
                </div>

                <div className="bg-white p-3 rounded-xl border border-[#E5E9D3] text-center space-y-2">
                  <span className="text-[#588157] text-[11px] font-semibold block">Escrow Vault Deposit Address ({cryptoAsset}):</span>
                  <p className="font-mono text-[#3A5A40] text-xs font-bold break-all bg-[#F0F4E8] p-2 rounded-lg border border-[#D8E2C3]">
                    {cryptoAsset === 'USDT' 
                      ? '0x71C7656EC7ab88b098defB751B7401B5f6d8976F' 
                      : cryptoAsset === 'eNaira' 
                      ? 'ENAIRA-ESCROW-2390-4821-9920' 
                      : 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh'}
                  </p>
                  <p className="text-[10px] text-[#588157]">
                    Amount to Deposit: <strong className="text-[#3A5A40] font-bold">{totalPriceUSDT.toFixed(2)} {cryptoAsset}</strong>
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-[#F8F9F1] p-4 rounded-2xl border border-[#E5E9D3] space-y-3">
                <span className="text-[#3A5A40] font-bold block">Choose Fiat Gateway:</span>
                <div className="grid grid-cols-3 gap-2">
                  {(['Paystack', 'Flutterwave', 'BankTransfer'] as const).map((prov) => (
                    <button
                      key={prov}
                      type="button"
                      onClick={() => setFiatProvider(prov)}
                      className={`p-2.5 rounded-xl border text-center font-bold ${
                        fiatProvider === prov
                          ? 'bg-[#3A5A40] text-white border-[#3A5A40]'
                          : 'bg-white text-[#3A5A40] border-[#E5E9D3]'
                      }`}
                    >
                      {prov}
                    </button>
                  ))}
                </div>

                <div className="bg-white p-3 rounded-xl border border-[#E5E9D3] text-center space-y-1">
                  <p className="text-[#588157] text-xs font-semibold">
                    Instant Bank Transfer or Card Payment via {fiatProvider}
                  </p>
                  <p className="text-[#3A5A40] font-serif font-bold text-base">
                    ₦{totalPriceNGN.toLocaleString()}
                  </p>
                </div>

                {fiatProvider === 'Paystack' && (
                  <div className="space-y-1.5">
                    <label className="block text-[#3A5A40] font-bold">Email for Paystack Receipt:</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-white border border-[#D8E2C3] rounded-xl px-3 py-2 text-xs text-[#2C3327] placeholder-[#A3B18A] focus:outline-none focus:border-[#3A5A40]"
                    />
                  </div>
                )}
              </div>
            )}

            {payError && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 px-3 py-2 rounded-xl flex items-center space-x-2 text-[11px]">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{payError}</span>
              </div>
            )}

            {/* Escrow Guarantee Steps Explanation */}
            <div className="bg-[#F0F4E8] p-3.5 rounded-2xl border border-[#D8E2C3] space-y-1 text-[11px] text-[#2C3327]">
              <span className="font-bold text-[#D4A373] block">🔒 How Escrow Protects You:</span>
              <p>1. Your payment is held securely in NaijaAgroConnect Smart Escrow Vault.</p>
              <p>2. The farmer ships produce via tracked cold-chain logistics.</p>
              <p>3. Funds are released to farmer ONLY after you inspect & confirm delivery quality.</p>
            </div>

            <button
              onClick={handleConfirmPayment}
              className="w-full bg-[#3A5A40] hover:bg-[#588157] text-white font-bold py-3 rounded-xl text-sm shadow-md transition-all"
            >
              Confirm & Deposit ₦{totalPriceNGN.toLocaleString()} into Escrow
            </button>
          </div>
        )}

        {step === 'paying' && (
          <div className="py-12 text-center space-y-4">
            <div className="w-12 h-12 border-4 border-[#3A5A40] border-t-transparent rounded-full animate-spin mx-auto"></div>
            <h4 className="text-lg font-serif font-bold text-[#3A5A40]">
              Processing Escrow Smart Vault Deposit...
            </h4>
            <p className="text-xs text-[#588157]">
              Verifying transaction signature & locks...
            </p>
          </div>
        )}

        {step === 'confirmed' && (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 bg-[#F0F4E8] text-[#3A5A40] border border-[#D8E2C3] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-serif font-bold text-[#3A5A40]">
              Escrow Deposit Secured!
            </h4>
            <p className="text-xs text-[#588157] max-w-sm mx-auto">
              Your payment has been locked in the NaijaAgroConnect Escrow Smart Vault. The producer has been notified to dispatch your shipment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
