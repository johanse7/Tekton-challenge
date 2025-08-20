import * as locationHooks from "@/features/characterDetail/hooks/useGetLocation";
import { createMockQuery } from "@/mocks";
import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Location } from "../components/Location";

vi.mock("../hooks/useGetLocation");

vi.mock("@tanstack/react-query", async () => {
  const actual = await vi.importActual("@tanstack/react-query");
  return {
    ...actual,
    useQueries: vi.fn(),
  };
});

describe("Location component", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders skeleton while loading", () => {
    vi.spyOn(locationHooks, "useGetLocation").mockReturnValue(
      createMockQuery({
        data: undefined,
        isLoading: true,
      })
    );
    const locationUrl = "https://rickandmortyapi.com/api/location/20";
    render(<Location locationUrl={locationUrl} />);

    expect(screen.getByTestId("location-skeleton")).toBeInTheDocument();
  });

  it("renders unknown location when no data", () => {
    vi.spyOn(locationHooks, "useGetLocation").mockReturnValue(
      createMockQuery({
        data: undefined,
        isLoading: false,
      })
    );

    render(<Location locationUrl="test-url" />);

    expect(screen.getByText(/Unknown location/i)).toBeInTheDocument();
  });

  it("renders location details when data is available", () => {
    const mockLocation = {
      name: "Earth",
      type: "Planet",
      dimension: "C-137",
      residents: [],
    };

    vi.spyOn(locationHooks, "useGetLocation").mockReturnValue(
      createMockQuery({
        data: mockLocation,
        isLoading: false,
      })
    );

    render(<Location locationUrl="test-url" />);

    expect(screen.getByText("Earth")).toBeInTheDocument();
    expect(screen.getByText(/type:/i)).toBeInTheDocument();
    expect(screen.getByText(/Dimension:/i)).toBeInTheDocument();
  });
});
