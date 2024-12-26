export type AddProductResponseType = {
  _id: string;
  image?: string,
  title: string;
  description?: string;
  category: string;
  brand: string;
  price: number;
  salePrice?: number;
  totalStock: number;
};