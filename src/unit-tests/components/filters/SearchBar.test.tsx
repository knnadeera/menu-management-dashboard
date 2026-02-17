import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "@/components/filters/SearchBar";

describe("SearchBar component", () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders an input with placeholder", () => {
    render(<SearchBar value="" onChange={() => {}} />);
    expect(
      screen.getByPlaceholderText("Search menu items..."),
    ).toBeInTheDocument();
  });

  it("calls onChange after debounce delay", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<SearchBar value="" onChange={onChange} />);
    const input = screen.getByPlaceholderText("Search menu items...");
    await user.type(input, "salmon");
    vi.advanceTimersByTime(350);
    expect(onChange).toHaveBeenCalledWith("salmon");
  });

  it("shows clear button when text is entered", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<SearchBar value="test" onChange={onChange} />);
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
  });
});
