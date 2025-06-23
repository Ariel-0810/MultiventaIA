import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

export function Hero() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 relative overflow-hidden">
      {/* Background decorative shapes - extendidas y mejoradas */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-r from-green-200/15 via-blue-100/20 to-orange-200/20"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-orange-200/25 to-transparent rounded-full translate-x-48 -translate-y-48"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-radial from-orange-200/20 to-transparent rounded-full translate-x-40 translate-y-40"></div>
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-gradient-radial from-green-300/15 to-transparent rounded-full -translate-x-32"></div>
      <div className="absolute top-20 left-1/3 w-32 h-32 bg-gradient-radial from-blue-200/15 to-transparent rounded-full"></div>
      <div className="absolute top-10 right-1/4 w-24 h-24 bg-gradient-radial from-yellow-200/20 to-transparent rounded-full"></div>
      <div className="absolute top-32 right-1/3 w-28 h-28 bg-gradient-radial from-purple-200/10 to-transparent rounded-full"></div>
      <div className="absolute bottom-40 right-1/4 w-36 h-36 bg-gradient-radial from-pink-200/15 to-transparent rounded-full"></div>

      {/* Header */}
      <header className="relative z-10 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">MultiVenta AI</span>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
              Ingresar
            </Button>
            <Button className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-2 rounded-lg font-medium">
              Comenzar
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8 items-center min-h-[80vh]">
            {/* Left Content - ocupa 2 columnas */}
            <div className="lg:col-span-2 space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Centralizá tus
                  <br />
                  <span className="text-gray-800">ventas en un</span>
                  <br />
                  <span className="text-gray-800">solo lugar</span>
                </h1>

                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  Unificá todos tus canales de venta y atención en un solo dashboard potente e impulsado por IA.
                </p>
              </div>

              <div>
                <Button className="bg-orange-400 hover:bg-orange-500 text-white px-8 py-4 text-lg font-medium rounded-lg">
                  Registrate
                </Button>
              </div>
            </div>

            {/* Right Content - Illustration - ocupa 3 columnas */}
            <div className="lg:col-span-3 relative h-full">
              <div className="relative z-10 h-full flex items-end">
                <Image
                  src="/multiventa-landing/public/images/Image_Landing.JPG"
                  alt="Persona trabajando en dashboard de MultiVenta AI"
                  width={800}
                  height={600}
                  className="w-full h-auto max-h-[70vh] object-contain ml-auto mix-blend-multiply opacity-95"
                  priority
                  style={{
                    filter: "contrast(1.1) saturate(1.1)",
                    maskImage: "radial-gradient(ellipse at center, black 60%, transparent 100%)",
                    WebkitMaskImage: "radial-gradient(ellipse at center, black 60%, transparent 100%)",
                  }}
                />
              </div>

              {/* Elementos decorativos adicionales que se mezclan con la imagen */}
              <div className="absolute top-16 right-20 w-20 h-20 bg-yellow-300/40 rounded-full blur-sm"></div>
              <div className="absolute top-40 right-8 w-16 h-16 bg-green-400/30 rounded-2xl blur-sm rotate-12"></div>
              <div className="absolute bottom-32 right-16 w-14 h-14 bg-orange-400/35 rounded-2xl blur-sm -rotate-12"></div>
              <div className="absolute top-24 right-40 w-12 h-12 bg-blue-300/25 rounded-full blur-sm"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
