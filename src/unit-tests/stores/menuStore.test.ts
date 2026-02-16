import { describe, it, expect, beforeEach, vi } from "vitest";
import { useMenuStore } from "@/stores/menuStore";
import { useUIStore } from "@/stores/uiStore";
import { useToastStore } from "@/stores/toastStore";
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

const sampleItems: IMenuItem[] = [
  {
    id: 1,
    name: "Alpha",
    category: "Starters",
    price: 500,
    status: "active",
    description: "Alpha dish",
  },
  {
    id: 2,
    name: "Beta",
    category: "Main Courses",
    price: 1200,
    status: "inactive",
    description: "Beta dish",
  },
  {
    id: 3,
    name: "Charlie",
    category: "Beverages",
    price: 300,
    status: "active",
    description: "Charlie drink",
  },
];

describe("menuStore", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useMenuStore.setState({
      items: [...sampleItems],
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
    useToastStore.setState({ toasts: [] });
  });

  describe("setSearchQuery", () => {
    it("updates searchQuery", () => {
      useMenuStore.getState().setSearchQuery("test");
      expect(useMenuStore.getState().searchQuery).toBe("test");
    });
  });

  describe("setSelectedCategory", () => {
    it("updates selectedCategory", () => {
      useMenuStore.getState().setSelectedCategory("Beverages");
      expect(useMenuStore.getState().selectedCategory).toBe("Beverages");
    });
  });

  describe("setSorting", () => {
    it("sets sort field and defaults to asc", () => {
      useMenuStore.getState().setSorting("price");
      const s = useMenuStore.getState();
      expect(s.sortField).toBe("price");
      expect(s.sortDirection).toBe("asc");
    });

    it("toggles direction when same field clicked again", () => {
      useMenuStore.getState().setSorting("name");
      expect(useMenuStore.getState().sortDirection).toBe("desc");
      useMenuStore.getState().setSorting("name");
      expect(useMenuStore.getState().sortDirection).toBe("asc");
    });

    it("resets to asc when switching to a different field", () => {
      useMenuStore.getState().setSorting("name"); // toggle to desc
      useMenuStore.getState().setSorting("price"); // new field → asc
      expect(useMenuStore.getState().sortField).toBe("price");
      expect(useMenuStore.getState().sortDirection).toBe("asc");
    });
  });

  describe("getFilteredItems", () => {
    it("returns all items when no filters", () => {
      const filtered = useMenuStore.getState().getFilteredItems();
      expect(filtered).toHaveLength(3);
    });

    it("filters by search query (name)", () => {
      useMenuStore.getState().setSearchQuery("alpha");
      const filtered = useMenuStore.getState().getFilteredItems();
      expect(filtered).toHaveLength(1);
      expect(filtered[0].name).toBe("Alpha");
    });

    it("filters by search query (description)", () => {
      useMenuStore.getState().setSearchQuery("drink");
      const filtered = useMenuStore.getState().getFilteredItems();
      expect(filtered).toHaveLength(1);
      expect(filtered[0].name).toBe("Charlie");
    });

    it("filters by category", () => {
      useMenuStore.getState().setSelectedCategory("Starters");
      const filtered = useMenuStore.getState().getFilteredItems();
      expect(filtered).toHaveLength(1);
      expect(filtered[0].category).toBe("Starters");
    });

    it("combines search and category filters", () => {
      useMenuStore.getState().setSearchQuery("dish");
      useMenuStore.getState().setSelectedCategory("Main Courses");
      const filtered = useMenuStore.getState().getFilteredItems();
      expect(filtered).toHaveLength(1);
      expect(filtered[0].name).toBe("Beta");
    });

    it("sorts by name ascending", () => {
      const filtered = useMenuStore.getState().getFilteredItems();
      expect(filtered[0].name).toBe("Alpha");
      expect(filtered[2].name).toBe("Charlie");
    });

    it("sorts by name descending", () => {
      useMenuStore.getState().setSorting("name");
      const filtered = useMenuStore.getState().getFilteredItems();
      expect(filtered[0].name).toBe("Charlie");
      expect(filtered[2].name).toBe("Alpha");
    });

    it("sorts by price ascending", () => {
      useMenuStore.setState({ sortField: "price", sortDirection: "asc" });
      const filtered = useMenuStore.getState().getFilteredItems();
      expect(filtered[0].price).toBe(300);
      expect(filtered[2].price).toBe(1200);
    });

    it("sorts by category", () => {
      useMenuStore.setState({ sortField: "category", sortDirection: "asc" });
      const filtered = useMenuStore.getState().getFilteredItems();
      expect(filtered[0].category).toBe("Beverages");
    });

    it("returns empty when no matches", () => {
      useMenuStore.getState().setSearchQuery("zzzzz");
      const filtered = useMenuStore.getState().getFilteredItems();
      expect(filtered).toHaveLength(0);
    });
  });

  describe("addItem", () => {
    it("optimistically adds item, then replaces with server response", async () => {
      const created: IMenuItem = {
        id: "server-1",
        name: "New",
        category: "Desserts",
        price: 900,
        status: "active",
        description: "Yum",
      };
      vi.mocked(menuService.createMenuItem).mockResolvedValueOnce(created);

      await useMenuStore.getState().addItem({
        name: "New",
        category: "Desserts",
        price: 900,
        status: "active",
        description: "Yum",
      });

      const items = useMenuStore.getState().items;
      expect(items).toHaveLength(4);
      expect(items.find((i) => i.id === "server-1")).toBeDefined();
      expect(useToastStore.getState().toasts[0].message).toBe("Item added");
    });

    it("rolls back on failure", async () => {
      vi.mocked(menuService.createMenuItem).mockRejectedValueOnce(
        new Error("fail"),
      );

      await expect(
        useMenuStore.getState().addItem({
          name: "Fail",
          category: "Desserts",
          price: 100,
          status: "active",
          description: "nope",
        }),
      ).rejects.toThrow("fail");

      expect(useMenuStore.getState().items).toHaveLength(3);
      expect(useToastStore.getState().toasts[0].message).toBe(
        "Failed to add item",
      );
    });
  });

  describe("updateItem", () => {
    it("optimistically updates and confirms with server", async () => {
      const updated: IMenuItem = { ...sampleItems[0], name: "Alpha Updated" };
      vi.mocked(menuService.updateMenuItem).mockResolvedValueOnce(updated);

      await useMenuStore.getState().updateItem(1, { name: "Alpha Updated" });

      const item = useMenuStore.getState().items.find((i) => i.id === 1);
      expect(item?.name).toBe("Alpha Updated");
      expect(useToastStore.getState().toasts[0].message).toBe("Item updated");
    });

    it("rolls back on failure", async () => {
      vi.mocked(menuService.updateMenuItem).mockRejectedValueOnce(
        new Error("fail"),
      );

      await expect(
        useMenuStore.getState().updateItem(1, { name: "Oops" }),
      ).rejects.toThrow("fail");

      const item = useMenuStore.getState().items.find((i) => i.id === 1);
      expect(item?.name).toBe("Alpha");
    });

    it("does nothing for non-existent id", async () => {
      await useMenuStore.getState().updateItem(999, { name: "Ghost" });
      expect(menuService.updateMenuItem).not.toHaveBeenCalled();
    });
  });

  describe("deleteItem", () => {
    it("optimistically removes item", async () => {
      vi.mocked(menuService.deleteMenuItem).mockResolvedValueOnce({
        success: true,
        id: 1,
      });

      await useMenuStore.getState().deleteItem(1);
      expect(useMenuStore.getState().items).toHaveLength(2);
      expect(useToastStore.getState().toasts[0].message).toBe("Item deleted");
    });

    it("rolls back on failure", async () => {
      vi.mocked(menuService.deleteMenuItem).mockRejectedValueOnce(
        new Error("fail"),
      );

      await expect(useMenuStore.getState().deleteItem(1)).rejects.toThrow(
        "fail",
      );

      expect(useMenuStore.getState().items).toHaveLength(3);
    });
  });

  describe("toggleAvailability", () => {
    it("toggles active to inactive", async () => {
      vi.mocked(menuService.toggleAvailability).mockResolvedValueOnce({
        ...sampleItems[0],
        status: "inactive",
      });

      await useMenuStore.getState().toggleAvailability(1);
      const item = useMenuStore.getState().items.find((i) => i.id === 1);
      expect(item?.status).toBe("inactive");
    });

    it("toggles inactive to active", async () => {
      vi.mocked(menuService.toggleAvailability).mockResolvedValueOnce({
        ...sampleItems[1],
        status: "active",
      });

      await useMenuStore.getState().toggleAvailability(2);
      const item = useMenuStore.getState().items.find((i) => i.id === 2);
      expect(item?.status).toBe("active");
    });

    it("rolls back on failure", async () => {
      vi.mocked(menuService.toggleAvailability).mockRejectedValueOnce(
        new Error("fail"),
      );

      await expect(
        useMenuStore.getState().toggleAvailability(1),
      ).rejects.toThrow("fail");

      const item = useMenuStore.getState().items.find((i) => i.id === 1);
      expect(item?.status).toBe("active");
    });

    it("does nothing for non-existent id", async () => {
      await useMenuStore.getState().toggleAvailability(999);
      expect(menuService.toggleAvailability).not.toHaveBeenCalled();
    });
  });

  describe("loadItems", () => {
    it("fetches items from service", async () => {
      vi.mocked(menuService.fetchMenuItems).mockResolvedValueOnce(sampleItems);

      await useMenuStore.getState().loadItems();
      expect(useMenuStore.getState().items).toEqual(sampleItems);
      expect(useMenuStore.getState().loading).toBe(false);
    });

    it("sets loading false on error", async () => {
      vi.mocked(menuService.fetchMenuItems).mockRejectedValueOnce(
        new Error("fail"),
      );

      await expect(useMenuStore.getState().loadItems()).rejects.toThrow("fail");
      expect(useMenuStore.getState().loading).toBe(false);
    });
  });
});
