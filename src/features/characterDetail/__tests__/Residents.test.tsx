import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import * as residentsHooks from "@/features/characterDetail/hooks/useGetMultipleCharacters";
import { createMockQuery } from "@/mocks";
import { MemoryRouter } from "react-router";
import { Residents } from "../components/Residents";

vi.mock("../hooks/useGetMultipleCharacters");

vi.mock("@tanstack/react-query", async () => {
  const actual = await vi.importActual("@tanstack/react-query");
  return {
    ...actual,
    useQueries: vi.fn(),
  };
});

describe("Residents component", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders message when there are no residents", () => {
    render(<Residents residents={[]} />);

    expect(
      screen.getByText(/No residents found in this location/i)
    ).toBeInTheDocument();
  });

  it("renders skeletons when characters are loading", () => {
    vi.spyOn(residentsHooks, "useGetMultipleCharacters").mockReturnValue(
      [
        { isLoading: true, data: undefined },
        { isLoading: true, data: undefined },
      ].map((response) => createMockQuery(response))
    );

    render(<Residents residents={["url1", "url2"]} />);

    expect(screen.getAllByTestId("skeleton")).toHaveLength(2);
  });

  it("renders character images when data is available", () => {
    vi.spyOn(residentsHooks, "useGetMultipleCharacters").mockReturnValue(
      [
        { isLoading: false, data: { id: 1, name: "Rick", image: "/rick.png" } },
        {
          isLoading: false,
          data: { id: 2, name: "Morty", image: "/morty.png" },
        },
      ].map((response) => createMockQuery(response))
    );

    render(
      <MemoryRouter>
        <Residents residents={["url1", "url2"]} />;
      </MemoryRouter>
    );

    expect(screen.getByTitle("Rick")).toBeInTheDocument();
    expect(screen.getByTitle("Morty")).toBeInTheDocument();
    expect(screen.getByAltText("Portrait of Rick")).toBeInTheDocument();
    expect(screen.getByAltText("Portrait of Morty")).toBeInTheDocument();
  });
});
