import { create } from "zustand";
import type { IMenuItem, TSortField, TSortDirection } from "@/types/menu.types";
import { menuService } from "@/services/menuService";
import { useToastStore } from "./toastStore";
import { useUIStore } from "./uiStore";

interface MenuStore {
  items: IMenuItem[];
  loading: boolean;

  searchQuery: string;
  selectedCategory: string;
  selectedAvailability: string;
  sortField: TSortField;
  sortDirection: TSortDirection;

  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setSelectedAvailability: (availability: string) => void;
  setSorting: (field: TSortField) => void;

  addItem: (item: Omit<IMenuItem, "id">) => Promise<void>;
  updateItem: (id: string | number, item: Partial<IMenuItem>) => Promise<void>;
  deleteItem: (id: string | number) => Promise<void>;
  toggleAvailability: (id: string | number) => Promise<void>;

  loadItems: () => Promise<void>;

  getFilteredItems: () => IMenuItem[];
}

export const useMenuStore = create<MenuStore>((set, get) => {
  set({ loading: true });
  menuService
    .fetchMenuItems()
    .then((items) => set({ items, loading: false }))
    .catch(() => set({ loading: false }));

  return {
    items: [],
    loading: true,

    searchQuery: "",
    selectedCategory: "All",
    selectedAvailability: "All",
    sortField: "name",
    sortDirection: "asc",

    setSearchQuery: (query) => set({ searchQuery: query }),
    setSelectedCategory: (category) => set({ selectedCategory: category }),
    setSelectedAvailability: (availability) =>
      set({ selectedAvailability: availability }),

    setSorting: (field) =>
      set((state) => ({
        sortField: field,
        sortDirection:
          state.sortField === field && state.sortDirection === "asc"
            ? "desc"
            : "asc",
      })),

    addItem: async (item) => {
      const tempId = `temp-${crypto.randomUUID()}`;
      const temp = { ...item, id: tempId } as any;
      set((state) => ({ items: [...state.items, temp] }));
      useUIStore.getState().closeModal();
      try {
        const created = await menuService.createMenuItem(item);
        set((state) => ({
          items: state.items.map((it) => (it.id === tempId ? created : it)),
        }));
        useToastStore.getState().addToast("Item added", "success");
      } catch (err) {
        set((state) => ({
          items: state.items.filter((it) => it.id !== tempId),
        }));
        useToastStore.getState().addToast("Failed to add item", "error");
        throw err;
      }
    },

    updateItem: async (id, updates) => {
      const prev = get().items.find((i) => i.id === id);
      if (!prev) return;
      set((state) => ({
        items: state.items.map((it) =>
          it.id === id ? { ...it, ...updates } : it,
        ),
      }));
      useUIStore.getState().closeModal();
      try {
        const updated = await menuService.updateMenuItem(id, updates);
        set((state) => ({
          items: state.items.map((it) =>
            it.id === id ? { ...it, ...updated } : it,
          ),
        }));
        useToastStore.getState().addToast("Item updated", "success");
      } catch (err) {
        set((state) => ({
          items: state.items.map((it) => (it.id === id ? prev : it)),
        }));
        useToastStore.getState().addToast("Failed to update item", "error");
        throw err;
      }
    },

    deleteItem: async (id) => {
      const prev = get().items.find((i) => i.id === id) ?? null;
      set((state) => ({ items: state.items.filter((item) => item.id !== id) }));
      useUIStore.getState().closeConfirmDialog();
      try {
        await menuService.deleteMenuItem(id);
        useToastStore.getState().addToast("Item deleted", "success");
      } catch (err) {
        if (prev) set((state) => ({ items: [...state.items, prev] }));
        useToastStore.getState().addToast("Failed to delete item", "error");
        throw err;
      }
    },

    toggleAvailability: async (id) => {
      const item = get().items.find((i) => i.id === id);
      if (!item) return;
      const newStatus = item.status === "active" ? "inactive" : "active";
      set((state) => ({
        items: state.items.map((it) =>
          it.id === id ? { ...it, status: newStatus } : it,
        ),
      }));
      try {
        const toggled = await menuService.toggleAvailability(id, item.status);
        set((state) => ({
          items: state.items.map((it) =>
            it.id === id ? { ...it, status: toggled.status } : it,
          ),
        }));
        useToastStore.getState().addToast("Status updated", "success");
      } catch (err) {
        set((state) => ({
          items: state.items.map((it) => (it.id === id ? item : it)),
        }));
        useToastStore.getState().addToast("Failed to update status", "error");
        throw err;
      }
    },

    loadItems: async () => {
      set({ loading: true });
      try {
        const items = await menuService.fetchMenuItems();
        set({ items, loading: false });
      } catch (err) {
        set({ loading: false });
        throw err;
      }
    },

    getFilteredItems: (() => {
      let _cache: IMenuItem[] | null = null;
      let _lastDeps = {
        itemsRef: null as IMenuItem[] | null,
        searchQuery: "",
        selectedCategory: "All",
        selectedAvailability: "All",
        sortField: "name" as TSortField,
        sortDirection: "asc" as TSortDirection,
      };

      return () => {
        const {
          items,
          searchQuery,
          selectedCategory,
          selectedAvailability,
          sortField,
          sortDirection,
        } = get();

        const depsUnchanged =
          _lastDeps.itemsRef === items &&
          _lastDeps.searchQuery === searchQuery &&
          _lastDeps.selectedCategory === selectedCategory &&
          _lastDeps.selectedAvailability === selectedAvailability &&
          _lastDeps.sortField === sortField &&
          _lastDeps.sortDirection === sortDirection;

        if (depsUnchanged && _cache) return _cache;

        let filtered = items;

        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          filtered = filtered.filter(
            (item) =>
              item.name.toLowerCase().includes(q) ||
              item.description.toLowerCase().includes(q),
          );
        }

        if (selectedCategory !== "All") {
          filtered = filtered.filter(
            (item) => item.category === selectedCategory,
          );
        }

        if (selectedAvailability === "Available") {
          filtered = filtered.filter((item) => item.status === "active");
        } else if (selectedAvailability === "Unavailable") {
          filtered = filtered.filter((item) => item.status !== "active");
        }

        filtered = [...filtered].sort((a, b) => {
          let comparison = 0;
          if (sortField === "name") {
            comparison = a.name.localeCompare(b.name);
          } else if (sortField === "price") {
            comparison = a.price - b.price;
          } else if (sortField === "category") {
            comparison = a.category.localeCompare(b.category);
          }
          return sortDirection === "asc" ? comparison : -comparison;
        });

        _cache = filtered;
        _lastDeps.itemsRef = items;
        _lastDeps.searchQuery = searchQuery;
        _lastDeps.selectedCategory = selectedCategory;
        _lastDeps.selectedAvailability = selectedAvailability;
        _lastDeps.sortField = sortField;
        _lastDeps.sortDirection = sortDirection;

        return _cache;
      };
    })(),
  };
});

export const menuDashboardSelector = (s: MenuStore) => ({
  items: s.items,
  loading: s.loading,
  filteredItems: s.getFilteredItems(),
  searchQuery: s.searchQuery,
  setSearchQuery: s.setSearchQuery,
  sortField: s.sortField,
  sortDirection: s.sortDirection,
  setSorting: s.setSorting,
  selectedCategory: s.selectedCategory,
  setSelectedCategory: s.setSelectedCategory,
  selectedAvailability: s.selectedAvailability,
  setSelectedAvailability: s.setSelectedAvailability,
});

export const menuFormSelector = (s: MenuStore) => ({
  addItem: s.addItem,
  updateItem: s.updateItem,
});

export const menuCardSelector = (s: MenuStore) => ({
  toggleAvailability: s.toggleAvailability,
  deleteItem: s.deleteItem,
});
