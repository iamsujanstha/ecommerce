import { shoppingViewHeaderMenuItems } from '@/config'
import { CarrotIcon, Home } from 'lucide-react'
import Link from 'next/link'
import React from 'react'


const ShopHeader = () => {
  return (
    <div className='flex justify-between border-b-2 border-cyan-300 p-6 sticky top-0 bg-white'>
      <div className='flex gap-2 items-center'>
        <Home /><span className='font-semibold'>Dashboard</span>
      </div>
      <nav className='flex justify-center gap-6'>
        {shoppingViewHeaderMenuItems.map((item) => (
          <Link key={item.id} href={item.path} className='font-semibold cursor-pointer opacity-70 hover:opacity-100'>{item.label}</Link>
        ))}
      </nav>
      <div className='flex gap-4'>
        <CarrotIcon />
        user
      </div>
    </div>
  )
}

export default ShopHeader