import api from "@/api/apiClient";
import type { CharacterDetail } from "../interfaces/CharacterDetail";

export const getCharacter = async (id: string): Promise<CharacterDetail> => {

  const { data } = await api.get<CharacterDetail>(`/character/${id}`);

  return data;
};

export const getCharacterByUrl = async (
  url: string
): Promise<CharacterDetail> => {

  const { data } = await api.get<CharacterDetail>(url, { baseURL: "" });

  return data;
};
