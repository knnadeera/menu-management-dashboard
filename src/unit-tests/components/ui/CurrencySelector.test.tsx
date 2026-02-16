import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CurrencySelector from "@/components/ui/CurrencySelector";
import { useCurrencyStore } from "@/stores/currencyStore";

describe("CurrencySelector component", () => {
  beforeEach(() => {
    useCurrencyStore.setState({
      selected: "LKR",
      rates: { LKR: 1 },
      loading: false,
      error: null,
    });
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ rates: { LKR: 1, USD: 0.003 } }),
    });
  });

  it("renders a select with supported currencies", () => {
    render(<CurrencySelector />);
    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();
    expect(screen.getByText("LKR")).toBeInTheDocument();
    expect(screen.getByText("USD")).toBeInTheDocument();
    expect(screen.getByText("EUR")).toBeInTheDocument();
  });

  it("updates store when a new currency is selected", async () => {
    const user = userEvent.setup();
    render(<CurrencySelector />);
    const select = screen.getByRole("combobox");
    await user.selectOptions(select, "USD");
    expect(useCurrencyStore.getState().selected).toBe("USD");
  });
});
