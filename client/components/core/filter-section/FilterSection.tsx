import React from 'react';
import { Checkbox } from "@/components/ui/checkbox"


interface FilterSectionProps {
  title: string;
  options: Record<string, string>;
  name: string;
}
const FilterSection: React.FC<FilterSectionProps> = ({ title, options }) => {
  return (
    <div>
      <h3 className='mt-6 mb-2 font-semibold'>{title}</h3>
      {Object.entries(options).map(([key, label]) => (
        <div key={key} className='flex gap-3 items-center ml-4'>
          <Checkbox id={key} />
          <label htmlFor={key}>{label}</label>
        </div>
      ))}
    </div>
  );
};

export default FilterSection;
