import React from 'react';
import { categoryOptionsMap, brandOptionsMap } from '@/config';
import FilterSection from '@/components/core/filter-section/FilterSection';


const ShopSidebar = () => {
  return (
    <div className='px-8 py-10'>
      <h2 className='text-lg font-semibold border-b-2 border-gray-400 pb-2'>Filters</h2>
      <FilterSection title="category" options={categoryOptionsMap} name="category" key='category' />
      <FilterSection title="brand" options={brandOptionsMap} name="brand" key='brand' />
    </div>
  );
};

export default ShopSidebar;
