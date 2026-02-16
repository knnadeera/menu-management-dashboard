import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Textarea from "@/components/inputs/Textarea";

describe("Textarea component", () => {
  it("renders with a label", () => {
    render(<Textarea id="desc" label="Description" />);
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
  });

  it("renders required indicator", () => {
    render(<Textarea id="desc" label="Description" required />);
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("renders error message", () => {
    render(<Textarea id="desc" label="Description" error="Required" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Required");
  });

  it("sets aria-invalid when error is present", () => {
    render(<Textarea id="desc" label="Description" error="Required" />);
    expect(screen.getByLabelText("Description")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("renders hint text", () => {
    render(<Textarea id="desc" label="Description" hint="Short description" />);
    expect(screen.getByText("Short description")).toBeInTheDocument();
  });

  it("calls onChange when typing", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Textarea id="desc" label="Description" onChange={handleChange} />);
    await user.type(screen.getByLabelText("Description"), "Hello");
    expect(handleChange).toHaveBeenCalled();
  });

  it("calls onClearError when valid input while error exists", async () => {
    const user = userEvent.setup();
    const onClearError = vi.fn();
    render(
      <Textarea
        id="desc"
        label="Description"
        error="Required"
        onClearError={onClearError}
      />,
    );
    await user.type(screen.getByLabelText("Description"), "a");
    expect(onClearError).toHaveBeenCalled();
  });

  it("applies rows prop", () => {
    render(<Textarea id="desc" label="Description" rows={5} />);
    expect(screen.getByLabelText("Description")).toHaveAttribute("rows", "5");
  });
});
