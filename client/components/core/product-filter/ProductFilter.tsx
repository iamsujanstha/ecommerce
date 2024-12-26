'use client'
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { useListingProductFilter } from '@/providers/shopFilterContext';
import { FilterOptionsType } from '@/config';
import { Label } from '@/components/ui/Label';
import { Separator } from '@radix-ui/react-dropdown-menu';

interface FilterSectionProps {
  filterData: FilterOptionsType;
}

const ProductFilter: React.FC<FilterSectionProps> = ({ filterData }) => {
  const { filter, setFilter } = useListingProductFilter();

  return (
    <div className='p-4  space-y-4"'>
      {Object.keys(filterData).map((keyItem) => {
        return (
          <>
            <div key={keyItem} className='mb-4'>
              <h3 className="text-base font-extrabold">{keyItem}</h3>
              <div className="grid gap-2 mt-2">
                {filterData[keyItem].map((option) => (
                  <Label className="flex font-medium items-center gap-2 ml-2" key={option.id}>
                    <Checkbox
                      checked={
                        filter &&
                        Object.keys(filter).length > 0 &&
                        filter[keyItem] &&
                        filter[keyItem].indexOf(option.id) > -1
                      }
                      onCheckedChange={() => setFilter(keyItem, option.id)}
                    />
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
            <Separator />
          </>
        )
      })}
    </div>
  );
};

export default ProductFilter;
