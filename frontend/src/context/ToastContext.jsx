import React, { createContext, useContext, useState, useCallback } from 'react'

const ToastContext = createContext()

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, 3000)
  }, [])

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-4 min-w-[250px] px-5 py-3 rounded-xl shadow-2xl transform transition-all duration-300 translate-y-0 opacity-100 ${
              toast.type === 'success' ? 'bg-[#2A201C] text-[#FAF6F0]' : 
              toast.type === 'error' ? 'bg-red-50 text-red-600 border border-red-200' : 
              'bg-white text-[#3B2F2A] border border-[#E4D9CB]'
            }`}
          >
            <div className="flex items-center gap-3">
              {toast.type === 'success' && <span className="text-emerald-400">✓</span>}
              <p className="text-sm font-medium">{toast.message}</p>
            </div>
            <button onClick={() => removeToast(toast.id)} className="opacity-60 hover:opacity-100 transition-opacity">
              ✕
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)
