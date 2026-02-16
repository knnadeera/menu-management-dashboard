import { useEffect } from "react";
import { SUPPORTED_CURRENCIES, useCurrencyStore } from "@/stores/currencyStore";
import Dropdown from "@/components/inputs/Dropdown";

const CurrencySelector = () => {
  const selected = useCurrencyStore((s) => s.selected);
  const setSelected = useCurrencyStore((s) => s.setSelected);
  const refreshRates = useCurrencyStore((s) => s.refreshRates);
  const loading = useCurrencyStore((s) => s.loading);
  const rates = useCurrencyStore((s) => s.rates);

  useEffect(() => {
    refreshRates();
  }, [refreshRates]);

  useEffect(() => {
    if (selected !== "LKR" && !rates[selected] && !loading) {
      refreshRates().catch(() => {});
    }
  }, [selected, rates, loading, refreshRates]);

  return (
    <div className="flex items-center gap-3">
      <Dropdown
        id="currency-select"
        value={selected}
        options={SUPPORTED_CURRENCIES}
        dropConfig={{ labelField: "label", valueField: "code" }}
        onChange={(e) => setSelected(e.target.value)}
        className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
      />
    </div>
  );
};

export default CurrencySelector;
