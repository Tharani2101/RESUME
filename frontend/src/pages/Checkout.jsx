import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState('upi')
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const { cartTotal, clearCart, cartItems } = useCart()
  const { user } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate()

  if (cartItems.length === 0 && !orderComplete) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-serif font-bold text-[#3B2F2A] mb-4">Checkout</h1>
        <p className="text-[#7A6C65] mb-8">Your cart is empty.</p>
        <Link to="/shop" className="bg-[#8F4A35] text-[#FAF6F0] px-8 py-3 rounded-full font-bold uppercase tracking-wider hover:bg-[#763C2A] transition-colors">Return to Shop</Link>
      </div>
    )
  }

  const handlePlaceOrder = () => {
    if (!user) {
      addToast('Please login to place an order.', 'error')
      navigate('/login')
      return
    }

    setIsProcessing(true)
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setOrderComplete(true)
      clearCart()
      addToast('Payment successful!', 'success')
    }, 2000)
  }

  if (orderComplete) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center flex flex-col items-center">
        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-8 shadow-lg">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h1 className="text-5xl font-serif font-bold text-[#3B2F2A] mb-4">Order Placed!</h1>
        <p className="text-[#7A6C65] text-lg mb-2">Thank you for supporting handmade artisan crafts, {user?.name}.</p>
        <p className="text-[#7A6C65] mb-10">Your order #ORD-{Math.floor(1000 + Math.random() * 9000)} has been confirmed and is being prepared.</p>
        
        <div className="flex gap-4">
          <Link to="/orders" className="px-8 py-4 bg-[#8F4A35] text-[#FAF6F0] rounded-full font-bold uppercase tracking-wider shadow-lg hover:bg-[#763C2A] transition-colors">
            Track Order
          </Link>
          <Link to="/shop" className="px-8 py-4 bg-white border border-[#E4D9CB] text-[#3B2F2A] rounded-full font-bold uppercase tracking-wider hover:bg-[#F3ECE1] transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
      <h1 className="text-4xl font-serif font-bold text-[#3B2F2A] mb-10 text-center">Checkout</h1>
      
      <div className={`flex flex-col lg:flex-row gap-12 max-w-5xl mx-auto transition-opacity duration-300 ${isProcessing ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
        <div className="flex-1">
          <div className="bg-[#FAF6F0] p-8 rounded-3xl border border-[#E4D9CB] mb-8">
            <h2 className="text-xl font-serif font-bold text-[#3B2F2A] mb-6 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#3B2F2A] text-[#FAF6F0] flex items-center justify-center text-xs">1</span>
              Shipping Address
            </h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" placeholder="First Name" defaultValue={user?.name.split(' ')[0] || ''} className="w-full bg-white border border-[#E4D9CB] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#8F4A35]" />
                <input type="text" placeholder="Last Name" defaultValue={user?.name.split(' ')[1] || ''} className="w-full bg-white border border-[#E4D9CB] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#8F4A35]" />
              </div>
              <input type="email" placeholder="Email Address" defaultValue={user?.email || ''} className="w-full bg-white border border-[#E4D9CB] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#8F4A35]" />
              <input type="text" placeholder="Address Line 1" className="w-full bg-white border border-[#E4D9CB] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#8F4A35]" />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input type="text" placeholder="City" className="w-full bg-white border border-[#E4D9CB] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#8F4A35]" />
                <input type="text" placeholder="State" className="w-full bg-white border border-[#E4D9CB] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#8F4A35]" />
                <input type="text" placeholder="Pincode" className="w-full bg-white border border-[#E4D9CB] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#8F4A35]" />
              </div>
            </form>
          </div>

          <div className="bg-[#FAF6F0] p-8 rounded-3xl border border-[#E4D9CB]">
            <h2 className="text-xl font-serif font-bold text-[#3B2F2A] mb-6 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#3B2F2A] text-[#FAF6F0] flex items-center justify-center text-xs">2</span>
              Payment Method
            </h2>
            <div className="space-y-3">
              {['upi', 'card', 'cod'].map(method => (
                <label key={method} className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-colors ${paymentMethod === method ? 'border-[#8F4A35] bg-[#F3ECE1]' : 'border-[#E4D9CB] bg-white hover:border-[#8F4A35]/50'}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    value={method}
                    checked={paymentMethod === method}
                    onChange={() => setPaymentMethod(method)}
                    className="accent-[#8F4A35]"
                  />
                  <span className="font-bold text-[#3B2F2A] uppercase text-sm tracking-wider">
                    {method === 'upi' ? 'UPI / QR Code' : method === 'card' ? 'Credit/Debit Card' : 'Cash on Delivery'}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
        
        <div className="lg:w-[400px]">
          <div className="bg-[#3B2F2A] text-[#FAF6F0] p-8 rounded-3xl sticky top-24 shadow-2xl relative overflow-hidden">
            <h2 className="text-xl font-serif font-bold mb-6 relative z-10">Review Order</h2>
            <div className="space-y-4 mb-6 text-sm border-b border-[#FAF6F0]/20 pb-6 relative z-10">
              <div className="flex justify-between">
                <span className="text-[#E4D9CB]">Items Total ({cartItems.length})</span>
                <span className="font-bold">₹{cartTotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#E4D9CB]">Shipping</span>
                <span className="font-bold text-emerald-400">FREE</span>
              </div>
            </div>
            <div className="flex justify-between mb-8 text-xl relative z-10">
              <span className="font-bold">Total</span>
              <span className="font-bold text-[#8F4A35] bg-[#FAF6F0] px-3 py-1 rounded-lg">₹{cartTotal}</span>
            </div>
            <button 
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              className="w-full bg-[#8F4A35] text-[#FAF6F0] py-4 rounded-full font-bold uppercase tracking-wider hover:bg-[#763C2A] transition-colors shadow-lg relative z-10 flex justify-center items-center h-14"
            >
              {isProcessing ? (
                <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : 'Place Order'}
            </button>
            <p className="text-center text-xs text-[#E4D9CB] mt-4 relative z-10">Safe & Secure Payments</p>
            
            {/* Decorative background element */}
            <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-[#FAF6F0]/5 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
