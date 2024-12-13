import express from 'express';
import { imageUpload } from '../../controllers/admin/product-controller';
import { upload } from '../../config/cloudinary';

const router = express.Router();
router.post(
  "/upload-image",
  upload.single("file"),
  imageUpload
);

export default router;

