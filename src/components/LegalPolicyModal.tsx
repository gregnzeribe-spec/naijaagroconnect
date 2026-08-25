import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface LegalPolicyModalProps {
  onClose: () => void;
}

export const LegalPolicyModal: React.FC<LegalPolicyModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white border border-[#E5E9D3] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl text-[#2C3327]">
        <div className="flex items-center justify-between border-b border-[#E5E9D3] p-5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#3A5A40]" />
            <h3 className="text-lg font-serif font-bold text-[#3A5A40]">
              Terms & Conditions / Policy
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close terms and conditions"
            className="text-[#3A5A40] hover:text-[#2C3327] font-bold p-1"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4 overflow-y-auto p-5 text-xs leading-relaxed">
          <p className="rounded-xl border border-[#E5E9D3] bg-[#F8F9F1] p-3 text-[#588157]">
            Draft for review. This information is provided to explain how the platform operates and is not a substitute for advice from a qualified lawyer.
          </p>

          <section>
            <h4 className="mb-1 font-bold text-[#3A5A40]">1. Who we are</h4>
            <p>
              Naija Agro Connect, operated by EUVIDA Agro Services ("Naija Agro Connect", "we", "us", or "our"), is a digital marketplace and secure transaction intermediary connecting agricultural producers, buyers, logistics providers, and related service providers.
            </p>
          </section>

          <section>
            <h4 className="mb-1 font-bold text-[#3A5A40]">2. Our intermediary role</h4>
            <p>
              We provide marketplace tools, identity and listing checks, communication features, payment and escrow coordination, and shipment tracking. Unless we expressly say otherwise, we do not own, grow, manufacture, sell, buy, store, or take title to the produce or livestock listed by users. The buyer and seller remain responsible for the underlying sale and for complying with all applicable laws, permits, export requirements, and agreed specifications.
            </p>
          </section>

          <section>
            <h4 className="mb-1 font-bold text-[#3A5A40]">3. Secure marketplace and escrow</h4>
            <p>
              Where offered, our escrow workflow is intended to hold or coordinate payment until the agreed transaction conditions are met. Payment processing may be provided by third-party payment partners, and their terms also apply. We use reasonable safeguards and verification processes, but no online service can guarantee that a user, listing, payment, product, or delivery will be completely free from fraud, delay, loss, or error.
            </p>
          </section>

          <section>
            <h4 className="mb-1 font-bold text-[#3A5A40]">4. User responsibilities</h4>
            <p>
              Users must provide accurate information, maintain account security, communicate honestly, obtain required licences and permits, inspect goods where appropriate, and honour their payment, quality, quantity, delivery, and refund commitments. Users must not use the platform for unlawful goods, fraud, money laundering, harassment, or attempts to bypass agreed payment and safety processes.
            </p>
          </section>

          <section>
            <h4 className="mb-1 font-bold text-[#3A5A40]">5. Listings, quality, and delivery</h4>
            <p>
              Listings, prices, availability, quality descriptions, certifications, and delivery estimates are supplied by users or service providers and may change. Verification badges and platform checks are signals, not warranties. Users should confirm material details before committing to a transaction and report discrepancies promptly through the platform or by emailing info@naijaagroconnect.com.
            </p>
          </section>

          <section>
            <h4 className="mb-1 font-bold text-[#3A5A40]">6. Privacy and communications</h4>
            <p>
              We collect and use information needed to operate the marketplace, support verification, process payments, coordinate deliveries, prevent abuse, and communicate with users. We share information with relevant service providers only as needed for these purposes or where required by law. Users should not post sensitive personal or financial information in public listing fields.
            </p>
          </section>

          <section>
            <h4 className="mb-1 font-bold text-[#3A5A40]">7. Suspension and disputes</h4>
            <p>
              We may pause listings, payments, or accounts where we reasonably suspect fraud, safety concerns, unlawful activity, or a breach of these terms. Users should first contact us so we can review a dispute and the available transaction records. These terms are intended to be read with any specific order, escrow, payment, logistics, or third-party terms presented during a transaction.
            </p>
          </section>

          <section>
            <h4 className="mb-1 font-bold text-[#3A5A40]">8. Contact</h4>
            <p>
              Questions, complaints, and requests about these terms or a transaction can be sent to{' '}
              <a
                href="mailto:info@naijaagroconnect.com"
                className="font-semibold text-[#588157] underline underline-offset-2 hover:text-[#3A5A40]"
              >
                info@naijaagroconnect.com
              </a>.
            </p>
          </section>
        </div>

        <div className="border-t border-[#E5E9D3] p-4 text-right">
          <button
            onClick={onClose}
            className="rounded-xl bg-[#3A5A40] px-4 py-2 text-xs font-bold text-white hover:bg-[#588157]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
