import { create } from "zustand";
import type { IMenuItem } from "@/types/menu.types";

type ItemId = string | number | null;

interface UIStore {
  isModalOpen: boolean;
  editingItem: IMenuItem | null;
  openAddModal: () => void;
  openEditModal: (item: IMenuItem) => void;
  closeModal: () => void;

  isConfirmOpen: boolean;
  deletingItemId: ItemId;
  confirmType: "delete" | "toggle" | "unsaved" | null;
  /** optional custom message for confirm dialogs */
  confirmMessage: string | null;
  /** optional callback invoked when confirm is accepted */
  confirmCallback: ((id: ItemId) => void) | null;
  openConfirmDialog: (
    id: ItemId,
    type?: "delete" | "toggle" | "unsaved",
    message?: string | null,
    onConfirm?: ((id: ItemId) => void) | null,
  ) => void;
  closeConfirmDialog: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isModalOpen: false,
  editingItem: null,
  openAddModal: () => set({ isModalOpen: true, editingItem: null }),
  openEditModal: (item) => set({ isModalOpen: true, editingItem: item }),
  closeModal: () => set({ isModalOpen: false, editingItem: null }),

  isConfirmOpen: false,
  deletingItemId: null,
  confirmType: null,
  confirmMessage: null,
  confirmCallback: null,
  openConfirmDialog: (id, type = "delete", message = null, onConfirm = null) =>
    set({
      isConfirmOpen: true,
      deletingItemId: id,
      confirmType: type,
      confirmMessage: message,
      confirmCallback: onConfirm,
    }),
  closeConfirmDialog: () =>
    set({
      isConfirmOpen: false,
      deletingItemId: null,
      confirmType: null,
      confirmMessage: null,
      confirmCallback: null,
    }),
}));
