'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: string;
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Используем моковые данные для начала
    const loadMockNews = () => {
      try {
        const mockNews: NewsItem[] = [
          {
            id: '1',
            title: 'Bitcoin достиг нового максимума',
            description: 'Цена Bitcoin превысила $70,000, установив новый исторический максимум. Эксперты ожидают дальнейшего роста криптовалюты.',
            url: '#',
            publishedAt: new Date().toISOString(),
            source: 'CryptoNews'
          },
          {
            id: '2',
            title: 'Ethereum обновляет рекорд по активности',
            description: 'Сеть Ethereum зафиксировала рекордное количество транзакций за сутки. Это свидетельствует о росте популярности децентрализованных приложений.',
            url: '#',
            publishedAt: new Date(Date.now() - 86400000).toISOString(),
            source: 'Blockchain Today'
          },
          {
            id: '3',
            title: 'Новый регулирующий фреймворк для криптовалют',
            description: 'Правительство представило новый законопроект, регулирующий обращение криптовалют. Это может повлиять на рынок в ближайшие месяцы.',
            url: '#',
            publishedAt: new Date(Date.now() - 172800000).toISOString(),
            source: 'Regulation Watch'
          },
          {
            id: '4',
            title: 'Крупная биржа запускает стейкинг',
            description: 'Одна из ведущих криптобирж анонсировала запуск сервиса стейкинга для различных блокчейнов. Пользователи смогут получать пассивный доход.',
            url: '#',
            publishedAt: new Date(Date.now() - 259200000).toISOString(),
            source: 'Exchange News'
          },
          {
            id: '5',
            title: 'NFT рынок показывает признаки восстановления',
            description: 'Объем торгов NFT за последний месяц вырос на 35%. Коллекционеры возвращаются на рынок после периода коррекции.',
            url: '#',
            publishedAt: new Date(Date.now() - 345600000).toISOString(),
            source: 'NFT Tracker'
          },
          {
            id: '6',
            title: 'Центробанк рассматривает цифровую валюту',
            description: 'Центральный банк начал публичные консультации по внедрению цифровой валюты. Проект может быть запущен уже в следующем году.',
            url: '#',
            publishedAt: new Date(Date.now() - 432000000).toISOString(),
            source: 'Finance Today'
          }
        ];
        
        setNews(mockNews);
        setLoading(false);
      } catch (err) {
        setError('Не удалось загрузить новости');
        setLoading(false);
      }
    };

    // Имитируем загрузку
    const timer = setTimeout(() => {
      loadMockNews();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Новости криптовалют</h1>
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <span className="ml-3 text-gray-600">Загрузка новостей...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Новости криптовалют</h1>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <div className="text-red-800 mb-2">
              <svg className="w-12 h-12 mx-auto text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <p className="text-red-800 font-medium mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Повторить попытку
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Новости криптовалют</h1>
          <p className="text-gray-600 mt-2">Последние события в мире криптовалют и блокчейна</p>
        </div>
        
        {news.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Новости не найдены</h3>
            <p className="mt-1 text-gray-500">Попробуйте обновить страницу позже</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {news.map((item) => (
              <article 
                key={item.id} 
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded">
                      {item.source}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(item.publishedAt).toLocaleDateString('ru-RU')}
                    </span>
                  </div>
                  
                  <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                    {item.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {item.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <Link 
                      href={item.url === '#' ? '#' : item.url} 
                      onClick={(e) => {
                        if (item.url === '#') {
                          e.preventDefault();
                          alert('Детали новости будут доступны в следующем обновлении');
                        }
                      }}
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                      Читать далее
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}