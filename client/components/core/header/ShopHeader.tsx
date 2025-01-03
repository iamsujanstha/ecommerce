'use client'
import { CART_QUERY_KEY } from '@/app/shop/listing/listingProducts.query'
import CartWrapper from '@/components/core/cart-view/CartWrapper'
import { Button } from '@/components/ui/Button'
import { shoppingViewHeaderMenuItems } from '@/config'
import { useQueryClient } from '@tanstack/react-query'
import { Home, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'


const ShopHeader = () => {
  const queryClient = useQueryClient();
  const [isViewCart, setViewCart] = useState(false);

  // Get the totalItems from the global cart state
  const cartState = queryClient.getQueryData<{ totalItems: number }>(CART_QUERY_KEY);

  return (
    <div className='flex justify-between border-b-2 border-cyan-300 p-4 sticky top-0 bg-white'>
      <div className='flex gap-2 items-center'>
        <Home /><span className='font-semibold'>Dashboard</span>
      </div>
      <nav className='flex justify-center gap-6 items-center'>
        {shoppingViewHeaderMenuItems.map((item) => (
          <Link key={item.id} href={item.path} className='font-semibold cursor-pointer opacity-70 hover:opacity-100'>{item.label}</Link>
        ))}
      </nav>
      <div className='flex gap-4'>
        <Button className='cursor-pointer relative' variant={'secondary'} onClick={() => setViewCart(true)}>
          <ShoppingCart />
          <span className='absolute right-2 top-0 font-extrabold'>{cartState?.totalItems}</span>
        </Button>
        <div className='w-8 h-8 rounded-full bg-black text-white text-center align-middle font-bold'>
          s
        </div>
      </div>
      {isViewCart &&
        <CartWrapper
          isOpen={isViewCart}
          setOpen={setViewCart}
        />
      }
    </div>
  )
}

export default ShopHeader