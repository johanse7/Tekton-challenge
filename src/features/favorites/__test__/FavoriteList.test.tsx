import type { CharacterDetail } from "@/features/characterDetail/interfaces/CharacterDetail";
import { FavoriteList } from "@/features/favorites/components/FavoriteList";
import * as hooks from "@/features/favorites/hooks/useGetFavoriteCharacters";
import { createMockQuery } from "@/mocks";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockFavorites: Array<CharacterDetail> = [
  {
    id: 1,
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Male",
    origin: {
      name: "Earth (C-137)",
      url: "https://rickandmortyapi.com/api/location/1",
    },
    location: {
      name: "Citadel of Ricks",
      url: "https://rickandmortyapi.com/api/location/3",
    },
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    episode: [],
  },
  {
    id: 2,
    name: "Morty Smith",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Male",
    origin: {
      name: "unknown",
      url: "",
    },
    location: {
      name: "Citadel of Ricks",
      url: "https://rickandmortyapi.com/api/location/3",
    },
    image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
    episode: [],
  },
];

describe("FavoriteList", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders loading skeleton when isLoading is true", () => {
    vi.spyOn(hooks, "useGetFavoriteCharacters").mockReturnValue(
      createMockQuery({
        data: [],
        isLoading: true,
      })
    );

    render(
      <MemoryRouter>
        <FavoriteList />
      </MemoryRouter>
    );

    expect(screen.getByTestId("favorite-list-skeleton")).toBeInTheDocument();
  });

  it("renders message when there are no favorites", () => {
    vi.spyOn(hooks, "useGetFavoriteCharacters").mockReturnValue(
      createMockQuery({
        data: [],
        isLoading: false,
      })
    );

    render(
      <MemoryRouter>
        <FavoriteList />
      </MemoryRouter>
    );

    expect(screen.getByText(/There no favorites/i)).toBeInTheDocument();
  });

  it("renders favorite items when favorites exist", () => {
    vi.spyOn(hooks, "useGetFavoriteCharacters").mockReturnValue(
      createMockQuery({
        data: mockFavorites,
        isLoading: false,
      })
    );

    render(
      <MemoryRouter>
        <FavoriteList />
      </MemoryRouter>
    );

    mockFavorites.forEach((fav) => {
      const link = screen.getByTitle(fav.name);
      expect(link).toHaveAttribute("href", `/character/${fav.id}`);
    });
  });
});
