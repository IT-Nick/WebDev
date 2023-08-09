import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Topbar from '@/components/shared/Topbar'
import HelloSection from '@/components/shared/HelloSection'
import InfoSection from '@/components/shared/InfoSection'
import VideoSection from '@/components/shared/VideoSection'
import Bottombar from '@/components/shared/Bottombar'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>            
      {children}
      </body>
    </html>
  )
}
