import { create } from "zustand";

export type ToastType = "info" | "success" | "error";

export interface IToast {
  id: string;
  message: string;
  type?: ToastType;
  duration?: number;
}

interface ToastStore {
  toasts: IToast[];
  addToast: (message: string, type?: ToastType, duration?: number) => string;
  removeToast: (id: string) => void;
  clear: () => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (message, type = "info", duration = 4000) => {
    const id = crypto.randomUUID();
    set((s) => ({ toasts: [...s.toasts, { id, message, type, duration }] }));
    return id;
  },
  removeToast: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
  clear: () => set({ toasts: [] }),
}));

export const toastContainerSelector = (s: ToastStore) => ({
  toasts: s.toasts,
  removeToast: s.removeToast,
});

export default useToastStore;
