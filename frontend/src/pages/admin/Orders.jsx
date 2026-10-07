import React from 'react'

const mockOrders = [
  { id: '#ORD-9821', customer: 'Ananya S.', date: 'Oct 01, 2026', total: 899, status: 'Processing' },
  { id: '#ORD-8734', customer: 'Rahul M.', date: 'Sep 15, 2026', total: 1499, status: 'Shipped' },
  { id: '#ORD-7643', customer: 'Priya K.', date: 'Aug 22, 2026', total: 349, status: 'Delivered' }
]

function Orders() {
  return (
    <div>
      <h1 className="text-3xl font-serif font-bold text-[#3B2F2A] mb-8">Order Management</h1>
      <div className="bg-white border border-[#E4D9CB] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#FAF6F0] text-[#7A6C65] font-bold uppercase tracking-wider text-xs">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4D9CB]">
              {mockOrders.map(order => (
                <tr key={order.id} className="hover:bg-[#FAF6F0]/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-[#3B2F2A]">{order.id}</td>
                  <td className="px-6 py-4 text-[#3B2F2A]">{order.customer}</td>
                  <td className="px-6 py-4 text-[#7A6C65]">{order.date}</td>
                  <td className="px-6 py-4 font-bold text-[#3B2F2A]">₹{order.total}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider
                      ${order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' : 
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[#8F4A35] hover:underline font-medium">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Orders
