import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import ResumeAnalyzerPage from './pages/ResumeAnalyzerPage'
import JobInterviewsPage from './pages/JobInterviewsPage'
import FeaturesPage from './pages/FeaturesPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<ResumeAnalyzerPage />} />
        <Route path="/analyzer" element={<ResumeAnalyzerPage />} />
        <Route path="/jobs" element={<JobInterviewsPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* Catch-all fallback */}
        <Route path="*" element={<ResumeAnalyzerPage />} />
      </Route>
    </Routes>
  )
}

export default App