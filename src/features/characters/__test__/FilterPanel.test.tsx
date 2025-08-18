import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router";

import { FilterPanel } from "../components/FilterPanel";
import { FILTERS } from "../utils/constans";

let mockParams = new URLSearchParams();
const mockSetSearchParams = vi.fn();

vi.mock("react-router", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router")>();
  return {
    ...actual,

    useSearchParams: () => [mockParams, mockSetSearchParams],
  };
});

const renderComponent = (onClickClose = vi.fn()) =>
  render(
    <MemoryRouter>
      <FilterPanel onClickClose={onClickClose} />
    </MemoryRouter>
  );

describe("FilterPanel component", () => {
  beforeEach(() => {
    mockParams = new URLSearchParams();
    mockSetSearchParams.mockClear();
  });

  it("renders all filter categories", () => {
    renderComponent();

    Object.keys(FILTERS).forEach((filterName) => {
      const regex = new RegExp(`^${filterName}$`, "i");
      expect(screen.getByText(regex)).toBeInTheDocument();
    });
  });

  it("activates a filter button when clicked", () => {
    renderComponent();

    const firstFilter = FILTERS?.status?.find((f) => /alive/i.test(f.label));
    const button = screen.getByRole("button", {
      name: new RegExp(firstFilter?.label ?? "", "i"),
    });

    expect(button).not.toHaveClass("bg-gray-300");

    fireEvent.click(button);

    expect(button).toHaveClass("bg-gray-300");
  });

  it("applies filters and calls setSearchParams when clicking Filter", () => {
    const onClickClose = vi.fn();
    renderComponent(onClickClose);

    const aliveBtn = screen.getByRole("button", { name: /Alive/i });
    fireEvent.click(aliveBtn);

    const applyBtn = screen.getByRole("button", { name: /Filter/i });
    fireEvent.click(applyBtn);

    expect(mockSetSearchParams).toHaveBeenCalled();
    expect(onClickClose).toHaveBeenCalled();
  });

  it("closes panel when back button is clicked", () => {
    const onClickClose = vi.fn();
    renderComponent(onClickClose);

    const headerButton = screen.getAllByRole("button")[0];
    fireEvent.click(headerButton);

    expect(onClickClose).toHaveBeenCalled();
  });
});
