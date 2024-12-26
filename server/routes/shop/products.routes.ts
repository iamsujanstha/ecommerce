import express from 'express';
import getFilteredProducts from '../../controllers/shop/product-controller';

const router = express.Router();

router.post('/fetch', getFilteredProducts);

export default router;