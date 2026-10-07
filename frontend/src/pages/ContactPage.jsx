import React, { useState } from 'react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans px-4 py-8 md:py-12">
      <div className="max-w-xl mx-auto space-y-6">
        
        <div className="space-y-2 text-center">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400">CareerAI Support</span>
          <h1 className="text-3xl font-extrabold text-white">Contact & Feedback</h1>
          <p className="text-xs text-slate-400">Have questions or feedback about the AI Resume Analyzer? Get in touch.</p>
        </div>

        {submitted ? (
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl text-center space-y-3">
            <div className="text-3xl">✅</div>
            <h3 className="text-base font-bold text-white">Thank You!</h3>
            <p className="text-xs text-slate-400">Your message has been received. We appreciate your feedback on CareerAI.</p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-2 px-4 py-2 bg-slate-800 text-xs font-semibold rounded text-slate-300"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Name</label>
              <input
                type="text"
                required
                placeholder="Your name"
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded text-xs text-slate-200 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Email</label>
              <input
                type="email"
                required
                placeholder="your.email@example.com"
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded text-xs text-slate-200 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Message / Feedback</label>
              <textarea
                rows={4}
                required
                placeholder="How can we improve CareerAI?"
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded text-xs text-slate-200 focus:border-indigo-500 focus:outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded transition-colors"
            >
              Submit Feedback
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
