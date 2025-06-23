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
import { mercadoLibreService } from '@/services/api/mercadolibre'
import { toast } from 'sonner'
import Link from "next/link"

interface Publication {
  id: string
  title: string
  price: number
  available_quantity: number
  status: string
  permalink: string
  thumbnail: string
}

export function PublicationsList() {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">Publicaciones</h3>
        <Link href="/dashboard/mercadolibre" className="text-blue-600 hover:text-blue-700">
          Ver todas
        </Link>
      </div>
      <div className="space-y-4">
        {[1, 2, 3].map((pub) => (
          <div key={pub} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
              <div>
                <p className="font-medium">Producto {pub}</p>
                <p className="text-sm text-gray-500">SKU: PRD-{pub}234</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium">$99.99</p>
              <p className="text-sm text-gray-500">Stock: 15</p>
            </div>
          </div>
          ))}
        </div>
    </Card>
  )
}