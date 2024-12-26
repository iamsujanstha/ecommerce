'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';

interface SidebarContextType {
  filter: Record<string, string[]>;
  setFilter: (key: string, value: string) => void;
}

const ListingProductFilter = createContext<SidebarContextType | undefined>(undefined);

export const useListingProductFilter = () => {
  const context = useContext(ListingProductFilter);
  if (!context) {
    throw new Error('useListingProductFilter must be used within a SidebarProvider');
  }
  return context;
};

export const SidebarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const params = useSearchParams();

  // Initialize the filter state from URL parameters
  const [filter, setFilter] = useState<Record<string, string[]>>(() => {
    const initialFilter: Record<string, string[]> = {};
    params.forEach((value, key) => {
      initialFilter[key] = value.split(',');
    });
    console.log(initialFilter)
    return initialFilter;
  });

  const updateFilter = (getSectionId: string, getCurrentOption: string) => {
    setFilter((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      if (!updatedFilters[getSectionId]) {
        updatedFilters[getSectionId] = [getCurrentOption];
      } else {
        const section = updatedFilters[getSectionId];
        const optionIndex = section.indexOf(getCurrentOption);

        if (optionIndex === -1) {
          section.push(getCurrentOption);
        } else {
          section.splice(optionIndex, 1);
        }
      }

      return updatedFilters;
    });
  };

  return (
    <ListingProductFilter value={{ filter, setFilter: updateFilter }}>
      {children}
    </ListingProductFilter>
  );
};
