import React from "react"
import { Link } from "react-router-dom"
import { ArrowRightIcon, SparklesIcon, CheckIcon } from "./Icons"

function Hero() {
  return (
    <section className="relative w-full min-h-[520px] sm:min-h-[620px] lg:min-h-[700px] flex items-center overflow-hidden bg-[#3B2F2A]">
      {/* 1. Full Size Background Image */}
      <img
        src="/images/hero_crochet.png"
        alt="Thara Crochet Handmade Showcase"
        className="absolute inset-0 w-full h-full object-cover object-center scale-105 transform transition-transform duration-1000"
      />

      {/* 2. Gradient Overlay for Perfect Text Contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#3B2F2A]/90 via-[#3B2F2A]/65 to-[#3B2F2A]/30 sm:to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#3B2F2A]/80 via-transparent to-transparent"></div>

      {/* 3. Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
        <div className="max-w-2xl space-y-6 text-left text-[#FAF6F0]">
          
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF6F0]/15 border border-[#FAF6F0]/25 backdrop-blur-md text-xs font-semibold tracking-wide text-[#FAF6F0]">
            <SparklesIcon className="w-4 h-4 text-[#FAF6F0]" />
            <span>100% Authentic Indian Handmade Crochet & Embroidery</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-tight sm:leading-tight text-[#FAF6F0]">
            Every Stitch Tells a Story of <span className="text-[#E4D9CB] italic font-normal">Warmth & Elegance</span>
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-[#FAF6F0]/90 leading-relaxed font-normal max-w-xl">
            Discover timeless hand-stitched flower bouquets that never fade, boho yarn totes, custom memory embroidery hoops, and cozy plushies made with soft premium yarn.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#8F4A35] text-[#FAF6F0] text-sm font-semibold rounded-full shadow-lg hover:bg-[#763C2A] transition-all transform hover:-translate-y-0.5"
            >
              <span>Shop Collection</span>
              <ArrowRightIcon className="w-4 h-4 text-[#FAF6F0]" />
            </Link>

            <Link
              to="/custom-orders"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#FAF6F0]/15 border border-[#FAF6F0]/40 backdrop-blur-md text-[#FAF6F0] text-sm font-semibold rounded-full hover:bg-[#FAF6F0]/25 transition-all"
            >
              <span>Request Custom Order</span>
            </Link>
          </div>

          {/* Trust Highlights */}
          <div className="pt-6 border-t border-[#FAF6F0]/20 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-medium text-[#FAF6F0]/90">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#8F4A35] text-[#FAF6F0] flex items-center justify-center text-[10px]">
                <CheckIcon className="w-3 h-3" />
              </span>
              <span>100% Hand-stitched</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#8F4A35] text-[#FAF6F0] flex items-center justify-center text-[10px]">
                <CheckIcon className="w-3 h-3" />
              </span>
              <span>Premium Quality Yarns</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#8F4A35] text-[#FAF6F0] flex items-center justify-center text-[10px]">
                <CheckIcon className="w-3 h-3" />
              </span>
              <span>Custom Personalization</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Hero
