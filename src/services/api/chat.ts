import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para agregar el token de autenticación
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export interface Message {
  id: string
  from: 'cliente' | 'vos'
  text: string
  timestamp: string
}

export const chatService = {
  // Enviar mensaje por WhatsApp
  sendWhatsAppMessage: async (customerId: string, message: string) => {
    return api.post('/api/whatsapp/send', { to: customerId, message })
  },

  // Obtener sugerencia de IA
  getAISuggestion: async (customerId: string, lastMessage: string, context: Message[]) => {
    return api.post('/api/ai/suggest', {
      customerId,
      lastMessage,
      context
    })
  },

  // Obtener historial de mensajes
  getMessageHistory: async (customerId: string) => {
    return api.get<Message[]>(`/api/messages/${customerId}`)
  },

  // Marcar mensaje como leído
  markMessageAsRead: async (messageId: string) => {
    return api.put(`/api/messages/${messageId}/read`)
  }
} 