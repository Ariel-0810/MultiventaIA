'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { mercadoLibreService } from '@/services/api/mercadolibre'
import type { ConnectionStatusResponse } from '@/services/api/mercadolibre'
import { toast } from 'sonner'

export function ConnectionStatus() {
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState<Pick<ConnectionStatusResponse, 'userId' | 'nickname'>>()

  const checkConnection = async () => {
    try {
      setIsLoading(true)
      const { data } = await mercadoLibreService.checkConnection()
      setIsConnected(data.connected)
      if (data.connected && data.userId && data.nickname) {
        setUserData({ userId: data.userId, nickname: data.nickname })
      }
    } catch (error) {
      console.error('Error al verificar conexión:', error)
      setIsConnected(false)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    checkConnection()
  }, [])

  const handleConnect = async () => {
    try {
      const { data } = await mercadoLibreService.startConnection()
      // Redirigir al usuario a la página de autorización de Mercado Libre
      window.location.href = data.authUrl
    } catch (error) {
      console.error('Error al iniciar conexión:', error)
      toast.error('Error al conectar con Mercado Libre', {
        description: 'Por favor, intenta nuevamente'
      })
    }
  }

  const handleDisconnect = async () => {
    try {
      await mercadoLibreService.disconnect()
      setIsConnected(false)
      setUserData(undefined)
      toast.success('Desconexión exitosa', {
        description: 'Tu cuenta de Mercado Libre ha sido desconectada'
      })
    } catch (error) {
      console.error('Error al desconectar:', error)
      toast.error('Error al desconectar', {
        description: 'No se pudo desconectar la cuenta'
      })
    }
  }

  if (isLoading) {
    return <div>Verificando conexión...</div>
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Estado de la Conexión</h3>
            <p className="text-gray-600">Conectado como: {userData?.nickname || 'usuario'}</p>
          </div>
        </div>
        {isConnected ? (
          <Button 
            variant="destructive"
            onClick={handleDisconnect}
          >
            Desconectar
          </Button>
        ) : (
          <Button 
            onClick={handleConnect}
          >
            Conectar Cuenta
          </Button>
        )}
      </div>
    </Card>
  )
} 