import { Request, Response } from 'express';
import Products from '../../models/Product'; // Assuming this is your Mongoose model

const getFilteredProducts = async (req: Request, res: Response) => {
  try {
    const { category = [], brand = [], sortBy = 'price-lowtohigh' } = req.body; // Adjust to `req.query` if filters come via query params

    // Build filters dynamically
    let filters: any = {};

    /* The $in operator is used to match documents where a field's value is within a specified array of values.  */

    /*
      {
        "category": { "$in": ["men", "women"] }
      }
     */
    if (category.length > 0) {
      filters.category = { $in: category }; // Filter products with specified categories
    }

    if (brand.length > 0) {
      filters.brand = { $in: brand }; // Filter products with specified brands
    }

    // Determine sort order
    let sortCriteria: any = {};
    switch (sortBy) {
      case 'price-lowtohigh':
        sortCriteria.price = 1; // Ascending
        break;
      case 'price-hightolow':
        sortCriteria.price = -1; // Descending
        break;
      case 'newest':
        sortCriteria.createdAt = -1; // Newest first
        break;
      default:
        sortCriteria.price = 1; // Default to price ascending
    }

    // Query the database
    const products = await Products.find(filters).sort(sortCriteria);

    // Respond with the filtered and sorted products
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error('Error fetching filtered products:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
    });
  }
};

export default getFilteredProducts;
