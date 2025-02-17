"use client";
import { motion } from 'framer-motion';
import { SearchIcon } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { debounce } from 'lodash';


type SearchProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceTime?: number;
};

export const Search = ({ value: externalValue, onChange, placeholder = 'Search jobs...', debounceTime = 1000 }: SearchProps) => {
  const [internalValue, setInternalValue] = useState(externalValue);

  // Create my debounced function here
  const debouncedOnChange = useMemo(() => debounce(onChange, debounceTime), [onChange, debounceTime]);

  // I want to Update internal value when external value changes
  useEffect(() => {
    setInternalValue(externalValue);
  }, [externalValue]);

  //I will clean up the side effect here
  useEffect(() => {
    return () => {
      debouncedOnChange.cancel();
    };
  }, [debouncedOnChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue); // Update internal state immediately
    debouncedOnChange(newValue); 
  };
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative">
      <input
        type="text"
        value={internalValue}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {/* <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /> */}
      <SearchIcon className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
    </motion.div>
  );
};