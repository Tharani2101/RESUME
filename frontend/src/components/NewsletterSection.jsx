import React, { useState } from "react"
import { SparklesIcon, CheckIcon } from "./Icons"

function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail("")
    }
  }

  return (
    <section className="py-16 sm:py-20 bg-[#F3ECE1]/60 border-y border-[#E4D9CB]/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8F4A35]/10 text-[#8F4A35] text-xs font-semibold">
          <SparklesIcon className="w-4 h-4" />
          <span>Thara Crochet Club</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#3B2F2A]">
          Join Our Warm Handcrafted Family
        </h2>

        <p className="text-sm sm:text-base text-[#7A6C65] max-w-xl mx-auto leading-relaxed">
          Subscribe to get exclusive early access to new flower bouquet drops, seasonal custom order openings, and cozy gifting inspiration.
        </p>

        {subscribed ? (
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#8F4A35] text-[#FAF6F0] text-sm font-semibold rounded-full shadow-sm animate-fade-in">
            <CheckIcon className="w-4 h-4" />
            <span>Thank you for joining! We'll keep you warm with updates.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto pt-2">
            <input
              type="email"
              required
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full sm:w-auto flex-1 bg-[#FAF6F0] text-[#3B2F2A] placeholder-[#7A6C65] text-sm rounded-full px-5 py-3 border border-[#E4D9CB] focus:outline-none focus:ring-1 focus:ring-[#8F4A35]"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-3 bg-[#8F4A35] text-[#FAF6F0] text-sm font-semibold rounded-full shadow-md hover:bg-[#763C2A] transition-all"
            >
              Subscribe
            </button>
          </form>
        )}

      </div>
    </section>
  )
}

export default NewsletterSection
