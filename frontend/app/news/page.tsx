'use client'

import { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import { useInView } from 'react-intersection-observer'
import ScrollToTop from '@/components/ScrollToTop'

interface NewsItem {
  title: string
  description: string
  url: string
  image: string
  source: string
  published_at: string
  coins: string[]
}

const coinsList = [
  'bitcoin',
  'ethereum',
  'ripple',
  'cardano',
  'polkadot',
  'dogecoin',
]

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [selectedCoin, setSelectedCoin] = useState('all')

  const { ref, inView } = useInView({ threshold: 0 })

  const fetchNews = useCallback(
    async (pageNum: number, coin?: string) => {
      setLoading(true)
      try {
        let url = `https://api.coingecko.com/api/v3/news?page=${pageNum}`
        if (coin && coin !== 'all') {
          url += `&coins=${coin}`
        }
        const res = await axios.get(url)
        const items: NewsItem[] = res.data.data || []

        if (items.length === 0) setHasMore(false)

        setNews((prev) => (pageNum === 1 ? items : [...prev, ...items]))
      } catch (err) {
        console.error('Ошибка при загрузке новостей:', err)
        setHasMore(false)
      } finally {
        setLoading(false)
      }
    },
    []
  )

  // Загружаем новости при смене монеты
  useEffect(() => {
    setPage(1)
    setHasMore(true)
    fetchNews(1, selectedCoin)
  }, [selectedCoin, fetchNews])

  // Бесконечная прокрутка
  useEffect(() => {
    if (inView && !loading && hasMore) {
      const nextPage = page + 1
      setPage(nextPage)
      fetchNews(nextPage, selectedCoin)
    }
  }, [inView, loading, hasMore, page, selectedCoin, fetchNews])

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Новости криптовалют</h1>

      {/* Фильтр по монете */}
      <div className="mb-6 flex flex-wrap gap-3">
        <button
          onClick={() => setSelectedCoin('all')}
          className={`px-4 py-2 rounded-full transition-colors ${
            selectedCoin === 'all'
              ? 'bg-primary-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-600'
          }`}
        >
          Все
        </button>
        {coinsList.map((coin) => (
          <button
            key={coin}
            onClick={() => setSelectedCoin(coin)}
            className={`px-4 py-2 rounded-full transition-colors ${
              selectedCoin === coin
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-600'
            }`}
          >
            {coin.charAt(0).toUpperCase() + coin.slice(1)}
          </button>
        ))}
      </div>

      {/* Новости */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {news.map((item, index) => (
          <a
            key={index}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow bg-white dark:bg-gray-800"
          >
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {item.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                {item.description}
              </p>
              <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                {item.source} • {new Date(item.published_at).toLocaleDateString()}
              </p>
              {item.coins && item.coins.length > 0 && (
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Монеты: {item.coins.join(', ')}
                </p>
              )}
            </div>
          </a>
        ))}
      </div>

      {/* Скрытый элемент для отслеживания конца списка */}
      {hasMore && (
        <div ref={ref} className="text-center py-4 text-gray-500 dark:text-gray-400">
          {loading ? 'Загрузка...' : 'Прокрутите вниз для загрузки новостей...'}
        </div>
      )}
      {!hasMore && (
        <div className="text-center py-4 text-gray-500 dark:text-gray-400">
          Новости закончились
        </div>
      )}

      {/* Кнопка "Наверх" */}
      <ScrollToTop />
    </div>
  )
}
