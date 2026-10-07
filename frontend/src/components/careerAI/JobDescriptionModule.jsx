import React from 'react';
import { calcDaysRemaining } from '../../services/aiService';

export default function JobDescriptionModule({ jobDescription, setJobDescription, deadline, setDeadline }) {
  const daysRemaining = calcDaysRemaining(deadline);
  const wordCount = jobDescription.trim() ? jobDescription.trim().split(/\s+/).length : 0;
  const hasContent = jobDescription.trim().length > 0;

  let deadlineBadge = null;
  if (daysRemaining !== null) {
    if (daysRemaining < 0)       deadlineBadge = { label: `Passed ${Math.abs(daysRemaining)}d ago`, style: 'bg-red-100 text-red-700 border-red-200' };
    else if (daysRemaining === 0) deadlineBadge = { label: 'Today!', style: 'bg-red-100 text-red-700 border-red-200' };
    else if (daysRemaining <= 7)  deadlineBadge = { label: `${daysRemaining}d left 🚨`, style: 'bg-orange-100 text-orange-700 border-orange-200' };
    else                          deadlineBadge = { label: `${daysRemaining} days left`, style: 'bg-indigo-100 text-indigo-700 border-indigo-200' };
  }

  return (
    <div className="relative bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col overflow-hidden">
      {/* Gradient top accent */}
      <div className="h-1 w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400" />

      <div className="p-5 flex flex-col gap-4 flex-1">
        {/* Header */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-600 to-pink-700 text-white flex items-center justify-center text-sm shadow-sm">💼</div>
          <div>
            <div className="text-[10px] font-mono text-purple-500 uppercase tracking-widest">Step 2</div>
            <h2 className="text-sm font-bold text-slate-900">Job Description</h2>
          </div>
          {hasContent && <span className="ml-auto text-[10px] text-emerald-600 font-semibold">✓ {wordCount} words</span>}
        </div>

        {/* Textarea */}
        <div className="flex-1 flex flex-col gap-2">
          <textarea rows={7} value={jobDescription} onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the full job description here..."
            className="w-full p-4 bg-slate-50 border border-slate-200 focus:border-purple-400 focus:bg-white focus:ring-2 focus:ring-purple-100 rounded-xl text-slate-800 placeholder-slate-400 text-xs font-mono resize-none transition-all outline-none" />
          {hasContent && <button onClick={() => setJobDescription('')} className="text-[10px] text-rose-400 hover:text-rose-600 transition-colors cursor-pointer self-end">Clear</button>}
        </div>

        {/* Deadline */}
        <div className="space-y-2 border-t border-slate-100 pt-3">
          <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
            📅 Application Deadline
            <span className="font-normal text-slate-400">(optional — unlocks Career GPS)</span>
          </label>
          <div className="flex items-center gap-2">
            <input type="date" value={deadline} min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setDeadline(e.target.value)}
              className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 rounded-xl text-xs text-slate-800 transition-all outline-none cursor-pointer" />
            {deadlineBadge && (
              <span className={`px-2.5 py-1.5 rounded-xl border text-[11px] font-bold whitespace-nowrap ${deadlineBadge.style}`}>
                {deadlineBadge.label}
              </span>
            )}
          </div>
          {!deadline && (
            <p className="text-[11px] text-slate-400 flex items-center gap-1">
              <span className="text-indigo-400">🧭</span> Set a deadline to get your personalized AI preparation plan.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
