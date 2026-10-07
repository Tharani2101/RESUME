import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart()

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-serif font-bold text-[#3B2F2A] mb-6">Your Cart is Empty</h1>
        <p className="text-[#7A6C65] mb-8">Looks like you haven't added any handmade items yet.</p>
        <Link to="/shop" className="inline-block bg-[#8F4A35] text-[#FAF6F0] px-8 py-3 rounded-full font-bold uppercase tracking-wider hover:bg-[#763C2A] transition-colors">
          Explore the Shop
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-serif font-bold text-[#3B2F2A] mb-10">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1 space-y-6">
          {cartItems.map(item => (
            <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-4 sm:p-6 bg-[#FAF6F0] rounded-3xl border border-[#E4D9CB] relative">
              <img src={item.image} alt={item.name} className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl bg-[#F3ECE1] shrink-0" />
              <div className="flex-1 min-w-0 w-full">
                <div className="flex justify-between items-start gap-2">
                  <Link to={`/product/${item.id}`} className="text-base sm:text-lg font-serif font-bold text-[#3B2F2A] hover:text-[#8F4A35] truncate">
                    {item.name}
                  </Link>
                  <span className="font-bold text-base sm:text-lg text-[#3B2F2A] shrink-0">₹{item.price * item.quantity}</span>
                </div>
                <p className="text-[#7A6C65] text-xs sm:text-sm mb-3">{item.category}</p>
                <div className="flex items-center justify-between sm:justify-start gap-4">
                  <div className="flex items-center border border-[#E4D9CB] rounded-full px-3 py-1 bg-white">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="font-bold px-2 py-0.5 text-base">-</button>
                    <span className="w-6 text-center font-bold text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="font-bold px-2 py-0.5 text-base">+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-xs sm:text-sm font-bold text-red-600 hover:underline">Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="lg:w-96">
          <div className="bg-[#FAF6F0] p-8 rounded-3xl border border-[#E4D9CB] sticky top-24">
            <h2 className="text-2xl font-serif font-bold text-[#3B2F2A] mb-6">Order Summary</h2>
            <div className="space-y-4 text-sm mb-6 border-b border-[#E4D9CB] pb-6">
              <div className="flex justify-between">
                <span className="text-[#7A6C65]">Subtotal</span>
                <span className="font-bold text-[#3B2F2A]">₹{cartTotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A6C65]">Shipping</span>
                <span className="font-bold text-[#3B2F2A]">₹99</span>
              </div>
            </div>
            <div className="flex justify-between mb-8 text-xl">
              <span className="font-bold text-[#3B2F2A]">Total</span>
              <span className="font-bold text-[#8F4A35]">₹{cartTotal + 99}</span>
            </div>
            <Link to="/checkout" className="block text-center w-full bg-[#8F4A35] text-[#FAF6F0] py-4 rounded-full font-bold uppercase tracking-wider hover:bg-[#763C2A] transition-colors shadow-lg">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
