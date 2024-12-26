import express from 'express';
import { imageUpload, addProduct, deleteProduct, updateProduct, fetchAllProducts } from '../../controllers/admin/product-controller';
import { upload } from '../../config/cloudinary';

const router = express.Router();
router.post(
  "/upload-image",
  upload.single("file"),
  imageUpload
);

router.post('/add', addProduct)
router.get('/', fetchAllProducts);
router.delete('/:id', deleteProduct);
router.put('/:id', updateProduct)

export default router;

