import type { FilterType } from "../interfaces/character";

export const TYPING_DELAY = 300;

export const FILTERS: Partial<
  Record<FilterType, Array<{ label: string; value: string }>>
> = {
  status: [
    { label: "All", value: "" },
    { label: "Alive", value: "Alive" },
    { label: "Dead", value: "Dead" },
    { label: "Unknown", value: "unknown" },
  ],
  species: [
    { label: "All", value: "" },
    { label: "Human", value: "Human" },
    { label: "Alien", value: "Alien" },
  ],
  gender: [
    { label: "All", value: "" },
    { label: "Female", value: "Female" },
    { label: "Male", value: "Male" },
    { label: "Genderless", value: "Genderless" },
    { label: "Unknown", value: "unknown" },
  ],
} as const;

export const INITIAL_STATE_FILTERS: Partial<Record<FilterType, string>> = {
  status: "",
  species: "",
  gender: "",
};

export const COLUMNS_RESPONSIVE = {
  MOBILE: 1,
  TABLET: 2,
  DESKTOP: 3,
};
