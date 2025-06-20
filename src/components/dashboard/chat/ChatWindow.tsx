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
    <Card className="flex flex-col h-[600px] max-w-2xl mx-auto">
      <div className="p-4 border-b">
        <h2 className="text-lg font-bold">
          Chat con {customerName || 'Cliente'} 
          <span className="text-sm font-normal text-gray-500 ml-2">#{customerId}</span>
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.from === 'vos' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.from === 'vos'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <p>{message.text}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {suggestion && (
        <div className="px-4 py-2 bg-blue-50 border-t border-blue-100">
          <p className="text-sm text-gray-600">
            💡 <strong>Sugerencia IA:</strong> {suggestion}
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={applySuggestion}
            className="mt-1 text-blue-600"
          >
            Usar sugerencia
          </Button>
        </div>
      )}

      <div className="p-4 border-t bg-gray-50">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="w-full mb-2"
          rows={3}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              sendMessage()
            }
          }}
        />
        <div className="flex gap-2">
          <Button
            onClick={getSuggestion}
            disabled={loading || messages.length === 0}
            variant="outline"
          >
            {loading ? 'Pensando...' : '💡 Sugerencia IA'}
          </Button>
          <Button
            onClick={sendMessage}
            disabled={!input.trim()}
            className="flex-1"
          >
            Enviar mensaje
          </Button>
        </div>
      </div>
    </Card>
  )
} 