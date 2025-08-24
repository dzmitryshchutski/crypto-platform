'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { getFavorites, removeFromFavorites } from '@/services/api'
import { Heart, Trash2, Star } from 'lucide-react'

interface FavoriteCrypto {
  id: number
  crypto_id: string
  name: string
  symbol: string
  current_price: number
  image_url: string
  added_at: string
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteCrypto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchFavorites()
    }
  }, [user])

  const fetchFavorites = async () => {
    try {
      setLoading(true)
      const data = await getFavorites()
      setFavorites(data)
      setError('')
    } catch (err) {
      setError('Ошибка при загрузке избранного')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveFromFavorites = async (favoriteId: number) => {
    try {
      await removeFromFavorites(favoriteId)
      setFavorites(favorites.filter(fav => fav.id !== favoriteId))
    } catch (err) {
      alert('Ошибка при удалении из избранного')
      console.error(err)
    }
  }

  if (!user) {
    return (
      <div className="text-center">
        <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Войдите в систему
        </h1>
        <p className="text-gray-600">
          Чтобы просматривать избранные криптовалюты, необходимо авторизоваться
        </p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка избранного...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <button onClick={fetchFavorites} className="btn-primary">
          Попробовать снова
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Star className="h-8 w-8 text-yellow-500" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Мои избранные
          </h1>
          <p className="text-gray-600">
            Управляйте списком любимых криптовалют
          </p>
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Избранное пусто
          </h2>
          <p className="text-gray-600 mb-6">
            Добавьте криптовалюты в избранное, чтобы отслеживать их здесь
          </p>
          <a href="/cryptos" className="btn-primary">
            Перейти к криптовалютам
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((favorite) => (
            <div key={favorite.id} className="card">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {favorite.image_url && (
                    <img
                      src={favorite.image_url}
                      alt={favorite.name}
                      className="w-10 h-10 rounded-full"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {favorite.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {favorite.symbol.toUpperCase()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveFromFavorites(favorite.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                  title="Удалить из избранного"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Цена:</span>
                  <span className="font-semibold">
                    ${favorite.current_price?.toLocaleString() || 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Добавлено:</span>
                  <span className="text-sm text-gray-500">
                    {new Date(favorite.added_at).toLocaleDateString('ru-RU')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 