import React, { createContext, useContext, useState } from 'react'
import { useToast } from './ToastContext'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null) // null means logged out
  const [isLoading, setIsLoading] = useState(false)
  const { addToast } = useToast()

  const login = async (email, password) => {
    setIsLoading(true)
    // Simulate network delay for realism
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    if (email && password) {
      // Mock successful login
      const mockUser = {
        name: email.split('@')[0],
        email: email,
        role: email === 'admin@tharacrochet.in' ? 'admin' : 'customer'
      }
      setUser(mockUser)
      setIsLoading(false)
      addToast(`Welcome back, ${mockUser.name}!`, 'success')
      return true
    } else {
      setIsLoading(false)
      addToast('Please enter both email and password.', 'error')
      return false
    }
  }

  const register = async (userData) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const mockUser = { name: userData.name, email: userData.email, role: 'customer' }
    setUser(mockUser)
    setIsLoading(false)
    addToast('Account created successfully!', 'success')
    return true
  }

  const logout = () => {
    setUser(null)
    addToast('You have been logged out.', 'info')
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
