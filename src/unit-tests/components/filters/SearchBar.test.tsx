import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "@/components/filters/SearchBar";
import { useMenuStore } from "@/stores/menuStore";

describe("SearchBar component", () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    useMenuStore.setState({
      searchQuery: "",
      items: [],
      loading: false,
      selectedCategory: "All",
      sortField: "name",
      sortDirection: "asc",
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders an input with placeholder", () => {
    render(<SearchBar />);
    expect(
      screen.getByPlaceholderText("Search menu items..."),
    ).toBeInTheDocument();
  });

  it("updates store after debounce delay", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<SearchBar />);
    const input = screen.getByPlaceholderText("Search menu items...");
    await user.type(input, "salmon");
    vi.advanceTimersByTime(350);
    expect(useMenuStore.getState().searchQuery).toBe("salmon");
  });

  it("shows clear button when text is entered", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<SearchBar />);
    const input = screen.getByPlaceholderText("Search menu items...");
    await user.type(input, "test");
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
  });
});
