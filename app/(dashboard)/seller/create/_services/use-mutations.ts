import { createArtwork } from "./muations";
import { ArtworkSchema } from "../_types/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useCreateArtwork = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ArtworkSchema) => createArtwork(data, userId),
    onSuccess: () => {
      toast.success("Artwork created successfully");
      queryClient.invalidateQueries({ queryKey: ["artworks"] });
    },
  });
};

export { useCreateArtwork };
