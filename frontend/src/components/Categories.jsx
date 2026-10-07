import React from "react"
import { CATEGORIES } from "../data/mockData"
import { ArrowRightIcon } from "./Icons"

function Categories() {
  return (
    <section id="categories" className="py-16 sm:py-20 bg-[#FAF6F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#8F4A35]">
            Handmade Collections
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#3B2F2A]">
            Shop by Category
          </h2>
          <p className="text-sm sm:text-base text-[#7A6C65]">
            Explore our thoughtfully curated handcrafted creations made with love, patience, and soft premium threads.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CATEGORIES.map((category) => (
            <div
              key={category.id}
              className="group bg-[#FAF6F0] rounded-2xl border border-[#E4D9CB] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
            >
              {/* Image Container */}
              <div className="relative h-56 sm:h-64 overflow-hidden bg-[#F3ECE1]">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Badge if present */}
                {category.badge && (
                  <span className="absolute top-3 right-3 bg-[#8F4A35] text-[#FAF6F0] text-[11px] font-semibold px-3 py-1 rounded-full shadow-sm">
                    {category.badge}
                  </span>
                )}

                <span className="absolute bottom-3 left-3 bg-[#FAF6F0]/90 backdrop-blur-sm text-[#3B2F2A] text-xs font-medium px-2.5 py-1 rounded-md border border-[#E4D9CB]">
                  {category.count}
                </span>
              </div>

              {/* Card Details */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-serif font-semibold text-[#3B2F2A] group-hover:text-[#8F4A35] transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#7A6C65] mt-2 leading-relaxed">
                    {category.description}
                  </p>
                </div>

                <a
                  href="#shop"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#8F4A35] hover:text-[#763C2A] group/link transition-colors pt-2"
                >
                  <span>Browse Collection</span>
                  <ArrowRightIcon className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Categories
