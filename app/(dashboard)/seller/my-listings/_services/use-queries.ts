import { useArtworksStore } from "../_libs/useArtworksStore";
import { getArtwork, getArtworks } from "./services";
import { useQuery } from "@tanstack/react-query";
import type { ArtworkSchema } from "../_types/schema";

export const useArtworks = () => {
  return useQuery<ArtworkSchema[], Error>({
    queryKey: ["artworks"],
    queryFn: getArtworks,
  });
};

export const useArtwork = () => {
  const { selectedArtworkId } = useArtworksStore();

  return useQuery<ArtworkSchema | null, Error>({
    queryKey: ["artwork", selectedArtworkId],
    queryFn: () => getArtwork(selectedArtworkId as string),
    enabled: Boolean(selectedArtworkId),
  });
};
