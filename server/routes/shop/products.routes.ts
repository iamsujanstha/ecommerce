import express from 'express';
import getFilteredProducts from '../../controllers/shop/product-controller';

const router = express.Router();

router.get('/filtered-products', getFilteredProducts);

export default router;