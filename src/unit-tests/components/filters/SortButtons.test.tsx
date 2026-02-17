import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SortButtons from "@/components/filters/SortButtons";

describe("SortButtons component", () => {
  it("renders sort buttons for Name, Price, Category", () => {
    const onChange = vi.fn();
    render(
      <SortButtons sortField="name" sortDirection="asc" onChange={onChange} />,
    );
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Price")).toBeInTheDocument();
    expect(screen.getByText("Category")).toBeInTheDocument();
  });

  it("calls onChange with the selected field when a button is clicked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <SortButtons sortField="name" sortDirection="asc" onChange={onChange} />,
    );
    await user.click(screen.getByText("Price"));
    expect(onChange).toHaveBeenCalledWith("price");
  });

  it("renders direction indicator correctly based on props", () => {
    const onChange = vi.fn();
    const { rerender } = render(
      <SortButtons sortField="name" sortDirection="asc" onChange={onChange} />,
    );

    // when asc the chevron should not be rotated
    const chevronAsc = screen
      .getByRole("button", { name: /Name/ })
      .querySelector("svg");
    expect(chevronAsc).not.toHaveClass("rotate-180");

    // when desc it should have the rotation class
    rerender(
      <SortButtons sortField="name" sortDirection="desc" onChange={onChange} />,
    );
    const chevronDesc = screen
      .getByRole("button", { name: /Name/ })
      .querySelector("svg");
    expect(chevronDesc).toHaveClass("rotate-180");
  });
});
