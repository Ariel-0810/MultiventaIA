'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export default function SettingsPage() {
  const [whatsappEnabled, setWhatsappEnabled] = useState(false)
  const [mlEnabled, setMlEnabled] = useState(false)
  const [notifications, setNotifications] = useState(true)

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Configuraciones</h1>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
          <TabsTrigger value="mercadolibre">MercadoLibre</TabsTrigger>
          <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Configuración General</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Nombre del Negocio</Label>
                  <Input placeholder="Tu Negocio" className="max-w-sm" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Email de Contacto</Label>
                  <Input type="email" placeholder="contacto@tunegocio.com" className="max-w-sm" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Zona Horaria</Label>
                  <Input placeholder="America/Argentina/Buenos_Aires" className="max-w-sm" />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="whatsapp">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Configuración de WhatsApp</h2>
              <Switch
                checked={whatsappEnabled}
                onCheckedChange={setWhatsappEnabled}
              />
            </div>

            <div className="space-y-4">
              <div>
                <Label>Número de WhatsApp</Label>
                <Input placeholder="+54 911 1234-5678" className="max-w-sm" />
              </div>

              <div>
                <Label>Token de API</Label>
                <Input type="password" placeholder="••••••••" className="max-w-sm" />
              </div>

              <div>
                <Label>Mensaje de Bienvenida</Label>
                <Input placeholder="¡Hola! ¿En qué podemos ayudarte?" className="max-w-sm" />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="mercadolibre">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Configuración de MercadoLibre</h2>
              <Switch
                checked={mlEnabled}
                onCheckedChange={setMlEnabled}
              />
            </div>

            <div className="space-y-4">
              <div>
                <Label>Client ID</Label>
                <Input placeholder="ML Client ID" className="max-w-sm" />
              </div>

              <div>
                <Label>Client Secret</Label>
                <Input type="password" placeholder="••••••••" className="max-w-sm" />
              </div>

              <div>
                <Label>Usuario de MercadoLibre</Label>
                <Input placeholder="@tunegocio" className="max-w-sm" />
              </div>

              <Button variant="outline">
                Conectar con MercadoLibre
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Configuración de Notificaciones</h2>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificaciones por Email</Label>
                  <div className="text-sm text-gray-500">
                    Recibe notificaciones de nuevos pedidos por email
                  </div>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificaciones Push</Label>
                  <div className="text-sm text-gray-500">
                    Recibe notificaciones en tiempo real en el navegador
                  </div>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Resumen Diario</Label>
                  <div className="text-sm text-gray-500">
                    Recibe un resumen diario de la actividad
                  </div>
                </div>
                <Switch />
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex justify-end gap-4">
        <Button variant="outline">Cancelar</Button>
        <Button>Guardar Cambios</Button>
      </div>
    </div>
  )
} 