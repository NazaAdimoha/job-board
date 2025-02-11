import { useInfiniteQuery, useQuery, useMutation } from '@tanstack/react-query';
import { mockJobs } from '@/data/jobs';
import { Job, JobSearchFilters, JobsResponse } from '@/types/job-types';

// Extend JobsResponse to include nextPage for pagination
interface PaginatedJobsResponse extends JobsResponse {
  nextPage?: number;
}

// Custom response type for job details to match JobsResponse structure
interface JobDetailsResponse extends Omit<JobsResponse, 'parameters'> {
  parameters: {
    job_id: string;
    country: string;
    language: string;
    page: number;
    num_pages: number;
    date_posted: string;
  };
}

const filterJobs = (jobs: Job[], filters: JobSearchFilters) => {
  return jobs.filter(job => {
    const matchesQuery = !filters.query || 
      job.job_title.toLowerCase().includes(filters.query.toLowerCase()) ||
      job.employer_name.toLowerCase().includes(filters.query.toLowerCase());
    
    const matchesCountry = !filters.country || 
      job.job_country.toLowerCase() === filters.country.toLowerCase();
    
    const matchesEmploymentType = !filters.employmentType || 
      job.job_employment_type === filters.employmentType;
    
    const matchesRemote = !filters.isRemote || job.job_is_remote;
    
    const matchesDatePosted = !filters.datePosted || filters.datePosted === 'all' || 
      isWithinDateRange(job.job_posted_at_timestamp, filters.datePosted);
    
    return matchesQuery && matchesCountry && matchesEmploymentType && 
           matchesRemote && matchesDatePosted;
  });
};

const isWithinDateRange = (timestamp: number, datePosted: string) => {
  const now = Date.now();
  const days = {
    today: 1,
    '3days': 3,
    week: 7,
    month: 30
  }[datePosted] || 0;
  
  return (now - timestamp * 1000) <= days * 24 * 60 * 60 * 1000;
};

export const useJobsQuery = (filters: JobSearchFilters) => {
  return useInfiniteQuery<PaginatedJobsResponse>({
    queryKey: ['jobs', filters],
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const filteredJobs = filterJobs(mockJobs, filters);
      const pageSize = 10;
      const start = (pageParam - 1) * pageSize;
      const end = start + pageSize;
      const pageJobs = filteredJobs.slice(start, end);
      
      return {
        status: "OK",
        request_id: crypto.randomUUID(),
        parameters: {
          query: filters.query,
          page: pageParam,
          num_pages: Math.ceil(filteredJobs.length / pageSize),
          date_posted: filters.datePosted || "all",
          country: filters.country || "us",
          language: "en"
        },
        data: pageJobs,
        nextPage: end < filteredJobs.length ? pageParam + 1 : undefined
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage
  });
};

export const useJobDetailsQuery = (jobId: string) => {
  return useQuery<JobDetailsResponse>({
    queryKey: ['job', jobId],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 200));
      const job = mockJobs.find(j => j.job_id === jobId);
      
      return {
        status: "OK",
        request_id: crypto.randomUUID(),
        parameters: {
          job_id: jobId,
          country: "us",
          language: "en",
          page: 1,
          num_pages: 1,
          date_posted: "all"
        },
        data: job ? [job] : []
      };
    }
  });
};

// Store saved jobs in localStorage
const SAVED_JOBS_KEY = 'savedJobs';

const getSavedJobs = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem(SAVED_JOBS_KEY) || '[]');
  } catch {
    return [];
  }
};

export const useSaveJobMutation = () => {
  return useMutation({
    mutationFn: async (jobId: string) => {
      await new Promise(resolve => setTimeout(resolve, 200));
      const savedJobs = getSavedJobs();
      const isAlreadySaved = savedJobs.includes(jobId);
      
      if (isAlreadySaved) {
        const newSavedJobs = savedJobs.filter(id => id !== jobId);
        localStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(newSavedJobs));
        return { success: true, saved: false };
      } else {
        savedJobs.push(jobId);
        localStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(savedJobs));
        return { success: true, saved: true };
      }
    }
  });
};

// export const useIsSavedJob = (jobId: string) => {
//   return useQuery({
//     queryKey: ['savedJob', jobId],
//     queryFn: () => getSavedJobs().includes(jobId)
//   });
// };