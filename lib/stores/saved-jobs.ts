import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Job } from '../api/api';


type SavedJobsState = {
  savedJobs: Job[];
  addJob: (job: Job) => void;
  removeJob: (jobId: string) => void;
  isSaved: (jobId: string) => boolean;
};

export const useSavedJobsStore = create<SavedJobsState>()(
  persist(
    (set, get) => ({
      savedJobs: [],
      addJob: (job) => set((state) => ({
        savedJobs: [...state.savedJobs, job]
      })),
      removeJob: (jobId) => set((state) => ({
        savedJobs: state.savedJobs.filter(j => j.job_id !== jobId)
      })),
      isSaved: (jobId) => get().savedJobs.some(j => j.job_id === jobId)
    }),
    { name: 'saved-jobs' }
  )
);