import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Search } from "../components/Search";
import { TYPING_DELAY } from "../utils/constans";

const mockSetSearchParams = vi.fn();
vi.mock("react-router", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router")>();
  return {
    ...actual,
    useSearchParams: () => {
      const params = new URLSearchParams();
      return [params, mockSetSearchParams];
    },
  };
});

vi.mock("../components/FilterPanel", () => ({
  FilterPanel: () => <div data-testid="filter-panel">Filter</div>,
}));

describe("Search component", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockSetSearchParams.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("updates search param after debounce", () => {
    render(<Search />);

    const input = screen.getByPlaceholderText(/search or filter characters/i);

    fireEvent.change(input, { target: { value: "Rick" } });

    vi.advanceTimersByTime(TYPING_DELAY);

    expect(mockSetSearchParams).toHaveBeenCalled();
    const params = mockSetSearchParams.mock.calls[0][0];
    expect(params.get("name")).toBe("Rick");
  });

  it("removes search param when cleared", () => {
    render(<Search />);
    const input = screen.getByPlaceholderText(/search or filter characters/i);

    fireEvent.change(input, { target: { value: "Morty" } });
    vi.advanceTimersByTime(TYPING_DELAY);

    fireEvent.change(input, { target: { value: "" } });
    vi.advanceTimersByTime(TYPING_DELAY);

    const params = mockSetSearchParams?.mock?.calls?.at(-1)?.[0];
    expect(params?.get("name")).toBeNull();
  });
});
