import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useJobDetailsQuery } from '@/lib/api/api';

export default function JobDetailsPage() {
  const { id } = useParams();
  const { data, isLoading, error } = useJobDetailsQuery(id as string);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading job details</div>;
  if (!data) return <div>Job not found</div>;

  const job = data.data[0];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto p-6"
    >
      <div className="flex items-start justify-between mb-8">
        <motion.div layout className="space-y-2">
          <h1 className="text-3xl font-bold">{job.job_title}</h1>
          <h2 className="text-xl text-gray-600 dark:text-gray-400">
            {job.employer_name} • {job.job_location}
          </h2>
        </motion.div>
        <Button>Apply Now</Button>
      </div>

      <motion.div layout className="space-y-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Job Description</h3>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
            {job.job_description}
          </p>
        </div>

        {job.job_highlights && (
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(job.job_highlights).map(([title, items]) => (
              <motion.div
                key={title}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
              >
                <h4 className="text-lg font-semibold mb-3">{title}</h4>
                <ul className="space-y-2">
                  {(items as string[]).map((item, i) => (
                    <li key={i} className="text-gray-600 dark:text-gray-400">• {item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}