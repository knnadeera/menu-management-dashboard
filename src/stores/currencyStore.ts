import { create } from "zustand";

export type TRateMap = Record<string, number>;

interface CurrencyStore {
  selected: string;
  rates: TRateMap;
  loading: boolean;
  error?: string | null;
  setSelected: (c: string) => void;
  refreshRates: () => Promise<void>;
}

const SUPPORTED = new Set(["LKR", "USD", "EUR", "GBP", "INR"]);

export const useCurrencyStore = create<CurrencyStore>((set) => ({
  selected: (localStorage.getItem("selectedCurrency") as string) ?? "LKR",
  rates: { LKR: 1 },
  loading: false,
  error: null,
  setSelected: (c) => {
    if (!SUPPORTED.has(c)) c = "LKR";
    localStorage.setItem("selectedCurrency", c);
    set({ selected: c });
  },
  refreshRates: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`https://api.exchangerate-api.com/v4/latest/LKR`);

      if (!res.ok) throw new Error("Failed to fetch rates");
      const json = await res.json();
      const rates: TRateMap = { LKR: 1 };
      for (const [k, v] of Object.entries(json.rates ?? {})) {
        rates[k] = Number(v as number);
      }
      set({ rates, loading: false });
    } catch (err: any) {
      set({ loading: false, error: err?.message ?? String(err) });
    }
  },
}));

export const SUPPORTED_CURRENCIES = [
  { code: "LKR", label: "LKR" },
  { code: "USD", label: "USD" },
  { code: "EUR", label: "EUR" },
  { code: "GBP", label: "GBP" },
  { code: "INR", label: "INR" },
];

export default useCurrencyStore;
