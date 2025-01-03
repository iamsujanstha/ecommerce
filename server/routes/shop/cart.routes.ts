import express from 'express'
import { addToCart, deleteCartItem, fetchCartItems, updateCartItemQuantity } from '../../controllers/shop/cart-controller';

const router = express.Router();

router.post("/add", addToCart);
router.get("/fetch/:userId", fetchCartItems);
router.put("/quantity", updateCartItemQuantity);
router.delete("/:userId/:productId", deleteCartItem);

export default router;