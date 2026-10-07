import React, { useState } from 'react';

const PRIORITY_CONFIG = {
  "HIGH":        { bg: 'from-red-50 to-rose-50',    border: 'border-red-200',   badge: 'bg-red-500',   text: 'text-red-700',   label: 'HIGH',   barColor: '#ef4444' },
  "MEDIUM-HIGH": { bg: 'from-orange-50 to-amber-50', border: 'border-orange-200', badge: 'bg-orange-500', text: 'text-orange-700', label: 'MED-HIGH', barColor: '#f97316' },
  "MEDIUM":      { bg: 'from-amber-50 to-yellow-50', border: 'border-amber-200', badge: 'bg-amber-400',  text: 'text-amber-700', label: 'MEDIUM', barColor: '#f59e0b' },
};

function getPri(p) { return PRIORITY_CONFIG[p] || PRIORITY_CONFIG["MEDIUM"]; }

function StrategyCard({ strategy }) {
  const map = {
    APPLY_NOW_AND_PREPARE: { grad: 'from-emerald-500 to-teal-500', icon: '🟢', title: 'Apply Now + Prepare', bg: 'bg-emerald-50 border-emerald-200' },
    PREPARE_THEN_APPLY:    { grad: 'from-amber-500 to-orange-500', icon: '🟡', title: 'Prepare Then Apply', bg: 'bg-amber-50 border-amber-200' },
    MAJOR_GAPS:            { grad: 'from-rose-500 to-red-600',     icon: '🔴', title: 'Address Major Gaps', bg: 'bg-rose-50 border-rose-200' },
  };
  const s = map[strategy.status] || map.MAJOR_GAPS;
  return (
    <div className={`flex items-start gap-4 p-4 rounded-2xl border ${s.bg}`}>
      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.grad} text-white flex items-center justify-center text-xl shrink-0 shadow-sm`}>{s.icon}</div>
      <div>
        <div className="font-bold text-slate-900 text-sm">{s.title}</div>
        <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{strategy.reason}</p>
      </div>
    </div>
  );
}

function ReadinessGauge({ label, value, colorClass, delay = 0 }) {
  const [w, setW] = useState(0);
  React.useEffect(() => { const t = setTimeout(() => setW(value), 200 + delay); return () => clearTimeout(t); }, [value]);
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-xs font-semibold text-slate-600">{label}</span>
        <span className="text-sm font-black text-slate-900">{value}%</span>
      </div>
      <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-3 rounded-full transition-all duration-1000 ease-out ${colorClass}`} style={{ width: `${w}%` }} />
      </div>
    </div>
  );
}

function TimelineCard({ item, index, completed, onToggle, isLast }) {
  const [expanded, setExpanded] = useState(false);
  const pc = getPri(item.priority);

  return (
    <div className="relative flex gap-4">
      {/* Timeline spine */}
      <div className="flex flex-col items-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white shadow-md shrink-0 transition-all ${completed ? 'bg-emerald-500' : `bg-gradient-to-br ${item.mustLearn ? 'from-red-500 to-rose-600' : 'from-indigo-500 to-purple-600'}`}`}>
          {completed ? '✓' : index + 1}
        </div>
        {!isLast && <div className={`w-0.5 flex-1 min-h-6 my-1 ${completed ? 'bg-emerald-300' : 'bg-slate-200'}`} />}
      </div>

      {/* Card */}
      <div className={`flex-1 mb-4 rounded-2xl border transition-all overflow-hidden ${completed ? 'opacity-60 border-slate-200 bg-slate-50' : `bg-gradient-to-br ${pc.bg} ${pc.border}`}`}>
        {/* Header */}
        <div className="p-4 cursor-pointer" onClick={() => setExpanded(!expanded)}>
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-0.5">
              <div className="text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-widest">{item.days}</div>
              <h4 className={`text-sm font-bold ${completed ? 'text-slate-400 line-through' : 'text-slate-900'}`}>{item.topic}</h4>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {item.estimatedHours && <span className="text-[10px] text-slate-500">⏱ {item.estimatedHours}h</span>}
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black text-white ${pc.badge}`}>{item.priority}</span>
              <span className={`text-slate-400 text-xs transition-transform ${expanded ? 'rotate-180' : ''}`}>▾</span>
            </div>
          </div>
        </div>

        {/* Expanded content */}
        {expanded && (
          <div className="px-4 pb-4 space-y-3 border-t border-white/50">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
              <div className="space-y-1.5">
                <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">📚 Learn</p>
                <ul className="space-y-1">
                  {item.learn?.map((l, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                      <span className="text-indigo-500 font-bold shrink-0 mt-0.5">›</span>{l}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-1.5">
                <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">🛠 Practice</p>
                <ul className="space-y-1">
                  {item.practice?.map((p, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                      <span className="text-emerald-500 font-bold shrink-0 mt-0.5">✓</span>{p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {item.emergencyMode && item.ifTimeAllows?.length > 0 && (
              <div className="text-[11px] text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                <span className="font-bold">If time allows: </span>{item.ifTimeAllows.join(', ')}
              </div>
            )}
            {item.emergencyMode && item.skipForNow?.length > 0 && (
              <div className="text-[11px] text-slate-500 bg-slate-100 rounded-lg px-3 py-2">
                <span className="font-bold">Skip for now: </span>{item.skipForNow.join(', ')}
              </div>
            )}

            <button onClick={() => onToggle(index)}
              className={`w-full py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                completed ? 'bg-white text-slate-500 border-slate-300' : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:border-indigo-400'
              }`}>
              {completed ? '↩ Mark Incomplete' : '✓ Mark Complete'}
            </button>
          </div>
        )}

        {/* Quick complete bar (collapsed) */}
        {!expanded && !completed && (
          <div className="px-4 pb-3">
            <button onClick={(e) => { e.stopPropagation(); onToggle(index); }}
              className="text-[11px] text-slate-500 hover:text-emerald-600 font-medium cursor-pointer transition-colors">
              ✓ mark complete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CareerGPSModule({ result }) {
  const [completedTasks, setCompletedTasks] = useState({});
  if (!result || result.daysRemaining === undefined || result.daysRemaining === null) return null;

  const { daysRemaining, currentReadiness, estimatedReadinessAfterPlan, applicationStrategy, prioritySkills, preparationPlan, matchScore } = result;
  const completedCount = Object.values(completedTasks).filter(Boolean).length;
  const isEmergency = daysRemaining > 0 && daysRemaining <= 7;

  let deadlineStr, deadlineBadgeStyle;
  if (daysRemaining < 0)       { deadlineStr = `Deadline passed ${Math.abs(daysRemaining)}d ago`; deadlineBadgeStyle = 'bg-red-500 text-white'; }
  else if (daysRemaining === 0) { deadlineStr = 'Deadline today!'; deadlineBadgeStyle = 'bg-red-500 text-white'; }
  else if (daysRemaining <= 7)  { deadlineStr = `${daysRemaining} days 🚨`; deadlineBadgeStyle = 'bg-orange-500 text-white'; }
  else                          { deadlineStr = `${daysRemaining} days`; deadlineBadgeStyle = 'bg-indigo-600 text-white'; }

  return (
    <div className="space-y-8">

      {/* ── GPS HEADER */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 text-white flex items-center justify-center text-xl shadow-lg">🧭</div>
        <div className="flex-1">
          <h2 className="text-xl font-extrabold text-slate-900">Your Career GPS</h2>
          <p className="text-xs text-slate-500">Personalized preparation plan based on your exact skill gaps</p>
        </div>
        <span className={`px-3 py-1.5 rounded-full text-xs font-black shadow-sm ${deadlineBadgeStyle}`}>{deadlineStr}</span>
        {isEmergency && <span className="px-2 py-1 rounded-full bg-red-100 text-red-700 border border-red-200 text-[10px] font-bold">🚨 Emergency Mode</span>}
      </div>

      {/* ── GPS METRICS OVERVIEW */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Job Match', value: `${matchScore}%`, icon: '🎯', grad: 'from-indigo-500 to-purple-500' },
          { label: 'Current Readiness', value: `${currentReadiness}%`, icon: '📊', grad: 'from-slate-500 to-slate-700' },
          { label: 'Deadline', value: deadlineStr, icon: '📅', grad: daysRemaining <= 7 && daysRemaining > 0 ? 'from-orange-500 to-red-500' : 'from-indigo-500 to-blue-600' },
          { label: 'Est. Readiness', value: `${estimatedReadinessAfterPlan}%`, icon: '🚀', grad: 'from-emerald-500 to-teal-500' },
        ].map((c, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm text-center space-y-2 hover:shadow-md transition-shadow">
            <div className={`w-8 h-8 mx-auto rounded-xl bg-gradient-to-br ${c.grad} text-white flex items-center justify-center text-sm shadow-sm`}>{c.icon}</div>
            <div className="text-xs text-slate-500 font-medium">{c.label}</div>
            <div className="text-base font-black text-slate-900 leading-tight">{c.value}</div>
          </div>
        ))}
      </div>

      {/* ── READINESS PROJECTION */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base">📈</span>
            <h3 className="text-sm font-black text-slate-900">Readiness Projection</h3>
          </div>
          <span className="text-[10px] text-slate-400 italic">Estimated — not a hiring guarantee</span>
        </div>
        <ReadinessGauge label="Current Readiness" value={currentReadiness} colorClass="bg-gradient-to-r from-slate-400 to-slate-600" delay={0} />
        <ReadinessGauge label="After Completing This Plan" value={estimatedReadinessAfterPlan} colorClass="bg-gradient-to-r from-emerald-400 to-teal-500" delay={300} />
        <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
          <span className="text-emerald-600 text-sm">✨</span>
          <p className="text-xs text-emerald-800 font-medium">
            Following this plan could improve your readiness by <strong>+{estimatedReadinessAfterPlan - currentReadiness}%</strong>, from {currentReadiness}% to {estimatedReadinessAfterPlan}%.
          </p>
        </div>
      </div>

      {/* ── APPLICATION STRATEGY */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-sm">🎯</span>
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Application Strategy</h3>
        </div>
        <StrategyCard strategy={applicationStrategy} />
      </div>

      {/* ── PRIORITY SKILLS */}
      {prioritySkills?.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-sm">🔥</span>
            <h3 className="text-sm font-black text-slate-900">Highest-Impact Skills to Learn</h3>
          </div>
          <div className="space-y-2">
            {prioritySkills.map((ps, i) => {
              const pc = getPri(ps.priority);
              const barPct = Math.min(100, (ps.estimatedMatchImprovement / 15) * 100);
              return (
                <div key={i} className={`p-3.5 rounded-xl border bg-gradient-to-r ${pc.bg} ${pc.border} flex items-center gap-3`}>
                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-slate-900">{ps.skill}</span>
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-black text-white ${pc.badge}`}>{ps.priority}</span>
                    </div>
                    <div className="h-1.5 bg-white/60 rounded-full overflow-hidden">
                      <div className="h-1.5 rounded-full" style={{ width: `${barPct}%`, backgroundColor: pc.barColor, transition: 'width 1s ease' }} />
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-lg font-black text-indigo-600">+{ps.estimatedMatchImprovement}%</div>
                    <div className="text-[10px] text-slate-400">match boost</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── PREPARATION TIMELINE */}
      {preparationPlan?.length > 0 && daysRemaining > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-base">🗓️</span>
              <h3 className="text-sm font-black text-slate-900">
                {isEmergency ? `🚨 Emergency ${daysRemaining}-Day Plan` : `Your ${daysRemaining}-Day Preparation Timeline`}
              </h3>
            </div>
            <div className="text-right space-y-1">
              <div className="text-xs text-slate-500 font-medium">{completedCount}/{preparationPlan.length} completed</div>
              {completedCount > 0 && (
                <div className="h-1.5 w-24 bg-slate-200 rounded-full overflow-hidden ml-auto">
                  <div className="h-1.5 bg-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.round((completedCount / preparationPlan.length) * 100)}%` }} />
                </div>
              )}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm">
            <div className="pt-2">
              {preparationPlan.map((item, idx) => (
                <TimelineCard key={idx} item={item} index={idx}
                  completed={!!completedTasks[idx]}
                  onToggle={(i) => setCompletedTasks(prev => ({ ...prev, [i]: !prev[i] }))}
                  isLast={idx === preparationPlan.length - 1} />
              ))}
            </div>
          </div>
        </div>
      )}

      {daysRemaining <= 0 && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-sm text-red-700 font-medium flex items-center gap-2">
          ⚠️ The application deadline has passed. Apply your prep plan to the next similar opening.
        </div>
      )}
    </div>
  );
}
