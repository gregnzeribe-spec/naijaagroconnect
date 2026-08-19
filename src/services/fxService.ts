import { useEffect, useState } from 'react';

export interface FxRates {
  USD: number;
  EUR: number;
  GBP: number;
}

// Fallback rates used until the live /api/fx feed responds (or if it's unreachable).
export const DEFAULT_FX_RATES: FxRates = { USD: 1 / 1520, EUR: 1 / 1650, GBP: 1 / 1950 };

const REFRESH_INTERVAL_MS = 60 * 60 * 1000; // 1 hour, matches server-side cache TTL

export function useLiveFxRates(): FxRates {
  const [rates, setRates] = useState<FxRates>(DEFAULT_FX_RATES);

  useEffect(() => {
    let cancelled = false;

    const fetchRates = async () => {
      try {
        const res = await fetch('/api/fx');
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled && data?.rates?.USD && data?.rates?.EUR && data?.rates?.GBP) {
          setRates(data.rates);
        }
      } catch {
        // Keep using the last known (or default) rates on network failure.
      }
    };

    fetchRates();
    const interval = setInterval(fetchRates, REFRESH_INTERVAL_MS);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return rates;
}

export function convertNGN(amountNGN: number, currency: keyof FxRates, rates: FxRates): number {
  return amountNGN * rates[currency];
}
