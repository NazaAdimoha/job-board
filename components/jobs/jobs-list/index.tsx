"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {  useJobsQuery, useSaveJobMutation } from '@/lib/api/api';
import { toast } from 'sonner';
import { JobSearchFilters } from '@/types/job-types';
import SearchFilters from '../search-filters';
import JobCard from '@/components/ui/job-card';
import { Button } from '@/components/ui/button';
import AppModal from '@/components/ui/app-modal';
import ApplyPage from '../create-job-modal';
import ErrorBoundary from '@/components/ui/error-boundry';


export default function JobsPage() {
  const [openModal, setOpenModal] = useState(false);
  const [filters, setFilters] = useState<JobSearchFilters>({
    query: '',
    country: '',
    employmentType: '',
    isRemote: false,
    datePosted: 'all'
  });

  const { 
    data, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage,
    isLoading,
    isError,
    error 
  } = useJobsQuery(filters);

  const saveJobMutation = useSaveJobMutation();

  const handleSaveJob = async (jobId: string) => {
    try {
      const result = await saveJobMutation.mutateAsync(jobId);
      toast(
        result.saved ? 'Job Saved' : 'Job Removed',
        {
          description: result.saved 
            ? 'This job has been added to your saved jobs.'
            : 'This job has been removed from your saved jobs.',
        }
      );
    } catch (error) {
      toast('Failed to save job. Please try again.');
    }
  };

  const handleFiltersChange = (newFilters: JobSearchFilters) => {
    setFilters(newFilters);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <ErrorBoundary error={error} />
        <p className="text-gray-600 dark:text-gray-300">
          {error instanceof Error ? error.message : 'Failed to load jobs'}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  const allJobs = data?.pages.flatMap(page => page.data) ?? [];
  console.log(allJobs, "allJobs::::");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Find Your Next Opportunity
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              {allJobs.length} jobs available
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-col items-center space-x-4 md:flex-row md:items-center">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-600"
              value="relevance"
              onChange={() => {}} // TODO: Add sorting functionality
            >
              <option value="relevance">Sort by Relevance</option>
              <option value="date">Sort by Date</option>
              <option value="salary">Sort by Salary</option>
            </select>

            <div>
            <Button variant='default' onClick={() => setOpenModal(true)}> Create Job </Button>
          </div>
          </div>
        </div>

        <SearchFilters onFiltersChange={handleFiltersChange} />

        {allJobs.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No jobs found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Try adjusting your search filters
            </p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.div
              layout
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {allJobs.map((job) => (
                <motion.div
                  key={job.job_id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <JobCard
                    job={job}
                    onSave={handleSaveJob}
                    // isSaved={useIsSavedJob(job.job_id).data}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {hasNextPage && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {isFetchingNextPage ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading more...
                </span>
              ) : (
                'Load More Jobs'
              )}
            </button>
          </div>
        )}
      </div>

      <AppModal open={openModal} setOpen={setOpenModal}>
        <ApplyPage setOpen={setOpenModal} />
      </AppModal>
    </div>
  );
}