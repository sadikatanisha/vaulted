"use client";

import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import {
  artworkSchema,
  artworkDefaultValues,
  type ArtworkSchema,
} from "../_types/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Button from "@/components/ui/button";
import { useCreateArtwork } from "../_services/use-mutations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// ----- Mock uploader: replace with Cloudinary/S3/Supabase/etc -----
// returns a URL string for each file (here we return data-URL for demo)
const uploadFileMock = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("upload failed"));
    reader.readAsDataURL(file);
  });

export default function ArtworkForm({ userId }: { userId: string }) {
  const createArtwork = useCreateArtwork(userId);

  // Use your zod-inferred type as the form generic
  const form = useForm<ArtworkSchema>({
    defaultValues: artworkDefaultValues,
    mode: "onSubmit",
    // NOTE: we are NOT using zodResolver here because image files must be uploaded first.
    // We'll validate final payload using artworkSchema.parseAsync(payload).
  });

  // local file states and previews
  const [primaryFile, setPrimaryFile] = useState<File | null>(null);
  const [primaryPreview, setPrimaryPreview] = useState<string | null>(null);
  const [additionalFiles, setAdditionalFiles] = useState<File[]>([]);
  const [additionalPreviews, setAdditionalPreviews] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);

  // helper to map zod errors into react-hook-form
  const applyZodErrorsToForm = (zerr: z.ZodError) => {
    zerr.errors.forEach((e) => {
      const path = (e.path && e.path.join(".")) || "_form";
      form.setError(path as any, { type: "manual", message: e.message });
    });
  };

  const onSubmit: SubmitHandler<ArtworkSchema> = async (values) => {
    setBusy(true);
    // clear any previous zod/form errors
    form.clearErrors();

    try {
      // 1) upload files first
      const uploadedUrls: string[] = [];

      // upload primary file if present
      let primaryUrl: string | undefined = undefined;
      if (primaryFile) {
        primaryUrl = await uploadFileMock(primaryFile);
        uploadedUrls.push(primaryUrl);
      }

      // upload additional files
      if (additionalFiles.length > 0) {
        const others = await Promise.all(
          additionalFiles.map((f) => uploadFileMock(f))
        );
        uploadedUrls.push(...others);
      }

      // 2) build payload matching your zod schema
      // ensure primaryImage is part of imageUrls (your schema enforces this)
      const finalImageUrls = [
        ...new Set([...(uploadedUrls || []), ...values.imageUrls]),
      ]; // keep uploaded first
      const finalPrimary =
        values.primaryImage || primaryUrl || finalImageUrls[0] || undefined;

      const payload: ArtworkSchema = {
        title: values.title,
        description: values.description,
        // artworkSchema expects imageUrls to be an array of valid URLs
        imageUrls: finalImageUrls,
        primaryImage: finalPrimary,
        startingPrice: Number(values.startingPrice),
        category: values.category,
        // your schema expects startTime/endTime as strings (datetime-local style)
        startTime: values.startTime,
        endTime: values.endTime,
      };

      // 3) validate final payload with zod (this uses your runtime schema)
      await artworkSchema.parseAsync(payload);

      // 4) call your mutation (your server-side createArtwork expects imageUrls -> images.create)
      createArtwork.mutate(payload);
    } catch (err) {
      // if zod error, map to form
      if (err instanceof z.ZodError) {
        applyZodErrorsToForm(err);
      } else {
        console.error("submit error", err);
        form.setError("_form" as any, {
          type: "manual",
          message: "Unexpected error. Check console.",
        });
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Artwork title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe the artwork" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Starting price */}
        <FormField
          control={form.control}
          name="startingPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Starting Price</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(v) => field.onChange(v)}
                >
                  <SelectTrigger className="w-[220px]">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Painting">Painting</SelectItem>
                    <SelectItem value="Sculpture">Sculpture</SelectItem>
                    <SelectItem value="Photography">Photography</SelectItem>
                    <SelectItem value="Digital">Digital</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Start / End time (these are strings as your schema expects) */}
        <FormField
          control={form.control}
          name="startTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Auction Start Time</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="endTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Auction End Time</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* PRIMARY IMAGE (file input) */}
        <FormItem>
          <FormLabel>Primary Image (file)</FormLabel>
          <FormControl>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const f = e.target.files?.[0] ?? null;
                setPrimaryFile(f);
                if (f) setPrimaryPreview(URL.createObjectURL(f));
                else setPrimaryPreview(null);
              }}
            />
          </FormControl>
          {primaryPreview && (
            <img
              src={primaryPreview}
              alt="primary preview"
              className="mt-2 w-40 h-40 object-cover rounded"
            />
          )}
        </FormItem>

        {/* ADDITIONAL IMAGES (files) */}
        <FormItem>
          <FormLabel>Additional Images (files)</FormLabel>
          <FormControl>
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                const files = e.target.files ? Array.from(e.target.files) : [];
                setAdditionalFiles(files);
                setAdditionalPreviews(files.map((f) => URL.createObjectURL(f)));
              }}
            />
          </FormControl>

          {additionalPreviews.length > 0 && (
            <div className="mt-2 flex gap-2">
              {additionalPreviews.map((p, i) => (
                <img
                  key={i}
                  src={p}
                  alt={`preview-${i}`}
                  className="w-24 h-24 object-cover rounded"
                />
              ))}
            </div>
          )}
        </FormItem>

        <FormField
          control={form.control}
          name="imageUrls"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Image URLs (optional) — will be merged with uploaded files
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Comma separated URLs (optional)"
                  value={
                    Array.isArray(field.value) ? field.value.join(",") : ""
                  }
                  onChange={(e) =>
                    field.onChange(
                      e.target.value
                        ? e.target.value.split(",").map((s) => s.trim())
                        : []
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="primaryImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Primary Image URL (optional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="URL for primary image (optional)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* global form error */}

        <div>
          <Button type="submit" disabled={busy || createArtwork.isLoading}>
            {busy || createArtwork.isLoading ? "Creating..." : "Create Artwork"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
