import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, isLoading } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const success = await login(email, password)
    if (success) {
      navigate('/')
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-[#FAF6F0] p-10 rounded-3xl border border-[#E4D9CB] shadow-xl">
        <div className="text-center mb-8">
          <span className="text-4xl block mb-4">🧶</span>
          <h2 className="text-3xl font-serif font-bold text-[#3B2F2A]">Welcome Back</h2>
          <p className="text-[#7A6C65] text-sm mt-2">Sign in to your account to continue</p>
        </div>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#3B2F2A] mb-2">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border border-[#E4D9CB] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#8F4A35]"
              placeholder="hello@example.com"
            />
          </div>
          
          <div className="relative">
            <div className="flex justify-between items-end mb-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#3B2F2A]">Password</label>
              <Link to="/forgot-password" className="text-xs font-bold text-[#8F4A35] hover:underline">Forgot?</Link>
            </div>
            <input 
              type={showPassword ? "text" : "password"} 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white border border-[#E4D9CB] rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-[#8F4A35]"
              placeholder="••••••••"
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute bottom-3 right-4 text-xs font-bold text-[#7A6C65]"
            >
              {showPassword ? "HIDE" : "SHOW"}
            </button>
          </div>

          <div className="flex items-center">
            <input id="remember" type="checkbox" className="w-4 h-4 text-[#8F4A35] bg-white border-[#E4D9CB] rounded focus:ring-[#8F4A35] focus:ring-2 accent-[#8F4A35]" />
            <label htmlFor="remember" className="ml-2 text-sm text-[#7A6C65]">Remember me</label>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className={`w-full py-4 rounded-full font-bold uppercase tracking-wider transition-all shadow-lg mt-4 flex justify-center items-center ${
              isLoading ? 'bg-[#763C2A] text-[#FAF6F0]/70 cursor-not-allowed' : 'bg-[#8F4A35] text-[#FAF6F0] hover:bg-[#763C2A]'
            }`}
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : "Sign In"}
          </button>
        </form>

        <p className="text-center text-sm text-[#7A6C65] mt-8">
          Don't have an account? <Link to="/register" className="font-bold text-[#8F4A35] hover:underline">Register here</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
