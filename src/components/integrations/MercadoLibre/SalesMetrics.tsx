'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { mercadoLibreService, MercadoLibreMetrics } from '@/services/api/mercadolibre'
import { toast } from 'sonner'

export function MercadoLibreSalesMetrics() {
  const [metrics, setMetrics] = useState<MercadoLibreMetrics | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const loadMetrics = async () => {
    try {
      setIsLoading(true)
      // Obtener métricas de los últimos 30 días
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      
      const response = await mercadoLibreService.getSalesMetrics(
        thirtyDaysAgo.toISOString().split('T')[0],
        new Date().toISOString().split('T')[0]
      )
      setMetrics(response.data)
    } catch (error) {
      console.error('Error al cargar métricas:', error)
      toast.error('Error al cargar métricas', {
        description: 'No se pudieron cargar las métricas de Mercado Libre'
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadMetrics()
  }, [])

  if (isLoading) {
    return <div className="p-4">Cargando métricas...</div>
  }

  if (!metrics) {
    return (
      <Card className="p-4 text-center text-gray-500">
        No hay métricas disponibles
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <h3 className="font-semibold text-lg mb-4">Métricas de Ventas</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Ventas del Mes</p>
          <p className="text-2xl font-bold">$12,345</p>
          <p className="text-sm text-green-500">↗︎ 15% vs mes anterior</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Pedidos del Mes</p>
          <p className="text-2xl font-bold">45</p>
          <p className="text-sm text-green-500">↗︎ 8% vs mes anterior</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Calificación</p>
          <p className="text-2xl font-bold">4.8/5</p>
          <p className="text-sm text-gray-500">Últimos 30 días</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Tiempo de Respuesta</p>
          <p className="text-2xl font-bold">2h</p>
          <p className="text-sm text-yellow-500">↗︎ 30min vs mes anterior</p>
        </div>
      </div>
    </Card>
  )
} 