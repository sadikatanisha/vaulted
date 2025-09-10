"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
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
import { MultiImageDropzoneUsage } from "./image-dropzone";

type FormValues = ArtworkSchema;

export default function ArtworkForm({ userId }: { userId?: string }) {
  if (!userId) {
    return (
      <div className="p-6 rounded bg-yellow-50 text-sm text-yellow-800">
        You need to sign in to list an artwork.{" "}
        <a className="underline" href="/sign-in">
          Sign in
        </a>
      </div>
    );
  }

  // mutation + form setup
  const createArtwork = useCreateArtwork(userId);
  const form = useForm<FormValues>({
    defaultValues: artworkDefaultValues,
    mode: "onSubmit",
  });

  // previews (we'll use URLs returned by the uploader)
  const [primaryPreview, setPrimaryPreview] = useState<string | null>(null);
  const [additionalPreviews, setAdditionalPreviews] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);

  // map zod errors -> RHF
  const applyZodErrorsToForm = useCallback(
    (zerr: z.ZodError) => {
      zerr.errors.forEach((e) => {
        const path = (e.path && e.path.join(".")) || "_form";
        form.setError(path as any, { type: "manual", message: e.message });
      });
    },
    [form]
  );

  // Primary image upload: use dropzone but limit to 1 file
  const handlePrimaryUploaded = useCallback(
    (url: string) => {
      // set form primaryImage url
      form.setValue("primaryImage", url, {
        shouldDirty: true,
        shouldValidate: true,
      });

      // ensure it's included in imageUrls
      const prev: string[] = form.getValues("imageUrls") ?? [];
      if (!prev.includes(url)) {
        form.setValue("imageUrls", [...prev, url], {
          shouldDirty: true,
          shouldValidate: true,
        });
      }
      setPrimaryPreview(url);
    },
    [form]
  );

  // Additional images uploaded
  const handleAdditionalUploaded = useCallback(
    (url: string) => {
      const prev: string[] = form.getValues("imageUrls") ?? [];
      if (!prev.includes(url)) {
        const next = [...prev, url];
        form.setValue("imageUrls", next, {
          shouldDirty: true,
          shouldValidate: true,
        });
        setAdditionalPreviews(next);
      } else {
        setAdditionalPreviews((p) => Array.from(new Set([...p, url])));
      }
    },
    [form]
  );

  const handleAdditionalBatch = useCallback(
    (urls: string[]) => {
      const prev: string[] = form.getValues("imageUrls") ?? [];
      const merged = Array.from(new Set([...prev, ...urls]));
      form.setValue("imageUrls", merged, {
        shouldDirty: true,
        shouldValidate: true,
      });
      setAdditionalPreviews(merged);
    },
    [form]
  );

  // SUBMIT: we no longer upload files here — uploader already did. only send URLs.
  const onSubmit: SubmitHandler<FormValues> = useCallback(
    async (values) => {
      setBusy(true);
      form.clearErrors();

      try {
        // filter out accidental data: URIs (safety)
        const finalImageUrls = (values.imageUrls || []).filter(
          (u) => typeof u === "string" && !u.startsWith("data:")
        );

        const finalPrimary =
          values.primaryImage || finalImageUrls[0] || undefined;

        const payload: FormValues = {
          title: values.title,
          description: values.description,
          imageUrls: finalImageUrls,
          primaryImage: finalPrimary,
          startingPrice: Number(values.startingPrice),
          category: values.category,
          startTime: values.startTime,
          endTime: values.endTime,
        };

        // server-side runtime validation (same zod schema)
        await artworkSchema.parseAsync(payload);

        // call mutation (react-query)
        createArtwork.mutate(payload);
      } catch (err) {
        if (err instanceof z.ZodError) {
          applyZodErrorsToForm(err);
        } else {
          console.error("submit error", err);
          form.setError("_form" as any, {
            type: "manual",
            message: "Unexpected error. See console.",
          });
        }
      } finally {
        setBusy(false);
      }
    },
    [applyZodErrorsToForm, createArtwork, form]
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* title, description, price, category, time fields (same as before) */}
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

        {/* Primary image — use dropzone limited to 1 file */}
        <FormItem>
          <FormLabel>Primary Image</FormLabel>
          <FormControl>
            <MultiImageDropzoneUsage
              maxFiles={1}
              maxSize={1024 * 1024 * 5}
              onUploaded={handlePrimaryUploaded}
              bucketName="publicFiles" // set to your bucket
            />
          </FormControl>
          {primaryPreview && (
            <img
              src={primaryPreview}
              alt="primary preview"
              className="mt-2 w-40 h-40 object-cover rounded"
            />
          )}
          <FormMessage />
        </FormItem>

        {/* Additional images — multi dropzone */}
        <FormItem>
          <FormLabel>Additional Images</FormLabel>
          <FormControl>
            <MultiImageDropzoneUsage
              maxFiles={10}
              maxSize={1024 * 1024 * 5}
              onUploaded={handleAdditionalUploaded}
              onUploadedBatch={handleAdditionalBatch}
              bucketName="publicFiles"
            />
          </FormControl>

          {additionalPreviews.length > 0 && (
            <div className="mt-2 flex gap-2 overflow-auto">
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
          <FormMessage />
        </FormItem>

        {/* optional manual URLs field (keeps compatibility) */}
        <FormField
          control={form.control}
          name="imageUrls"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URLs (optional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="Comma separated URLs"
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
                <Input placeholder="Primary image URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <Button type="submit" disabled={busy || createArtwork.isPending}>
            {busy || createArtwork.isPending ? "Creating..." : "Create Artwork"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
