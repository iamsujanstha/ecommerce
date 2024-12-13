import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

// Configure Cloudinary
cloudinary.config({
  cloud_name: "drd7ut4bb",
  api_key: "873369562616335",
  api_secret: "wTTDAYPKJfFp049mJv1W-EZgEZA",
});

export async function imageUploadUtils(file: string) {
  try {
    const result = await cloudinary.uploader.upload(file, {
      resource_type: "auto", // Allow all file types (image, video, etc.)
    });
    return result;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Failed to upload image to Cloudinary");
  }
}

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true); // Accept the file
    } else {
      cb(new Error("Invalid file format")); // Reject the file
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB file size limit
});