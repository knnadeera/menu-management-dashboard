import { describe, it, expect } from "vitest";
import { mockMenuItems, categories } from "@/data/mockData";

describe("mockData", () => {
  describe("mockMenuItems", () => {
    it("contains 8 items", () => {
      expect(mockMenuItems).toHaveLength(8);
    });

    it("each item has required fields", () => {
      for (const item of mockMenuItems) {
        expect(item).toHaveProperty("id");
        expect(item).toHaveProperty("name");
        expect(item).toHaveProperty("category");
        expect(item).toHaveProperty("price");
        expect(item).toHaveProperty("status");
        expect(item).toHaveProperty("description");
      }
    });

    it("prices are positive numbers", () => {
      for (const item of mockMenuItems) {
        expect(item.price).toBeGreaterThan(0);
      }
    });

    it("statuses are valid", () => {
      for (const item of mockMenuItems) {
        expect(["active", "inactive"]).toContain(item.status);
      }
    });

    it("ids are unique", () => {
      const ids = mockMenuItems.map((m) => m.id);
      expect(new Set(ids).size).toBe(ids.length);
    });
  });

  describe("categories", () => {
    it("contains 5 categories", () => {
      expect(categories).toHaveLength(5);
    });

    it("each category has id and name", () => {
      for (const cat of categories) {
        expect(cat).toHaveProperty("id");
        expect(cat).toHaveProperty("name");
        expect(typeof cat.id).toBe("string");
        expect(typeof cat.name).toBe("string");
      }
    });

    it("includes expected categories", () => {
      const names = categories.map((c) => c.name);
      expect(names).toContain("Starters");
      expect(names).toContain("Main Courses");
      expect(names).toContain("Desserts");
      expect(names).toContain("Beverages");
      expect(names).toContain("Specials");
    });
  });
});
