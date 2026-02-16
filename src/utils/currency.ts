export const formatLKR = (cents: number) => {
  const value = cents;
  return new Intl.NumberFormat("en-LK", {
    style: "currency",
    currency: "LKR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatFromLKR = (
  cents: number,
  currency: string,
  rate?: number,
  locale = "en-US",
) => {
  if (currency === "LKR" || !rate) return formatLKR(cents);
  const lkrValue = cents / 100;
  const targetValue = lkrValue * rate;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(targetValue);
};
