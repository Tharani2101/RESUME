import React from 'react'
import { categories } from '../../data/products'

function Categories() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif font-bold text-[#3B2F2A]">Categories</h1>
        <button className="bg-[#8F4A35] text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-[#763C2A] transition-colors">
          + Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map(cat => (
          <div key={cat.id} className="bg-white border border-[#E4D9CB] rounded-2xl shadow-sm p-6 flex flex-col">
            <div className="text-4xl mb-4">{cat.icon}</div>
            <h3 className="font-bold text-xl text-[#3B2F2A] mb-1">{cat.name}</h3>
            <p className="text-[#7A6C65] text-sm mb-6">{cat.count} Products</p>
            <div className="mt-auto flex justify-between border-t border-[#E4D9CB]/50 pt-4">
              <button className="text-blue-600 font-medium text-sm hover:underline">Edit</button>
              <button className="text-red-600 font-medium text-sm hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Categories
