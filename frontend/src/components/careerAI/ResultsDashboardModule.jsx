import React, { useState, useEffect } from 'react';

// Animated circular gauge
function ScoreRing({ score, size = 100, stroke = 10, color = '#6366f1', label }) {
  const [displayed, setDisplayed] = useState(0);
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;

  useEffect(() => {
    let start = null;
    const dur = 1200;
    const animate = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / dur, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(score * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [score]);

  const pct = displayed / 100;
  const dash = circ * pct;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#e2e8f0" strokeWidth={stroke} />
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
            strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
            style={{ transition: 'stroke-dasharray 0.1s ease' }} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-black text-slate-900">{displayed}%</span>
        </div>
      </div>
      {label && <span className="text-xs font-semibold text-slate-500 text-center">{label}</span>}
    </div>
  );
}

// Animated bar
function AnimatedBar({ value, colorClass = 'bg-indigo-500' }) {
  const [width, setWidth] = useState(0);
  useEffect(() => { const t = setTimeout(() => setWidth(value), 100); return () => clearTimeout(t); }, [value]);
  return (
    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
      <div className={`h-1.5 rounded-full transition-all duration-1000 ease-out ${colorClass}`} style={{ width: `${width}%` }} />
    </div>
  );
}

export default function ResultsDashboardModule({ result }) {
  if (!result) return null;

  const atsColor = result.atsScore >= 80 ? '#10b981' : result.atsScore >= 60 ? '#6366f1' : '#f59e0b';
  const matchColor = result.matchScore >= 75 ? '#10b981' : result.matchScore >= 50 ? '#6366f1' : '#f59e0b';

  return (
    <div className="space-y-6">

      {/* AI SUMMARY */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl p-6 text-white shadow-xl shadow-indigo-200">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-xl" />
        <div className="relative space-y-1">
          <div className="text-indigo-200 text-xs font-mono uppercase tracking-widest">AI Summary</div>
          <p className="text-white text-sm sm:text-base font-medium leading-relaxed">{result.summary}</p>
        </div>
      </div>

      {/* SCORE RINGS + SKILLS BREAKDOWN */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Score rings */}
        <div className="md:col-span-1 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col items-center gap-6">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-widest self-start">Score Analysis</div>
          <div className="flex justify-around w-full">
            <ScoreRing score={result.atsScore} size={100} stroke={9} color={atsColor} label="ATS Score" />
            <ScoreRing score={result.matchScore} size={100} stroke={9} color={matchColor} label="Job Match" />
          </div>
          <div className="w-full space-y-2 pt-2 border-t border-slate-100">
            {[
              { label: 'ATS Readability', val: result.atsScore, color: 'bg-emerald-500' },
              { label: 'Role Match', val: result.matchScore, color: 'bg-indigo-500' },
              { label: 'Skills Coverage', val: Math.round((result.matchedSkills.length / Math.max(result.matchedSkills.length + result.missingSkills.length, 1)) * 100), color: 'bg-purple-500' },
            ].map((b, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-[11px] font-medium text-slate-600">
                  <span>{b.label}</span><span className="font-bold">{b.val}%</span>
                </div>
                <AnimatedBar value={b.val} colorClass={b.color} />
              </div>
            ))}
          </div>
        </div>

        {/* Skills breakdown */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">

          {/* All skills */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">All Skills</span>
              <span className="text-xs font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded-full">{result.skills.length}</span>
            </div>
            <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1">
              {result.skills.map((skill, i) => (
                <span key={i} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-mono border border-slate-200">{skill}</span>
              ))}
            </div>
          </div>

          {/* Matched */}
          <div className="bg-white border border-emerald-200 rounded-2xl p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">✓ Matched</span>
              <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">{result.matchedSkills.length}</span>
            </div>
            <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1">
              {result.matchedSkills.map((skill, i) => (
                <span key={i} className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-mono">{skill}</span>
              ))}
            </div>
          </div>

          {/* Missing */}
          <div className="bg-white border border-rose-200 rounded-2xl p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-700 uppercase tracking-wider">⚡ Missing</span>
              <span className="text-xs font-black text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">{result.missingSkills.length}</span>
            </div>
            <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1">
              {result.missingSkills.map((skill, i) => (
                <span key={i} className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200 text-[11px] font-mono">{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* STRENGTHS & WEAKNESSES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center text-base">💪</div>
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-700">Resume Strengths</h3>
          </div>
          <ul className="space-y-2">
            {result.strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-3 p-2.5 bg-emerald-50 border border-emerald-100 rounded-xl">
                <span className="w-4 h-4 rounded-full bg-emerald-500 text-white text-[10px] flex items-center justify-center font-black shrink-0 mt-0.5">{i+1}</span>
                <span className="text-xs text-slate-700 leading-relaxed">{s}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center text-base">⚠️</div>
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-700">Areas to Improve</h3>
          </div>
          <ul className="space-y-2">
            {result.weaknesses.map((w, i) => (
              <li key={i} className="flex items-start gap-3 p-2.5 bg-amber-50 border border-amber-100 rounded-xl">
                <span className="w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] flex items-center justify-center font-black shrink-0 mt-0.5">{i+1}</span>
                <span className="text-xs text-slate-700 leading-relaxed">{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  );
}
