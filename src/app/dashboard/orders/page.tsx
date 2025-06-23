'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { OrdersList } from '@/components/dashboard/orders/OrdersList'
import { MercadoLibreOrdersList } from '@/components/integrations/MercadoLibre/OrdersList'

export default function OrdersPage() {
  const [filterChannel, setFilterChannel] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Órdenes</h1>
      <OrdersList />
    </div>
  )
} 