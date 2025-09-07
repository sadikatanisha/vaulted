//mutations.ts
"use server";
import { ArtworkSchema } from "../_types/schema";
import db from "@/lib/db/db";
import { executeAction } from "@/lib/executeAction";

const createArtwork = async (data: ArtworkSchema, userId: string) => {
  return await executeAction({
    actionFn: () =>
      db.artwork.create({
        data: {
          title: data.title,
          description: data.description,
          startingPrice: Number(data.startingPrice),
          currentPrice: Number(data.startingPrice) || 0,
          category: data.category ?? null,
          startTime: new Date(data.startTime),
          endTime: new Date(data.endTime),
          seller: { connect: { id: userId } },
          primaryImage: data.primaryImage ?? data.imageUrls?.[0] ?? null,
          images: {
            create: (data.imageUrls || []).map((url, index) => ({
              url,
              order: index,
            })),
          },
        },
      }),
  });
};

export { createArtwork };
