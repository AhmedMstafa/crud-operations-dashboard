'use client';
import React, { useRef, useState } from 'react';
import ProductsContext from '@/store/product-context';

const SearchPar: React.FC = () => {
  const { setMatchesSearchTerm } = React.use(ProductsContext);

  const [searchTerm, setSearchTerm] = useState(''); // Local state for the search term
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null); // Ref to hold timeout

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setSearchTerm(value); // Update local search term

    // Clear the previous timeout if the user types before the debounce delay finishes
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Set a new timeout to update the matches after a delay
    debounceTimeout.current = setTimeout(() => {
      if (value.trim()) {
        setMatchesSearchTerm(value.trim()); // Call setMatchesSearchTerm with trimmed input
      } else {
        setMatchesSearchTerm(' '); // If empty, reset the search term
      }
    }, 300); // Debounce delay (300ms)
  };

  return (
    <input
      value={searchTerm}
      onChange={onChangeHandler}
      className="border bg-white grow-1 text-black px-5"
      placeholder="Search for product"
    />
  );
};

export default SearchPar;
