import { describe, it, expect } from "vitest";
import { formatLKR, formatFromLKR } from "@/utils/currency";

describe("formatLKR", () => {
  it("formats a positive value with LKR currency symbol", () => {
    const result = formatLKR(2800);
    expect(result).toContain("2,800.00");
  });

  it("formats zero correctly", () => {
    const result = formatLKR(0);
    expect(result).toContain("0.00");
  });

  it("formats small values", () => {
    const result = formatLKR(5);
    expect(result).toContain("5.00");
  });

  it("formats negative values", () => {
    const result = formatLKR(-1500);
    expect(result).toContain("1,500.00");
  });
});

describe("formatFromLKR", () => {
  it("returns LKR format when currency is LKR", () => {
    const result = formatFromLKR(2800, "LKR");
    expect(result).toContain("2,800.00");
  });

  it("returns LKR format when rate is undefined", () => {
    const result = formatFromLKR(2800, "USD", undefined);
    expect(result).toContain("2,800.00");
  });

  it("converts to USD with given rate", () => {
    const result = formatFromLKR(2800, "USD", 0.003);
    expect(result).toContain("$");
    expect(result).toContain("0.08");
  });

  it("converts to EUR with given rate", () => {
    const result = formatFromLKR(10000, "EUR", 0.0027);
    expect(result).toContain("€");
    expect(result).toContain("0.27");
  });

  it("uses provided locale", () => {
    const result = formatFromLKR(10000, "GBP", 0.0025, "en-GB");
    expect(result).toContain("£");
  });

  it("handles rate of 0 (falsy) by falling back to LKR", () => {
    const result = formatFromLKR(2800, "USD", 0);
    expect(result).toContain("2,800.00");
  });
});
