//use-mutations.ts
import { createArtwork } from "./mutations";
import { ArtworkSchema } from "../_types/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useCreateArtwork = (userId: string) => {
  console.log(userId);
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
