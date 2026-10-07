import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' })
  const { register, isLoading } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const success = await register(formData)
    if (success) {
      navigate('/')
    }
  }

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-[#FAF6F0] p-10 rounded-3xl border border-[#E4D9CB] shadow-xl">
        <div className="text-center mb-8">
          <span className="text-4xl block mb-4">✨</span>
          <h2 className="text-3xl font-serif font-bold text-[#3B2F2A]">Join Us</h2>
          <p className="text-[#7A6C65] text-sm mt-2">Create an account to track your orders</p>
        </div>
        
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#3B2F2A] mb-2">Full Name</label>
            <input type="text" name="name" required onChange={handleChange} className="w-full bg-white border border-[#E4D9CB] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#8F4A35]" placeholder="Priya Sharma" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#3B2F2A] mb-2">Email Address</label>
            <input type="email" name="email" required onChange={handleChange} className="w-full bg-white border border-[#E4D9CB] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#8F4A35]" placeholder="priya@example.com" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#3B2F2A] mb-2">Phone Number</label>
            <input type="tel" name="phone" required onChange={handleChange} className="w-full bg-white border border-[#E4D9CB] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#8F4A35]" placeholder="+91 98765 43210" />
          </div>
          <div className="relative">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#3B2F2A] mb-2">Password</label>
            <input 
              type={showPassword ? "text" : "password"} 
              name="password"
              required
              onChange={handleChange}
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

          <div className="flex items-start">
            <input id="terms" type="checkbox" required className="mt-1 w-4 h-4 text-[#8F4A35] bg-white border-[#E4D9CB] rounded focus:ring-[#8F4A35] focus:ring-2 accent-[#8F4A35]" />
            <label htmlFor="terms" className="ml-2 text-xs text-[#7A6C65] leading-relaxed">
              I agree to the <Link to="/terms" className="font-bold text-[#8F4A35]">Terms of Service</Link> and <Link to="/privacy" className="font-bold text-[#8F4A35]">Privacy Policy</Link>
            </label>
          </div>

          <button 
            type="submit"
            disabled={isLoading} 
            className={`w-full py-4 rounded-full font-bold uppercase tracking-wider transition-colors shadow-lg mt-4 flex justify-center ${
              isLoading ? 'bg-[#2A201C] text-[#FAF6F0]/70 cursor-not-allowed' : 'bg-[#3B2F2A] text-[#FAF6F0] hover:bg-[#2A201C]'
            }`}
          >
             {isLoading ? (
              <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm text-[#7A6C65] mt-8">
          Already have an account? <Link to="/login" className="font-bold text-[#8F4A35] hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
