'use client'

import { Suspense } from 'react'
import ChatWindow from '@/components/dashboard/chat/ChatWindow'
import { Card } from '@/components/ui/card'

export default function ChatPage() {
  // En un caso real, esto vendría de tu base de datos
  const mockCustomer = {
    id: '123456789',
    name: 'Juan Pérez'
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Chat con Clientes</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Lista de chats */}
        <div className="lg:col-span-4">
          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-4">Conversaciones activas</h2>
            <div className="space-y-2">
              {/* Aquí irá tu lista de chats activos */}
              <div className="p-3 bg-blue-50 rounded-lg cursor-pointer">
                <p className="font-medium">{mockCustomer.name}</p>
                <p className="text-sm text-gray-500">Último mensaje recibido...</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Ventana de chat */}
        <div className="lg:col-span-8">
          <Suspense fallback={<div>Cargando chat...</div>}>
            <ChatWindow 
              customerId={mockCustomer.id}
              customerName={mockCustomer.name}
            />
          </Suspense>
        </div>
      </div>
    </div>
  )
} 