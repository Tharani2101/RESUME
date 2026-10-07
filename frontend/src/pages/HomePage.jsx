import React, { useState } from "react"
import { Link } from "react-router-dom"
import { FEATURED_PRODUCTS, CATEGORIES, CUSTOMER_REVIEWS, WHY_CHOOSE_US } from "../data/mockData"
import { HeartIcon, StarIcon, ShoppingBagIcon, CheckIcon, ArrowRightIcon, SparklesIcon } from "../components/Icons"

function HomePage({ onAddToCart, onToggleWishlist, wishlistItems = [] }) {
  const [addedItems, setAddedItems] = useState({})

  const handleAddToCart = (product) => {
    onAddToCart(product)
    setAddedItems((prev) => ({ ...prev, [product.id]: true }))
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [product.id]: false }))
    }, 1500)
  }

  return (
    <div className="flex flex-col w-full bg-[#FAF6F0] text-[#3B2F2A] font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[75dvh] sm:min-h-[85dvh] flex items-center overflow-hidden bg-[#3B2F2A]">
        {/* Background Image Placeholder or Real Image */}
        <img
          src="/images/hero_crochet.png"
          alt="Handmade Crochet"
          onError={(e) => { e.target.src = "https://placehold.co/1920x1080/8F4A35/FAF6F0?text=Thara+Crochet+Handmade" }}
          className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2A201C]/95 via-[#3B2F2A]/80 to-transparent"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 mobile-landscape-compact w-full flex flex-col justify-center">
          <div className="max-w-2xl space-y-5 sm:space-y-8 text-[#FAF6F0]">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#FAF6F0]/10 border border-[#FAF6F0]/20 backdrop-blur-md text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-[#FAF6F0]">
              <SparklesIcon className="w-3.5 h-3.5 text-[#E4D9CB]" />
              <span>Premium Handmade Creations</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-serif font-bold tracking-tight leading-tight">
              Handmade <span className="text-[#E4D9CB] italic font-normal">With Love</span> & Precision
            </h1>
            
            <p className="text-sm sm:text-lg lg:text-xl text-[#FAF6F0]/90 leading-relaxed font-light max-w-lg">
              Discover beautiful, hand-stitched crochet flowers, elegant bags, and custom embroidery hoops designed to bring warmth to your home and joy to your loved ones.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <Link
                to="/shop"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#8F4A35] text-[#FAF6F0] text-sm font-bold uppercase tracking-wider rounded-full shadow-xl hover:bg-[#763C2A] hover:scale-105 transition-all duration-300"
              >
                <span>Shop Now</span>
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
              <Link
                to="/custom-orders"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent border-2 border-[#FAF6F0]/50 text-[#FAF6F0] text-sm font-bold uppercase tracking-wider rounded-full hover:bg-[#FAF6F0]/10 hover:border-[#FAF6F0] transition-all duration-300"
              >
                <span>Explore Collections</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS BAR */}
      <section className="bg-[#8F4A35] py-10 text-[#FAF6F0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x divide-[#FAF6F0]/20 text-center">
            <div className="flex flex-col space-y-2">
              <span className="text-4xl font-serif font-bold text-[#E4D9CB]">500+</span>
              <span className="text-xs uppercase tracking-widest font-medium text-[#FAF6F0]/80">Happy Customers</span>
            </div>
            <div className="flex flex-col space-y-2">
              <span className="text-4xl font-serif font-bold text-[#E4D9CB]">1000+</span>
              <span className="text-xs uppercase tracking-widest font-medium text-[#FAF6F0]/80">Orders Delivered</span>
            </div>
            <div className="flex flex-col space-y-2">
              <span className="text-4xl font-serif font-bold text-[#E4D9CB]">50+</span>
              <span className="text-xs uppercase tracking-widest font-medium text-[#FAF6F0]/80">Unique Designs</span>
            </div>
            <div className="flex flex-col space-y-2">
              <span className="text-4xl font-serif font-bold text-[#E4D9CB]">100%</span>
              <span className="text-xs uppercase tracking-widest font-medium text-[#FAF6F0]/80">Handmade Quality</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CATEGORIES SECTION */}
      <section className="py-20 bg-[#FAF6F0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8F4A35]">Our Collections</span>
            <h2 className="text-4xl font-serif font-bold text-[#3B2F2A]">Shop by Category</h2>
            <p className="text-[#7A6C65] text-lg">Browse our thoughtfully curated artisan creations.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {CATEGORIES.slice(0, 6).map((cat) => (
              <Link
                to={`/shop?category=${cat.title}`}
                key={cat.id}
                className="group relative h-80 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 bg-[#F3ECE1]"
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  onError={(e) => { e.target.src = `https://placehold.co/400x400/E4D9CB/3B2F2A?text=${cat.title}` }}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A201C]/90 via-[#2A201C]/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col items-center text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-2xl font-serif font-bold text-[#FAF6F0] mb-2">{cat.title}</h3>
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#E4D9CB] bg-[#8F4A35]/80 px-4 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    Explore {cat.count}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS */}
      <section className="py-20 bg-[#F3ECE1]/50 border-y border-[#E4D9CB]/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
            <div className="text-left space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#8F4A35]">Bestsellers</span>
              <h2 className="text-4xl font-serif font-bold text-[#3B2F2A]">Featured Creations</h2>
            </div>
            <Link
              to="/shop"
              className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#8F4A35] hover:text-[#763C2A] transition-colors"
            >
              View All Products
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_PRODUCTS.slice(0, 4).map((product) => {
              const isWishlisted = wishlistItems.includes(product.id)
              const isJustAdded = addedItems[product.id]

              return (
                <div
                  key={product.id}
                  className="group bg-[#FAF6F0] rounded-2xl border border-[#E4D9CB]/60 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col"
                >
                  <div className="relative h-72 overflow-hidden bg-[#E4D9CB]/30">
                    <img
                      src={product.image}
                      alt={product.name}
                      onError={(e) => { e.target.src = `https://placehold.co/400x500/F3ECE1/8F4A35?text=${product.name}` }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {product.badge && (
                      <span className="absolute top-4 left-4 bg-[#8F4A35] text-[#FAF6F0] text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md">
                        {product.badge}
                      </span>
                    )}
                    <button
                      onClick={() => onToggleWishlist(product.id)}
                      className="absolute top-4 right-4 w-10 h-10 bg-[#FAF6F0]/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-[#FAF6F0] hover:scale-110 transition-all duration-300 text-[#3B2F2A]"
                    >
                      <HeartIcon className={`w-5 h-5 transition-colors ${isWishlisted ? "text-[#8F4A35]" : "text-[#7A6C65] hover:text-[#8F4A35]"}`} filled={isWishlisted} />
                    </button>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold tracking-wider uppercase text-[#8F4A35]">{product.category}</span>
                      <div className="flex items-center gap-1 text-xs font-semibold text-[#3B2F2A]">
                        <StarIcon className="w-3.5 h-3.5 text-[#8F4A35]" />
                        {product.rating}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-serif font-bold text-[#3B2F2A] mb-4 group-hover:text-[#8F4A35] transition-colors leading-snug">
                      {product.name}
                    </h3>
                    
                    <div className="mt-auto pt-4 border-t border-[#E4D9CB]/50 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-xl font-bold text-[#8F4A35]">₹{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-xs text-[#7A6C65] line-through">₹{product.originalPrice}</span>
                        )}
                      </div>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg ${
                          isJustAdded ? "bg-[#3B2F2A] text-[#FAF6F0]" : "bg-[#8F4A35] text-[#FAF6F0] hover:bg-[#763C2A]"
                        }`}
                      >
                        {isJustAdded ? <CheckIcon className="w-5 h-5" /> : <ShoppingBagIcon className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 5. ABOUT BRAND STRIP */}
      <section className="py-24 bg-[#3B2F2A] text-[#FAF6F0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl hidden lg:block bg-[#2A201C]">
               <img 
                  src="https://placehold.co/800x1000/8F4A35/FAF6F0?text=Handcrafting+Process" 
                  alt="Our Craft" 
                  className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
               />
               <div className="absolute inset-0 ring-1 ring-inset ring-[#FAF6F0]/20 rounded-3xl"></div>
            </div>
            <div className="space-y-8">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E4D9CB]">Our Story</span>
              <h2 className="text-4xl sm:text-5xl font-serif font-bold leading-tight">
                Crafting memories, <br/> <span className="text-[#8F4A35] italic">one stitch at a time.</span>
              </h2>
              <p className="text-lg text-[#FAF6F0]/80 font-light leading-relaxed">
                Thara Crochet was born out of a love for traditional handmade art. We believe in slow fashion, sustainable materials, and the beauty of perfectly imperfect handmade items. Every piece you purchase supports artisan craftsmanship.
              </p>
              <div className="pt-6">
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent border border-[#E4D9CB] text-[#FAF6F0] text-sm font-bold uppercase tracking-wider rounded-full hover:bg-[#FAF6F0] hover:text-[#3B2F2A] transition-all duration-300"
                >
                  Read Our Story
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE US */}
      <section className="py-20 bg-[#FAF6F0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#3B2F2A]">Why Shop With Us?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {WHY_CHOOSE_US.map((item, idx) => (
              <div key={idx} className="bg-[#F3ECE1] p-8 rounded-3xl text-center flex flex-col items-center hover:-translate-y-2 transition-transform duration-300">
                <div className="w-16 h-16 bg-[#8F4A35] rounded-2xl flex items-center justify-center mb-6 text-[#FAF6F0] shadow-lg transform rotate-3">
                  <CheckIcon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#3B2F2A] mb-3">{item.title}</h3>
                <p className="text-sm text-[#7A6C65] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section className="py-24 bg-[#E4D9CB]/30 border-t border-[#E4D9CB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8F4A35]">Love Notes</span>
            <h2 className="text-4xl font-serif font-bold text-[#3B2F2A]">From Our Customers</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CUSTOMER_REVIEWS.map((review) => (
              <div key={review.id} className="bg-[#FAF6F0] p-8 rounded-3xl shadow-sm border border-[#E4D9CB]/50 relative">
                <div className="absolute top-6 right-8 text-5xl text-[#8F4A35] opacity-10 font-serif">"</div>
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-4 h-4 text-[#8F4A35]" />
                  ))}
                </div>
                <p className="text-[#3B2F2A] font-medium leading-relaxed mb-8 italic">
                  "{review.comment}"
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 bg-[#8F4A35] rounded-full flex items-center justify-center text-[#FAF6F0] font-serif font-bold text-xl">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#3B2F2A] text-sm">{review.name}</h4>
                    <span className="text-xs font-medium text-[#7A6C65]">{review.product}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. NEWSLETTER / BOTTOM CTA */}
      <section className="py-24 bg-gradient-to-br from-[#8F4A35] to-[#763C2A] text-[#FAF6F0] relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-[#FAF6F0] opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-[#FAF6F0] opacity-5 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold leading-tight">
            Find Something Handmade For Someone Special
          </h2>
          <p className="text-lg text-[#FAF6F0]/80 font-light max-w-xl mx-auto">
            Whether it's a personalized gift, cozy decor, or beautiful accessories—our collection is made to bring warmth to your life.
          </p>
          <div className="pt-4">
            <Link
              to="/shop"
              className="inline-block px-10 py-5 bg-[#FAF6F0] text-[#8F4A35] text-sm font-bold uppercase tracking-widest rounded-full shadow-2xl hover:bg-[#E4D9CB] hover:-translate-y-1 transition-all duration-300"
            >
              Shop The Collection
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}

export default HomePage
