import { api } from '@/lib/api'

export interface MercadoLibreOrder {
  id: string
  status: string
  date_created: string
  date_closed?: string
  total_amount: number
  buyer: {
    id: string
    nickname: string
    email: string
  }
  items: {
    id: string
    title: string
    quantity: number
    unit_price: number
  }[]
  shipping: {
    status: string
    address: {
      address_line: string
      city: string
      state: string
      zip_code: string
    }
  }
}

export interface MercadoLibrePublication {
  id: string
  title: string
  price: number
  available_quantity: number
  status: string
  permalink: string
  thumbnail: string
  date_created: string
}

export interface MercadoLibreMetrics {
  total_sales: number
  total_amount: number
  average_order_value: number
  sales_by_day: {
    date: string
    count: number
    amount: number
  }[]
}

export interface MercadoLibreNotification {
  resource: string
  topic: string
  application_id: string
  user_id: string
  sent: string
}

export interface ConnectionStatusResponse {
  connected: boolean
  userId?: string
  nickname?: string
}

export interface ConnectionStartResponse {
  authUrl: string
}

export const mercadoLibreService = {
  // Publicaciones
  getPublications: async () => {
    return api.get<MercadoLibrePublication[]>('/mercadolibre/publications')
  },

  createTestPublication: async () => {
    return api.post<MercadoLibrePublication>('/mercadolibre/publications/test')
  },

  updatePublicationStatus: async (publicationId: string, status: string) => {
    return api.put(`/mercadolibre/publications/${publicationId}/status`, { status })
  },

  // Órdenes
  getOrders: async (status?: string) => {
    const params = status ? `?status=${status}` : ''
    return api.get<MercadoLibreOrder[]>(`/mercadolibre/orders${params}`)
  },

  getOrder: async (orderId: string) => {
    return api.get<MercadoLibreOrder>(`/mercadolibre/orders/${orderId}`)
  },

  updateOrderStatus: async (orderId: string, status: string) => {
    return api.put(`/mercadolibre/orders/${orderId}/status`, { status })
  },

  // Métricas
  getSalesMetrics: async (dateFrom: string, dateTo: string) => {
    return api.get<MercadoLibreMetrics>('/mercadolibre/metrics', {
      params: { dateFrom, dateTo }
    })
  },

  // Conexión
  checkConnection: async () => {
    return api.get<ConnectionStatusResponse>('/mercadolibre/auth/status')
  },

  startConnection: async () => {
    return api.get<ConnectionStartResponse>('/mercadolibre/auth/connect')
  },

  disconnect: async () => {
    return api.post('/mercadolibre/auth/disconnect')
  }
} 