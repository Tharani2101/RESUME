import React from "react"
import { CUSTOMER_REVIEWS } from "../data/mockData"
import { StarIcon, CheckIcon } from "./Icons"

function CustomerReviews() {
  return (
    <section className="py-16 sm:py-20 bg-[#FAF6F0] border-b border-[#E4D9CB]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E4D9CB]/50 text-[#7A6C65] text-xs font-semibold">
            <span>Sample Customer Feedback</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#3B2F2A]">
            Loved by Our Customers
          </h2>
          <p className="text-sm sm:text-base text-[#7A6C65]">
            Here is what our patrons say about our handmade crochet products and custom embroidery hoops.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CUSTOMER_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#F3ECE1]/40 rounded-2xl p-6 border border-[#E4D9CB] flex flex-col justify-between space-y-4 hover:border-[#8F4A35]/40 transition-colors"
            >
              <div className="space-y-3">
                {/* Rating Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-4 h-4 text-amber-500" />
                  ))}
                </div>

                {/* Comment Text */}
                <p className="text-xs sm:text-sm text-[#3B2F2A] leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Customer Info */}
              <div className="pt-4 border-t border-[#E4D9CB]/60 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-semibold text-[#3B2F2A]">{rev.name}</h4>
                  <span className="text-[#7A6C65]">{rev.location}</span>
                </div>
                {rev.verified && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                    <CheckIcon className="w-3 h-3 text-emerald-800" /> Verified
                  </span>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default CustomerReviews
