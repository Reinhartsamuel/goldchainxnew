import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './context/Providers'
import { sequence } from '0xsequence'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GCX',
  description: 'Emas terpercaya dan 100% otentik',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const wallet = sequence.initWallet({
    defaultNetwork: 'mainnet',
    projectAccessKey: 'Q0ZfFkTedUvuQepZttdzEp3BAAAAAAAAA',
  });
  
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>
          {children}
        </body>
      </Providers>
    </html>
  )
}
