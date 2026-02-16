import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PopupModal from "@/components/ui/PopupModal";

describe("PopupModal component", () => {
  it("renders the title", () => {
    render(
      <PopupModal title="Test Modal" onCloseModal={() => {}}>
        <p>Body</p>
      </PopupModal>,
    );
    expect(screen.getByText("Test Modal")).toBeInTheDocument();
  });

  it("renders children", () => {
    render(
      <PopupModal title="Modal" onCloseModal={() => {}}>
        <p>Child content</p>
      </PopupModal>,
    );
    expect(screen.getByText("Child content")).toBeInTheDocument();
  });

  it("calls onCloseModal when close button is clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <PopupModal title="Modal" onCloseModal={onClose}>
        <p>Body</p>
      </PopupModal>,
    );
    // The close button has aria-label "Close modal"
    const closeButtons = screen.getAllByLabelText("Close modal");
    await user.click(closeButtons[1]); // The X button (second one)
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onCloseModal when backdrop is clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <PopupModal title="Modal" onCloseModal={onClose}>
        <p>Body</p>
      </PopupModal>,
    );
    // The backdrop is the first "Close modal" button
    const closeButtons = screen.getAllByLabelText("Close modal");
    await user.click(closeButtons[0]);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
