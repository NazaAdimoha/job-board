"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { Filter, MapPin, Briefcase, Calendar } from 'lucide-react';
import { JobSearchFilters } from '@/types/job-types';
import { Search } from '@/components/ui/search';
import { debounce } from 'lodash';


interface SearchFiltersProps {
  onFiltersChange: (filters: JobSearchFilters) => void;
}

const SearchFilters = ({ onFiltersChange }: SearchFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<JobSearchFilters>({
    query: '',
    country: '',
    employmentType: '',
    isRemote: false,
    datePosted: 'all'
  });

  const debouncedFiltersChange = debounce(onFiltersChange, 500);

  useEffect(() => {
    debouncedFiltersChange(filters);
    // Cleanup
    return () => {
      debouncedFiltersChange.cancel();
    };
  }, [filters, debouncedFiltersChange]);

  const handleFilterChange = (key: keyof JobSearchFilters, value: string | boolean) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };
  
  // const handleFilterChange = (key: keyof JobSearchFilters, value: string | boolean) => {
  //   const newFilters = { ...filters, [key]: value };
  //   setFilters(newFilters);
  //   onFiltersChange(newFilters);
  // };

  return (
    <div className="mb-8 space-y-4">
      <Search
        value={filters.query}
        onChange={(value) => handleFilterChange('query', value)}
        placeholder="Search job title or company..."
        debounceTime={500}
      />

      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          <Filter className="w-5 h-5" />
          <span>Filters</span>
        </button>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
              <MapPin className="w-4 h-4" />
              <span>Location</span>
            </label>
            <select
              value={filters.country}
              onChange={(e) => handleFilterChange('country', e.target.value)}
              className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800"
            >
              <option value="">All Countries</option>
              <option value="us">United States</option>
              <option value="gb">United Kingdom</option>
              <option value="ca">Canada</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
              <Briefcase className="w-4 h-4" />
              <span>Employment Type</span>
            </label>
            <select
              value={filters.employmentType}
              onChange={(e) => handleFilterChange('employmentType', e.target.value)}
              className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800"
            >
              <option value="">All Types</option>
              <option value="FULLTIME">Full Time</option>
              <option value="PARTTIME">Part Time</option>
              <option value="CONTRACTOR">Contractor</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
              <Calendar className="w-4 h-4" />
              <span>Date Posted</span>
            </label>
            <select
              value={filters.datePosted}
              onChange={(e) => handleFilterChange('datePosted', e.target.value)}
              className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800"
            >
              <option value="all">Any Time</option>
              <option value="today">Today</option>
              <option value="3days">Last 3 Days</option>
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
            </select>
          </div>

          <div className="md:col-span-3">
            <label className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
              <input
                type="checkbox"
                checked={filters.isRemote}
                onChange={(e) => handleFilterChange('isRemote', e.target.checked)}
                className="rounded border-gray-300 dark:border-gray-600"
              />
              <span>Remote Only</span>
            </label>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SearchFilters;