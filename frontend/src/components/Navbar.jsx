import React, { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { MenuIcon, CloseIcon } from "./Icons"

function Navbar({ onOpenChat }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  
  const isActive = (path) => location.pathname === path

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all text-slate-800 shadow-sm">
        {/* Main Navbar Header */}
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
              ⚡
            </div>
            <span className="text-xl font-extrabold text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">
              Career<span className="text-indigo-600">AI</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-7 text-slate-600 font-medium text-xs sm:text-sm">
            <Link to="/" className={`transition-colors py-1 ${isActive("/") ? "text-indigo-600 font-bold border-b-2 border-indigo-600" : "hover:text-slate-900"}`}>Resume Analyzer</Link>
            <Link to="/jobs" className={`transition-colors py-1 ${isActive("/jobs") ? "text-indigo-600 font-bold border-b-2 border-indigo-600" : "hover:text-slate-900"}`}>Job Interviews</Link>
            <Link to="/features" className={`transition-colors py-1 ${isActive("/features") ? "text-indigo-600 font-bold border-b-2 border-indigo-600" : "hover:text-slate-900"}`}>Features</Link>
            <Link to="/about" className={`transition-colors py-1 ${isActive("/about") ? "text-indigo-600 font-bold border-b-2 border-indigo-600" : "hover:text-slate-900"}`}>About</Link>
            <Link to="/contact" className={`transition-colors py-1 ${isActive("/contact") ? "text-indigo-600 font-bold border-b-2 border-indigo-600" : "hover:text-slate-900"}`}>Contact</Link>
          </div>

          <div className="flex items-center gap-2.5">
            {/* AI CHATBOT TRIGGER BUTTON */}
            <button
              onClick={onOpenChat}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-semibold text-xs transition-colors cursor-pointer"
            >
              <span>🤖 AI Chatbot</span>
            </button>

            <Link to="/" className="hidden sm:inline-block px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-sm transition-colors">
              ✨ Analyze Resume
            </Link>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-1.5 rounded-lg text-slate-600 hover:text-slate-900 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 px-5 pt-3 pb-6 space-y-2 shadow-lg">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={`block py-2 px-3 rounded-lg text-sm font-semibold ${isActive('/') ? 'bg-indigo-600 text-white' : 'hover:bg-slate-100 text-slate-800'}`}>Resume Analyzer</Link>
            <Link to="/jobs" onClick={() => setIsMobileMenuOpen(false)} className={`block py-2 px-3 rounded-lg text-sm font-semibold ${isActive('/jobs') ? 'bg-indigo-600 text-white' : 'hover:bg-slate-100 text-slate-800'}`}>Job Interviews</Link>
            <Link to="/features" onClick={() => setIsMobileMenuOpen(false)} className={`block py-2 px-3 rounded-lg text-sm font-semibold ${isActive('/features') ? 'bg-indigo-600 text-white' : 'hover:bg-slate-100 text-slate-800'}`}>Features</Link>
            <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className={`block py-2 px-3 rounded-lg text-sm font-semibold ${isActive('/about') ? 'bg-indigo-600 text-white' : 'hover:bg-slate-100 text-slate-800'}`}>About</Link>
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className={`block py-2 px-3 rounded-lg text-sm font-semibold ${isActive('/contact') ? 'bg-indigo-600 text-white' : 'hover:bg-slate-100 text-slate-800'}`}>Contact</Link>
            
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenChat();
              }}
              className="w-full text-left py-2 px-3 rounded-lg text-sm font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200"
            >
              🤖 Open AI Career Chatbot
            </button>
          </div>
        )}
      </header>
    </>
  )
}

export default Navbar