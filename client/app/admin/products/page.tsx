'use client'
import { Button } from '@/components/ui/Button'
import React, { useEffect, useState } from 'react'
import { addProductFormElements, AddProductType } from '@/config'
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/Sheet'
import ImageUpload from '@/components/core/image-upload/ImageUpload'
import { useAddProduct, useDeleteProduct, useGetProductList, useImageUpload, useUpdateProduct } from '@/app/admin/products/products.query'
import { z } from 'zod';
import { createDynamicCommonForm } from '@/utils/hoc/create-dynamic-form'
import { Card, CardContent, CardFooter } from '@/components/ui/Card'
import Image from 'next/image'
import noImage from '@/assets/images/noImage.jpg'


const AddProductForm = createDynamicCommonForm<AddProductType>();

const initialFormData = {
  image: '',
  title: '',
  description: '',
  category: '',
  brand: '',
  price: 0,
  salePrice: 0,
  totalStock: 0
};

const productFormSchema = z.object({
  image: z.string().optional(),
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().optional(),
  category: z.string().min(1, { message: 'Category is required' }),
  brand: z.string().min(1, { message: 'Brand is required' }),
  price: z.coerce.number().min(0, 'Price must be greater than 0'),
  salePrice: z.coerce.number().min(0, 'Sale price must be greater than 0'),
  totalStock: z.coerce.number().min(0, 'Total stock must be greater than 0'),
}).refine((data) => {
  return data.salePrice < data.price; // Ensure salePrice is less than price
}, {
  message: 'Sale price must be lower than price',
  path: ['salePrice'], // Specify which field the error relates to
});


const Products = () => {
  const [formData, setFormData] = useState<AddProductType>(initialFormData);
  const [uploadImage, setUploadImage] = useState<File | null>(null);
  const [uploadFileUrl, setUploadFileUrl] = useState<string>();
  const [isSheetOpen, setIsSheetOpen] = useState(false); // Controls Sheet visibility
  const [editMode, setEditMode] = useState(false); // Tracks if we are editing
  const [currentProductId, setCurrentProductId] = useState<string | null>(null); // ID of the product being edited

  const { mutate: mutateUploadImage } = useImageUpload();
  const { mutate: addProduct } = useAddProduct();
  const { data: productList } = useGetProductList();
  const { mutate: deleteProduct } = useDeleteProduct();
  const { mutate: updateProduct } = useUpdateProduct();

  const onSubmit = (data: AddProductType) => {
    if (editMode && currentProductId) {
      // Update product
      updateProduct({ id: currentProductId, requestData: { ...data, image: uploadFileUrl || data.image } });
    } else {
      // Add new product
      addProduct({ ...data, image: uploadFileUrl });
    }
    setIsSheetOpen(false); // Close the Sheet after submission
    resetForm(); // Reset form data
  };

  useEffect(() => {
    if (uploadImage) {
      mutateUploadImage(uploadImage, {
        onSuccess(data) {
          setUploadFileUrl(data.data.data.url);
        }
      })
    }
  }, [mutateUploadImage, setUploadFileUrl, uploadImage]);

  const handleDelete = (id: string) => {
    return () => {
      deleteProduct({ id });
    }
  };

  const handleEdit = (product: AddProductType & { _id: string }) => {
    return () => {
      setFormData({
        image: product.image || '',
        title: product.title,
        description: product.description,
        category: product.category,
        brand: product.brand,
        price: product.price,
        salePrice: product.salePrice,
        totalStock: product.totalStock
      });
      setUploadFileUrl(product.image);
      setCurrentProductId(product._id);
      setEditMode(true);
      setIsSheetOpen(true);
    };
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setUploadImage(null);
    setUploadFileUrl('');
    setEditMode(false);
    setCurrentProductId(null);
  };

  console.log(formData)

  return (
    <div className='w-full flex-col'>
      <div className='mb-5 w-full flex justify-end'>
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button onClick={() => { resetForm(); setIsSheetOpen(true); }}>Add New Product</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>{editMode ? 'Edit Product' : 'Add New Product'}</SheetHeader>
            <ImageUpload
              uploadFile={uploadImage}
              setUploadFile={setUploadImage}
              uploadFileUrl={uploadFileUrl} // Pass existing image URL for preloading
            />
            <div className='py-6 overflow-y-auto h-full'>
              <AddProductForm
                formData={formData}
                setFormData={setFormData}
                buttonText={editMode ? 'Update' : 'Add'}
                formControls={addProductFormElements}
                onSubmit={onSubmit}
                validationSchema={productFormSchema}
                ariaName={editMode ? 'Edit Product Form' : 'Add Product Form'}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {productList?.data?.data?.map((item) => (
          <Card className="w-full flex flex-col justify-between" key={item._id}>
            <CardContent className="flex flex-col justify-between h-full gap-2 px-0">
              <div className="w-full h-72 relative overflow-hidden rounded-lg">
                <Image
                  src={item.image || noImage}
                  alt="image"
                  layout="fill"
                  objectFit="cover" // Ensures the image covers the container
                  priority={false} // Lazy load for performance
                  className="rounded-lg hover:scale-50"
                  objectPosition='center'
                />
              </div>

              <h2 className="font-bold text-lg text-center">{item.title}</h2>
              <div className="flex justify-between px-6 font-semibold">
                <span className="line-through">${item.price}</span>
                <span>${item.salePrice}</span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between px-4">
              <Button onClick={handleEdit(item)}>Edit</Button>
              <Button onClick={handleDelete(item._id)}>Delete</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

    </div>
  )
}

export default Products;
