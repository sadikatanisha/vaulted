"use client";

import {
  updateArtwork,
  deleteArtwork,
} from "@/app/(dashboard)/seller/my-listings/_services/mutations";
import type { ArtworkSchema } from "../_types/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useUpdateArtwork = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ArtworkSchema) => {
      await updateArtwork(data);
    },
    onSuccess: () => {
      toast.success("Artwork updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["artworks"] });
      // optionally invalidate single artwork too:
      // queryClient.invalidateQueries({ queryKey: ["artwork", data.id] });
    },
  });
};

const useDeleteArtwork = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await deleteArtwork(id);
    },
    onSuccess: () => {
      toast.success("Artwork deleted successfully.");
      queryClient.invalidateQueries({ queryKey: ["artworks"] });
    },
  });
};

export { useUpdateArtwork, useDeleteArtwork };
