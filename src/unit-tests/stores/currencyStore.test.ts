import { describe, it, expect, beforeEach, vi } from "vitest";
import { useCurrencyStore } from "@/stores/currencyStore";

describe("currencyStore", () => {
  beforeEach(() => {
    useCurrencyStore.setState({
      selected: "LKR",
      rates: { LKR: 1 },
      loading: false,
      error: null,
    });
    localStorage.clear();
  });

  it("starts with LKR selected", () => {
    expect(useCurrencyStore.getState().selected).toBe("LKR");
  });

  it("setSelected changes currency and persists to localStorage", () => {
    useCurrencyStore.getState().setSelected("USD");
    expect(useCurrencyStore.getState().selected).toBe("USD");
    expect(localStorage.getItem("selectedCurrency")).toBe("USD");
  });

  it("setSelected falls back to LKR for unsupported currencies", () => {
    useCurrencyStore.getState().setSelected("JPY");
    expect(useCurrencyStore.getState().selected).toBe("LKR");
  });

  it("refreshRates sets loading true then false", async () => {
    const fakeRates = { rates: { USD: 0.003, EUR: 0.0027 } };
    globalThis.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(fakeRates),
    });

    const promise = useCurrencyStore.getState().refreshRates();
    expect(useCurrencyStore.getState().loading).toBe(true);
    await promise;
    expect(useCurrencyStore.getState().loading).toBe(false);
    expect(useCurrencyStore.getState().rates.USD).toBe(0.003);
    expect(useCurrencyStore.getState().rates.EUR).toBe(0.0027);
    expect(useCurrencyStore.getState().rates.LKR).toBe(1);
  });

  it("refreshRates sets error on failure", async () => {
    globalThis.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
    });

    await useCurrencyStore.getState().refreshRates();
    expect(useCurrencyStore.getState().loading).toBe(false);
    expect(useCurrencyStore.getState().error).toBe("Failed to fetch rates");
  });

  it("refreshRates handles network errors", async () => {
    globalThis.fetch = vi
      .fn()
      .mockRejectedValueOnce(new Error("Network error"));

    await useCurrencyStore.getState().refreshRates();
    expect(useCurrencyStore.getState().loading).toBe(false);
    expect(useCurrencyStore.getState().error).toBe("Network error");
  });
});
