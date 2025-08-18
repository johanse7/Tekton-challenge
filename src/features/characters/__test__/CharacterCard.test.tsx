import type { Character } from "@/features/characters/interfaces/character";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CharacterCard } from "../components/CharacterCard";

describe("CharacterCard component", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  const mockCharacter: Character = {
    id: 1,
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Male",
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  };

  it("renders character details correctly", () => {
    render(
      <MemoryRouter>
        <CharacterCard character={mockCharacter} />
      </MemoryRouter>
    );

    // Verifica nombre
    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();

    const img = screen.getByAltText(mockCharacter.name) as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.status)).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.gender)).toBeInTheDocument();
  });
});
