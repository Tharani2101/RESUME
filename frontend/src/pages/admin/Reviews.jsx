import React from 'react'

const mockReviews = [
  { id: 1, product: 'Pastel Tulip Bouquet', customer: 'Neha G.', rating: 5, text: 'Absolutely beautiful craftsmanship!', status: 'Approved' },
  { id: 2, product: 'Embroidery Name Hoop', customer: 'Aditi V.', rating: 4, text: 'Love the colors used.', status: 'Pending' },
]

function Reviews() {
  return (
    <div>
      <h1 className="text-3xl font-serif font-bold text-[#3B2F2A] mb-8">Review Management</h1>
      <div className="bg-white border border-[#E4D9CB] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#FAF6F0] text-[#7A6C65] font-bold uppercase tracking-wider text-xs">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4">Review</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4D9CB]">
              {mockReviews.map(r => (
                <tr key={r.id} className="hover:bg-[#FAF6F0]/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-[#3B2F2A]">{r.product}</td>
                  <td className="px-6 py-4 text-[#7A6C65]">{r.customer}</td>
                  <td className="px-6 py-4 font-bold text-amber-500">{'★'.repeat(r.rating)}{'☆'.repeat(5-r.rating)}</td>
                  <td className="px-6 py-4 text-[#3B2F2A] italic">"{r.text}"</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${r.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    {r.status === 'Pending' && <button className="text-emerald-600 hover:underline font-medium">Approve</button>}
                    <button className="text-red-600 hover:underline font-medium">Delete</button>
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

export default Reviews
