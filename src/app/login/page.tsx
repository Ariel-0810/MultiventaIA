// Archivo: /pages/login.tsx
'use client'

import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { FaWhatsapp, FaInstagram, FaRobot, FaCommentDots } from 'react-icons/fa'

export default function LoginPage() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Completá todos los campos.')
      return
    }
    alert('Login simulado con éxito')
  }

  if (!isMounted) return null

  return (
    <>
      <Head>
        <title>Ingresar | MultiVenta AI</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-[#f9f7f3] relative overflow-hidden">
        {/* Iconos de fondo más cerca del formulario */}
        <div className="absolute z-0 opacity-30 pointer-events-none w-full h-full flex flex-col justify-center items-center gap-4">
          <div className="flex justify-between h-1/2 w-1/2">
            <FaWhatsapp className="text-gray-400 text-5xl w-1/3 h-1/10" />
            <FaInstagram className="text-gray-400 text-5xl w-1/3 " />
          </div>
          <div className="flex justify-between w-1/3">
            <FaRobot className="text-gray-400 text-5xl" />
            <FaCommentDots className="text-gray-400 text-5xl" />
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center bg-white px-8 py-10 rounded-2xl shadow-md w-full max-w-sm">
          {/* Logo + título */}
          <div className="flex items-center space-x-2 mb-6">
            <div className="bg-blue-600 text-white w-10 h-10 flex items-center justify-center font-bold rounded-xl text-lg shadow-md">
              A
            </div>
            <h1 className="text-xl font-semibold text-gray-800">MultiVenta AI</h1>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Iniciar sesión
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-4 cursor-pointer hover:underline">
            ¿Olvidaste tu contraseña?
          </p>
        </div>
      </div>
    </>
  )
}
