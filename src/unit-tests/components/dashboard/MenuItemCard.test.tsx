import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import MenuItemCard from "@/components/dashboard/MenuItemCard";
import { useUIStore } from "@/stores/uiStore";
import { useCurrencyStore } from "@/stores/currencyStore";
import type { IMenuItem } from "@/types/menu.types";

const item: IMenuItem = {
  id: 1,
  name: "Grilled Salmon",
  category: "Main Courses",
  price: 2800,
  status: "active",
  description: "Fresh Atlantic salmon with herbs",
  image: "https://example.com/salmon.jpg",
};

describe("MenuItemCard component", () => {
  beforeEach(() => {
    useUIStore.setState({
      isModalOpen: false,
      editingItem: null,
      isConfirmOpen: false,
      deletingItemId: null,
      confirmType: null,
    });
    useCurrencyStore.setState({
      selected: "LKR",
      rates: { LKR: 1 },
      loading: false,
      error: null,
    });
  });

  it("renders item name, description, category, and status", () => {
    render(<MenuItemCard item={item} />);
    expect(screen.getByText("Grilled Salmon")).toBeInTheDocument();
    expect(
      screen.getByText("Fresh Atlantic salmon with herbs"),
    ).toBeInTheDocument();
    expect(screen.getByText("Main Courses")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("renders the image", () => {
    render(<MenuItemCard item={item} />);
    const img = screen.getByAltText("Grilled Salmon");
    expect(img).toHaveAttribute("src", item.image);
  });

  it("renders action buttons", () => {
    render(<MenuItemCard item={item} />);
    expect(screen.getByText("Mark Inactive")).toBeInTheDocument();
    expect(screen.getByTitle("Edit")).toBeInTheDocument();
    expect(screen.getByTitle("Delete")).toBeInTheDocument();
  });
});
