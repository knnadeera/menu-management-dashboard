import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ToastContainer from "@/components/ui/ToastContainer";
import { useToastStore } from "@/stores/toastStore";

describe("ToastContainer component", () => {
  beforeEach(() => {
    useToastStore.setState({ toasts: [] });
  });

  it("renders nothing when there are no toasts", () => {
    const { container } = render(<ToastContainer />);
    expect(container.firstChild).toBeNull();
  });

  it("renders toasts and auto-dismisses after duration", async () => {
    const user = userEvent.setup();
    const id = useToastStore.getState().addToast("Saved", "success", 1000);
    render(<ToastContainer />);
    expect(screen.getByText("Saved")).toBeInTheDocument();
    await user.click(screen.getByLabelText("Dismiss"));
    expect(useToastStore.getState().toasts.length).toBe(0);
  });

  it("removes toast when dismiss button is clicked", async () => {
    const user = userEvent.setup();
    const id = useToastStore.getState().addToast("Dismiss me", "info", 4000);
    render(<ToastContainer />);
    await user.click(screen.getByLabelText("Dismiss"));
    expect(useToastStore.getState().toasts.length).toBe(0);
  });
});
