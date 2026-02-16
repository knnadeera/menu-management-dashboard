import type { IMenuItem } from "@/types/menu.types";
import { mockMenuItems } from "@/data/mockData";

const delay = (ms = 1000) => new Promise((res) => setTimeout(res, ms));

export const menuService = {
  async fetchMenuItems(): Promise<IMenuItem[]> {
    await delay();
    return mockMenuItems.map((m) => ({ ...m }));
  },

  async createMenuItem(payload: Omit<IMenuItem, "id">): Promise<IMenuItem> {
    await delay();
    const created: IMenuItem = { ...payload, id: crypto.randomUUID() };
    return created;
  },

  async updateMenuItem(
    id: string | number,
    updates: Partial<IMenuItem>,
  ): Promise<IMenuItem> {
    await delay();
    const base =
      mockMenuItems.find((m) => m.id === id) ?? ({ id } as IMenuItem);
    return { ...base, ...updates, id } as IMenuItem;
  },

  async deleteMenuItem(
    id: string | number,
  ): Promise<{ success: true; id: string | number }> {
    await delay();
    return { success: true, id };
  },

  async toggleAvailability(
    id: string | number,
    currentStatus: IMenuItem["status"],
  ): Promise<IMenuItem> {
    await delay();
    const status = currentStatus === "active" ? "inactive" : "active";
    const base =
      mockMenuItems.find((m) => m.id === id) ?? ({ id } as IMenuItem);
    return { ...base, status } as IMenuItem;
  },
};
