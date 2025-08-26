// frontend/app/layout.tsx
import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata = {
  title: 'Crypto Platform',
  description: 'Мини-криптоплатформа для криптовалют',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
        <Navbar />
        <main className="container mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  )
}
