'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const login = useAuthStore((state) => state.login)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await login(email, password)
      router.push('/dashboard')
    } catch (error) {
      console.error('Error al iniciar sesión:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full p-8 bg-white/95 shadow-xl rounded-3xl">
      {/* Logo */}
      <div className="flex justify-center mb-8">
        <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center">
          <span className="text-white text-3xl font-bold">A</span>
        </div>
      </div>

      {/* Título */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">MultiVenta AI</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-gray-200"
              required
            />
          </div>

          <div>
            <Input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-gray-200"
              required
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-6 rounded-xl text-lg font-medium"
        >
          {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
        </Button>

        <div className="text-center mt-4">
          <a href="#" className="text-sm text-gray-600 hover:text-gray-800">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </form>
    </Card>
  )
} 