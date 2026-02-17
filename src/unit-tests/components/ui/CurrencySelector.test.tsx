import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CurrencySelector from "@/components/ui/CurrencySelector";

describe("CurrencySelector component", () => {
  it("renders a select with supported currencies", () => {
    render(
      <CurrencySelector
        value="LKR"
        onChange={() => {}}
        rates={{ LKR: 1 }}
        loading={false}
      />,
    );
    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();
    expect(screen.getByText("LKR")).toBeInTheDocument();
    expect(screen.getByText("USD")).toBeInTheDocument();
    expect(screen.getByText("EUR")).toBeInTheDocument();
  });

  it("calls onChange when a new currency is selected", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <CurrencySelector
        value="LKR"
        onChange={onChange}
        rates={{ LKR: 1, USD: 0.003 }}
        loading={false}
      />,
    );
    const select = screen.getByRole("combobox");
    await user.selectOptions(select, "USD");
    expect(onChange).toHaveBeenCalledWith("USD");
  });
});
