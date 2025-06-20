'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'

interface Order {
  id: string
  nombre?: string
  title?: string
  canal?: string
  mensaje?: string
  fecha: string
  estado: string
}

export default function OrdersList() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/orders/all')
        const data = await res.json()
        setOrders(data)
      } catch (error) {
        console.error('Error al cargar pedidos:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  if (loading) {
    return <div className="p-4">Cargando pedidos...</div>
  }

  return (
    <Card className="p-4">
      <h2 className="text-xl font-bold mb-4">Pedidos</h2>
      {orders.length === 0 ? (
        <p className="text-gray-500">No hay pedidos disponibles</p>
      ) : (
        <ul className="space-y-2">
          {orders.map((order, i) => (
            <li key={order.id || i} className="border-b py-2">
              <div className="flex justify-between items-start">
                <div>
                  <strong>{order.nombre || order.title}</strong>
                  <span className="ml-2 text-sm text-gray-500">
                    vía {order.canal || 'Manual'}
                  </span>
                </div>
                <span className={`px-2 py-1 rounded text-sm ${
                  order.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-800' :
                  order.estado === 'completado' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {order.estado}
                </span>
              </div>
              {order.mensaje && (
                <p className="text-gray-600 mt-1 text-sm">{order.mensaje}</p>
              )}
              <div className="text-xs text-gray-400 mt-1">
                {new Date(order.fecha).toLocaleDateString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
} 