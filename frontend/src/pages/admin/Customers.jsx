import React from 'react'

const mockCustomers = [
  { id: 1, name: 'Ananya Sharma', email: 'ananya@example.com', phone: '+91 9876543210', orders: 4, spent: '₹3,450', status: 'Active' },
  { id: 2, name: 'Rahul Mishra', email: 'rahul@example.com', phone: '+91 8765432109', orders: 1, spent: '₹1,499', status: 'Active' },
  { id: 3, name: 'Priya K.', email: 'priya@example.com', phone: '+91 7654321098', orders: 0, spent: '₹0', status: 'Inactive' }
]

function Customers() {
  return (
    <div>
      <h1 className="text-3xl font-serif font-bold text-[#3B2F2A] mb-8">Customer Management</h1>
      <div className="bg-white border border-[#E4D9CB] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#FAF6F0] text-[#7A6C65] font-bold uppercase tracking-wider text-xs">
              <tr>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Orders</th>
                <th className="px-6 py-4">Total Spent</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4D9CB]">
              {mockCustomers.map(c => (
                <tr key={c.id} className="hover:bg-[#FAF6F0]/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-[#3B2F2A]">{c.name}</div>
                  </td>
                  <td className="px-6 py-4 text-[#7A6C65]">
                    <div>{c.email}</div>
                    <div className="text-xs">{c.phone}</div>
                  </td>
                  <td className="px-6 py-4">{c.orders}</td>
                  <td className="px-6 py-4 font-bold text-[#3B2F2A]">{c.spent}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${c.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'}`}>
                      {c.status}
                    </span>
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

export default Customers
