import axios from 'axios'
import Cookies from 'js-cookie'

// Создаем экземпляр axios с прямым URL к backend
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Интерцептор для добавления токена к запросам
api.interceptors.request.use((config) => {
  const token = Cookies.get('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Интерцептор для обработки ошибок
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Токен истек или недействителен
      Cookies.remove('access_token')
      localStorage.removeItem('user')
      window.location.href = '/auth'
    }
    return Promise.reject(error)
  }
)

// API функции для аутентификации
export const loginUser = async (username: string, password: string) => {
  const response = await api.post('/login/', { username, password })
  return response.data
}

export const registerUser = async (username: string, email: string, password: string) => {
  const response = await api.post('/register/', { username, email, password })
  return response.data
}

// API функции для криптовалют
export const getCryptos = async () => {
  const response = await api.get('/cryptos/')
  return response.data
}

// API функции для избранного
export const getFavorites = async () => {
  const response = await api.get('/favorites/')
  return response.data
}

export const addToFavorites = async (favoriteData: {
  crypto_id: string
  name: string
  symbol: string
  current_price: number
  image_url: string
}) => {
  const response = await api.post('/favorites/', favoriteData)
  return response.data
}

export const removeFromFavorites = async (favoriteId: number) => {
  const response = await api.delete(`/favorites/${favoriteId}/`)
  return response.data
}

export default api 