import { useFetchCartItems } from '@/app/shop/listing/listingProducts.query';
import { Button } from '@/components/ui/Button';
import { Sheet, SheetContent, SheetFooter, SheetHeader } from '@/components/ui/Sheet';
import { getFromStorage } from '@/utils/storage';
import React from 'react';
import CartItem from '@/components/core/cart-view/CartItems';


export type CartWrapperProps = {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

const CartWrapper: React.FC<CartWrapperProps> = ({ isOpen, setOpen }) => {
  const { data: cartItemList } = useFetchCartItems(getFromStorage('id', 'local') as string);

  console.log(cartItemList)
  return (
    <div className='overflow-y-auto'>
      <Sheet open={isOpen} onOpenChange={setOpen}>
        <SheetContent>
          <SheetHeader>Your Cart</SheetHeader>
          {cartItemList?.items?.map((item: any, index: number) => (
            <CartItem
              key={index}
              item={item}
            />
          ))
          }
          <div className='mt-12'>
            <div className='flex justify-between font-semibold mb-2'>
              <span>Total</span>
              <span>$1000</span>
            </div>
            <Button className='w-full '>Checkout</Button>
          </div>
        </SheetContent>
        <SheetFooter>
        </SheetFooter>
      </Sheet>
    </div>
  )
}

export default CartWrapper