import React from 'react';

export default function WhyNot100Module({ result }) {
  if (!result) return null;

  return (
    <div className="space-y-5">

      {/* WHY NOT 100% */}
      <div className="relative overflow-hidden bg-white border border-amber-200 rounded-2xl p-5 shadow-sm">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-amber-400 to-orange-400 rounded-l-2xl" />
        <div className="pl-4 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-amber-600 text-sm">❓</span>
            <h3 className="text-xs font-black uppercase tracking-widest text-amber-800">Why is my match not 100%?</h3>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">{result.matchExplanation}</p>
        </div>
      </div>

      {/* RECOMMENDATIONS */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center text-base">💡</div>
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-700">Actionable AI Recommendations</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {result.recommendations.map((rec, i) => (
            <div key={i} className="group relative overflow-hidden p-3.5 bg-gradient-to-br from-slate-50 to-indigo-50 border border-indigo-100 rounded-xl hover:border-indigo-300 hover:shadow-md transition-all">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-white text-[11px] flex items-center justify-center font-black shrink-0 mt-0.5 shadow-sm">{i+1}</span>
                <span className="text-xs text-slate-700 leading-relaxed">{rec}</span>
              </div>
              <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 rounded-full" />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
