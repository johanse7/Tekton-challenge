import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useFavoriteCharactersStore } from "@/features/favorites/store";
import { LikeButton } from "../components/LikeButton";

// mock the store
vi.mock("@/features/favorites/store", () => {
  return {
    useFavoriteCharactersStore: vi.fn(),
  };
});

type MockFavoritesState = {
  favorites: number[];
  isFavorite: (id: number) => boolean;
  toggleFavorite: (id: number) => void;
};

describe("LikeButton", () => {
  const toggleFavoriteMock = vi.fn();
  const isFavoriteMock = vi.fn();

  const mockedStore = vi.mocked(useFavoriteCharactersStore);

  beforeEach(() => {
    vi.clearAllMocks();

    mockedStore.mockImplementation(
      (selector: (state: MockFavoritesState) => unknown) =>
        selector({
          favorites: [],
          isFavorite: isFavoriteMock.mockReturnValue(false),
          toggleFavorite: toggleFavoriteMock,
        })
    );
  });

  it("renders the button and SVG icon", () => {
    render(<LikeButton characterId={1} />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();

    const svg = button.querySelector("svg") as SVGElement;
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass("text-gray-500");
  });

  it("calls toggleFavorite when clicked", async () => {
    const user = userEvent.setup();
    render(<LikeButton characterId={1} />);

    const button = screen.getByRole("button");
    await user.click(button);

    expect(toggleFavoriteMock).toHaveBeenCalledWith(1);
  });

  it("shows red heart when character is favorite", () => {
    mockedStore.mockImplementation(
      (selector: (state: MockFavoritesState) => unknown) =>
        selector({
          favorites: [1],
          isFavorite: vi.fn().mockReturnValue(true),
          toggleFavorite: toggleFavoriteMock,
        })
    );

    render(<LikeButton characterId={1} />);

    const button = screen.getByRole("button");
    const svg = button.querySelector("svg") as SVGElement;

    expect(svg).toHaveClass("text-red-500");
  });
});
