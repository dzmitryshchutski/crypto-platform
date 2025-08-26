export interface NewsItem {
    id: string;
    title: string;
    description: string;
    url: string;
    publishedAt: string;
    source: string;
  }
  
  export interface NewsApiResponse {
    status: string;
    totalResults: number;
    articles: Array<{
      source: {
        id: string | null;
        name: string;
      };
      author: string | null;
      title: string;
      description: string | null;
      url: string;
      urlToImage: string | null;
      publishedAt: string;
      content: string | null;
    }>;
  }