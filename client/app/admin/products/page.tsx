'use client'
import { Button } from '@/components/ui/Button'
import React, { useEffect, useReducer, useState } from 'react'
import { addProductFormElements, AddProductType } from '@/config'
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/Sheet'
import ImageUpload from '@/components/core/image-upload/ImageUpload'
import { useAddProduct, useDeleteProduct, useGetProductList, useImageUpload, useUpdateProduct } from '@/app/admin/products/products.query'
import { z } from 'zod';
import { createDynamicCommonForm } from '@/utils/hoc/create-dynamic-form'
import { DataTable } from '@/components/ui/DataTable'
import { getColumns } from '@/app/admin/products/columns'


const AddProductForm = createDynamicCommonForm<AddProductType>();

const initialFormData = {
  image: '',
  title: '',
  description: '',
  category: '',
  brand: '',
  price: null,
  salePrice: null,
  totalStock: null
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
  const [isSheetOpen, setSheetOpen] = useState(false); // Controls Sheet visibility
  const [editMode, setEditMode] = useState(false); // Tracks if we are editing
  const [currentProductId, setCurrentProductId] = useState<string | null>(null);
  const [, toggleDeleteModal] = useReducer((state) => !state, false);

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
    setSheetOpen(false); // Close the Sheet after submission
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
    toggleDeleteModal();
    deleteProduct({ id });
  }

  const handleEdit = (product: AddProductType & { _id: string }) => {
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
    setSheetOpen(true);
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setUploadImage(null);
    setUploadFileUrl('');
    setEditMode(false);
    setCurrentProductId(null);
  };

  return (
    <div className='w-full flex-col'>
      <div className='mb-5 w-full flex justify-end'>
        <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button onClick={() => { resetForm(); setSheetOpen(true); }}>Add New Product</Button>
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
      <DataTable columns={getColumns(handleEdit, handleDelete)} data={productList?.data?.data || []} />
      {/* {isOpenDeleteModal &&
        <ConfimationModal

      } */}
    </div>
  )
}

export default Products;
