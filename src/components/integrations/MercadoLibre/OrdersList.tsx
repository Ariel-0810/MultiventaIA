'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { mercadoLibreService, MercadoLibreOrder } from '@/services/api/mercadolibre'
import { toast } from 'sonner'
import Link from "next/link"

export function OrdersList() {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">Últimas Órdenes</h3>
        <Link href="/dashboard/orders" className="text-blue-600 hover:text-blue-700">
          Ver todas
        </Link>
      </div>
        <div className="space-y-4">
        {[1, 2, 3].map((order) => (
          <div key={order} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
                <div>
                <p className="font-medium">Orden #{order}234</p>
                <p className="text-sm text-gray-500">Cliente {order}</p>
                    </div>
                </div>
                <div className="text-right">
              <p className="font-medium">$123.45</p>
              <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                Pendiente
              </span>
                </div>
              </div>
          ))}
        </div>
    </Card>
  )
} 