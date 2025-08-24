'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { getCryptos, addToFavorites } from '@/services/api'
import CryptoCard from '@/components/CryptoCard'
import { TrendingUp, RefreshCw } from 'lucide-react'

interface Crypto {
  id: string
  symbol: string
  name: string
  current_price: number | null
  image: string | null
  market_cap: number | null
  market_cap_rank: number | null
  price_change_24h: number | null
  price_change_percentage_24h: number | null
}

export default function CryptosPage() {
  const [cryptos, setCryptos] = useState<Crypto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { user } = useAuth()

  useEffect(() => {
    fetchCryptos()
  }, [])

  const fetchCryptos = async () => {
    try {
      setLoading(true)
      const data = await getCryptos()
      setCryptos(data)
      setError('')
    } catch (err) {
      setError('Ошибка при загрузке криптовалют')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToFavorites = async (crypto: Crypto) => {
    if (!user) {
      alert('Необходимо войти в систему')
      return
    }

    try {
      await addToFavorites({
        crypto_id: crypto.id,
        name: crypto.name,
        symbol: crypto.symbol,
        current_price: crypto.current_price || 0,
        image_url: crypto.image || '',
      })
      alert(`${crypto.name} добавлена в избранное!`)
    } catch (err) {
      alert('Ошибка при добавлении в избранное')
      console.error(err)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <RefreshCw className="animate-spin h-12 w-12 text-primary-600 mx-auto mb-4" />
          <p className="text-gray-600">Загрузка криптовалют...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <button onClick={fetchCryptos} className="btn-primary">
          Попробовать снова
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Криптовалюты
          </h1>
          <p className="text-gray-600">
            Топ криптовалют по рыночной капитализации
          </p>
        </div>
        <button
          onClick={fetchCryptos}
          className="btn-secondary flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Обновить
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cryptos.map((crypto) => (
          <CryptoCard
            key={crypto.id}
            crypto={crypto}
            onAddToFavorites={handleAddToFavorites}
            showAddButton={!!user}
          />
        ))}
      </div>
    </div>
  )
} 