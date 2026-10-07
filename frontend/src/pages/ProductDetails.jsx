import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProductById, getProductsByCategory } from '../data/products'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { HeartIcon, StarIcon } from '../components/Icons'

function ProductDetails() {
  const { id } = useParams()
  const product = getProductById(id)
  const relatedProducts = getProductsByCategory(product.category).filter(p => p.id !== product.id).slice(0, 4)
  
  const [qty, setQty] = useState(1)
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()

  if (!product) return <div className="p-20 text-center text-xl">Product not found.</div>

  const inWishlist = isInWishlist(product.id)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Left: Image */}
        <div className="w-full md:w-1/2">
          <div className="aspect-square rounded-3xl overflow-hidden bg-[#F3ECE1] border border-[#E4D9CB] relative">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            <button 
              onClick={() => toggleWishlist(product)}
              className="absolute top-6 right-6 w-12 h-12 bg-[#FAF6F0] rounded-full flex items-center justify-center shadow-lg text-[#8F4A35]"
            >
              <HeartIcon className="w-6 h-6" filled={inWishlist} />
            </button>
          </div>
        </div>
        
        {/* Right: Details */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <span className="text-sm font-bold uppercase tracking-widest text-[#8F4A35] mb-2">{product.category}</span>
          <h1 className="text-4xl font-serif font-bold text-[#3B2F2A] mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-2 mb-6 text-[#7A6C65] text-sm">
            <StarIcon className="w-5 h-5 text-amber-500" filled />
            <span className="font-bold text-[#3B2F2A]">{product.rating}</span>
            <span>({product.reviews} reviews)</span>
          </div>

          <div className="flex items-end gap-3 mb-6">
            <span className="text-3xl font-bold text-[#3B2F2A]">₹{product.price}</span>
            {product.oldPrice && <span className="text-lg text-[#7A6C65] line-through mb-1">₹{product.oldPrice}</span>}
          </div>

          <p className="text-[#7A6C65] leading-relaxed mb-8">{product.description}</p>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center bg-[#FAF6F0] border border-[#E4D9CB] rounded-full px-4 py-2">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="text-[#3B2F2A] font-bold px-2">-</button>
              <span className="font-bold w-8 text-center">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="text-[#3B2F2A] font-bold px-2">+</button>
            </div>
            <div className="text-sm font-medium text-emerald-700">
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </div>
          </div>

          <div className="flex gap-4">
            <button onClick={() => addToCart(product, qty)} className="flex-1 bg-[#8F4A35] text-[#FAF6F0] py-4 rounded-full font-bold uppercase tracking-wider hover:bg-[#763C2A] transition-colors shadow-lg">
              Add to Cart
            </button>
            <Link to="/checkout" className="flex-1 bg-[#3B2F2A] text-[#FAF6F0] py-4 rounded-full font-bold uppercase tracking-wider hover:bg-[#2A201C] transition-colors shadow-lg text-center flex items-center justify-center">
              Buy Now
            </Link>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-24 pt-16 border-t border-[#E4D9CB]">
          <h2 className="text-2xl font-serif font-bold text-[#3B2F2A] mb-8 text-center">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(rp => (
              <Link key={rp.id} to={`/product/${rp.id}`} className="group block bg-[#FAF6F0] rounded-2xl border border-[#E4D9CB]/60 overflow-hidden shadow-sm hover:shadow-xl transition-all">
                <div className="relative h-64 bg-[#F3ECE1]">
                  <img src={rp.image} alt={rp.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="p-4">
                  <h3 className="font-serif font-bold text-[#3B2F2A] text-lg mb-1">{rp.name}</h3>
                  <span className="font-bold text-[#8F4A35]">₹{rp.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetails
