"use client";

import { ImageUploader } from "@/components/upload/multi-image";
import {
  UploaderProvider,
  type UploadFn,
} from "@/components/upload/uploader-provider";
import { useEdgeStore } from "@/lib/edgestore";
import * as React from "react";

export type MultiImageDropzoneProps = {
  onUploaded?: (url: string) => void;
  onUploadedBatch?: (urls: string[]) => void;
  maxFiles?: number;
  maxSize?: number;
  bucketName?: string;
};

export function MultiImageDropzoneUsage({
  onUploaded,
  onUploadedBatch,
  maxFiles = 10,
  maxSize = 1024 * 1024,
  bucketName = "publicFiles", // <-- switch to publicImages if your server exposes that
}: MultiImageDropzoneProps) {
  const { edgestore } = useEdgeStore();
  const uploadedUrlsRef = React.useRef<string[]>([]);

  const uploadFn: UploadFn = React.useCallback(
    async ({ file, onProgressChange, signal }) => {
      if (!edgestore) {
        // fallback: helpful error so you can debug
        console.error("[MultiImageDropzone] edgestore not initialized");
        throw new Error("edgestore not available");
      }

      // pick the bucket dynamically (guards for missing names)
      const bucketClient = (edgestore as any)[bucketName];

      if (!bucketClient || typeof bucketClient.upload !== "function") {
        console.error(
          `[MultiImageDropzone] bucket "${bucketName}" not found on edgestore. Available:`,
          Object.keys(edgestore)
        );
        throw new Error(`Bucket "${bucketName}" not configured on edgestore`);
      }

      // perform the upload
      const res = await bucketClient.upload({
        file,
        signal,
        onProgressChange,
      });

      // normalize/extract URL from response
      const url =
        (res as any).url ??
        (res as any).publicUrl ??
        (res as any).path ??
        (res as any).data?.url ??
        null;

      if (!url) {
        // keep the original response for debugging but fail gracefully
        console.warn("[MultiImageDropzone] upload returned no URL", res);
        return res;
      }

      // call single-item callback
      try {
        if (onUploaded) onUploaded(url);
      } catch (e) {
        console.error("[MultiImageDropzone] onUploaded callback error", e);
      }

      // maintain a list and call batch callback (best-effort)
      uploadedUrlsRef.current = [...uploadedUrlsRef.current, url];
      try {
        if (onUploadedBatch) onUploadedBatch([...uploadedUrlsRef.current]);
      } catch (e) {
        console.error("[MultiImageDropzone] onUploadedBatch callback error", e);
      }

      // return what uploader expects (keep url on response)
      return { ...(res as object), url };
    },
    [edgestore, bucketName, onUploaded, onUploadedBatch]
  );

  return (
    <UploaderProvider uploadFn={uploadFn} autoUpload>
      <ImageUploader
        maxFiles={maxFiles}
        maxSize={maxSize}
        // if your ImageUploader has a specific onCompleteBatch prop, you can pass it here:
        // onCompleteBatch={(results) => {
        //   const urls = results.map(r => r.url ?? r.publicUrl).filter(Boolean);
        //   if (onUploadedBatch) onUploadedBatch(urls);
        // }}
      />
    </UploaderProvider>
  );
}
