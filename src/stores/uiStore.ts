import { create } from "zustand";
import type { IMenuItem } from "@/types/menu.types";

interface UIStore {
  // modal (generic for forms)
  isModalOpen: boolean;
  editingItem: IMenuItem | null;
  openAddModal: () => void;
  openEditModal: (item: IMenuItem) => void;
  closeModal: () => void;

  // confirm dialog
  isConfirmOpen: boolean;
  deletingItemId: string | number | null;
  confirmType: "delete" | "toggle" | null;
  openConfirmDialog: (id: string | number, type?: "delete" | "toggle") => void;
  closeConfirmDialog: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  // modal
  isModalOpen: false,
  editingItem: null,
  openAddModal: () => set({ isModalOpen: true, editingItem: null }),
  openEditModal: (item) => set({ isModalOpen: true, editingItem: item }),
  closeModal: () => set({ isModalOpen: false, editingItem: null }),

  // confirm dialog
  isConfirmOpen: false,
  deletingItemId: null,
  confirmType: null,
  openConfirmDialog: (id, type = "delete") =>
    set({ isConfirmOpen: true, deletingItemId: id, confirmType: type }),
  closeConfirmDialog: () =>
    set({ isConfirmOpen: false, deletingItemId: null, confirmType: null }),
}));
