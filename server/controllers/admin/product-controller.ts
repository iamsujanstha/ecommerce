import { Request, Response } from "express";
import { imageUploadUtils } from "../../config/cloudinary";
import { handleError } from '../../utils/apiHandlers';
import Product from '../../models/Product';

export const imageUpload = async (req: Request, res: Response) => {

  try {
    // Ensure req.file exists and has the required properties
    if (!req.file || !req.file.buffer || !req.file.mimetype) {
      res.status(400).json({
        success: false,
        message: "No file uploaded or invalid file format.",
      });
      return;
    }

    // Convert buffer to base64 string
    const b64 = Buffer.from(req?.file?.buffer).toString('base64');
    const url = `data:${req.file?.mimetype};base64,${b64}`;

    // Upload to Cloudinary
    const result = await imageUploadUtils(url);

    // Respond with success if upload is successful
    res.json({
      success: true,
      message: "Image uploaded successfully",
      data: result,
    });

  } catch (error) {

    res.json({
      success: false,
      message: 'Error occured'
    })
  }
}

//add a new product
const addProduct = async (req: Request, res: Response) => {
  try {
    const { image, title, description, category, brand, salesPrice, price, totalStock } = req.body;

    const newlyCreatedProduct = new Product({
      image, title, description, category, brand, salesPrice, price, totalStock
    });

    await newlyCreatedProduct.save();

    res.status(201).json({
      success: true,
      data: newlyCreatedProduct
    });

  } catch (error) {
    handleError(res, 'Error while adding product')
  }
}

//fetch all products
const fetchAllProducts = async (req: Request, res: Response) => {
  try {
    const listOfProducts = await Product.find({});
    res.status(200).json({
      success: true,
      data: listOfProducts
    })

  } catch (error) {
    handleError(res, 'Error while fetching products')
  }
}

//edit a product
const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { image, title, description, category, brand, salePrice, price, totalStock } = req.body;

    const findProduct = await Product.findById(id);

    if (!findProduct) {
      res.status(404).json({
        success: false,
        message: 'Product not found'
      })
      return;
    }

    // Use object-based updates to reduce repetitive code
    Object.assign(findProduct, {
      image: image || findProduct.image,
      title: title || findProduct.title,
      description: description || findProduct.description,
      category: category || findProduct.category,
      brand: brand || findProduct.brand,
      salePrice: salePrice ?? findProduct.salePrice,
      price: price ?? findProduct.price,
      totalStock: totalStock ?? findProduct.totalStock,
    });

    //save method takes some times for operation so make await after finishing only goes for next line
    const updatedProduct = await findProduct.save();

    res.status(200).json({
      message: 'Updated Successfully',
      data: updatedProduct
    })

  } catch (error) {
    handleError(res, "Error while updating product")

  }
}

//delete a product
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      res.status(404).json({
        success: false,
        message: 'Product not found',
      })
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    })

  } catch (error) {
    handleError(res, "Error while deleting product")
  }
}

export { addProduct, deleteProduct, updateProduct, fetchAllProducts }
