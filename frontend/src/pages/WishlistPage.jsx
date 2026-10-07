import React from 'react'
import { Link } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'

function WishlistPage() {
  const { wishlistItems, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()

  if (wishlistItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-serif font-bold text-[#3B2F2A] mb-6">Your Wishlist is Empty</h1>
        <p className="text-[#7A6C65] mb-8">Save items you love here to easily find them later.</p>
        <Link to="/shop" className="inline-block bg-[#8F4A35] text-[#FAF6F0] px-8 py-3 rounded-full font-bold uppercase tracking-wider hover:bg-[#763C2A] transition-colors">
          Discover Handcrafts
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-serif font-bold text-[#3B2F2A] mb-10">My Wishlist</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlistItems.map(item => (
          <div key={item.id} className="bg-[#FAF6F0] rounded-2xl border border-[#E4D9CB] overflow-hidden shadow-sm flex flex-col">
            <div className="relative h-64 bg-[#F3ECE1]">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              <button 
                onClick={() => removeFromWishlist(item.id)}
                className="absolute top-4 right-4 bg-white/90 p-2 rounded-full text-red-500 hover:bg-white shadow"
              >
                ✕
              </button>
            </div>
            <div className="p-5 flex flex-col flex-1">
              <Link to={`/product/${item.id}`} className="font-serif font-bold text-lg text-[#3B2F2A] hover:text-[#8F4A35] mb-2">
                {item.name}
              </Link>
              <div className="font-bold text-[#3B2F2A] mb-4">₹{item.price}</div>
              <button 
                onClick={() => addToCart(item)}
                className="mt-auto w-full bg-[#3B2F2A] text-[#FAF6F0] py-3 rounded-xl font-bold uppercase tracking-wider text-xs hover:bg-[#2A201C] transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WishlistPage
