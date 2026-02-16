import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SortButtons from "@/components/filters/SortButtons";
import { useMenuStore } from "@/stores/menuStore";

describe("SortButtons component", () => {
  beforeEach(() => {
    useMenuStore.setState({
      sortField: "name",
      sortDirection: "asc",
      items: [],
      loading: false,
      searchQuery: "",
      selectedCategory: "All",
    });
  });

  it("renders sort buttons for Name, Price, Category", () => {
    render(<SortButtons />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Price")).toBeInTheDocument();
    expect(screen.getByText("Category")).toBeInTheDocument();
  });

  it("updates sort field when a button is clicked", async () => {
    const user = userEvent.setup();
    render(<SortButtons />);
    await user.click(screen.getByText("Price"));
    expect(useMenuStore.getState().sortField).toBe("price");
  });

  it("toggles sort direction on repeated click", async () => {
    const user = userEvent.setup();
    render(<SortButtons />);
    await user.click(screen.getByText("Name"));
    expect(useMenuStore.getState().sortDirection).toBe("desc");
  });
});
