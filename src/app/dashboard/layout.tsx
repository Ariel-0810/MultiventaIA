// Archivo: /pages/dashboard.tsx
'use client'

import { useState } from 'react'
import Head from 'next/head'
import { FaWhatsapp, FaFacebookMessenger, FaInstagram, FaShopify } from 'react-icons/fa'
import { SiMercadopago } from 'react-icons/si'
import { HiOutlineBell, HiOutlineUserCircle, HiOutlineQuestionMarkCircle } from 'react-icons/hi'

const orders = [
  { name: 'Jane Doe', channel: [<FaWhatsapp />, <FaFacebookMessenger />], status: 'Pending', total: '$365' },
  { name: 'John Smith', channel: [<FaShopify />], status: 'Completed', total: '$345' },
  { name: 'Mary Johnson', channel: [<FaFacebookMessenger />], status: 'Pending', total: '$268' },
  { name: 'Michael Brown', channel: [<FaInstagram />], status: 'Pending', total: '$252' },
  { name: 'Linda Wilson', channel: [<FaWhatsapp />, <FaFacebookMessenger />], status: 'Pending', total: '$289' },
  { name: 'David Martinez', channel: [<SiMercadopago />], status: 'Pending', total: '$295' },
]

export default function DashboardPage() {
  const [message, setMessage] = useState('')

  return (
    <>
      <Head>
        <title>Dashboard | MultiVenta AI</title>
      </Head>
      <div className="min-h-screen flex">
        {/* Sidebar */}
        <aside className="bg-[#0b2447] text-white w-64 p-6 space-y-6">
          <div className="text-2xl font-bold text-white">MultiVenta <span className="text-blue-400">AI</span></div>
          <nav className="flex flex-col gap-4">
            <button className="bg-white/10 px-4 py-2 rounded-md text-left">Dashboard</button>
            <button className="hover:bg-white/10 px-4 py-2 rounded-md text-left">Orders</button>
            <button className="hover:bg-white/10 px-4 py-2 rounded-md text-left">Messages</button>
            <button className="hover:bg-white/10 px-4 py-2 rounded-md text-left">Customers</button>
            <button className="hover:bg-white/10 px-4 py-2 rounded-md text-left">Settings</button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 bg-[#f3f6fb]">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <div className="flex items-center space-x-4 text-gray-600">
              <HiOutlineQuestionMarkCircle className="text-2xl" />
              <HiOutlineBell className="text-2xl" />
              <HiOutlineUserCircle className="text-2xl" />
            </div>
          </div>

          {/* Filtros de canales */}
          <div className="flex gap-4 mb-6">
            <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-md shadow-sm border text-sm">
              🟢 Orders
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-md shadow-sm border text-sm">
              📦 Mercado Libre
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-md shadow-sm border text-sm">
              🛍️ Shopify
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-md shadow-sm border text-sm">
              📸 Instagram
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Orders List */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg">Orders</h2>
                <a href="#" className="text-sm text-blue-500 hover:underline">View all</a>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500">
                    <th>Customer</th>
                    <th>Channel</th>
                    <th>Status</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, i) => (
                    <tr key={i} className="border-t border-gray-200">
                      <td className="py-2">{order.name}</td>
                      <td className="py-2 flex gap-1">{order.channel}</td>
                      <td className="py-2 text-yellow-600 font-medium">{order.status}</td>
                      <td className="py-2">{order.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Conversación */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="font-semibold text-lg mb-4">Conversation</h2>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="avatar" className="w-8 h-8 rounded-full" />
                  <span className="font-semibold">John Smith</span>
                </div>
                <div className="bg-gray-100 p-2 rounded-md text-sm w-fit">Hi, is the item available in size large?</div>
                <div className="text-xs text-gray-400">10:30 AM</div>
                <div className="bg-blue-100 p-2 rounded-md text-sm w-fit self-end ml-auto">Yes, we have it in size large.</div>
                <div className="text-xs text-gray-400 text-right">10:32 AM</div>
                <div className="bg-gray-100 p-2 rounded-md text-sm w-fit">Great! How long does shipping take?</div>
                <div className="text-xs text-gray-400">10:34 AM</div>
              </div>
              <div className="mt-4 flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Generate an estimated shipping time response"
                  className="flex-1 px-4 py-2 border rounded-md text-sm"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
                  Generate reply
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
