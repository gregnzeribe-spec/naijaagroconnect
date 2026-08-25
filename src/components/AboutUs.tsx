import React from 'react';
import {
  Building2,
  CheckCircle2,
  Globe2,
  Handshake,
  LockKeyhole,
  ShieldCheck,
  Truck,
} from 'lucide-react';

const trustBadges = [
  {
    icon: Building2,
    title: 'EUVIDA operated',
    description: 'Naija Agro Connect is operated by EUVIDA Agro Services.',
  },
  {
    icon: LockKeyhole,
    title: 'Secure transaction support',
    description: 'Escrow and payment workflows help coordinate safer trade.',
  },
  {
    icon: ShieldCheck,
    title: 'Identity-led trust',
    description: 'Verification signals help buyers and sellers make informed decisions.',
  },
  {
    icon: Truck,
    title: 'Trade and logistics ready',
    description: 'Shipment tracking supports local, cross-border, and diaspora orders.',
  },
];

export const AboutUs: React.FC = () => {
  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl bg-[#3A5A40] p-6 text-white shadow-md md:p-10">
        <div className="relative z-10 max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#A3B18A]/50 bg-[#F0F4E8]/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#D8E2C3]">
            <Building2 className="h-3.5 w-3.5" />
            EUVIDA Agro Services
          </span>
          <h1 className="mt-4 max-w-2xl font-serif text-3xl font-bold tracking-tight md:text-5xl">
            Building confidence into agricultural trade.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#F0F4E8] md:text-base">
            Naija Agro Connect is a secure digital marketplace and transaction intermediary operated by EUVIDA Agro Services. We connect Nigerian producers, buyers, logistics partners, and diaspora customers through one trusted trade network.
          </p>
        </div>
        <Globe2 className="absolute -right-8 -bottom-10 h-48 w-48 text-[#A3B18A]/20" />
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-3xl border border-[#E5E9D3] bg-white p-6 shadow-sm md:p-8">
          <div className="flex items-center gap-2 text-[#3A5A40]">
            <Handshake className="h-5 w-5 text-[#588157]" />
            <h2 className="font-serif text-2xl font-bold">Our role in the market</h2>
          </div>
          <div className="mt-5 space-y-4 text-sm leading-relaxed text-[#588157]">
            <p>
              EUVIDA Agro Services provides the operating structure behind Naija Agro Connect. Our role is to make agricultural commerce easier to discover, verify, coordinate, and track.
            </p>
            <p>
              We are an intermediary, not the owner of every product listed on the platform. Farmers, buyers, and service providers remain responsible for their own offers, agreements, licences, product quality, payment commitments, and delivery obligations.
            </p>
            <p>
              Our tools are designed to support clearer decisions and more accountable transactions while keeping the underlying relationship between buyer and seller visible.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-[#D8E2C3] bg-[#F8F9F1] p-6 md:p-8">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#A3B18A]">Corporate identity</p>
          <h2 className="mt-2 font-serif text-2xl font-bold text-[#3A5A40]">One operating standard</h2>
          <ul className="mt-5 space-y-4 text-sm text-[#588157]">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#588157]" />
              <span>Operated by EUVIDA Agro Services</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#588157]" />
              <span>Serving all six Nigerian geopolitical zones</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#588157]" />
              <span>Supporting local, export, and diaspora trade workflows</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#588157]" />
              <span>Contact: info@naijaagroconnect.com</span>
            </li>
          </ul>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#A3B18A]">Trust framework</p>
            <h2 className="mt-1 font-serif text-2xl font-bold text-[#3A5A40]">What the platform helps coordinate</h2>
          </div>
          <ShieldCheck className="hidden h-7 w-7 text-[#588157] sm:block" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trustBadges.map(({ icon: Icon, title, description }) => (
            <div key={title} className="rounded-2xl border border-[#E5E9D3] bg-white p-5 shadow-sm">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F0F4E8] text-[#588157]">
                <Icon className="h-4.5 w-4.5" />
              </div>
              <h3 className="mt-4 text-sm font-bold text-[#3A5A40]">{title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#588157]">{description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
