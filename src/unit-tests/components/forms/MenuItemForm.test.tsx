import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MenuItemForm from "@/components/forms/MenuItemForm";
import { useUIStore } from "@/stores/uiStore";
import type { IMenuItem } from "@/types/menu.types";

const sampleItem: IMenuItem = {
  id: 1,
  name: "Test Item",
  category: "Main Courses",
  price: 1000,
  status: "active",
  description: "test",
  image: "https://example.com/img.jpg",
};

describe("MenuItemForm unsaved changes confirmation", () => {
  beforeEach(() => {
    vi.useRealTimers();
    useUIStore.setState({
      isModalOpen: false,
      editingItem: null,
      isConfirmOpen: false,
      deletingItemId: null,
      confirmType: null,
      confirmMessage: null,
      confirmCallback: null,
    });
  });

  it("asks for confirmation when closing add form with entered data", async () => {
    const user = userEvent.setup();
    useUIStore.setState({ isModalOpen: true, editingItem: null });
    render(<MenuItemForm />);

    const input = screen.getByPlaceholderText("e.g. Grilled Chicken");
    await user.type(input, "New name");

    await user.click(screen.getByText("Cancel"));

    expect(useUIStore.getState().isConfirmOpen).toBe(true);
    expect(useUIStore.getState().confirmType).toBe("unsaved");
    expect(useUIStore.getState().confirmMessage).toBe(
      "You have unsaved changes. Discard them?",
    );
  });

  it("does not confirm when closing add form with no data", async () => {
    const user = userEvent.setup();
    useUIStore.setState({ isModalOpen: true, editingItem: null });
    render(<MenuItemForm />);

    await user.click(screen.getByText("Cancel"));

    expect(useUIStore.getState().isConfirmOpen).toBe(false);
    expect(useUIStore.getState().isModalOpen).toBe(false);
  });

  it("asks for confirmation when editing and changes detected", async () => {
    const user = userEvent.setup();
    useUIStore.setState({ isModalOpen: true, editingItem: sampleItem });
    render(<MenuItemForm />);

    const input = screen.getByPlaceholderText("e.g. Grilled Chicken");
    await user.clear(input);
    await user.type(input, "Changed name");

    await user.click(screen.getByText("Cancel"));

    expect(useUIStore.getState().isConfirmOpen).toBe(true);
    expect(useUIStore.getState().confirmType).toBe("unsaved");
  });

  it("does not confirm when editing and no changes", async () => {
    const user = userEvent.setup();
    useUIStore.setState({ isModalOpen: true, editingItem: sampleItem });
    render(<MenuItemForm />);

    await user.click(screen.getByText("Cancel"));

    expect(useUIStore.getState().isConfirmOpen).toBe(false);
    expect(useUIStore.getState().isModalOpen).toBe(false);
  });
});
