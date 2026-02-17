import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CategoryFilter from "@/components/filters/CategoryFilter";

describe("CategoryFilter component", () => {
  it("renders all category buttons including 'All'", () => {
    const onChange = vi.fn();
    render(<CategoryFilter value="All" onChange={onChange} />);
    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("Starters")).toBeInTheDocument();
    expect(screen.getByText("Main Courses")).toBeInTheDocument();
    expect(screen.getByText("Desserts")).toBeInTheDocument();
    expect(screen.getByText("Beverages")).toBeInTheDocument();
    expect(screen.getByText("Specials")).toBeInTheDocument();
  });

  it("calls onChange when a button is clicked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<CategoryFilter value="All" onChange={onChange} />);
    await user.click(screen.getByText("Desserts"));
    expect(onChange).toHaveBeenCalledWith("Desserts");
  });
});
