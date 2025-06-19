import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Habilitar React Strict Mode para mejor detección de errores
  reactStrictMode: true,
  
  // Optimizaciones de desarrollo
  webpack: (config, { dev, isServer }) => {
    // Mantener el cache entre recargas
    config.cache = true
    
    if (dev && !isServer) {
      // Dividir el código en chunks más pequeños para mejor HMR
      const splitChunks = config.optimization?.splitChunks as any
      if (splitChunks) {
        splitChunks.cacheGroups = {
          ...splitChunks.cacheGroups,
          'react-vendors': {
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
            name: 'react-vendors',
            chunks: 'all',
            priority: 10,
          },
        }
      }
    }
    
    return config
  },

  // Optimizaciones de imágenes
  images: {
    domains: [], // Agrega aquí los dominios permitidos para imágenes
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Configuración de Turbopack (versión estable)
  turbopack: {
    rules: {
      // Configuración de reglas específicas si es necesario
      "*.mdx": ["mdx-loader"]
    }
  }
};

export default nextConfig;
