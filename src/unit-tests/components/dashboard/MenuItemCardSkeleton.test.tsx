import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import MenuItemCardSkeleton from "@/components/dashboard/MenuItemCardSkeleton";

describe("MenuItemCardSkeleton component", () => {
  it("renders without crashing", () => {
    const { container } = render(<MenuItemCardSkeleton />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("has animate-pulse class for loading animation", () => {
    const { container } = render(<MenuItemCardSkeleton />);
    expect(container.firstChild).toHaveClass("animate-pulse");
  });
});
