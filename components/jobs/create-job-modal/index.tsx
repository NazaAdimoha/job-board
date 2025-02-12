'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormInput } from '@/components/ui/form-input';
import { FileUpload } from '@/components/ui/file-upload';
import { TextArea } from '@/components/ui/text-area';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';


const schema = z.object({
  name: z.string().min(1, 'Required'),
  email: z.string().email('Invalid email'),
  resume: z.instanceof(File),
  coverLetter: z.string().min(1, 'Required'),
});

type JobBoardFormData = z.infer<typeof schema>;

export default function ApplyPage({ setOpen }: { setOpen: (open: boolean) => void }) {
    const [openModal, setOpenModal] = useState(false);
  const { register, handleSubmit, formState } = useForm<JobBoardFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: any) => {
    // Handle form submission
    setOpen(false);
    toast('Application submitted successfully');
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="max-w-2xl mx-auto space-y-6"
    >
      <FormInput
        label="Full Name"
        name="name"
        register={register}
        error={formState.errors.name}
      />
      
      <FormInput
        label="Email"
        name="email"
        type="email"
        register={register}
        error={formState.errors.email}
      />
      
      <FileUpload
        label="Resume"
        name="resume"
        register={register}
        error={formState.errors.resume}
      />
      
      <TextArea
        label="Cover Letter"
        name="coverLetter"
        register={register}
        error={formState.errors.coverLetter}
      />
      
      <Button variant='default' type="submit" disabled={formState.isSubmitting}> Submit Application </Button>
    </motion.form>
  );
}