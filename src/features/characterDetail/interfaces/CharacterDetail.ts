import type { Character } from "@/features/characters/interfaces/character";

export interface CharacterDetail extends Character {
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };

  episode: string[];
}

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}
