"use client";
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useJobDetailsQuery } from '@/lib/api/api';
import { 
  ArrowLeft, 
  MapPin, 
  Building, 
  Clock, 
  Globe, 
  DollarSign,
  Briefcase,
  Calendar,
  Share2,
  ExternalLink
} from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';

export default function JobDetailsPage() {
  const router = useRouter();
  const { id } = useParams();
  const { data, isLoading, error } = useJobDetailsQuery(id as string);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Error Loading Job Details
        </h2>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Job Not Found
        </h2>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  const job = data.data[0];
  const postedDate = new Date(job.job_posted_at_datetime_utc);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button
              onClick={() => router.back()}
              variant="ghost"
              className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Jobs
            </Button>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="default" size="sm">
                Save Job
              </Button>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        {/* Header Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-6">
              {job.employer_logo ? (
                <img
                  src={job.employer_logo}
                  alt={job.employer_name}
                  className="w-20 h-20 rounded-lg object-contain bg-gray-50"
                />
              ) : (
                <div className="w-20 h-20 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                  <Building className="w-10 h-10 text-gray-400" />
                </div>
              )}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {job.job_title}
                </h1>
                <div className="space-y-2">
                  <h2 className="text-xl text-gray-600 dark:text-gray-400">
                    {job.employer_name}
                  </h2>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{job.job_location}</span>
                    </div>
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{formatDistanceToNow(postedDate, { addSuffix: true })}</span>
                    </div>
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                      <Briefcase className="w-4 h-4 mr-2" />
                      <span>{job.job_employment_type}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Button size="lg" className="flex items-center">
              Apply Now
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 p-6 bg-gray-50 dark:bg-gray-750 rounded-lg">
            <div className="flex items-center space-x-3">
              <DollarSign className="w-8 h-8 text-green-500" />
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Salary</h3>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {job.job_salary || 'Not Specified'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="w-8 h-8 text-blue-500" />
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Posted Date</h3>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {format(postedDate, 'MMM dd, yyyy')}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Globe className="w-8 h-8 text-purple-500" />
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Work Type</h3>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {job.job_is_remote ? 'Remote' : 'On-site'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8"
            >
              <h3 className="text-xl font-semibold mb-4">Job Description</h3>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                  {job.job_description}
                </p>
              </div>
            </motion.div>

            {/* Job Highlights */}
            {job.job_highlights && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8"
              >
                <h3 className="text-xl font-semibold mb-6">Key Information</h3>
                <div className="space-y-6">
                  {Object.entries(job.job_highlights).map(([title, items]) => (
                    <div key={title}>
                      <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                        {title}
                      </h4>
                      <ul className="space-y-3">
                        {(items as string[]).map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start text-gray-700 dark:text-gray-300"
                          >
                            <span className="mr-3 text-blue-500">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column - Additional Information */}
          <div className="space-y-8">
            {/* Company Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
            >
              <h3 className="text-xl font-semibold mb-4">Company Information</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Website</h4>
                  <a
                    href={job.employer_website || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {job.employer_website || 'Not Available'}
                  </a>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</h4>
                  <p className="text-gray-900 dark:text-white">{job.job_location}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Employment Type
                  </h4>
                  <p className="text-gray-900 dark:text-white">{job.job_employment_type}</p>
                </div>
              </div>
            </motion.div>

            {/* Application Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
            >
              <h3 className="text-xl font-semibold mb-4">How to Apply</h3>
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300">
                  Apply directly through our platform or visit the company website.
                </p>
                <Button className="w-full" size="lg">
                  Apply Now
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}