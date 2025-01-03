'use client'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { ArrowUpDownIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import noImage from '@/assets/images/noImage.jpg'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { sortOptions } from '@/config';
import { useAddToCart, useFetchCartItems, useFilteredProductList } from '@/app/shop/listing/listingProducts.query';
import { useListingProductFilter } from '@/providers/shopFilterContext';
import { createSearchParamsHelper } from '@/utils/createSearchParams';
import { useRouter } from 'next/navigation';
import { getFromStorage } from '@/utils/storage';


const ListingPage = () => {
  const [sortBy, setSortBy] = useState('')
  const { filter } = useListingProductFilter();
  const { data: productList, mutate: fetchProduct } = useFilteredProductList();
  const { mutate: addToCart } = useAddToCart();
  const { data: cartItemList } = useFetchCartItems(getFromStorage('id', 'local') as string);

  const router = useRouter();

  function handleSort(value: string) {
    setSortBy(value);
  }

  useEffect(() => {
    const queryString = createSearchParamsHelper(filter, "/shop/listing");
    router.push(queryString);

    const payload = {
      ...filter,
      sortBy,
    };

    fetchProduct(payload);
  }, [fetchProduct, filter, router, sortBy]);

  const handleAddToCart = (productId: string) => {
    return () => {
      const payload = {
        userId: getFromStorage('id', 'local') as string,
        productId,
        quantity: 1
      }

      addToCart(payload)
    }
  }

  return (
    <div>
      <div className='flex justify-between sticky top-0 bg-white p-6 border-b-2 border-gray-300'>
        <h2 className='font-semibold text-lg'>All Products</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <ArrowUpDownIcon className="h-4 w-4" />
              <span>Sort by</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuRadioGroup value={sortBy} onValueChange={handleSort}>
              {sortOptions.map((sortItem) => (
                <DropdownMenuRadioItem
                  value={sortItem.id}
                  key={sortItem.id}
                >
                  {sortItem.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <section className='mt-4'>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {productList?.data?.data?.map((item) => (
            <Card className="w-full" key={item._id}>
              <CardContent className="flex justify-center flex-col gap-2 p-0">
                <div className="w-full rounded-lg">
                  <Image
                    src={item.image || noImage}
                    alt="image"
                    width={400}
                    height={400}
                    loading='lazy'
                    layout="intrinsic"
                    className='rounded-lg'
                  />
                </div>
                <h2 className='font-bold text-lg px-6'>{item.title}</h2>
                <div className='flex justify-between px-6 mb-4 font-semibold'>
                  <span className='line-through'>${item.price}</span>
                  <span>${item.salePrice}</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button className='w-full' onClick={handleAddToCart(item._id)}>Add to cart</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

export default ListingPage