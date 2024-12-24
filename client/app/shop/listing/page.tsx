'use client'
import { useGetProductList } from '@/app/admin/products/products.query';
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { ArrowUpDownIcon } from 'lucide-react'
import React from 'react'
import Image from 'next/image';
import noImage from '@/assets/images/noImage.jpg'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';


const ListingPage = () => {
  const { data: productList } = useGetProductList();
  return (
    <div>
      <div className='flex justify-between p-6 sticky top-2 border-b-2 border-gray-300'>
        <h2 className='font-semibold text-lg'>All Products</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>
              <ArrowUpDownIcon /> <span>Sort by</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem>Price Low to High</DropdownMenuItem>
              <DropdownMenuItem>Price High to Low</DropdownMenuItem>
              <DropdownMenuItem>Title A to Z</DropdownMenuItem>
              <DropdownMenuItem>Title Z to A</DropdownMenuItem>
            </DropdownMenuGroup>
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
                <Button className='w-full'>Add to cart</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

export default ListingPage