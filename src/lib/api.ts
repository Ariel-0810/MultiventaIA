import axios from 'axios'
import { env } from '@/config/env'
import { useAuthStore } from '@/store/authStore'

export const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  console.log('API Interceptor - Token disponible:', !!token)
  
  if (token) {
    if (!config.headers) {
      config.headers = {}
    }
    config.headers.Authorization = `Bearer ${token}`
    console.log('API Interceptor - Headers configurados:', {
      url: config.url,
      method: config.method,
      hasAuthHeader: !!config.headers.Authorization
    })
  } else {
    console.log('API Interceptor - No hay token disponible para:', {
      url: config.url,
      method: config.method
    })
  }
  return config
})

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log('API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message
    })

    if (error.response?.status === 401) {
      console.log('API Interceptor - Error 401, cerrando sesión')
      useAuthStore.getState().logout()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
) 