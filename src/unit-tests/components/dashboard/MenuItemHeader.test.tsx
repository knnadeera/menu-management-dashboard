import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MenuItemHeader from "@/components/dashboard/MenuItemHeader";
import type { IMenuItem } from "@/types/menu.types";

const activeItem: IMenuItem = {
  id: 1,
  name: "Grilled Salmon",
  category: "Main Courses",
  price: 2800,
  status: "active",
  description: "Fresh salmon",
  image: "https://example.com/salmon.jpg",
};

const inactiveNoImage: IMenuItem = {
  id: 2,
  name: "Hidden Item",
  category: "Starters",
  price: 500,
  status: "inactive",
  description: "No image here",
};

describe("MenuItemHeader component", () => {
  it("renders an image when item has an image URL", () => {
    render(<MenuItemHeader item={activeItem} />);
    const img = screen.getByAltText("Grilled Salmon");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", activeItem.image);
  });

  it("renders a placeholder SVG when no image", () => {
    render(<MenuItemHeader item={inactiveNoImage} />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("shows Active badge for active items", () => {
    render(<MenuItemHeader item={activeItem} />);
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("shows Inactive badge for inactive items", () => {
    render(<MenuItemHeader item={inactiveNoImage} />);
    expect(screen.getByText("Inactive")).toBeInTheDocument();
  });

  it("displays the category badge", () => {
    render(<MenuItemHeader item={activeItem} />);
    expect(screen.getByText("Main Courses")).toBeInTheDocument();
  });
});
