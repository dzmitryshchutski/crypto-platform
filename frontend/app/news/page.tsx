// frontend/app/news/page.tsx
import NewsCard from "@/components/NewsCard";

interface News {
  title: string;
  url: string;
  description: string;
  source: { name: string };
  published_at: string;
  thumb_2x: string | null;
}

async function getNews(): Promise<News[]> {
  const res = await fetch("https://api.coingecko.com/api/v3/news", {
    next: { revalidate: 300 }, // кэш 5 минут (ISR)
  });

  if (!res.ok) {
    throw new Error("Ошибка загрузки новостей");
  }

  const data = await res.json();
  return data.data; // массив новостей
}

export default async function NewsPage() {
  const news = await getNews();

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">📢 Новости криптовалют</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {news.map((n, i) => (
          <NewsCard
            key={i}
            title={n.title}
            url={n.url}
            description={n.description}
            source={n.source?.name || "CoinGecko"}
            published={n.published_at}
            image={n.thumb_2x || undefined}
          />
        ))}
      </div>
    </div>
  );
}
