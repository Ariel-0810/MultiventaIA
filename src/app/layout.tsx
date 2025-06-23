import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ChatProvider } from '@/context/ChatContext'
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MultiVenta AI - Centralizá tus ventas en un solo lugar",
  description: "Unificá todos tus canales de venta y atención en un solo dashboard potente e impulsado por IA.",
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