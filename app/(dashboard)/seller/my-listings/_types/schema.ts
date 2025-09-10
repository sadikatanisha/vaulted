import { patterns } from "@/lib/constants";
import { regexSchema, requiredStringSchema } from "@/lib/zod-schemas";
import { z } from "zod";
// ONLY FOR READ / DELETE / UPDATE
const artworkSchema = z.intersection(
  z.object({
    id: requiredStringSchema,
    title: requiredStringSchema,
    description: requiredStringSchema,
    primaryImage: z.string().optional().nullable(),
    images: z.array(
      z.object({
        // image id might be absent on create; keep optional to support both create/update flows
        artworkImageId: requiredStringSchema.optional(),
        url: requiredStringSchema,
      })
    ),
    startingPrice: regexSchema(patterns.zeroTo9999),
    currentPrice: regexSchema(patterns.zeroTo9999).optional(),
    category: z.string().optional().nullable(),
    status: z.string().optional(), // replace with z.enum([...]) if you have AuctionStatus values
    startTime: z.string(), // ISO datetime string (or change to Date with preprocess)
    endTime: z.string(), // ISO datetime string
    sellerId: requiredStringSchema,
  }),
  z.discriminatedUnion("action", [
    z.object({ action: z.literal("update"), id: requiredStringSchema }),
  ])
);

type ArtworkSchema = z.infer<typeof artworkSchema>;

const artworkDefaultValues: ArtworkSchema = {
  id: "",
  action: "update",
  images: [],
  title: "",
  description: "",
  primaryImage: "",

  // keeping numeric prices as strings to match your regex approach used in `foodSchema`
  startingPrice: "",
  currentPrice: "0",

  category: "",
  status: "ACTIVE", // assumption: default ACTIVE
  startTime: "",
  endTime: "",

  sellerId: "",
};

export { artworkSchema, artworkDefaultValues, type ArtworkSchema };
