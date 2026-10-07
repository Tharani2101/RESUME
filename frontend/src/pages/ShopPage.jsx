import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { products, categories } from '../data/products'
import { SearchIcon } from '../components/Icons'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()

  const allCategories = ['All', ...categories.map(c => c.name)]
  
  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-serif font-bold text-[#3B2F2A] mb-3">Shop Collection</h1>
          <p className="text-[#7A6C65]">Discover our handmade artisan creations.</p>
        </div>
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#FAF6F0] border border-[#E4D9CB] rounded-full py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#8F4A35] text-sm"
          />
          <SearchIcon className="absolute left-3 top-2.5 w-5 h-5 text-[#7A6C65]" />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
        {/* Mobile Category Horizontal Scroll Pill Bar */}
        <div className="block lg:hidden overflow-x-auto no-scrollbar py-2 -mx-4 px-4 border-b border-[#E4D9CB]/60">
          <div className="flex items-center gap-2 whitespace-nowrap">
            {allCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? 'bg-[#8F4A35] text-[#FAF6F0] shadow-sm'
                    : 'bg-[#F3ECE1] text-[#7A6C65] hover:bg-[#E4D9CB]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop Category Sidebar */}
        <aside className="hidden lg:block lg:w-64 flex-shrink-0">
          <div className="bg-[#FAF6F0] p-6 rounded-3xl border border-[#E4D9CB] sticky top-24">
            <h3 className="font-serif font-bold text-lg mb-4 text-[#3B2F2A]">Categories</h3>
            <ul className="space-y-2">
              {allCategories.map(cat => (
                <li key={cat}>
                  <button
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full text-left px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                      activeCategory === cat ? 'bg-[#8F4A35] text-[#FAF6F0]' : 'text-[#7A6C65] hover:bg-[#F3ECE1]'
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-[#FAF6F0] rounded-3xl border border-[#E4D9CB] border-dashed">
              <p className="text-[#7A6C65] text-lg font-medium mb-4">No products found matching your criteria.</p>
              <button onClick={() => {setSearch(''); setActiveCategory('All')}} className="text-[#8F4A35] font-bold uppercase tracking-wider text-sm hover:underline">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <div key={product.id} className="bg-[#FAF6F0] rounded-2xl border border-[#E4D9CB]/60 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
                  <Link to={`/product/${product.id}`} className="relative h-64 overflow-hidden block bg-[#F3ECE1]">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </Link>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#8F4A35] mb-1">{product.category}</div>
                    <Link to={`/product/${product.id}`} className="font-serif font-bold text-lg text-[#3B2F2A] hover:text-[#8F4A35] mb-2">
                      {product.name}
                    </Link>
                    <div className="mt-auto pt-4 flex items-center justify-between">
                      <span className="font-bold text-[#3B2F2A] text-lg">₹{product.price}</span>
                      <button onClick={() => addToCart(product)} className="bg-[#8F4A35] text-[#FAF6F0] px-4 py-2 rounded-full text-xs font-bold uppercase hover:bg-[#763C2A] transition-colors">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ShopPage
