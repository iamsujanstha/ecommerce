import { Minus, Plus } from 'lucide-react'
import React from 'react'

const Counter = () => {
  return (
    <div className='flex gap-2 items-center'>
      <Minus size={14} />value<Plus size={14} />
    </div>
  )
}

export default Counter