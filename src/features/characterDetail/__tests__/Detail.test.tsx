import { Detail } from "@/features/characterDetail/components/Detail";
import * as locationHooks from "@/features/characterDetail/hooks/useGetLocation";
import * as characterHooks from "@/features/characterDetail/hooks/useGetSingleCharacter";
import { createMockQuery } from "@/mocks";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockCharacter = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive",
  image: "https://fakeimg.com/rick.png",
  species: "Human",
  gender: "Male",
  type: "",
  location: { name: "Earth", url: "https://rickandmortyapi.com/location/1" },
};

describe("Detail component", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders loading skeleton when isLoading is true", () => {
    vi.spyOn(characterHooks, "useGetSingleCharacter").mockReturnValue(
      createMockQuery({
        data: undefined,
        isLoading: true,
        isError: false,
        error: null,
      })
    );
    vi.spyOn(locationHooks, "useGetLocation").mockReturnValue(
      createMockQuery({
        data: [],
        isLoading: true,
        isError: false,
        error: null,
      })
    );

    render(
      <MemoryRouter initialEntries={["/character/1"]}>
        <Routes>
          <Route path="/character/:id" element={<Detail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId("detail-skeleton")).toBeInTheDocument();
  });

  it("renders error handler when isError is true", () => {
    const mockError = new Error("Failed to fetch");

    vi.spyOn(characterHooks, "useGetSingleCharacter").mockReturnValue(
      createMockQuery({
        data: undefined,
        isLoading: false,
        isError: true,
        error: mockError,
      })
    );
    vi.spyOn(locationHooks, "useGetLocation").mockReturnValue(
      createMockQuery({
        data: [],
        isLoading: false,
        isError: false,
        error: null,
      })
    );

    render(
      <MemoryRouter initialEntries={["/character/1"]}>
        <Routes>
          <Route path="/character/:id" element={<Detail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/failed to fetch/i)).toBeInTheDocument();
  });

  it("renders character details when data is loaded", () => {
    vi.spyOn(characterHooks, "useGetSingleCharacter").mockReturnValue(
      createMockQuery({
        data: mockCharacter,
        isLoading: false,
        isError: false,
        error: null,
      })
    );
    vi.spyOn(locationHooks, "useGetLocation").mockReturnValue(
      createMockQuery({
        data: undefined,
        isLoading: true,
        isError: false,
        error: null,
      })
    );

    render(
      <MemoryRouter initialEntries={["/character/1"]}>
        <Routes>
          <Route path="/character/:id" element={<Detail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByLabelText("character-name")).toBeInTheDocument();
    expect(screen.getByAltText("Rick Sanchez")).toHaveAttribute(
      "src",
      mockCharacter.image
    );
    expect(screen.getByText(/species/i)).toBeInTheDocument();
    expect(screen.getByText(/gender/i)).toBeInTheDocument();
  });
});
