import React from 'react'
import { Link } from 'react-router-dom'

const mockOrders = [
  { id: '#ORD-9821', date: 'Oct 01, 2026', total: 899, items: 1, status: 'Processing' },
  { id: '#ORD-8734', date: 'Sep 15, 2026', total: 1499, items: 2, status: 'Shipped' },
  { id: '#ORD-7643', date: 'Aug 22, 2026', total: 349, items: 1, status: 'Delivered' }
]

function Orders() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
        <h1 className="text-4xl font-serif font-bold text-[#3B2F2A]">My Orders</h1>
        <Link to="/shop" className="text-[#8F4A35] font-bold text-sm uppercase tracking-wider hover:underline mt-4 sm:mt-0">
          Continue Shopping
        </Link>
      </div>
      
      <div className="bg-[#FAF6F0] rounded-3xl border border-[#E4D9CB] overflow-hidden">
        {mockOrders.map((order, idx) => (
          <div key={order.id} className={`p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 ${idx !== mockOrders.length - 1 ? 'border-b border-[#E4D9CB]/50' : ''}`}>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-serif font-bold text-[#3B2F2A] text-xl">{order.id}</span>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider
                  ${order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' : 
                    order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'}`}>
                  {order.status}
                </span>
              </div>
              <p className="text-[#7A6C65] text-sm">Placed on {order.date} • {order.items} {order.items > 1 ? 'items' : 'item'}</p>
            </div>
            
            <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4">
              <span className="font-bold text-xl text-[#3B2F2A]">₹{order.total}</span>
              <button className="px-6 py-2 border border-[#8F4A35] text-[#8F4A35] rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#8F4A35] hover:text-[#FAF6F0] transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
