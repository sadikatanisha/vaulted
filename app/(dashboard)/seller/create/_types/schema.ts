import { z } from "zod";

export const artworkSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    imageUrls: z
      .array(z.string().url("Each image must be a valid URL"))
      .min(1, "Upload at least one image"),
    primaryImage: z.string().optional(),
    startingPrice: z.number().min(0.01, "Starting price must be >= 0.01"),
    category: z.string().optional(),
    startTime: z.string().refine((v) => !Number.isNaN(Date.parse(v)), {
      message: "Invalid start time",
    }),
    endTime: z.string().refine((v) => !Number.isNaN(Date.parse(v)), {
      message: "Invalid end time",
    }),
  })
  .refine((data) => new Date(data.endTime) > new Date(data.startTime), {
    path: ["endTime"],
    message: "End time must be after start time",
  })
  .refine(
    (data) => !data.primaryImage || data.imageUrls.includes(data.primaryImage),
    {
      path: ["primaryImage"],
      message: "primaryImage must be one of the uploaded imageUrls",
    }
  );

// export a clear type name (avoid naming collisions)
export type ArtworkSchema = z.infer<typeof artworkSchema>;

// default values typed to the schema type
export const artworkDefaultValues: ArtworkSchema = {
  title: "",
  description: "",
  imageUrls: [],
  primaryImage: undefined,
  startingPrice: 0.01,
  category: undefined,
  startTime: new Date().toISOString().slice(0, 16),
  endTime: new Date(Date.now() + 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 16),
};
