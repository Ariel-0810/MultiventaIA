'use client'

import { ReactNode, useState } from 'react'
import Link from 'next/link'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiShoppingBag,
} from 'react-icons/fi'
import { IconType } from 'react-icons'
import { useAuthStore } from '@/store/authStore'

interface LinkItemProps {
  name: string
  icon: IconType
  route: string
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'Inicio', icon: FiHome, route: '/dashboard' },
  { name: 'Pedidos', icon: FiTrendingUp, route: '/dashboard/orders' },
  { name: 'Conversaciones', icon: FiCompass, route: '/dashboard/chat' },
  { name: 'Mercado Libre', icon: FiShoppingBag, route: '/dashboard/mercadolibre' },
  { name: 'Configuración', icon: FiSettings, route: '/dashboard/settings' },
]

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <SidebarContent />
      </div>

      {/* Mobile sidebar */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="outline" size="icon" className="fixed top-4 left-4">
            <FiMenu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className="md:pl-64">
        <MobileNav />
        <main className="p-4">
          {children}
        </main>
      </div>
    </div>
  )
}

const SidebarContent = () => {
  return (
    <div className="flex h-full flex-col bg-white border-r">
      <div className="h-16 flex items-center px-6 justify-between">
        <h2 className="text-2xl font-bold">MultiVenta AI</h2>
      </div>
      <nav className="flex-1 space-y-1 px-2">
        {LinkItems.map((link) => (
          <NavItem key={link.name} {...link} />
        ))}
      </nav>
    </div>
  )
}

const NavItem = ({ icon: Icon, route, name }: LinkItemProps) => {
  return (
    <Link 
      href={route}
      className="flex items-center px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-100 hover:text-gray-900 group"
    >
      {Icon && (
        <Icon
          className="mr-3 h-4 w-4"
        />
      )}
      {name}
    </Link>
  )
}

const MobileNav = () => {
  const user = useAuthStore((state) => state.user)
  
  return (
    <div className="sticky top-0 z-10 bg-white md:hidden flex h-16 items-center justify-between border-b px-4">
      <h2 className="text-2xl font-bold">MultiVenta AI</h2>
      <div className="flex items-center">
        <span className="text-sm font-medium">
          {user?.name || 'Usuario'}
        </span>
      </div>
    </div>
  )
} 