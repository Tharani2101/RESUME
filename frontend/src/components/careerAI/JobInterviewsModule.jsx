import React, { useState } from 'react';
import { AVAILABLE_JOBS } from '../../data/companiesData';

export default function JobInterviewsModule({ onSelectJobForAnalysis }) {
  const [search, setSearch] = useState('');
  const [selectedJobForApply, setSelectedJobForApply] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState({});
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredJobs = AVAILABLE_JOBS.filter(job =>
    job.company.toLowerCase().includes(search.toLowerCase()) ||
    job.role.toLowerCase().includes(search.toLowerCase()) ||
    job.skills.some(s => s.toLowerCase().includes(search.toLowerCase()))
  );

  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (!selectedJobForApply) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setAppliedJobs(prev => ({ ...prev, [selectedJobForApply.id]: true }));
      setIsSubmitting(false);
      setSelectedJobForApply(null);
      setApplicantName('');
      setApplicantEmail('');
    }, 500);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm space-y-6">
      
      {/* HEADER & SEARCH */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Active Company Job Interviews</h2>
          <p className="text-xs text-slate-500 mt-0.5">Explore available tech interviews and match your resume or apply directly.</p>
        </div>

        <div className="w-full sm:w-64">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search company, role, or skill..."
            className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      {/* JOB LIST CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredJobs.map((job) => {
          const isApplied = appliedJobs[job.id];

          return (
            <div key={job.id} className="bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl p-4 flex flex-col justify-between space-y-4 transition-all">
              
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-xl shrink-0 shadow-sm">
                      {job.logo}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{job.company}</h3>
                      <p className="text-xs text-indigo-600 font-semibold">{job.role}</p>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono px-2 py-0.5 bg-white text-slate-600 rounded border border-slate-200">
                    {job.location}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 font-mono">
                  <span>💰 {job.salary}</span>
                  <span>•</span>
                  <span>💼 {job.experience}</span>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {job.skills.map((skill, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-white text-slate-700 text-[11px] font-mono border border-slate-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
                {onSelectJobForAnalysis && (
                  <button
                    onClick={() => onSelectJobForAnalysis(job.description)}
                    className="flex-1 py-1.5 px-3 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                  >
                    ✨ Match Resume
                  </button>
                )}

                <button
                  onClick={() => !isApplied && setSelectedJobForApply(job)}
                  disabled={isApplied}
                  className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    isApplied
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'
                  }`}
                >
                  {isApplied ? '✓ Applied' : '🚀 Apply Now'}
                </button>
              </div>

            </div>
          );
        })}

        {filteredJobs.length === 0 && (
          <div className="col-span-full text-center py-8 text-slate-400 text-xs">
            No matching companies found for "{search}".
          </div>
        )}
      </div>

      {/* APPLY NOW MODAL */}
      {selectedJobForApply && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-xl p-6 max-w-md w-full space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">{selectedJobForApply.logo}</span>
                <h3 className="text-sm font-bold text-slate-900">Apply to {selectedJobForApply.company}</h3>
              </div>
              <button
                onClick={() => setSelectedJobForApply(null)}
                className="text-slate-400 hover:text-slate-800 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs space-y-1">
              <p className="font-semibold text-indigo-600">{selectedJobForApply.role}</p>
              <p className="text-slate-500">{selectedJobForApply.location} • {selectedJobForApply.salary}</p>
            </div>

            <form onSubmit={handleApplySubmit} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-medium text-slate-700">Full Name</label>
                <input
                  type="text"
                  required
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  placeholder="Alex Morgan"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-800 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-medium text-slate-700">Email Address</label>
                <input
                  type="email"
                  required
                  value={applicantEmail}
                  onChange={(e) => setApplicantEmail(e.target.value)}
                  placeholder="alex.morgan@example.com"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-800 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedJobForApply(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded font-semibold"
                >
                  {isSubmitting ? 'Submitting...' : 'Confirm Application'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
