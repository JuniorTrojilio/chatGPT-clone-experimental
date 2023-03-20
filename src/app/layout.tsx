"use client"
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from 'src/theme'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, padding: 0, boxSizing: 'border-box' }}>
        <ChakraProvider resetCSS theme={theme}>
          {children}
        </ChakraProvider>
      </body>
    </html>
  )
}
