import React from "react"
import { GALLERY_ITEMS } from "../data/mockData"

function GallerySection() {
  return (
    <section className="py-16 sm:py-20 bg-[#FAF6F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#8F4A35]">
            Artisan Gallery Showcase
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#3B2F2A]">
            Made with Patience & Love
          </h2>
          <p className="text-sm sm:text-base text-[#7A6C65]">
            A quick glimpse into our handmade crochet creations and custom embroidered pieces.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {GALLERY_ITEMS.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-xl overflow-hidden h-48 sm:h-56 bg-[#F3ECE1] border border-[#E4D9CB] shadow-sm hover:shadow-md transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#3B2F2A]/80 via-[#3B2F2A]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 text-[#FAF6F0]">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#E4D9CB]">
                  {item.tag}
                </span>
                <h4 className="text-xs font-serif font-semibold leading-tight mt-0.5">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default GallerySection
