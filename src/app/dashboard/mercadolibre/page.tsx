'use client'

import { useState, useEffect } from 'react'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { MercadoLibreOrdersList } from '@/components/integrations/MercadoLibre/OrdersList'
import { MercadoLibrePublicationsList } from '@/components/integrations/MercadoLibre/PublicationsList'
import { MercadoLibreSalesMetrics } from '@/components/integrations/MercadoLibre/SalesMetrics'
import { MercadoLibreConnectionStatus } from '@/components/integrations/MercadoLibre/ConnectionStatus'
import { useAuthStore } from '@/store/authStore'
import { ConnectionStatus } from '@/components/integrations/MercadoLibre/ConnectionStatus'
import { SalesMetrics } from '@/components/integrations/MercadoLibre/SalesMetrics'
import { OrdersList } from '@/components/integrations/MercadoLibre/OrdersList'
import { PublicationsList } from '@/components/integrations/MercadoLibre/PublicationsList'

export default function MercadoLibrePage() {
  const [activeTab, setActiveTab] = useState('publications')
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  if (!isAuthenticated) {
    return null // El layout se encargará de redirigir
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Mercado Libre</h1>
      
      <ConnectionStatus />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SalesMetrics />
        <OrdersList />
        <PublicationsList />
      </div>
    </div>
  )
} 