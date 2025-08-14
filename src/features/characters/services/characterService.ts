import api from "@/api/apiClient";
import type {
  CharacterListParams,
  CharacterResponse,
} from "../interfaces/character";

type Params = CharacterListParams & { page?: number };

export const getCharacters = async (
  params: Params
): Promise<CharacterResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const { data } = await api.get<CharacterResponse>("/character", { params });

  return data;
};
