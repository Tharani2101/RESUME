import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AIChatbotModal from '../components/careerAI/AIChatbotModal'

function MainLayout() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      <Navbar onOpenChat={() => setIsChatOpen(true)} />
      <main className="flex-1 pb-16 md:pb-0">
        <Outlet />
      </main>
      <Footer />

      {/* GLOBAL AI CAREER CHATBOT MODAL */}
      <AIChatbotModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  )
}

export default MainLayout
