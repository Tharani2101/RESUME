import React from 'react'
import { products } from '../../data/products'

function Stock() {
  return (
    <div>
      <h1 className="text-3xl font-serif font-bold text-[#3B2F2A] mb-8">Stock Management</h1>
      <div className="bg-white border border-[#E4D9CB] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#FAF6F0] text-[#7A6C65] font-bold uppercase tracking-wider text-xs">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">SKU</th>
                <th className="px-6 py-4">Stock Level</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Update</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4D9CB]">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-[#FAF6F0]/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-[#3B2F2A]">{p.name}</td>
                  <td className="px-6 py-4 text-[#7A6C65]">SKU-{p.id}00</td>
                  <td className="px-6 py-4 font-bold text-[#3B2F2A]">{p.stock}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${p.stock > 10 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      {p.stock > 10 ? 'In Stock' : 'Low Stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <input type="number" defaultValue={p.stock} className="w-16 border border-[#E4D9CB] rounded px-2 py-1 text-sm focus:outline-none focus:border-[#8F4A35]" />
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

export default Stock
