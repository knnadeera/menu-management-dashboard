import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import StatsCards from "@/components/ui/StatsCards";

describe("StatsCards component", () => {
  const stats = { total: 8, available: 6, unavailable: 2, categories: 4 };

  it("renders Total / Available / Categories by default", () => {
    render(<StatsCards stats={stats} />);
    expect(screen.getByText("Total Items")).toBeInTheDocument();
    expect(screen.getByText("8")).toBeInTheDocument();
    expect(screen.getByText("Available")).toBeInTheDocument();
    expect(screen.getByText("6")).toBeInTheDocument();
    expect(screen.getByText("Categories")).toBeInTheDocument();
    expect(screen.queryByText("Unavailable")).toBeNull();
  });

  it("renders Unavailable when showUnavailable is true", () => {
    render(<StatsCards stats={stats} showUnavailable />);
    expect(screen.getByText("Unavailable")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });
});
