import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import MenuItemBody from "@/components/dashboard/MenuItemBody";
import { useCurrencyStore } from "@/stores/currencyStore";
import type { IMenuItem } from "@/types/menu.types";

const item: IMenuItem = {
  id: 1,
  name: "Grilled Salmon",
  category: "Main Courses",
  price: 2800,
  status: "active",
  description: "Fresh Atlantic salmon with herbs",
};

describe("MenuItemBody component", () => {
  beforeEach(() => {
    useCurrencyStore.setState({
      selected: "LKR",
      rates: { LKR: 1, USD: 0.003 },
      loading: false,
      error: null,
    });
  });

  it("renders item name and description", () => {
    render(<MenuItemBody item={item} />);
    expect(screen.getByText("Grilled Salmon")).toBeInTheDocument();
    expect(
      screen.getByText("Fresh Atlantic salmon with herbs"),
    ).toBeInTheDocument();
  });

  it("displays LKR price by default", () => {
    render(<MenuItemBody item={item} />);

    expect(screen.getByText(/2,800\.00/)).toBeInTheDocument();
  });

  it("displays converted price when non-LKR currency selected", () => {
    useCurrencyStore.setState({ selected: "USD" });
    render(<MenuItemBody item={item} />);
    expect(screen.getByText(/\$/)).toBeInTheDocument();
    expect(screen.getByText(/2,800\.00/)).toBeInTheDocument();
  });
});
