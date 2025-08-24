'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import Cookies from 'js-cookie'
import { loginUser, registerUser } from '@/services/api'

interface User {
  id: number
  username: string
  email: string
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<void>
  register: (username: string, email: string, password: string) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Проверяем токен при загрузке
    const token = Cookies.get('access_token')
    if (token) {
      // Здесь можно добавить проверку валидности токена
      // Пока просто устанавливаем пользователя из localStorage
      const userData = localStorage.getItem('user')
      if (userData) {
        try {
          setUser(JSON.parse(userData))
        } catch (e) {
          console.error('Error parsing user data:', e)
        }
      }
    }
    setLoading(false)
  }, [])

  const login = async (username: string, password: string) => {
    const response = await loginUser(username, password)
    const { user: userData, access } = response
    
    // Сохраняем токен в cookies
    Cookies.set('access_token', access, { expires: 7 })
    
    // Сохраняем данные пользователя
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const register = async (username: string, email: string, password: string) => {
    const response = await registerUser(username, email, password)
    const { user: userData, access } = response
    
    // Сохраняем токен в cookies
    Cookies.set('access_token', access, { expires: 7 })
    
    // Сохраняем данные пользователя
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const logout = () => {
    // Удаляем токен и данные пользователя
    Cookies.remove('access_token')
    localStorage.removeItem('user')
    setUser(null)
  }

  const value = {
    user,
    login,
    register,
    logout,
    loading,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 