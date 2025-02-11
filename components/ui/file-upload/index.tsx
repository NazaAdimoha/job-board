import { motion } from 'framer-motion';
import { FolderUpIcon } from 'lucide-react';
import { UseFormRegister, FieldError } from 'react-hook-form';


type FileUploadProps = {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  error?: FieldError;
};

export const FileUpload = ({ label, name, register, error }: FileUploadProps) => (
  <motion.div className="space-y-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
    <label className="block text-sm font-medium">{label}</label>
    <label className={`flex items-center gap-2 p-4 rounded-lg border cursor-pointer ${
      error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
    } dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors`}>
      {/* <DocumentArrowUpIcon className="h-6 w-6 text-gray-400" /> */}
      <FolderUpIcon className="h-6 w-6 text-gray-400" />
      <span className="text-sm">Select file...</span>
      <input
        type="file"
        {...register(name)}
        className="hidden"
        accept=".pdf,.doc,.docx"
      />
    </label>
    {error && <p className="text-red-500 text-sm">{error.message}</p>}
  </motion.div>
);