import React from 'react';
import ProductFilter from '@/components/core/product-filter/ProductFilter';
import { filterOptions } from '@/config';


const ShopSidebar = () => {
  return (
    <div className='px-8 py-10'>
      <h2 className='text-lg font-semibold border-b-2 border-gray-400 pb-2'>Filters</h2>
      <ProductFilter filterData={filterOptions} />
    </div>
  );
};

export default ShopSidebar;
