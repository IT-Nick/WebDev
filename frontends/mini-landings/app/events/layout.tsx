import '../globals.css'
import Navbar from '@/components/shared/Navbar/Navbar'
import { LoadingProvider } from '@/components/Providers/LoadingProvider'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Мероприятия МЭИ',
  description: 'Все мероприятия в одном месте',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
    <body className={`${inter.className} transition-all duration-500 ease-in-out`}> 
      <LoadingProvider>
        <Navbar />
        {children}
      </LoadingProvider>
    </body>
  </html>
  )
}