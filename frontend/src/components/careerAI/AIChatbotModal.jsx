import React, { useState } from 'react';

export default function AIChatbotModal({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Hello! I am your CareerAI Assistant 🤖. Ask me anything about resume optimization, interview prep, skill gaps, or salary negotiation!'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const quickQuestions = [
    "How do I improve my ATS score?",
    "What are top skills for Backend Engineers?",
    "How to quantify achievements on a resume?",
    "Tips for behavioral interview questions"
  ];

  const handleSend = (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: query }];
    setMessages(newMessages);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    // Generate intelligent responses
    setTimeout(() => {
      let reply = "That is a great career question! ";
      const qLower = query.toLowerCase();

      if (qLower.includes('ats') || qLower.includes('score')) {
        reply = "To boost your ATS score:\n1. Use standard section titles (Work Experience, Skills, Education).\n2. Avoid tables, graphics, or complex headers.\n3. Incorporate exact technical keywords from the job description.\n4. Use bullet points starting with strong action verbs.";
      } else if (qLower.includes('backend') || qLower.includes('java') || qLower.includes('skill')) {
        reply = "Top high-demand skills for backend engineers include Java/Spring Boot, Python/FastAPI, Node.js, SQL (PostgreSQL/MySQL), Docker, AWS/GCP, Microservices architecture, and CI/CD pipelines.";
      } else if (qLower.includes('quantify') || qLower.includes('achieve') || qLower.includes('bullet')) {
        reply = "Quantify your impact using the Google XYZ formula: 'Accomplished [X] as measured by [Y], by doing [Z]'. Example: 'Optimized MySQL database queries, reducing average API response latency by 35% across 2M daily requests.'";
      } else if (qLower.includes('interview') || qLower.includes('behavioral')) {
        reply = "Use the STAR method (Situation, Task, Action, Result) for behavioral questions. Focus 70% of your answer on the specific actions YOU took and the measurable results achieved.";
      } else {
        reply += "I recommend analyzing your resume against target job descriptions using CareerAI's Analyzer to identify specific missing keywords and tailored recommendations.";
      }

      setMessages(prev => [...prev, { sender: 'ai', text: reply }]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full h-[580px] flex flex-col shadow-2xl overflow-hidden animate-fadeIn">

        {/* CHATBOT HEADER */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-bold">
              🤖
            </div>
            <div>
              <h3 className="text-sm font-bold">CareerAI Assistant</h3>
              <p className="text-[11px] text-slate-300">Active • AI Career & Resume Advisor</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1 font-bold text-lg cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* CHAT MESSAGES BODY */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed whitespace-pre-line ${msg.sender === 'user'
                  ? 'bg-indigo-600 text-white rounded-br-none'
                  : 'bg-white border border-slate-200 text-slate-800 shadow-sm rounded-bl-none'
                  }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-200 text-slate-500 rounded-2xl px-4 py-2 text-xs shadow-sm flex items-center gap-1">
                <span className="animate-pulse">AI Assistant is typing...</span>
              </div>
            </div>
          )}
        </div>

        {/* QUICK SUGGESTION PILLS */}
        <div className="p-2.5 bg-white border-t border-slate-200 flex flex-wrap gap-1.5 overflow-x-auto">
          {quickQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSend(q)}
              className="text-[11px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-full border border-slate-200 transition-colors cursor-pointer shrink-0"
            >
              {q}
            </button>
          ))}
        </div>

        {/* INPUT FORM */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask AI Career Assistant..."
            className="flex-1 px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            Send
          </button>
        </form>

      </div>
    </div>
  );
}
