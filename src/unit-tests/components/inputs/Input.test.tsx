import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from "@/components/inputs/Input";

describe("Input component", () => {
  it("renders with a label", () => {
    render(<Input id="name" label="Name" />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
  });

  it("renders required indicator", () => {
    render(<Input id="name" label="Name" required />);
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("renders error message", () => {
    render(<Input id="name" label="Name" error="Required" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Required");
  });

  it("sets aria-invalid when error is present", () => {
    render(<Input id="name" label="Name" error="Required" />);
    expect(screen.getByLabelText("Name")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("renders hint text", () => {
    render(<Input id="name" label="Name" hint="Enter your name" />);
    expect(screen.getByText("Enter your name")).toBeInTheDocument();
  });

  it("calls onChange when typing", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Input id="name" label="Name" onChange={handleChange} />);
    await user.type(screen.getByLabelText("Name"), "Hello");
    expect(handleChange).toHaveBeenCalled();
  });

  it("calls onClearError when valid input is provided while error exists", async () => {
    const user = userEvent.setup();
    const onClearError = vi.fn();
    render(
      <Input
        id="name"
        label="Name"
        error="Required"
        onClearError={onClearError}
      />,
    );
    await user.type(screen.getByLabelText("Name"), "a");
    expect(onClearError).toHaveBeenCalled();
  });

  it("passes extra props to the input element", () => {
    render(
      <Input id="name" label="Name" placeholder="Type here" type="email" />,
    );
    const input = screen.getByLabelText("Name");
    expect(input).toHaveAttribute("placeholder", "Type here");
    expect(input).toHaveAttribute("type", "email");
  });
});
