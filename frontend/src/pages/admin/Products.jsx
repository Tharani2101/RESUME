import React from 'react'
import { products } from '../../data/products'

function Products() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif font-bold text-[#3B2F2A]">Product Management</h1>
        <button className="bg-[#8F4A35] text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-[#763C2A] transition-colors">
          + Add Product
        </button>
      </div>

      <div className="bg-white border border-[#E4D9CB] rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-[#E4D9CB]">
          <input type="text" placeholder="Search products..." className="w-full md:w-72 bg-[#FAF6F0] border border-[#E4D9CB] rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#8F4A35]" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#FAF6F0] text-[#7A6C65] font-bold uppercase tracking-wider text-xs">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4D9CB]">
              {products.map(product => (
                <tr key={product.id} className="hover:bg-[#FAF6F0]/50 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img src={product.image} alt={product.name} className="w-10 h-10 rounded bg-[#F3ECE1] object-cover" />
                    <span className="font-bold text-[#3B2F2A]">{product.name}</span>
                  </td>
                  <td className="px-6 py-4 text-[#7A6C65]">{product.category}</td>
                  <td className="px-6 py-4 font-bold text-[#3B2F2A]">₹{product.price}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${product.stock > 10 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-600 hover:underline mr-3 font-medium">Edit</button>
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

export default Products
