import type { Metadata } from 'next'
import { IBM_Plex_Sans, Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './context/Providers'
import { WalletProvider } from './context/walletContext'
import { Box, Center, Container } from '@chakra-ui/react'

const sans = IBM_Plex_Sans({
  weight: ['400'],
  subsets: ['cyrillic']
})

export const metadata: Metadata = {
  title: 'Saudagar',
  description: 'Semua bisa jadi saudagar',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <Providers>
        <WalletProvider>
          <body className={sans.className}>
          <Center>
            <Box w={['sm', 'lg', 'xl']}>
                {children}
              </Box>
          </Center>
          </body>
        </WalletProvider>
      </Providers>
    </html>
  )
}
