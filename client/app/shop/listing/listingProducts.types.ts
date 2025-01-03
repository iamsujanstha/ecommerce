export type FilteredProductPayload = {
  category: string[],
  brand: string[],
  sortBy: string;
}

export type FilteredProductListRes = {
  _id: string;
  image: string;
  title: string;
  description: string;
  category: string;
  brand: string;
  price: number;
  totalStock: number;
  createdAt: string;
  updatedAt: string;
  salePrice: number;
}

export type AddToCartResponse = {
  _id: string,
  userId: string,
  items: [
    {
      productId: string,
      quantity: number,
      _id: string
    }
  ],
}

export type AddToCartPayload = {
  userId: string,
  productId: string,
  quantity: number
}