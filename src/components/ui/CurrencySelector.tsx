import { useEffect } from "react";
import { SUPPORTED_CURRENCIES } from "@/stores/currencyStore";
import Dropdown from "@/components/inputs/Dropdown";

type Props = {
  value: string;
  onChange: (value: string) => void;
  refreshRates?: () => Promise<void>;
  loading?: boolean;
  rates?: Record<string, number>;
  className?: string;
};

const CurrencySelector = ({
  value,
  onChange,
  refreshRates,
  loading,
  rates,
  className = "",
}: Props) => {
  useEffect(() => {
    if (refreshRates) refreshRates().catch(() => {});
  }, [refreshRates]);

  useEffect(() => {
    if (refreshRates && value !== "LKR" && rates && !rates[value] && !loading) {
      refreshRates().catch(() => {});
    }
  }, [value, rates, loading, refreshRates]);

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Dropdown
        id="currency-select"
        value={value}
        options={SUPPORTED_CURRENCIES}
        dropConfig={{ labelField: "label", valueField: "code" }}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
      />
    </div>
  );
};

export default CurrencySelector;
