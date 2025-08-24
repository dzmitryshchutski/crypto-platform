// frontend/components/NewsCard.tsx
import React from "react";

interface NewsCardProps {
  title: string;
  url: string;
  description: string;
  source: string;
  published: string;
  image?: string;
}

const NewsCard: React.FC<NewsCardProps> = ({
  title,
  url,
  description,
  source,
  published,
  image,
}) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 border rounded-2xl shadow-sm hover:shadow-lg transition bg-white"
    >
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-40 object-cover rounded-xl mb-3"
        />
      )}
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600 line-clamp-3 mb-2">{description}</p>
      <p className="text-xs text-gray-500">
        {source} • {new Date(published).toLocaleString()}
      </p>
    </a>
  );
};

export default NewsCard;
