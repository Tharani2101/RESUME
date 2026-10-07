import React from 'react'

function AdminDashboard() {
  const stats = [
    { label: 'Total Sales', value: '₹45,231', trend: '+12%', icon: '💰' },
    { label: 'Active Orders', value: '24', trend: '+3', icon: '📦' },
    { label: 'Products', value: '156', trend: 'In Stock', icon: '🧶' },
    { label: 'Customers', value: '1,204', trend: '+18', icon: '👥' },
  ]

  return (
    <div>
      <h1 className="text-3xl font-serif font-bold text-[#3B2F2A] mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-[#E4D9CB] shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm text-[#7A6C65] font-bold uppercase tracking-wider mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-[#3B2F2A]">{stat.value}</h3>
              <p className="text-xs text-emerald-600 font-bold mt-1">{stat.trend}</p>
            </div>
            <div className="text-4xl opacity-80">{stat.icon}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-[#E4D9CB] rounded-2xl shadow-sm p-6 flex flex-col items-center justify-center min-h-[300px]">
          <span className="text-4xl mb-4">📈</span>
          <h3 className="font-bold text-[#3B2F2A]">Revenue Chart</h3>
          <p className="text-[#7A6C65] text-sm">Visual reports coming soon.</p>
        </div>
        
        <div className="bg-white border border-[#E4D9CB] rounded-2xl shadow-sm p-6">
          <h3 className="font-bold text-[#3B2F2A] mb-4">Low Stock Alerts</h3>
          <ul className="space-y-4">
            {[1, 2, 3].map(i => (
              <li key={i} className="flex justify-between items-center pb-4 border-b border-[#E4D9CB]/50 last:border-0 last:pb-0">
                <div>
                  <p className="text-sm font-bold text-[#3B2F2A]">Pastel Tulip Bouquet</p>
                  <p className="text-xs text-[#7A6C65]">Crochet Flowers</p>
                </div>
                <span className="bg-red-100 text-red-700 font-bold text-xs px-2 py-1 rounded">2 Left</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
