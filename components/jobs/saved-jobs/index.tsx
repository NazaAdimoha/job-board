import { Button } from '@/components/ui/button';
import { useSavedJobsStore } from '@/lib/stores/saved-jobs';
import { motion } from 'framer-motion';


export default function SavedJobsPage() {
  const { savedJobs, removeJob } = useSavedJobsStore();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Saved Jobs ({savedJobs.length})</h1>
      
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } }
        }}
        className="space-y-4"
      >
        {savedJobs.map((job) => (
          <motion.div
            key={job.job_id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm flex justify-between items-start"
          >
            <div>
              <h3 className="text-xl font-semibold">{job.job_title}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {job.employer_name} • {job.job_location}
              </p>
            </div>
            <Button
              variant="secondary"
              onClick={() => removeJob(job.job_id)}
            >
              Remove
            </Button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}