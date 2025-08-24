'use client'

import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { TrendingUp, Heart, User, LogOut, Newspaper, Moon, Sun } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    // сохраняем тему в localStorage
    const theme = localStorage.getItem('theme')
    if (theme === 'dark') setDarkMode(true)
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    if (!darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  const handleLogout = () => {
    logout()
  }

  const navLinks = [
    { href: '/cryptos', label: 'Криптовалюты' },
    { href: '/news', label: 'Новости', icon: <Newspaper className="h-5 w-5" /> },
    ...(user
      ? [{ href: '/favorites', label: 'Избранное', icon: <Heart className="h-5 w-5" /> }]
      : []),
  ]

  return (
    <nav className={`transition-colors bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Лого */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold text-primary-600 dark:text-primary-400"
          >
            <TrendingUp className="h-8 w-8" />
            Crypto Platform
          </Link>

          {/* Навигация */}
          <div className="flex items-center gap-6 relative">
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href)
              return (
                <div key={link.href} className="relative group">
                  <Link
                    href={link.href}
                    className={`relative transition-all font-medium flex items-center gap-2 px-3 py-2 rounded-xl
                      ${isActive
                        ? 'text-primary-600 bg-primary-50 dark:text-primary-400 dark:bg-gray-800'
                        : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50 dark:text-gray-300 dark:hover:text-primary-400 dark:hover:bg-gray-800 hover:scale-105'
                      }`}
                  >
                    {link.icon}
                    {link.label}
                  </Link>

                  {/* underline для активной */}
                  {isActive && (
                    <motion.div
                      layoutId="underline"
                      className="absolute left-3 right-3 -bottom-0.5 h-[2px] bg-primary-600 dark:bg-primary-400 rounded"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}

                  {/* underline при hover (если не активная) */}
                  {!isActive && (
                    <span className="absolute left-3 right-3 -bottom-0.5 h-[2px] bg-primary-600 dark:bg-primary-400 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  )}
                </div>
              )
            })}

            {/* Авторизация */}
            {user ? (
              <div className="flex items-center gap-3 ml-4">
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <User className="h-5 w-5" />
                  <span className="font-medium">{user.username}</span>
                </div>

                <button
                  onClick={handleLogout}
                  className="text-gray-700 dark:text-gray-300 hover:text-red-600 transition-colors flex items-center gap-2"
                  title="Выйти"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link
                href="/auth"
                className={`transition-all font-medium px-3 py-2 rounded-xl
                  ${pathname.startsWith('/auth')
                    ? 'text-primary-600 bg-primary-50 dark:text-primary-400 dark:bg-gray-800'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50 dark:text-gray-300 dark:hover:text-primary-400 dark:hover:bg-gray-800 hover:scale-105'
                  }`}
              >
                Войти
              </Link>
            )}

            {/* Кнопка Dark Mode */}
            <button
              onClick={toggleDarkMode}
              className="ml-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              title="Переключить тему"
            >
              {darkMode ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
