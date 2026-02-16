import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CategoryFilter from "@/components/filters/CategoryFilter";
import { useMenuStore } from "@/stores/menuStore";

describe("CategoryFilter component", () => {
  beforeEach(() => {
    useMenuStore.setState({
      selectedCategory: "All",
      items: [],
      loading: false,
      searchQuery: "",
      sortField: "name",
      sortDirection: "asc",
    });
  });

  it("renders all category buttons including 'All'", () => {
    render(<CategoryFilter />);
    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("Starters")).toBeInTheDocument();
    expect(screen.getByText("Main Courses")).toBeInTheDocument();
    expect(screen.getByText("Desserts")).toBeInTheDocument();
    expect(screen.getByText("Beverages")).toBeInTheDocument();
    expect(screen.getByText("Specials")).toBeInTheDocument();
  });

  it("updates selected category when a button is clicked", async () => {
    const user = userEvent.setup();
    render(<CategoryFilter />);
    await user.click(screen.getByText("Desserts"));
    expect(useMenuStore.getState().selectedCategory).toBe("Desserts");
  });
});
