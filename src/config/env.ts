import { z } from 'zod'

const envSchema = z.object({
  // API
  NEXT_PUBLIC_API_URL: z.string().url().default('http://localhost:3001/api'),

  // Authentication (opcional durante desarrollo)
  NEXTAUTH_SECRET: z.string().optional(),
  NEXTAUTH_URL: z.string().optional().default('http://localhost:3001'),

  // External Services
  NEXT_PUBLIC_MERCADOLIBRE_APP_ID: z.string().optional(),
  NEXT_PUBLIC_WHATSAPP_BUSINESS_ID: z.string().optional(),

  // Database
  DATABASE_URL: z.string().optional(),

  // Feature Flags
  NEXT_PUBLIC_ENABLE_ANALYTICS: z.coerce.boolean().default(false),
})

/**
 * @type {Record<keyof z.infer<typeof envSchema>, string | undefined>}
 */
const envRaw = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  NEXT_PUBLIC_MERCADOLIBRE_APP_ID: process.env.NEXT_PUBLIC_MERCADOLIBRE_APP_ID,
  NEXT_PUBLIC_WHATSAPP_BUSINESS_ID: process.env.NEXT_PUBLIC_WHATSAPP_BUSINESS_ID,
  DATABASE_URL: process.env.DATABASE_URL,
  NEXT_PUBLIC_ENABLE_ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
}

// Validate and parse environment variables
export const env = envSchema.parse(envRaw)

// Type for environment variables
export type Env = z.infer<typeof envSchema> 