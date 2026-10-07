import React from 'react';
import { useNavigate } from 'react-router-dom';
import JobInterviewsModule from '../components/careerAI/JobInterviewsModule';

export default function JobInterviewsPage() {
  const navigate = useNavigate();

  const handleSelectJobForAnalysis = (jobDescription) => {
    sessionStorage.setItem('selected_job_description', jobDescription);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans px-4 py-8 md:py-12">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <div className="space-y-2 border-b border-slate-200 pb-6">
          <span className="text-xs font-mono uppercase font-semibold text-indigo-600">Available Company Openings</span>
          <h1 className="text-3xl font-extrabold text-slate-900">Job Interviews & Hiring Companies</h1>
          <p className="text-xs text-slate-600">Browse active interview listings from top tech companies. Match your resume or apply directly.</p>
        </div>

        <JobInterviewsModule onSelectJobForAnalysis={handleSelectJobForAnalysis} />

      </div>
    </div>
  );
}
