"use client";

import React, { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useArtworksStore } from "../_libs/useArtworksStore";
import { useArtwork } from "../_services/use-queries";
import { useUpdateArtwork } from "../_services/use-mutations";

import {
  ArtworkSchema,
  artworkDefaultValues,
  artworkSchema,
} from "../_types/schema";

import { Button } from "@/components/ui/button";
import { ControlledInput } from "@/components/ui/controlled/controlled-input";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

type ArtworkFormDialogProps = {
  smallTrigger?: boolean;
};

const toDateTimeLocal = (iso?: string | null) =>
  iso ? new Date(iso).toISOString().slice(0, 16) : "";
const toIsoString = (dt?: string | undefined) =>
  dt ? new Date(dt).toISOString() : "";

export const ArtworkFormDialog = ({ smallTrigger }: ArtworkFormDialogProps) => {
  // hooks — ALWAYS called (keeps hook count stable)
  const form = useForm<ArtworkSchema>({
    defaultValues: artworkDefaultValues,
    resolver: zodResolver(artworkSchema),
  });

  const {
    selectedArtworkId,
    updateSelectedArtworkId,
    artworkDialogOpen,
    updateArtworkDialogOpen,
  } = useArtworksStore();

  const artworkQuery = useArtwork();
  const updateArtworkMutation = useUpdateArtwork();

  // make UI decisions from values — but DON'T conditionally call hooks
  const isSaving = updateArtworkMutation.isPending;

  // populate form when artwork data arrives
  useEffect(() => {
    if (!selectedArtworkId) {
      // reset to defaults when no selection
      form.reset(artworkDefaultValues);
      return;
    }

    if (!artworkQuery.data) return;

    const payload: Partial<ArtworkSchema> = {
      ...artworkQuery.data,
      startTime: toDateTimeLocal(artworkQuery.data.startTime),
      endTime: toDateTimeLocal(artworkQuery.data.endTime),
      action: "update",
    };

    form.reset(payload as ArtworkSchema);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [artworkQuery.data, selectedArtworkId]);

  const handleDialogOpenChange = (open: boolean) => {
    updateArtworkDialogOpen(open);

    if (!open) {
      updateSelectedArtworkId(null);
      form.reset(artworkDefaultValues);
    }
  };

  const handleSuccess = () => {
    handleDialogOpenChange(false);
  };

  const onSubmit: SubmitHandler<ArtworkSchema> = (data) => {
    if (!selectedArtworkId) return; // guard — should not happen but safe

    const payload: ArtworkSchema = {
      ...(data as ArtworkSchema),
      startTime: toIsoString((data as any).startTime),
      endTime: toIsoString((data as any).endTime),
      action: "update",
    };

    updateArtworkMutation.mutate(payload, {
      onSuccess: handleSuccess,
    });
  };

  // If there's no selectedArtworkId, we still render the component (hooks stable)
  // but show nothing useful until an artwork is selected.
  return (
    <Dialog
      open={artworkDialogOpen}
      onOpenChange={handleDialogOpenChange}
      key={selectedArtworkId ?? "none"}
    >
      {/* optional small trigger */}
      {smallTrigger && (
        <DialogTrigger asChild>
          <Button size="icon" variant="ghost" title="Edit artwork">
            <Plus />
          </Button>
        </DialogTrigger>
      )}

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {selectedArtworkId ? "Edit Artwork" : "Edit Artwork (no selection)"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormProvider {...form}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <ControlledInput<ArtworkSchema>
                  name="title"
                  label="Title"
                  placeholder="Artwork title"
                />
              </div>

              <div className="sm:col-span-2">
                <ControlledInput<ArtworkSchema>
                  name="description"
                  label="Description"
                  placeholder="Short description"
                />
              </div>

              <div>
                <ControlledInput<ArtworkSchema>
                  name="startingPrice"
                  label="Starting price"
                  placeholder="0.00"
                  type="number"
                />
              </div>

              <div>
                <ControlledInput<ArtworkSchema>
                  name="currentPrice"
                  label="Current price"
                  placeholder="0.00"
                  type="number"
                />
              </div>

              <div>
                <ControlledInput<ArtworkSchema>
                  name="startTime"
                  label="Start time"
                  placeholder="Start time"
                  type="datetime-local"
                />
              </div>

              <div>
                <ControlledInput<ArtworkSchema>
                  name="endTime"
                  label="End time"
                  placeholder="End time"
                  type="datetime-local"
                />
              </div>

              <div className="sm:col-span-2">
                <ControlledInput<ArtworkSchema>
                  name="primaryImage"
                  label="Primary image URL"
                  placeholder="https://..."
                />
              </div>

              <div className="sm:col-span-2">
                <ControlledInput<ArtworkSchema>
                  name="status"
                  label="Status"
                  placeholder="DRAFT / PUBLISHED"
                />
              </div>
            </div>
          </FormProvider>

          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => handleDialogOpenChange(false)}
              type="button"
            >
              Cancel
            </Button>
            <Button type="submit" isLoading={isSaving}>
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
