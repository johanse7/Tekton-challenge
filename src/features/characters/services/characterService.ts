import api from "@/api/apiClient";
import type {
  CharacterListParams,
  CharacterResponse,
} from "../interfaces/character";

type Params = CharacterListParams & { page?: number };

export const getCharacters = async (
  params: Params
): Promise<CharacterResponse> => {
  const { data } = await api.get<CharacterResponse>("/character", { params });

  return data;
};
