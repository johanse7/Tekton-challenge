import api from "@/api/apiClient";
import type { Location } from "../interfaces/CharacterDetail";

export const getLocation = async (url: string): Promise<Location> => {

  const { data } = await api.get<Location>(url, { baseURL: "" });

  return data;
};
