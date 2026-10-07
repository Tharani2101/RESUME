import React from "react"

function OurStorySection() {
  return (
    <section id="our-story" className="py-16 sm:py-24 bg-[#F3ECE1]/50 border-b border-[#E4D9CB]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Handcraft Story Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#E4D9CB] shadow-lg bg-[#FAF6F0]">
              <img
                src="/images/cat_embroidery.png"
                alt="Thara Crochet Handcraft Artisanship"
                className="w-full h-[360px] sm:h-[420px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3B2F2A]/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-[#FAF6F0]">
                <p className="font-serif italic text-lg sm:text-xl">
                  "Slow handmade craft created stitch by stitch, thread by thread."
                </p>
                <span className="text-xs uppercase tracking-wider font-semibold opacity-90 block mt-2">
                  — Thara Crochet Studio
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Authentic Story Text */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-block px-3.5 py-1.5 rounded-full bg-[#8F4A35]/10 text-[#8F4A35] text-xs font-semibold">
              Our Handmade Journey
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#3B2F2A] leading-tight">
              Crafting Everlasting Warmth with Every Single Stitch
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#7A6C65] leading-relaxed font-normal">
              <p>
                Thara Crochet was born out of a deep love for traditional Indian handcraft, patient stitches, and cozy aesthetics. In a world dominated by mass production, we celebrate the beauty of slow, mindful creation.
              </p>
              <p>
                From everlasting crochet flower bouquets that never lose their bloom to hand-embroidered wooden hoops personalized with your cherished names and memories, every piece is made using soft premium yarns and careful craftsmanship.
              </p>
              <p>
                When you choose Thara Crochet, you aren't just buying a product—you are welcoming an authentic piece of handmade art into your home or gifting a meaningful memory to someone special.
              </p>
            </div>

            {/* Key Craft Highlights */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-[#E4D9CB]">
              <div>
                <h4 className="text-xl font-serif font-bold text-[#8F4A35]">100%</h4>
                <p className="text-xs text-[#7A6C65]">Hand-stitched Craft</p>
              </div>
              <div>
                <h4 className="text-xl font-serif font-bold text-[#8F4A35]">Eco-friendly</h4>
                <p className="text-xs text-[#7A6C65]">Premium Yarns & Packaging</p>
              </div>
              <div>
                <h4 className="text-xl font-serif font-bold text-[#8F4A35]">Bespoke</h4>
                <p className="text-xs text-[#7A6C65]">Personalized Orders</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}

export default OurStorySection
