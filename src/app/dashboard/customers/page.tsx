'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  lastOrder: string
  totalOrders: number
  status: 'active' | 'inactive'
}

const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Juan Pérez',
    email: 'juan@example.com',
    phone: '+54 911 1234-5678',
    lastOrder: '2024-02-20',
    totalOrders: 5,
    status: 'active'
  },
  // Agrega más clientes de ejemplo aquí
]

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Clientes</h1>
        <Button>Agregar Cliente</Button>
      </div>

      {/* Búsqueda y filtros */}
      <Card className="p-4 mb-6">
        <div className="flex gap-4">
          <Input
            placeholder="Buscar clientes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
      </Card>

      {/* Tabla de clientes */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>Último Pedido</TableHead>
              <TableHead>Total Pedidos</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{new Date(customer.lastOrder).toLocaleDateString()}</TableCell>
                <TableCell>{customer.totalOrders}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded text-sm ${
                    customer.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {customer.status === 'active' ? 'Activo' : 'Inactivo'}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Ver</Button>
                    <Button variant="outline" size="sm">Editar</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
} 