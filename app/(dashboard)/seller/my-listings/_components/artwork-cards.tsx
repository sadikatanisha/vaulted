"use client";
import Button from "@/components/ui/button";
import { useArtworksStore } from "../_libs/useArtworksStore";
import { useArtworks } from "../_services/use-queries";
import Link from "next/link";

export default function ArtworkCards() {
  const { updateSelectedArtworkId, updateArtworkDialogOpen } =
    useArtworksStore();
  const artworksQuery = useArtworks();

  if (artworksQuery.data?.length === 0) {
    return <div>No Items Found</div>;
  }
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
      {artworksQuery.isLoading ? (
        <div>Loading ...</div>
      ) : (
        <>
          {artworksQuery.data?.map((item) => (
            <div
              className="flex flex-col justify-between gap-3 rounded-lg border p-6"
              key={item.id}
            >
              <p className="truncate">{item.title}</p>
              <div className="flex gap-5">
                <Button className="size-12" variant="ghost" size="icon">
                  Edit
                </Button>
                <Button className="size-12" variant="ghost" size="icon">
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
