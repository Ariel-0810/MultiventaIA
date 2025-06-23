'use client'

import { useState, useEffect, useRef } from 'react'
import { useChat } from '@/context/ChatContext'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

interface ChatWindowProps {
  customerId: string
  customerName?: string
}

export default function ChatWindow({ customerId, customerName }: ChatWindowProps) {
  const { getMessages, addMessage } = useChat()
  const [input, setInput] = useState('')
  const [suggestion, setSuggestion] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const messages = getMessages(customerId)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim()) return

    // Agregar mensaje al contexto
    addMessage(customerId, { from: 'vos', text: input.trim() })

    // Enviar mensaje por WhatsApp
    try {
      await fetch('/api/whatsapp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: customerId, message: input.trim() }),
      })
    } catch (error) {
      console.error('Error al enviar mensaje:', error)
    }

    setInput('')
  }

  const getSuggestion = async () => {
    const lastMsg = messages[messages.length - 1]?.text || ''
    setLoading(true)

    try {
      const res = await fetch('/api/ai/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerId,
          lastMessage: lastMsg,
          context: messages.slice(-5) // Enviamos los últimos 5 mensajes como contexto
        }),
      })

      const data = await res.json()
      setSuggestion(data.suggestion)
    } catch (error) {
      console.error('Error al obtener sugerencia:', error)
    } finally {
      setLoading(false)
    }
  }

  const applySuggestion = () => {
    if (suggestion) {
      setInput(suggestion)
      setSuggestion('')
    }
  }

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Lista de chats */}
      <div className="col-span-4">
        <Card className="h-[calc(100vh-12rem)] flex flex-col">
          <div className="p-4 border-b">
            <h2 className="font-semibold">Conversaciones</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {[1, 2, 3, 4, 5].map((chat) => (
              <div
                key={chat}
                className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div>
                  <p className="font-medium">Cliente {chat}</p>
                  <p className="text-sm text-gray-500">Último mensaje...</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Ventana de chat */}
      <div className="col-span-8">
        <Card className="h-[calc(100vh-12rem)] flex flex-col">
          <div className="p-4 border-b">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div>
                <p className="font-medium">John Smith</p>
                <p className="text-sm text-gray-500">En línea</p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-gray-200"></div>
              </div>
              <div className="flex-1">
                <div className="bg-gray-100 rounded-lg p-3 max-w-[80%] inline-block">
                  <p>Hi, is the item available in size large?</p>
                </div>
                <p className="text-xs text-gray-500 mt-1">10:30 AM</p>
              </div>
            </div>

            <div className="flex items-start justify-end space-x-4">
              <div className="flex-1 text-right">
                <div className="bg-blue-500 text-white rounded-lg p-3 max-w-[80%] inline-block">
                  <p>Yes, we have it in size large.</p>
                </div>
                <p className="text-xs text-gray-500 mt-1">10:32 AM</p>
              </div>
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-blue-200"></div>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-gray-200"></div>
              </div>
              <div className="flex-1">
                <div className="bg-gray-100 rounded-lg p-3 max-w-[80%] inline-block">
                  <p>Great! How long does shipping take?</p>
                </div>
                <p className="text-xs text-gray-500 mt-1">10:34 AM</p>
              </div>
            </div>
          </div>

          <div className="p-4 border-t">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600">Generate an estimated shipping time response</p>
                </div>
              </div>
              <Button className="bg-blue-500 text-white px-6">
                Generate
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
} 