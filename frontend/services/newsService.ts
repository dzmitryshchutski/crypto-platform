import { NewsItem, NewsApiResponse } from '@/types/news';

// Функция для получения моковых новостей
export const getMockNews = (): Promise<NewsItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockNews: NewsItem[] = [
        {
          id: '1',
          title: 'Bitcoin достиг нового максимума',
          description: 'Цена Bitcoin превысила $70,000, установив новый исторический максимум.',
          url: '#',
          publishedAt: new Date().toISOString(),
          source: 'CryptoNews'
        },
        {
          id: '2',
          title: 'Ethereum обновляет рекорд по активности',
          description: 'Сеть Ethereum зафиксировала рекордное количество транзакций за сутки.',
          url: '#',
          publishedAt: new Date(Date.now() - 86400000).toISOString(),
          source: 'Blockchain Today'
        }
      ];
      resolve(mockNews);
    }, 300);
  });
};

// Функция для получения реальных новостей (если API будет доступен)
export const getRealNews = async (): Promise<NewsItem[]> => {
  try {
    // Пример с CryptoCompare API (бесплатный, но с ограничениями)
    const response = await fetch('https://min-api.cryptocompare.com/data/v2/news/?lang=EN&categories=BTC&excludeCategories=ICO');
    
    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }
    
    const data: any = await response.json();
    
    if (data.Type !== 100) {
      throw new Error('API error');
    }
    
    return data.Data.slice(0, 12).map((item: any, index: number) => ({
      id: item.id.toString() || index.toString(),
      title: item.title || 'Без заголовка',
      description: item.body || 'Нет описания',
      url: item.url || '#',
      publishedAt: new Date(item.published_on * 1000).toISOString(),
      source: item.source || 'Неизвестный источник'
    }));
  } catch (error) {
    console.error('Error fetching real news:', error);
    // Возвращаем моковые данные в случае ошибки
    return getMockNews();
  }
};