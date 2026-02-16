import { describe, it, expect, vi, beforeEach } from "vitest";
import { menuService } from "@/services/menuService";
import { mockMenuItems } from "@/data/mockData";

vi.mock("@/services/menuService", async (importOriginal) => {
  const mod = await importOriginal<typeof import("@/services/menuService")>();
  return mod;
});

describe("menuService", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it("fetchMenuItems returns a copy of mock data", async () => {
    const promise = menuService.fetchMenuItems();
    vi.advanceTimersByTime(1500);
    const items = await promise;
    expect(items).toHaveLength(mockMenuItems.length);
    expect(items[0]).not.toBe(mockMenuItems[0]);
    expect(items[0]).toEqual(mockMenuItems[0]);
  });

  it("createMenuItem returns a new item with a generated id", async () => {
    const payload = {
      name: "New Item",
      category: "Starters",
      price: 500,
      status: "active" as const,
      description: "Test desc",
      image: "https://example.com/img.jpg",
    };
    const promise = menuService.createMenuItem(payload);
    vi.advanceTimersByTime(1500);
    const created = await promise;
    expect(created.name).toBe("New Item");
    expect(created.id).toBeDefined();
    expect(typeof created.id).toBe("string");
  });

  it("updateMenuItem merges updates into the base item", async () => {
    const promise = menuService.updateMenuItem(1, { name: "Updated Salmon" });
    vi.advanceTimersByTime(1500);
    const updated = await promise;
    expect(updated.id).toBe(1);
    expect(updated.name).toBe("Updated Salmon");
    expect(updated.category).toBe("Main Courses");
  });

  it("updateMenuItem falls back gracefully for unknown id", async () => {
    const promise = menuService.updateMenuItem("unknown-id", {
      name: "Ghost",
    });
    vi.advanceTimersByTime(1500);
    const updated = await promise;
    expect(updated.id).toBe("unknown-id");
    expect(updated.name).toBe("Ghost");
  });

  it("deleteMenuItem returns success with the id", async () => {
    const promise = menuService.deleteMenuItem(1);
    vi.advanceTimersByTime(1500);
    const result = await promise;
    expect(result).toEqual({ success: true, id: 1 });
  });

  it("toggleAvailability flips active to inactive", async () => {
    const promise = menuService.toggleAvailability(1, "active");
    vi.advanceTimersByTime(1500);
    const toggled = await promise;
    expect(toggled.status).toBe("inactive");
  });

  it("toggleAvailability flips inactive to active", async () => {
    const promise = menuService.toggleAvailability(3, "inactive");
    vi.advanceTimersByTime(1500);
    const toggled = await promise;
    expect(toggled.status).toBe("active");
  });
});
