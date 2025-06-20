import './globals.css'
import { Inter } from 'next/font/google'
import { ChatProvider } from '@/context/ChatContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'MultiVenta IA',
  description: 'Sistema de gestión de ventas con inteligencia artificial',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <ChatProvider>
          {children}
        </ChatProvider>
      </body>
    </html>
  )
} 