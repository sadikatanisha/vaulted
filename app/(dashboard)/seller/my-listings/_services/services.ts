"use server";
import db from "@/lib/db/db";
import type {
  Artwork as PrismaArtwork,
  ArtworkImage as PrismaArtworkImage,
} from "@prisma/client";
import type { ArtworkSchema } from "../_types/schema";

function mapPrismaArtworkToSchema(
  a: PrismaArtwork & { images?: PrismaArtworkImage[] }
): ArtworkSchema {
  return {
    action: "update",
    id: a.id,
    title: a.title,
    description: a.description,
    primaryImage: a.primaryImage ?? "",

    images: (a.images ?? []).map((img) => ({
      artworkImageId: img.id,
      url: img.url,
      order: img.order ?? undefined,
      alt: img.alt ?? undefined,
      createdAt: img.createdAt.toISOString(),
    })),

    startingPrice: a.startingPrice.toString(),
    currentPrice: a.currentPrice.toString(),

    category: a.category ?? "",
    status: a.status,

    startTime: a.startTime.toISOString(),
    endTime: a.endTime.toISOString(),

    sellerId: a.sellerId,

    createdAt: a.createdAt.toISOString(),
    updatedAt: a.updatedAt.toISOString(),
  } as unknown as ArtworkSchema;
}

export const getArtworks = async (): Promise<ArtworkSchema[]> => {
  const rows = await db.artwork.findMany({
    include: { images: true },
  });

  return rows.map((r) => mapPrismaArtworkToSchema(r));
};

export const getArtwork = async (id: string): Promise<ArtworkSchema | null> => {
  const res = await db.artwork.findUnique({
    where: { id },
    include: { images: true },
  });

  if (!res) return null;

  return mapPrismaArtworkToSchema(res);
};
