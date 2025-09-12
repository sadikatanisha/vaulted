"use client";

import React from "react";
import Button from "@/components/ui/button";
import Image from "next/image";
import { Edit3, Trash2 } from "lucide-react";
import { useArtworksStore } from "../_libs/useArtworksStore";
import { useArtworks } from "../_services/use-queries";
import type { ArtworkSchema } from "../_types/schema";
import { useDeleteArtwork } from "../_services/use-mutations";
import { alert } from "@/lib/useGlobalStore";
type ArtworkCardsProps = {
  onDelete?: (id: string) => Promise<void> | void;
  onEdit?: (id: string) => void;
};

export default function ArtworkCards({ onDelete, onEdit }: ArtworkCardsProps) {
  const { updateSelectedArtworkId, updateArtworkDialogOpen } =
    useArtworksStore();
  const artworksQuery = useArtworks();
  const deleteArtworkMutation = useDeleteArtwork();

  const handleEdit = (id: string) => {
    if (onEdit) return onEdit(id);

    updateSelectedArtworkId(id);
    updateArtworkDialogOpen(true);
  };

  if (artworksQuery.isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-lg border  p-4 shadow-sm"
          >
            <div className="h-40 w-full rounded-md bg-gray-100" />
            <div className="mt-3 h-4 w-2/3 rounded bg-gray-100" />
            <div className="mt-2 flex items-center gap-2">
              <div className="h-8 w-20 rounded " />
              <div className="h-8 w-12 rounded bg-gray-100" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!artworksQuery.data || artworksQuery.data.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 text-sm text-muted-foreground">
        No items found — try creating one.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {artworksQuery.data.map((item: ArtworkSchema) => (
        <article
          key={item.id}
          className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border p-4 shadow transition-transform hover:-translate-y-1 hover:shadow-lg"
        >
          {/* image */}
          <div className="relative mb-3 h-44 w-full overflow-hidden rounded-lg ">
            {item.primaryImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.primaryImage}
                alt={item.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm text-gray-200">
                No image
              </div>
            )}

            {/* status badge */}
            {item.status && (
              <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-medium shadow">
                {item.status}
              </span>
            )}
          </div>

          {/* content */}
          <div className="mb-4 flex-1">
            <h3 className="line-clamp-2 min-h-[2.25rem] text-sm font-semibold text-slate-200">
              {item.title}
            </h3>

            <p className="mt-1 text-xs text-slate-300 line-clamp-2">
              {item.description || "No description"}
            </p>

            <div className="mt-3 flex items-center justify-between text-sm">
              <div>
                <div className="text-xs text-slate-400">Start</div>
                <div className="font-medium text-slate-300">
                  {new Date(item.startTime).toLocaleString()}
                </div>
              </div>

              <div>
                <div className="text-xs text-slate-400">End</div>
                <div className="font-medium text-slate-300">
                  {new Date(item.endTime).toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* footer actions */}
          <div className="mt-2 flex items-center justify-between gap-3">
            <div>
              <div className="text-xs text-slate-500">Current</div>
              <div className="text-sm font-semibold">${item.currentPrice}</div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-md p-0"
                onClick={() => {
                  updateSelectedArtworkId(item.id);
                  updateArtworkDialogOpen(true);
                }}
                title="Edit"
              >
                <Edit3 className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-md p-0 text-red-600 hover:bg-red-50"
                onClick={() => {
                  alert({
                    onConfirm: () => deleteArtworkMutation.mutate(item.id),
                  });
                }}
                title="Delete"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
