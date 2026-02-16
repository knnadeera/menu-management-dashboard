import { describe, it, expect, beforeEach } from "vitest";
import { useToastStore } from "@/stores/toastStore";

describe("toastStore", () => {
  beforeEach(() => {
    useToastStore.setState({ toasts: [] });
  });

  it("starts with empty toasts", () => {
    expect(useToastStore.getState().toasts).toEqual([]);
  });

  it("addToast adds a toast and returns its id", () => {
    const id = useToastStore.getState().addToast("Hello", "info");
    expect(typeof id).toBe("string");
    const toasts = useToastStore.getState().toasts;
    expect(toasts).toHaveLength(1);
    expect(toasts[0].message).toBe("Hello");
    expect(toasts[0].type).toBe("info");
    expect(toasts[0].duration).toBe(4000);
  });

  it("addToast uses custom type and duration", () => {
    useToastStore.getState().addToast("Error!", "error", 2000);
    const t = useToastStore.getState().toasts[0];
    expect(t.type).toBe("error");
    expect(t.duration).toBe(2000);
  });

  it("addToast defaults type to info", () => {
    useToastStore.getState().addToast("Default");
    expect(useToastStore.getState().toasts[0].type).toBe("info");
  });

  it("removeToast removes a specific toast", () => {
    const id1 = useToastStore.getState().addToast("First");
    const id2 = useToastStore.getState().addToast("Second");
    useToastStore.getState().removeToast(id1);
    const toasts = useToastStore.getState().toasts;
    expect(toasts).toHaveLength(1);
    expect(toasts[0].id).toBe(id2);
  });

  it("clear removes all toasts", () => {
    useToastStore.getState().addToast("A");
    useToastStore.getState().addToast("B");
    useToastStore.getState().clear();
    expect(useToastStore.getState().toasts).toEqual([]);
  });

  it("handles removing a non-existent id gracefully", () => {
    useToastStore.getState().addToast("Only");
    useToastStore.getState().removeToast("does-not-exist");
    expect(useToastStore.getState().toasts).toHaveLength(1);
  });
});
