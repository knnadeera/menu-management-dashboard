import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Dropdown from "@/components/inputs/Dropdown";

const options = [
  { id: "cat1", name: "Category 1" },
  { id: "cat2", name: "Category 2" },
  { id: "cat3", name: "Category 3" },
];

describe("Dropdown component", () => {
  it("renders with a label", () => {
    render(<Dropdown id="cat" label="Category" options={options} />);
    expect(screen.getByLabelText("Category")).toBeInTheDocument();
  });

  it("renders all options", () => {
    render(<Dropdown id="cat" label="Category" options={options} />);
    expect(screen.getAllByRole("option")).toHaveLength(3);
  });

  it("renders required indicator", () => {
    render(<Dropdown id="cat" label="Category" options={options} required />);
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("renders error message", () => {
    render(
      <Dropdown id="cat" label="Category" options={options} error="Pick one" />,
    );
    expect(screen.getByRole("alert")).toHaveTextContent("Pick one");
  });

  it("calls onChange when an option is selected", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <Dropdown
        id="cat"
        label="Category"
        options={options}
        onChange={handleChange}
      />,
    );
    await user.selectOptions(screen.getByLabelText("Category"), "cat2");
    expect(handleChange).toHaveBeenCalled();
  });

  it("uses custom dropConfig for label/value fields", () => {
    const customOptions = [
      { code: "USD", label: "US Dollar" },
      { code: "EUR", label: "Euro" },
    ];
    render(
      <Dropdown
        id="currency"
        label="Currency"
        options={customOptions}
        dropConfig={{ labelField: "label", valueField: "code" }}
      />,
    );
    const opts = screen.getAllByRole("option");
    expect(opts[0]).toHaveTextContent("US Dollar");
    expect(opts[0]).toHaveValue("USD");
  });

  it("renders hint text", () => {
    render(
      <Dropdown
        id="cat"
        label="Category"
        options={options}
        hint="Choose one"
      />,
    );
    expect(screen.getByText("Choose one")).toBeInTheDocument();
  });
});
