import type { IMenuItem } from "@/types/menu.types";
import { formatLKR, formatFromLKR } from "@/utils/currency";
import { useCurrencyStore } from "@/stores/currencyStore";

interface Props {
  readonly item: IMenuItem;
}

const MenuItemBody = ({ item }: Props) => {
  const selected = useCurrencyStore((s) => s.selected);
  const rates = useCurrencyStore((s) => s.rates);

  const priceDisplay =
    selected === "LKR"
      ? formatLKR(item.price)
      : formatFromLKR(item.price, selected, rates[selected]);

  return (
    <>
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          {item.name}
        </h3>
        <div className="text-right">
          <div className="text-lg font-bold text-indigo-600 ml-2 whitespace-nowrap">
            {priceDisplay}
          </div>
          {selected !== "LKR" && (
            <div className="text-xs text-gray-400">{formatLKR(item.price)}</div>
          )}
        </div>
      </div>
      <p className="text-sm text-gray-500 line-clamp-2 mb-4">
        {item.description}
      </p>
    </>
  );
};

export default MenuItemBody;
