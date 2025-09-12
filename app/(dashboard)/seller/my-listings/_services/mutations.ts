"use server";

import { executeAction } from "@/lib/executeAction";
import db from "@/lib/db/db";
import { artworkSchema, ArtworkSchema } from "../_types/schema";
import { AuctionStatus } from "@prisma/client";

export const updateArtwork = async (data: ArtworkSchema) => {
  await executeAction({
    actionFn: async () => {
      const validated = artworkSchema.parse(data);

      if (validated.action !== "update") return;

      const artworkId = validated.id;

      // fetch existing images for diff
      const existingImages = await db.artworkImage.findMany({
        where: { artworkId },
        select: { id: true, url: true, order: true, alt: true },
      });

      // incoming images from form/editor. (you used images[] in your mapping)
      const incoming = validated.images ?? [];

      // ids of incoming images that are existing (have artworkImageId)
      const incomingExistingIds = incoming
        .map((i) => i.artworkImageId)
        .filter(Boolean) as string[];

      // which existing images should be deleted (removed in incoming)
      const toDeleteIds = existingImages
        .filter((e) => !incomingExistingIds.includes(e.id))
        .map((e) => e.id);

      // transaction: delete removed images, update artwork, upsert incoming images
      await db.$transaction(async (tx) => {
        if (toDeleteIds.length) {
          await tx.artworkImage.deleteMany({
            where: { id: { in: toDeleteIds } },
          });
        }

        // update artwork fields
        await tx.artwork.update({
          where: { id: artworkId },
          data: {
            title: validated.title,
            description: validated.description,
            startingPrice: Number(validated.startingPrice),
            // if currentPrice provided use it, otherwise fallback to startingPrice or 0
            currentPrice:
              validated.currentPrice !== undefined &&
              validated.currentPrice !== ""
                ? Number(validated.currentPrice)
                : Number(validated.startingPrice) || 0,
            category: validated.category ?? null,
            status: validated.status
              ? { set: validated.status as AuctionStatus }
              : undefined,
            startTime: validated.startTime
              ? new Date(validated.startTime)
              : undefined,
            endTime: validated.endTime
              ? new Date(validated.endTime)
              : undefined,
            primaryImage:
              validated.primaryImage ?? validated.images?.[0]?.url ?? null,
          },
        });

        // upsert incoming images:
        // - if artworkImageId exists => update
        // - else => create
        for (let idx = 0; idx < incoming.length; idx++) {
          const img = incoming[idx];

          if (img.artworkImageId) {
            // update existing
            await tx.artworkImage.update({
              where: { id: img.artworkImageId },
              data: {
                url: img.url,
              },
            });
          } else {
            // create new
            await tx.artworkImage.create({
              data: {
                artworkId,
                url: img.url,
              },
            });
          }
        }
      });
    },
  });
};

export const deleteArtwork = async (id: string) => {
  await executeAction({
    actionFn: async () => {
      await db.$transaction(async (tx) => {
        await tx.artworkImage.deleteMany({ where: { artworkId: id } });
        await tx.artwork.delete({ where: { id } });
      });
    },
  });
};
