import { motion } from 'framer-motion';
import { UseFormRegister, FieldError } from 'react-hook-form';

type TextAreaProps = {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  rows?: number;
};

export const TextArea = ({ label, name, register, error, rows = 4 }: TextAreaProps) => (
  <motion.div className="space-y-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
    <label className="block text-sm font-medium">{label}</label>
    <textarea
      {...register(name)}
      rows={rows}
      className={`w-full p-2 rounded-lg border ${
        error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
      } dark:bg-gray-800`}
    />
    {error && <p className="text-red-500 text-sm">{error.message}</p>}
  </motion.div>
);