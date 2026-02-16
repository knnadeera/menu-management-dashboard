import { describe, it, expect, beforeEach, vi } from "vitest";
import { useUIStore } from "@/stores/uiStore";
import type { IMenuItem } from "@/types/menu.types";

const sampleItem: IMenuItem = {
  id: 1,
  name: "Test Item",
  category: "Main Courses",
  price: 1000,
  status: "active",
  description: "A test item",
  image: "https://example.com/img.jpg",
};

describe("uiStore", () => {
  beforeEach(() => {
    useUIStore.setState({
      isModalOpen: false,
      editingItem: null,
      isConfirmOpen: false,
      deletingItemId: null,
      confirmType: null,
    });
  });

  // --- Modal ---
  it("openAddModal sets isModalOpen=true and editingItem=null", () => {
    useUIStore.getState().openAddModal();
    const s = useUIStore.getState();
    expect(s.isModalOpen).toBe(true);
    expect(s.editingItem).toBeNull();
  });

  it("openEditModal sets isModalOpen=true and editingItem", () => {
    useUIStore.getState().openEditModal(sampleItem);
    const s = useUIStore.getState();
    expect(s.isModalOpen).toBe(true);
    expect(s.editingItem).toEqual(sampleItem);
  });

  it("closeModal resets modal state", () => {
    useUIStore.getState().openEditModal(sampleItem);
    useUIStore.getState().closeModal();
    const s = useUIStore.getState();
    expect(s.isModalOpen).toBe(false);
    expect(s.editingItem).toBeNull();
  });

  // --- Confirm dialog ---
  it("openConfirmDialog sets confirm state (default delete)", () => {
    useUIStore.getState().openConfirmDialog(42);
    const s = useUIStore.getState();
    expect(s.isConfirmOpen).toBe(true);
    expect(s.deletingItemId).toBe(42);
    expect(s.confirmType).toBe("delete");
  });

  it("openConfirmDialog accepts custom message and callback", () => {
    const cb = vi.fn();
    useUIStore.getState().openConfirmDialog(null, "unsaved", "Discard?", cb);
    const s = useUIStore.getState();
    expect(s.isConfirmOpen).toBe(true);
    expect(s.confirmType).toBe("unsaved");
    expect(s.confirmMessage).toBe("Discard?");
    expect(typeof s.confirmCallback).toBe("function");
  });

  it("openConfirmDialog with toggle type", () => {
    useUIStore.getState().openConfirmDialog("abc", "toggle");
    const s = useUIStore.getState();
    expect(s.isConfirmOpen).toBe(true);
    expect(s.deletingItemId).toBe("abc");
    expect(s.confirmType).toBe("toggle");
  });

  it("closeConfirmDialog resets confirm state", () => {
    useUIStore.getState().openConfirmDialog(1);
    useUIStore.getState().closeConfirmDialog();
    const s = useUIStore.getState();
    expect(s.isConfirmOpen).toBe(false);
    expect(s.deletingItemId).toBeNull();
    expect(s.confirmType).toBeNull();
  });
});
