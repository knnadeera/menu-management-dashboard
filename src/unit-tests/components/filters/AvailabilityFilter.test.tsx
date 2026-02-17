import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AvailabilityFilter from "@/components/filters/AvailabilityFilter";

describe("AvailabilityFilter component", () => {
  it("renders All / Available / Unavailable buttons", () => {
    const onChange = vi.fn();
    render(<AvailabilityFilter value="All" onChange={onChange} />);
    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("Available")).toBeInTheDocument();
    expect(screen.getByText("Unavailable")).toBeInTheDocument();
  });

  it("calls onChange when a button is clicked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<AvailabilityFilter value="All" onChange={onChange} />);
    await user.click(screen.getByText("Available"));
    expect(onChange).toHaveBeenCalledWith("Available");
  });

  it("highlights the selected value", () => {
    const onChange = vi.fn();
    render(<AvailabilityFilter value="Unavailable" onChange={onChange} />);
    const btn = screen.getByRole("button", { name: "Unavailable" });
    expect(btn).toHaveClass("bg-blue-600");
  });
});
