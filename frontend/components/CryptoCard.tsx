'use client'

import { Heart, TrendingUp, TrendingDown } from 'lucide-react'

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

interface CryptoCardProps {
  crypto: Crypto
  onAddToFavorites: (crypto: Crypto) => void
  showAddButton: boolean
}

export default function CryptoCard({ crypto, onAddToFavorites, showAddButton }: CryptoCardProps) {
  // Безопасное преобразование значений в числа
  const currentPrice = typeof crypto.current_price === 'number' ? crypto.current_price : 0
  const marketCap = typeof crypto.market_cap === 'number' ? crypto.market_cap : 0
  const marketCapRank = typeof crypto.market_cap_rank === 'number' ? crypto.market_cap_rank : 0
  const priceChange24h = typeof crypto.price_change_24h === 'number' ? crypto.price_change_24h : 0
  const priceChangePercentage = typeof crypto.price_change_percentage_24h === 'number' ? crypto.price_change_percentage_24h : 0
  
  const isPriceUp = priceChangePercentage > 0
  const isPriceDown = priceChangePercentage < 0

  return (
    <div className="card hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {crypto.image && (
            <img
              src={crypto.image}
              alt={crypto.name}
              className="w-12 h-12 rounded-full"
            />
          )}
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">
              {crypto.name}
            </h3>
            <p className="text-sm text-gray-500 font-mono">
              {crypto.symbol.toUpperCase()}
            </p>
          </div>
        </div>
        
        {showAddButton && (
          <button
            onClick={() => onAddToFavorites(crypto)}
            className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
            title="Добавить в избранное"
          >
            <Heart className="h-5 w-5" />
          </button>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Цена:</span>
          <span className="font-bold text-lg">
            ${currentPrice.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Ранг:</span>
          <span className="font-semibold text-gray-900">
            #{marketCapRank || 'N/A'}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Капитализация:</span>
          <span className="font-semibold text-gray-900">
            ${marketCap.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Изменение 24ч:</span>
          <div className="flex items-center gap-1">
            {isPriceUp && <TrendingUp className="h-4 w-4 text-crypto-green" />}
            {isPriceDown && <TrendingDown className="h-4 w-4 text-crypto-red" />}
            <span
              className={`font-semibold ${
                isPriceUp
                  ? 'text-crypto-green'
                  : isPriceDown
                  ? 'text-crypto-red'
                  : 'text-gray-900'
              }`}
            >
              {priceChangePercentage.toFixed(2)}%
            </span>
          </div>
        </div>

        {priceChange24h !== 0 && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Абс. изменение:</span>
            <span
              className={`font-semibold ${
                isPriceUp ? 'text-crypto-green' : 'text-crypto-red'
              }`}
            >
              ${Math.abs(priceChange24h).toFixed(2)}
            </span>
          </div>
        )}
      </div>
    </div>
  )
} 