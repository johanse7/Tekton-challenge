import { useQuery } from "@tanstack/react-query";
import { getLocation } from "../services/getLocation";

export const useGetLocation = (url?: string) => {
  return useQuery({
    queryKey: ["location", url],
    queryFn: () => getLocation(url!),
    staleTime: 1000 * 60 * 5,
    enabled: !!url,
  });
};
