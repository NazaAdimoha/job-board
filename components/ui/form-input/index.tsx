import { motion } from 'framer-motion';
import { UseFormRegister, FieldError } from 'react-hook-form';

type FormInputProps = {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  type?: string;
};

export const FormInput = ({ label, name, register, error, type = 'text' }: FormInputProps) => (
  <motion.div className="space-y-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
    <label className="block text-sm font-medium">{label}</label>
    <input
      {...register(name)}
      type={type}
      className={`w-full p-2 rounded-lg border ${
        error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
      } dark:bg-gray-800`}
    />
    {error && <p className="text-red-500 text-sm">{error.message}</p>}
  </motion.div>
);