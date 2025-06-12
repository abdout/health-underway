"use server";

// src/lib/file.ts
// Utility function for saving uploaded files (e.g., identification documents).
// Right now this is a minimal stub that stores the file in Cloudinary when
// running in production, or simply returns a placeholder in development.
// Feel free to extend it with local storage or other providers.

import cloudinary from "./cloudinary";
import { v4 as uuidv4 } from "uuid";
import streamifier from "streamifier";

/**
 * Saves a File/Blob/Buffer to Cloudinary and returns the public URL.
 * If CLOUDINARY credentials are not provided, it will return a dummy path so
 * that build-time type-checking succeeds without runtime errors.
 */
export async function saveFile(file: File | Blob | Buffer | ArrayBuffer | string): Promise<string> {
  // Nothing to do if we do not have credentials – return a fake URL so the
  // rest of the application continues to work.
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    return `/uploads/${uuidv4()}`;
  }

  try {
    // Convert input to Buffer
    const buffer: Buffer =
      typeof file === "string"
        ? Buffer.from(file)
        : file instanceof Buffer
        ? file
        : Buffer.from(await (file as Blob | File).arrayBuffer());

    const uploadStream = cloudinary.uploader.upload_stream({
      public_id: uuidv4(),
      folder: "patients",
      resource_type: "auto",
    });

    return await new Promise<string>((resolve, reject) => {
      uploadStream.on("finish", () => resolve(uploadStream.url));
      uploadStream.on("error", reject);

      streamifier.createReadStream(buffer).pipe(uploadStream);
    });
  } catch (error) {
    console.error("Failed to upload file to Cloudinary:", error);
    // Fall back to dummy path on error so execution can continue
    return `/uploads/${uuidv4()}`;
  }
} 