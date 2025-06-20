'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface Message {
  id: string
  from: 'cliente' | 'vos'
  text: string
  timestamp: string
}

interface ChatContextType {
  messages: Record<string, Message[]>
  addMessage: (customerId: string, message: Omit<Message, 'id' | 'timestamp'>) => void
  getMessages: (customerId: string) => Message[]
  clearMessages: (customerId: string) => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Record<string, Message[]>>({})

  const addMessage = (customerId: string, message: Omit<Message, 'id' | 'timestamp'>) => {
    setMessages(prev => ({
      ...prev,
      [customerId]: [
        ...(prev[customerId] || []),
        {
          ...message,
          id: Math.random().toString(36).substr(2, 9),
          timestamp: new Date().toISOString()
        }
      ]
    }))
  }

  const getMessages = (customerId: string) => {
    return messages[customerId] || []
  }

  const clearMessages = (customerId: string) => {
    setMessages(prev => {
      const newMessages = { ...prev }
      delete newMessages[customerId]
      return newMessages
    })
  }

  return (
    <ChatContext.Provider value={{ messages, addMessage, getMessages, clearMessages }}>
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider')
  }
  return context
} 