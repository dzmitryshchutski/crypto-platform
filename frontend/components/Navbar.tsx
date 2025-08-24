'use client'

import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import { TrendingUp, Heart, User, LogOut } from 'lucide-react'

export default function Navbar() {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary-600">
            <TrendingUp className="h-8 w-8" />
            Crypto Platform
          </Link>

          <div className="flex items-center gap-6">
            <Link 
              href="/cryptos" 
              className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
            >
              Криптовалюты
            </Link>
            
            {user ? (
              <>
                <Link 
                  href="/favorites" 
                  className="text-gray-700 hover:text-primary-600 transition-colors font-medium flex items-center gap-2"
                >
                  <Heart className="h-5 w-5" />
                  Избранное
                </Link>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-gray-700">
                    <User className="h-5 w-5" />
                    <span className="font-medium">{user.username}</span>
                  </div>
                  
                  <button
                    onClick={handleLogout}
                    className="text-gray-700 hover:text-red-600 transition-colors flex items-center gap-2"
                    title="Выйти"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </>
            ) : (
              <Link 
                href="/auth" 
                className="btn-primary"
              >
                Войти
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
} 