import React from 'react';

export default function ResumeUploadModule({ activeTab, setActiveTab, resumeText, setResumeText, fileName, handleFileUpload }) {
  const wordCount = resumeText.trim() ? resumeText.trim().split(/\s+/).length : 0;
  const hasContent = resumeText.trim().length > 0;

  return (
    <div className="relative bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col overflow-hidden">
      {/* Gradient top accent */}
      <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

      <div className="p-5 flex flex-col gap-4 flex-1">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-700 text-white flex items-center justify-center text-sm shadow-sm">📄</div>
            <div>
              <div className="text-[10px] font-mono text-indigo-500 uppercase tracking-widest">Step 1</div>
              <h2 className="text-sm font-bold text-slate-900">Your Resume</h2>
            </div>
          </div>

          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
            {[['upload','📁 Upload'], ['text','✏️ Paste']].map(([tab, lbl]) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${activeTab === tab ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>
                {lbl}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {activeTab === 'upload' ? (
          <label htmlFor="resume-file-input" className="flex-1 flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all group
            border-slate-200 hover:border-indigo-400 bg-gradient-to-br from-slate-50 to-indigo-50/40 hover:from-indigo-50 hover:to-purple-50">
            <input type="file" id="resume-file-input" accept=".pdf,.txt,.doc,.docx" onChange={handleFileUpload} className="hidden" />
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 group-hover:from-indigo-200 group-hover:to-purple-200 flex items-center justify-center text-2xl transition-all shadow-sm">📄</div>
            <div>
              <p className="text-sm font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">Click to upload resume</p>
              <p className="text-xs text-slate-500 mt-0.5">TXT, PDF, DOCX supported</p>
            </div>
            {fileName && (
              <div className="px-3 py-1.5 bg-indigo-50 border border-indigo-200 rounded-xl text-xs text-indigo-700 font-mono font-semibold">
                ✓ {fileName}
              </div>
            )}
          </label>
        ) : (
          <div className="flex-1 flex flex-col gap-2">
            <textarea rows={8} value={resumeText} onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your full resume text here..."
              className="w-full p-4 bg-slate-50 border border-slate-200 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 rounded-xl text-slate-800 placeholder-slate-400 text-xs font-mono resize-none transition-all outline-none" />
            <div className="flex justify-between items-center">
              <span className={`text-[10px] font-medium ${hasContent ? 'text-emerald-600' : 'text-slate-400'}`}>
                {hasContent ? `✓ ${wordCount} words` : 'No content yet'}
              </span>
              {hasContent && <button onClick={() => setResumeText('')} className="text-[10px] text-rose-400 hover:text-rose-600 transition-colors cursor-pointer">Clear</button>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
