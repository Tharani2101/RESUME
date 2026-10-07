import React from "react"
import { SparklesIcon, GiftIcon, ArrowRightIcon } from "./Icons"

function CustomOrdersSection() {
  const customOptions = [
    {
      title: "Custom Embroidered Names",
      desc: "Personalized embroidery hoops with names, nursery themes, baby announcement dates, or couple initials.",
      badge: "Best Seller for Gifting"
    },
    {
      title: "Custom Color Palettes",
      desc: "Match your room decor, wedding theme, or favorite flowers with custom yarn & thread color selection.",
      badge: "Personalized Yarn"
    },
    {
      title: "Memorable Quotes & Dates",
      desc: "Stitch special anniversary dates, quotes, and meaningful lyrics into everlasting hoop wall art.",
      badge: "Everlasting Memory"
    },
    {
      title: "Bespoke Gift Boxes",
      desc: "Combine crochet bouquets, plushies, and custom hoops in a hand-wrapped eco gift box with handwritten note.",
      badge: "Ready to Gift"
    }
  ]

  return (
    <section id="custom-orders" className="py-16 sm:py-20 bg-[#FAF6F0] relative overflow-hidden">
      {/* Background Decorative Pattern */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gradient-to-br from-[#8F4A35] via-[#763C2A] to-[#8F4A35] rounded-3xl p-8 sm:p-12 lg:p-16 text-[#FAF6F0] shadow-xl relative overflow-hidden">
          
          {/* Subtle Decorative Circle Overlay */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#FAF6F0]/5 pointer-events-none"></div>
          <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-[#FAF6F0]/5 pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            
            {/* Left Column: Heading & CTA */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF6F0]/15 text-[#FAF6F0] text-xs font-semibold backdrop-blur-sm">
                <SparklesIcon className="w-4 h-4" />
                <span>Made Specially For You</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold leading-tight">
                Want a Personalized Handmade Creation?
              </h2>

              <p className="text-sm sm:text-base text-[#FAF6F0]/90 leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
                Whether it's a custom embroidered name hoop, your favorite flower bouquet in custom yarn colors, or a personalized wedding gift—our artisan stitches your unique story with care.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a
                  href="#contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-[#FAF6F0] text-[#8F4A35] text-sm font-semibold rounded-full shadow-lg hover:bg-[#F3ECE1] transition-all transform hover:-translate-y-0.5"
                >
                  <GiftIcon className="w-4 h-4 text-[#8F4A35]" />
                  <span>Request a Custom Order</span>
                  <ArrowRightIcon className="w-4 h-4 text-[#8F4A35]" />
                </a>
              </div>
            </div>

            {/* Right Column: Custom Options Grid */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {customOptions.map((opt, index) => (
                <div
                  key={index}
                  className="bg-[#FAF6F0]/10 backdrop-blur-md border border-[#FAF6F0]/20 rounded-2xl p-5 space-y-2.5 text-left hover:bg-[#FAF6F0]/15 transition-colors"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#FAF6F0]/20 text-[#FAF6F0] px-2.5 py-0.5 rounded-full">
                    {opt.badge}
                  </span>
                  <h3 className="text-base font-serif font-semibold text-[#FAF6F0]">
                    {opt.title}
                  </h3>
                  <p className="text-xs text-[#FAF6F0]/80 leading-relaxed">
                    {opt.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}

export default CustomOrdersSection
