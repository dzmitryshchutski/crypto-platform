import axios from 'axios';

const NEWS_API_BASE_URL = 'https://min-api.cryptocompare.com/data/v2/news/';

interface NewsApiResponse {
  Data: Array<{
    id: string;
    title: string;
    body: string;
    url: string;
    published_on: number;
    source: string;
  }>;
}

export const fetchCryptoNews = async (limit: number = 12): Promise<any[]> => {
  try {
    const response = await axios.get<NewsApiResponse>(NEWS_API_BASE_URL, {
      params: {
        lang: 'RU',
        limit: limit,
        extraParams: 'CryptoPlatform'
      }
    });

    return response.data.Data.map(item => ({
      id: item.id,
      title: item.title,
      description: item.body,
      url: item.url,
      publishedAt: new Date(item.published_on * 1000).toISOString(),
      source: item.source
    }));
  } catch (error) {
    console.error('Ошибка при загрузке новостей:', error);
    throw new Error('Не удалось загрузить новости');
  }
};