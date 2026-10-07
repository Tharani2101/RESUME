import React, { useState } from 'react'
import { Outlet, NavLink, Link } from 'react-router-dom'
import { ShoppingBagIcon, HeartIcon, MenuIcon, CloseIcon } from '../components/Icons'

const navItems = [
  { path: '/admin', label: 'Dashboard', icon: '📊', exact: true },
  { path: '/admin/products', label: 'Products', icon: '🧶' },
  { path: '/admin/categories', label: 'Categories', icon: '📂' },
  { path: '/admin/orders', label: 'Orders', icon: '📦' },
  { path: '/admin/customers', label: 'Customers', icon: '👥' },
  { path: '/admin/stock', label: 'Stock', icon: '📋' },
  { path: '/admin/reviews', label: 'Reviews', icon: '⭐' },
]

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#F3ECE1] flex font-sans">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-[#3B2F2A]/60 z-20 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#3B2F2A] text-[#FAF6F0] z-30 transform transition-transform duration-300 md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="px-6 py-6 border-b border-[#FAF6F0]/10">
          <Link to="/" className="flex items-center gap-3">
            <span className="text-2xl">🧶</span>
            <div>
              <p className="font-serif font-bold text-[#FAF6F0] text-lg leading-tight tracking-wide">Thara</p>
              <p className="text-[#E4D9CB] text-xs font-medium uppercase tracking-widest">Admin Panel</p>
            </div>
          </Link>
        </div>

        <nav className="px-3 py-6 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.exact}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#8F4A35] text-[#FAF6F0] shadow-md'
                    : 'text-[#E4D9CB] hover:bg-[#FAF6F0]/10 hover:text-[#FAF6F0]'
                }`
              }
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <header className="bg-[#FAF6F0] border-b border-[#E4D9CB] px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden p-2 rounded-lg text-[#3B2F2A] hover:bg-[#E4D9CB]"
          >
            <MenuIcon className="w-6 h-6" />
          </button>
          <div className="hidden md:block">
            <p className="text-[#7A6C65] text-xs font-bold uppercase tracking-wider">Welcome back,</p>
            <p className="font-serif font-bold text-[#3B2F2A] text-lg">Store Admin</p>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <Link to="/" className="text-xs font-bold text-[#8F4A35] uppercase hover:underline">View Store</Link>
            <div className="w-10 h-10 rounded-full bg-[#8F4A35] flex items-center justify-center font-bold text-[#FAF6F0] shadow-md">
              A
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
