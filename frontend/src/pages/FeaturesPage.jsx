import React from 'react';
import { Link } from 'react-router-dom';

export default function FeaturesPage() {
  const features = [
    {
      icon: '🎯',
      title: 'ATS Readability Scoring',
      description: 'Evaluates your resume formatting, keyword density, and structural layout against modern Applicant Tracking System algorithms.'
    },
    {
      icon: '🔍',
      title: 'Smart Skill Extraction',
      description: 'Automatically detects technical frameworks, programming languages, and soft skills from both your resume and job posts.'
    },
    {
      icon: '⚖️',
      title: 'Real-Time Job Match Score',
      description: 'Calculates exact percentage overlap between your candidate profile and specific role requirements.'
    },
    {
      icon: '💡',
      title: 'Actionable AI Recommendations',
      description: 'Provides step-by-step suggestions on missing skills, bullet point enhancements, and quantifiable metrics.'
    },
    {
      icon: '❓',
      title: '"Why Not 100%?" Breakdown',
      description: 'Explains exactly why your score was given and highlights critical skills required to reach perfect alignment.'
    },
    {
      icon: '🤖',
      title: 'AI Career Assistant Chatbot',
      description: 'Interactive AI chatbot for instant guidance on resume optimization, interview prep, and salary negotiation.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans px-4 py-8 md:py-12">
      <div className="max-w-5xl mx-auto space-y-10">
        
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase font-semibold text-indigo-600">CareerAI System Capabilities</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Features & AI Engine
          </h1>
          <p className="text-sm text-slate-600">
            Designed to help job seekers optimize their resumes, pass ATS filters, and land interviews faster.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-3">
              <div className="text-3xl">{item.icon}</div>
              <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center pt-4">
          <Link
            to="/"
            className="inline-block px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-sm transition-colors"
          >
            ✨ Try Resume Analyzer Now
          </Link>
        </div>

      </div>
    </div>
  );
}
