import { Job } from "@/types/job-types";

export const mockJobs: Job[] = [
    {
      job_id: "1",
      job_title: "Senior React Developer",
      employer_name: "Tech Corp",
      employer_logo: "https://example.com/logo.png",
      employer_website: "https://example.com",
      job_publisher: "LinkedIn",
      job_employment_type: "FULLTIME",
      job_employment_types: ["FULLTIME"],
      job_apply_link: "https://example.com/apply",
      job_apply_is_direct: true,
      apply_options: [{
        publisher: "LinkedIn",
        apply_link: "https://example.com/apply",
        is_direct: true
      }],
      job_description: "Looking for a senior React developer...",
      job_is_remote: true,
      job_posted_at: "2 days ago",
      job_posted_at_timestamp: 1707696000,
      job_posted_at_datetime_utc: "2024-02-12T00:00:00.000Z",
      job_location: "San Francisco, CA",
      job_city: "San Francisco",
      job_state: "California",
      job_country: "US",
      job_latitude: 37.7749,
      job_longitude: -122.4194,
      job_benefits: "Health insurance, 401k",
      job_google_link: "https://example.com/google",
      job_salary: "$150,000 - $200,000",
      job_min_salary: 150000,
      job_max_salary: 200000,
      job_salary_period: "YEAR",
      job_highlights: {
        Qualifications: [
          "5+ years React experience",
          "Strong TypeScript skills"
        ],
        Responsibilities: [
          "Lead frontend development",
          "Mentor junior developers"
        ]
      },
      job_onet_soc: "15-1252.00",
      job_onet_job_zone: "4"
    },
    // Add more mock jobs here...
  ];