// frontend/services/newsService.ts
import axios from "axios";

const API_URL = "https://api.coingecko.com/api/v3/news";

export const getNews = async () => {
  const res = await axios.get(API_URL);
  return res.data.data; // массив новостей
};
