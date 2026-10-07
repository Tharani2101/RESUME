import React from "react"
import { Link } from "react-router-dom"

function Footer() {
  return (
    <footer className="bg-white text-slate-600 border-t border-slate-200 pt-10 pb-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
              ⚡
            </div>
            <span className="text-lg font-extrabold text-slate-900 tracking-tight">
              Career<span className="text-indigo-600">AI</span>
            </span>
          </div>

          <p className="text-xs text-slate-500 text-center sm:text-left max-w-md">
            Understand your resume, match it with your dream job, and discover actionable recommendations to accelerate your tech career.
          </p>

          <div className="flex items-center gap-4 text-xs font-medium">
            <Link to="/" className="text-indigo-600 hover:underline">Resume Analyzer</Link>
            <span>•</span>
            <Link to="/jobs" className="hover:text-slate-900">Job Interviews</Link>
            <span>•</span>
            <Link to="/about" className="hover:text-slate-900">About</Link>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>© {new Date().getFullYear()} CareerAI — AI Resume Analyzer & Job Matching System.</p>
          <div className="flex gap-4">
            <span>ATS Optimizer</span>
            <span>Skill Matcher</span>
            <span>AI Career Guidance</span>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer
