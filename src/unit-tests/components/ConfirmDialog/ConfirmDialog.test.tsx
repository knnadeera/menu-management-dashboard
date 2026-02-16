import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ConfirmDialog from "@/components/ConfirmDialog/ConfirmDialog";
import { useUIStore } from "@/stores/uiStore";
import { useMenuStore } from "@/stores/menuStore";
import { menuService } from "@/services/menuService";
import type { IMenuItem } from "@/types/menu.types";

vi.mock("@/services/menuService", () => ({
  menuService: {
    fetchMenuItems: vi.fn().mockResolvedValue([]),
    createMenuItem: vi.fn(),
    updateMenuItem: vi.fn(),
    deleteMenuItem: vi.fn(),
    toggleAvailability: vi.fn(),
  },
}));

const sampleItem: IMenuItem = {
  id: 1,
  name: "Test Item",
  category: "Main Courses",
  price: 1000,
  status: "active",
  description: "test",
};

describe("ConfirmDialog component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useMenuStore.setState({
      items: [sampleItem],
      loading: false,
      searchQuery: "",
      selectedCategory: "All",
      sortField: "name",
      sortDirection: "asc",
    });
    useUIStore.setState({
      isModalOpen: false,
      editingItem: null,
      isConfirmOpen: false,
      deletingItemId: null,
      confirmType: null,
    });
  });

  it("renders nothing when confirm dialog is not open", () => {
    const { container } = render(<ConfirmDialog />);
    expect(container.innerHTML).toBe("");
  });

  it("renders dialog when open with delete type", () => {
    useUIStore.setState({
      isConfirmOpen: true,
      deletingItemId: 1,
      confirmType: "delete",
    });
    render(<ConfirmDialog />);
    expect(screen.getByText(/Test Item/)).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  it("renders dialog with toggle type", () => {
    useUIStore.setState({
      isConfirmOpen: true,
      deletingItemId: 1,
      confirmType: "toggle",
    });
    render(<ConfirmDialog />);
    expect(screen.getByText(/change status of/i)).toBeInTheDocument();
    expect(screen.getByText("Confirm")).toBeInTheDocument();
  });

  it("closes dialog when Cancel is clicked", async () => {
    const user = userEvent.setup();
    useUIStore.setState({
      isConfirmOpen: true,
      deletingItemId: 1,
      confirmType: "delete",
    });
    render(<ConfirmDialog />);
    await user.click(screen.getByText("Cancel"));
    expect(useUIStore.getState().isConfirmOpen).toBe(false);
  });

  it("calls custom onConfirm when provided", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    useUIStore.setState({
      isConfirmOpen: true,
      deletingItemId: 1,
      confirmType: "delete",
    });
    render(<ConfirmDialog onConfirm={onConfirm} />);
    await user.click(screen.getByText("Delete"));
    expect(onConfirm).toHaveBeenCalledWith(1);
  });
});
