import { Request, Response } from 'express';
import Cart from '../../models/Cart';
import Product from '../../models/Product';

// Add an item to the cart
const addToCart = async (req: Request, res: Response) => {
  const { userId, productId, quantity } = req.body;

  try {
    // Validate input
    if (!userId || !productId || quantity <= 0) {
      res.status(400).json({
        success: false,
        message: 'Invalid data provided!',
      });
      return;
    }

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({
        success: false,
        message: 'Product not found',
      });
      return;
    }

    // Find or create the user's cart
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Check if the product is already in the cart
    const productIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (productIndex === -1) {
      // Add new product to the cart
      cart.items.push({ productId, quantity });
    } else {
      // Update quantity of existing product in the cart
      cart.items[productIndex].quantity += quantity;
    }

    // Save the cart
    await cart.save();

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to add items to the cart',
    });
  }
};

// Fetch all items in the user's cart
const fetchCartItems = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    // Validate input
    if (!userId) {
      res.status(400).json({
        success: false,
        message: 'User ID is required!',
      });
    }

    // Find the user's cart
    const cart = await Cart.findOne({ userId }).populate('items.productId');

    if (!cart) {
      res.status(404).json({
        success: false,
        message: 'Cart not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch cart items',
    });
  }
};

// Update the quantity of a cart item
const updateCartItemQuantity = async (req: Request, res: Response) => {
  const { userId, productId, quantity } = req.body;

  try {
    // Validate input
    if (!userId || !productId || quantity <= 0) {
      res.status(400).json({
        success: false,
        message: 'Invalid data provided!',
      });
    }

    // Find the user's cart
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      res.status(404).json({
        success: false,
        message: 'Cart not found',
      });
      return;
    }

    // Find the product in the cart
    const productIndex = cart?.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (productIndex === -1) {
      res.status(404).json({
        success: false,
        message: 'Product not found in the cart',
      });
    }

    // Update the quantity
    cart.items[productIndex].quantity = quantity;
    await cart?.save();

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to update cart item quantity',
    });
  }
};

// Delete a cart item
const deleteCartItem = async (req: Request, res: Response) => {
  const { userId, productId } = req.body;

  try {
    // Validate input
    if (!userId || !productId) {
      res.status(400).json({
        success: false,
        message: 'Invalid data provided!',
      });
    }

    // Find the user's cart
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      res.status(404).json({
        success: false,
        message: 'Cart not found',
      });
      return;
    }

    // Remove the product from the cart
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    ) as any;

    await cart.save();

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete cart item',
    });
  }
};

export { addToCart, fetchCartItems, updateCartItemQuantity, deleteCartItem };
