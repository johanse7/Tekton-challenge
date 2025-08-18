// src/features/characters/__test__/CharacterList.test.tsx
import { createMockQuery } from "@/mocks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { CharacterList } from "../components/CharacterList";
import * as infinityHooks from "../hooks/useGetInfinityCharacters";

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

vi.mock("../hooks/useGetInfinityCharacters", () => ({
  useGetInfinityCharacters: vi.fn(),
}));

const renderComponent = () => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <CharacterList />
      </MemoryRouter>
    </QueryClientProvider>
  );
};

describe("CharacterList component", () => {
  it("renders loading skeleton when isLoading is true", () => {
    vi.spyOn(infinityHooks, "useGetInfinityCharacters").mockReturnValue(
      createMockQuery({
        data: { pages: [] },
        status: "pending",
        isFetchingNextPage: false,
        hasNextPage: false,
        fetchNextPage: vi.fn(),
      })
    );

    renderComponent();

    expect(screen.getByTestId("character-list-skeleton")).toBeInTheDocument();
  });

  it("renders character cards when data is available", () => {
    vi.spyOn(infinityHooks, "useGetInfinityCharacters").mockReturnValue(
      createMockQuery({
        data: {
          pages: [
            {
              results: [
                { id: 1, name: "Rick Sanchez", image: "rick.png" },
                { id: 2, name: "Morty Smith", image: "morty.png" },
              ],
            },
          ],
        },
        status: "success",
        isFetchingNextPage: false,
        hasNextPage: false,
        fetchNextPage: vi.fn(),
      })
    );

    renderComponent();

    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getByText("Morty Smith")).toBeInTheDocument();
  });

  it("renders no results message when data is empty", () => {
    vi.spyOn(infinityHooks, "useGetInfinityCharacters").mockReturnValue(
      createMockQuery({
        data: { pages: [{ results: [] }] },
        status: "error",
        error: new Error("Resource not found."),
        isFetchingNextPage: false,
        hasNextPage: false,
        fetchNextPage: vi.fn(),
        isError: true,
      })
    );

    renderComponent();

    expect(screen.getByText(/Resource not found./i)).toBeInTheDocument();
  });
});
