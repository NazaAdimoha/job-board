import { motion } from 'framer-motion';
import { SearchIcon } from 'lucide-react';


type SearchProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export const Search = ({ value, onChange, placeholder = 'Search jobs...' }: SearchProps) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {/* <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /> */}
      <SearchIcon className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
    </motion.div>
  );
};