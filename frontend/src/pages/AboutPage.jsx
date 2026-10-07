import React from 'react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <div className="space-y-2 border-b border-slate-800 pb-6">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400">About CareerAI</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Empowering Job Seekers with AI Intelligence
          </h1>
        </div>

        <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-3">
            <h2 className="text-base font-bold text-white">Our Mission</h2>
            <p>
              CareerAI was built to bridge the gap between job candidates and modern hiring software. Over 75% of resumes are filtered out by Applicant Tracking Systems (ATS) before a recruiter ever reads them.
            </p>
            <p>
              By leveraging intelligent natural language processing, CareerAI compares your resume directly against specific job descriptions to provide clear, unbiased feedback on skill gaps, formatting readability, and match percentage.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-2">
              <h3 className="font-bold text-white">100% Privacy Focused</h3>
              <p className="text-xs text-slate-400">Your resume data is processed locally in real-time without storing sensitive personal information on unauthorized external servers.</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-2">
              <h3 className="font-bold text-white">Instant Feedback</h3>
              <p className="text-xs text-slate-400">Get actionable recommendations in seconds so you can iterate on your resume before submitting applications.</p>
            </div>
          </div>
        </div>

        <div className="pt-4 flex items-center justify-start gap-4">
          <Link to="/" className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors">
            Analyze Your Resume
          </Link>
          <Link to="/features" className="px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 font-semibold text-xs transition-colors">
            Explore System Features
          </Link>
        </div>

      </div>
    </div>
  );
}
