import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MenuItemActions from "@/components/dashboard/MenuItemActions";
import type { IMenuItem } from "@/types/menu.types";

const activeItem: IMenuItem = {
  id: 1,
  name: "Salmon",
  category: "Main Courses",
  price: 2800,
  status: "active",
  description: "Fresh salmon",
};

const inactiveItem: IMenuItem = {
  ...activeItem,
  id: 2,
  status: "inactive",
};

describe("MenuItemActions component", () => {
  it("shows 'Mark Inactive' for active items", () => {
    render(
      <MenuItemActions
        item={activeItem}
        onToggleAvailability={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />,
    );
    expect(screen.getByText("Mark Inactive")).toBeInTheDocument();
  });

  it("shows 'Mark Active' for inactive items", () => {
    render(
      <MenuItemActions
        item={inactiveItem}
        onToggleAvailability={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />,
    );
    expect(screen.getByText("Mark Active")).toBeInTheDocument();
  });

  it("calls onToggleAvailability with item id when toggle button clicked", async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    render(
      <MenuItemActions
        item={activeItem}
        onToggleAvailability={onToggle}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />,
    );
    await user.click(screen.getByText("Mark Inactive"));
    expect(onToggle).toHaveBeenCalledWith(1);
  });

  it("calls onEdit with item when edit button clicked", async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();
    render(
      <MenuItemActions
        item={activeItem}
        onToggleAvailability={vi.fn()}
        onEdit={onEdit}
        onDelete={vi.fn()}
      />,
    );
    await user.click(screen.getByTitle("Edit"));
    expect(onEdit).toHaveBeenCalledWith(activeItem);
  });

  it("calls onDelete with item id when delete button clicked", async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();
    render(
      <MenuItemActions
        item={activeItem}
        onToggleAvailability={vi.fn()}
        onEdit={vi.fn()}
        onDelete={onDelete}
      />,
    );
    await user.click(screen.getByTitle("Delete"));
    expect(onDelete).toHaveBeenCalledWith(1);
  });
});
