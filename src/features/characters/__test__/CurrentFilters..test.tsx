// src/features/characters/__test__/CurrentFilters.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { CurrentFilters } from "../components/CurrentFilters";

// --- Mock useSearchParams ---
const mockSetSearchParams = vi.fn();
let mockParams = new URLSearchParams();

vi.mock("react-router", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router")>();
  return {
    ...actual,
    useSearchParams: () => {
      return [mockParams, mockSetSearchParams];
    },
  };
});

describe("CurrentFilters", () => {
  beforeEach(() => {
    mockParams = new URLSearchParams();
    mockSetSearchParams.mockClear();
  });

  it("renders nothing if there are no filters", () => {
    render(<CurrentFilters />);
    expect(screen.queryByText(/Filter/i)).not.toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("renders active filters", () => {
    mockParams = new URLSearchParams({ status: "alive", gender: "male" });

    render(<CurrentFilters />);

    expect(screen.getByText("alive")).toBeInTheDocument();
    expect(screen.getByText("male")).toBeInTheDocument();
  });

  it("calls setSearchParams when removing a filter", () => {
    mockParams = new URLSearchParams({ status: "alive" });

    render(<CurrentFilters />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockSetSearchParams).toHaveBeenCalled();
    const newParams = mockSetSearchParams?.mock?.calls?.[0]?.[0];
    expect(newParams?.get("status")).toBeNull();
  });
});
