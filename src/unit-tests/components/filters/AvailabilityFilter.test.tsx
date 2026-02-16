import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AvailabilityFilter from "@/components/filters/AvailabilityFilter";
import { useMenuStore } from "@/stores/menuStore";

describe("AvailabilityFilter component", () => {
  beforeEach(() => {
    useMenuStore.setState({
      selectedAvailability: "All",
      items: [],
      loading: false,
      searchQuery: "",
      selectedCategory: "All",
      sortField: "name",
      sortDirection: "asc",
    });
  });

  it("renders All / Available / Unavailable buttons", () => {
    render(<AvailabilityFilter />);
    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("Available")).toBeInTheDocument();
    expect(screen.getByText("Unavailable")).toBeInTheDocument();
  });

  it("updates selectedAvailability when a button is clicked", async () => {
    const user = userEvent.setup();
    render(<AvailabilityFilter />);
    await user.click(screen.getByText("Available"));
    expect(useMenuStore.getState().selectedAvailability).toBe("Available");
    await user.click(screen.getByText("Unavailable"));
    expect(useMenuStore.getState().selectedAvailability).toBe("Unavailable");
  });
});
