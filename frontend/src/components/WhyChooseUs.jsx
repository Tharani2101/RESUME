import React from "react"
import { WHY_CHOOSE_US } from "../data/mockData"
import { ShieldCheckIcon, TruckIcon, SparklesIcon, GiftIcon } from "./Icons"

function WhyChooseUs() {
  const getIcon = (iconName) => {
    switch (iconName) {
      case "Shield":
        return <ShieldCheckIcon className="w-6 h-6 text-[#8F4A35]" />
      case "Sparkler":
        return <SparklesIcon className="w-6 h-6 text-[#8F4A35]" />
      case "Gift":
        return <GiftIcon className="w-6 h-6 text-[#8F4A35]" />
      default:
        return <TruckIcon className="w-6 h-6 text-[#8F4A35]" />
    }
  }

  return (
    <section className="py-16 sm:py-20 bg-[#FAF6F0] border-b border-[#E4D9CB]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#8F4A35]">
            Our Artisan Promise
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#3B2F2A]">
            Why Choose Thara Crochet?
          </h2>
          <p className="text-sm sm:text-base text-[#7A6C65]">
            We take pride in slow craft, patient hands, and thoughtful materials that bring warmth to your space.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_US.map((item, index) => (
            <div
              key={index}
              className="bg-[#F3ECE1]/60 rounded-2xl p-6 border border-[#E4D9CB] space-y-4 hover:border-[#8F4A35]/40 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-[#FAF6F0] border border-[#E4D9CB] flex items-center justify-center shadow-sm">
                {getIcon(item.icon)}
              </div>
              <h3 className="text-lg font-serif font-semibold text-[#3B2F2A]">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#7A6C65] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default WhyChooseUs
