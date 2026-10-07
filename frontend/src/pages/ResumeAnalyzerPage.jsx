import React, { useState, useEffect } from 'react';
import ResumeUploadModule from '../components/careerAI/ResumeUploadModule';
import JobDescriptionModule from '../components/careerAI/JobDescriptionModule';
import ResultsDashboardModule from '../components/careerAI/ResultsDashboardModule';
import WhyNot100Module from '../components/careerAI/WhyNot100Module';
import CareerGPSModule from '../components/careerAI/CareerGPSModule';
import { analyzeResumeWithAI } from '../services/aiService';
import { SAMPLE_RESUME, SAMPLE_JOB_DESCRIPTION, SAMPLE_DEADLINE } from '../data/demoData';

export default function ResumeAnalyzerPage() {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState('text');
  const [step, setStep] = useState(1); // 1=resume, 2=job, 3=analyze

  useEffect(() => {
    const savedJob = sessionStorage.getItem('selected_job_description');
    if (savedJob) { setJobDescription(savedJob); sessionStorage.removeItem('selected_job_description'); }
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setError(null);
    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target.result;
      const printable = typeof text === 'string' ? text.replace(/[^\x20-\x7E\n\r\t]/g, ' ') : '';
      setResumeText(printable.trim().length > 50 ? printable : `[Uploaded: ${file.name}]\n\nResume content loaded.`);
    };
    reader.readAsText(file);
  };

  const handleLoadDemo = () => {
    setResumeText(SAMPLE_RESUME);
    setJobDescription(SAMPLE_JOB_DESCRIPTION);
    setDeadline(SAMPLE_DEADLINE);
    setFileName('Demo_Resume_Alex_Morgan.txt');
    setError(null);
    setStep(3);
  };

  const handleAnalyze = async () => {
    if (!resumeText.trim()) { setError('Please upload or paste your resume text.'); return; }
    if (!jobDescription.trim()) { setError('Please paste a job description.'); return; }
    setError(null);
    setLoading(true);
    setResult(null);
    try {
      const analysis = await analyzeResumeWithAI(resumeText, jobDescription, deadline || null);
      setTimeout(() => { setResult(analysis); setLoading(false); }, 500);
    } catch (err) {
      setError('Analysis failed. Please try again.'); setLoading(false);
    }
  };

  const handleReset = () => { setResult(null); setError(null); setStep(1); };

  return (
    <div className="min-h-screen font-sans">
      {/* ── HERO SECTION */}
      {!result && (
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white">
          {/* Animated background blobs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay:'1s'}} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay:'0.5s'}} />
          </div>

          <div className="relative max-w-5xl mx-auto px-4 py-16 sm:py-20">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-medium backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"/>
                AI-Powered Career Intelligence
              </div>

              <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
                Land Your Dream Job<br/>
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  with Career GPS
                </span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                Paste your resume + job description + deadline. Our AI analyzes your skill gaps
                and builds a personalized day-by-day preparation plan.
              </p>

              {/* Step Pills */}
              <div className="flex items-center justify-center gap-2 pt-2 flex-wrap">
                {['Upload Resume','Add Job Description','Analyze & Get GPS'].map((label, i) => (
                  <button key={i} onClick={() => !result && setStep(i+1)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                      step === i+1 ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/30' :
                      (resumeText && i===0) || (jobDescription && i===1) ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300' :
                      'bg-white/5 border-white/20 text-slate-300 hover:bg-white/10'
                    }`}>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                      step === i+1 ? 'bg-white text-indigo-600' :
                      (resumeText && i===0) || (jobDescription && i===1) ? 'bg-emerald-400 text-white' : 'bg-white/20 text-white'
                    }`}>{(resumeText && i===0) || (jobDescription && i===1) ? '✓' : i+1}</span>
                    {label}
                  </button>
                ))}
              </div>

              <button onClick={handleLoadDemo}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm shadow-xl shadow-indigo-900/50 transition-all hover:scale-105 cursor-pointer">
                ⚡ Try Demo — See Career GPS in Action
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── INPUT SECTION */}
      {!result && (
        <div className="bg-gradient-to-b from-slate-100 to-white">
          <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">

            {error && (
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 text-sm flex items-center justify-between shadow-sm">
                <span>⚠️ {error}</span>
                <button onClick={() => setError(null)} className="text-rose-400 hover:text-rose-800 font-bold cursor-pointer">✕</button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ResumeUploadModule activeTab={activeTab} setActiveTab={setActiveTab}
                resumeText={resumeText} setResumeText={setResumeText}
                fileName={fileName} handleFileUpload={handleFileUpload} />
              <JobDescriptionModule jobDescription={jobDescription} setJobDescription={setJobDescription}
                deadline={deadline} setDeadline={setDeadline} />
            </div>

            {/* Analyze CTA */}
            <div className="text-center space-y-3">
              <button onClick={handleAnalyze} disabled={loading}
                className={`group relative w-full sm:w-auto px-12 py-4 rounded-2xl text-base font-bold transition-all cursor-pointer overflow-hidden ${
                  loading ? 'bg-slate-300 text-slate-500 cursor-not-allowed' :
                  'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white shadow-2xl shadow-indigo-500/30 hover:scale-[1.02]'
                }`}>
                {!loading && <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"/>}
                {loading ? (
                  <span className="inline-flex items-center gap-3">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    AI Analyzing Your Resume...
                  </span>
                ) : '✨ Analyze Resume & Generate Career GPS'}
              </button>
              {deadline && !loading && (
                <p className="text-xs text-slate-500">🧭 Career GPS will be generated for your deadline</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── RESULTS */}
      {result && (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
          {/* Results Hero Banner */}
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white px-4 py-10">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-indigo-300 text-xs font-mono uppercase tracking-wider mb-1">CareerAI Analysis Complete</div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">Your Career Intelligence Report</h2>
                </div>
                <button onClick={handleReset}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold transition-all cursor-pointer backdrop-blur-sm">
                  ← New Analysis
                </button>
              </div>

              {/* Big Score Cards in hero */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'ATS Score', value: `${result.atsScore}%`, icon: '📊', sub: 'ATS Readability', color: 'from-emerald-500 to-teal-500' },
                  { label: 'Job Match', value: `${result.matchScore}%`, icon: '🎯', sub: 'Role Alignment', color: 'from-indigo-500 to-purple-500' },
                  { label: 'Matched Skills', value: result.matchedSkills.length, icon: '✅', sub: 'Skills confirmed', color: 'from-blue-500 to-cyan-500' },
                  { label: 'Missing Skills', value: result.missingSkills.length, icon: '⚡', sub: 'Skills to acquire', color: 'from-orange-500 to-rose-500' },
                ].map((card, i) => (
                  <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center space-y-1 hover:bg-white/10 transition-all">
                    <div className="text-2xl">{card.icon}</div>
                    <div className={`text-3xl font-black bg-gradient-to-r ${card.color} bg-clip-text text-transparent`}>{card.value}</div>
                    <div className="text-xs text-slate-300 font-medium">{card.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Results content */}
          <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
            <ResultsDashboardModule result={result} />
            <WhyNot100Module result={result} />

            {result.daysRemaining !== undefined && result.daysRemaining !== null ? (
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur opacity-20"/>
                <div className="relative bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">
                  <CareerGPSModule result={result} />
                </div>
              </div>
            ) : (
              <div className="relative overflow-hidden bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-2xl p-6">
                <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-200/30 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"/>
                <div className="relative flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center text-2xl shadow-lg shrink-0">🧭</div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Unlock Your Career GPS</h3>
                    <p className="text-sm text-slate-600 mt-0.5">Add an <strong>Application Deadline</strong> in the Job Description section to generate a personalized day-by-day preparation plan.</p>
                  </div>
                  <button onClick={handleReset}
                    className="ml-auto shrink-0 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors cursor-pointer">
                    Add Deadline →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
