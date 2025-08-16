export interface Character {
  id: number;
  name: string;
  status: StatusType;
  species: string;
  type: string;
  gender: string;
}

export type StatusType = "Alive" | "Dead" | "Unknown";

export type FilterType = "status" | "species" | "gender" | "name";

export interface CharacterResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

export interface CharacterListParams {
  name?: string;
  status?: string;
  gender?: string;
  species?: string;
}

