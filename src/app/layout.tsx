import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { PageHeader } from '@/components/component/page-header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sample Next WebApp',
  description: '1 week in the making',
}

type ChildType = {
  children: React.ReactNode
}

export default function RootLayout({ children }: ChildType) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PageHeader showSignIn={true} />
        {children}
      </body>
    </html>
  )
}
