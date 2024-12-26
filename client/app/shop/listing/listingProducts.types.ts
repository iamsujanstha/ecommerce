export type FilteredProductPayload = {
  category: string[],
  brand: string[],
  sort: string;
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