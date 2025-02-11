"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookmarkPlus, BookmarkCheck, MapPin, Building, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Job } from '@/types/job-types';

interface JobCardProps {
  job: Job;
  onSave?: (jobId: string) => void;
  isSaved?: boolean;
}

const JobCard = ({ job, onSave, isSaved = false }: JobCardProps) => {
  const [isBookmarked, setIsBookmarked] = useState(isSaved);

  const handleSave = () => {
    setIsBookmarked(!isBookmarked);
    onSave?.(job.job_id);
  };

  const postedDate = new Date(job.job_posted_at_datetime_utc);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-4">
            {job.employer_logo ? (
              <img
                src={job.employer_logo}
                alt={job.employer_name}
                className="w-12 h-12 rounded-lg object-contain bg-gray-50"
              />
            ) : (
              <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                <Building className="w-6 h-6 text-gray-400" />
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                {job.job_title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{job.employer_name}</p>
            </div>
          </div>
          <button
            onClick={handleSave}
            className="text-gray-400 hover:text-blue-500 transition-colors"
          >
            {isBookmarked ? (
              <BookmarkCheck className="w-6 h-6" />
            ) : (
              <BookmarkPlus className="w-6 h-6" />
            )}
          </button>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{job.job_location}</span>
          </div>
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <Clock className="w-4 h-4 mr-2" />
            <span>{formatDistanceToNow(postedDate, { addSuffix: true })}</span>
          </div>
        </div>

        {job.job_highlights?.Responsibilities && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              Key Responsibilities
            </h4>
            <ul className="text-sm text-gray-600 dark:text-gray-300 list-disc list-inside space-y-1">
              {job.job_highlights.Responsibilities.slice(0, 2).map((resp, index) => (
                <li key={index} className="line-clamp-1">{resp}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6 flex items-center justify-between">
          {job.job_salary ? (
            <span className="text-green-600 dark:text-green-400 font-medium">
              {job.job_salary}
            </span>
          ) : (
            <span className="text-gray-500 dark:text-gray-400 text-sm">Salary not specified</span>
          )}
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full">
            {job.job_employment_type}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default JobCard;