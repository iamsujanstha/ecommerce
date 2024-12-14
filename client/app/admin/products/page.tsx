'use client'
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { addProductFormElements, AddProductType } from '@/config'
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet'
import ImageUpload from '@/components/core/image-upload/ImageUpload'
import { useAddProduct, useImageUpload } from '@/app/admin/products/products.query'
import { z } from 'zod';
import { createDynamicCommonForm } from '@/utility/hoc/create-dynamic-form'


const AddProductForm = createDynamicCommonForm<AddProductType>();

const initialFormData = {
  image: '',
  title: '',
  description: '',
  category: '',
  brand: '',
  price: '',
  salePrice: '',
  totalStock: ''
};

export const productFormSchema = z.object({
  image: z.string().optional(),
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().optional(),
  category: z.string().min(1, { message: 'Category is required' }),
  brand: z.string().min(1, { message: 'Brand is required' }),
  price: z.string().min(1, { message: 'Price is required' }),
  salePrice: z.string().optional(),
  totalStock: z.string().min(1, { message: 'Total Stock is required' }),
});

const Products = () => {
  const [formData, setFormData] = useState<Omit<AddProductType, 'image'>>(initialFormData);
  const [uploadImage, setUploadImage] = useState<File | null>(null);
  const [, setUploadFileUrl] = useState<string>();

  const { data: imageData, mutate: mutateUploadImage } = useImageUpload();
  const { mutate: addProduct } = useAddProduct();
  // const [openDialog, setOpenDialog] = useState(false);
  const onSubmit = (data: AddProductType) => {
    console.log({ data })
    addProduct({ ...data });
  };

  useEffect(() => {
    if (uploadImage) {
      mutateUploadImage(uploadImage, {
        onSuccess(data) {
          setUploadFileUrl(data.data.name);
          console.log(data.data.name)
        }
      })
    }
  }, [imageData?.data.name, mutateUploadImage, setUploadFileUrl, uploadImage]);

  return (
    <div className='mb-5 w-full flex justify-end'>
      <Sheet>
        <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
          <SheetTrigger asChild>
            <Button>Add New Product</Button>
          </SheetTrigger>
        </div>
        <SheetContent>
          <SheetHeader>Add New Product</SheetHeader>
          <ImageUpload
            uploadFile={uploadImage}
            setUploadFile={setUploadImage}
          />
          <div className='py-6 overflow-y-auto h-full'>
            <AddProductForm
              formData={formData}
              setFormData={setFormData}
              buttonText='Add'
              formControls={addProductFormElements}
              onSubmit={onSubmit}
              validationSchema={productFormSchema}
              ariaName='Add Product Form'
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default Products