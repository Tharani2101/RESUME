import React, { useState } from "react"
import { FEATURED_PRODUCTS } from "../data/mockData"
import { HeartIcon, StarIcon, ShoppingBagIcon, CheckIcon } from "./Icons"

function FeaturedProducts({ onAddToCart, onToggleWishlist, wishlistItems = [] }) {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [addedItems, setAddedItems] = useState({})

  const filterCategories = ["All", "Crochet Flowers", "Crochet Bags", "Amigurumi", "Embroidery Hoops", "Personalized Gifts"]

  const filteredProducts = selectedCategory === "All"
    ? FEATURED_PRODUCTS
    : FEATURED_PRODUCTS.filter((p) => p.category === selectedCategory)

  const handleAddToCart = (product) => {
    onAddToCart(product)
    setAddedItems((prev) => ({ ...prev, [product.id]: true }))
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [product.id]: false }))
    }, 1500)
  }

  return (
    <section id="shop" className="py-16 sm:py-20 bg-[#F3ECE1]/40 border-y border-[#E4D9CB]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#8F4A35]">
            Featured Handcrafts
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#3B2F2A]">
            Handmade with Love & Precision
          </h2>
          <p className="text-sm sm:text-base text-[#7A6C65]">
            Browse our most loved handmade creations. All prices are in ₹ INR.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? "bg-[#8F4A35] text-[#FAF6F0] shadow-sm"
                  : "bg-[#FAF6F0] text-[#3B2F2A] border border-[#E4D9CB] hover:bg-[#F3ECE1]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => {
            const isWishlisted = wishlistItems.includes(product.id)
            const isJustAdded = addedItems[product.id]

            return (
              <div
                key={product.id}
                className="bg-[#FAF6F0] rounded-2xl border border-[#E4D9CB] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden bg-[#F3ECE1]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Badge */}
                    {product.badge && (
                      <span className="absolute top-3 left-3 bg-[#8F4A35] text-[#FAF6F0] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm">
                        {product.badge}
                      </span>
                    )}

                    {/* Wishlist Button */}
                    <button
                      onClick={() => onToggleWishlist(product.id)}
                      aria-label="Add to Wishlist"
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${
                        isWishlisted
                          ? "bg-[#8F4A35] text-[#FAF6F0]"
                          : "bg-[#FAF6F0]/80 text-[#3B2F2A] hover:text-[#8F4A35]"
                      }`}
                    >
                      <HeartIcon className="w-4 h-4" filled={isWishlisted} />
                    </button>
                  </div>

                  {/* Product Details */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-xs text-[#7A6C65]">
                      <span>{product.category}</span>
                      <div className="flex items-center gap-1">
                        <StarIcon className="w-3.5 h-3.5 text-amber-500" />
                        <span className="font-semibold text-[#3B2F2A]">{product.rating}</span>
                        <span>({product.reviewsCount})</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-serif font-semibold text-[#3B2F2A] group-hover:text-[#8F4A35] transition-colors line-clamp-1">
                      {product.name}
                    </h3>

                    {/* Variant Tag Previews */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {product.variants.map((v, i) => (
                        <span
                          key={i}
                          className="text-[10px] bg-[#F3ECE1] text-[#3B2F2A] px-2 py-0.5 rounded border border-[#E4D9CB]"
                        >
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Price & Add to Cart */}
                <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-[#E4D9CB]/50 mt-2">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-[#8F4A35]">
                        ₹{product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-[#7A6C65] line-through">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-emerald-700 font-medium block">
                      Incl. all taxes
                    </span>
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold transition-all ${
                      isJustAdded
                        ? "bg-emerald-700 text-[#FAF6F0]"
                        : "bg-[#8F4A35] text-[#FAF6F0] hover:bg-[#763C2A]"
                    }`}
                  >
                    {isJustAdded ? (
                      <>
                        <CheckIcon className="w-4 h-4" />
                        <span>Added!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBagIcon className="w-4 h-4" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default FeaturedProducts
