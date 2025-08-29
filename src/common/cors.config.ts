// src/common/cors.config.ts
import type { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface"

const trim = (s?: string) => (s ? s.replace(/\/$/, "") : s)

const ALLOWED = new Set(
  [trim(process.env.FRONTEND_URL) ]
  .filter(Boolean) as string[]
)

export const corsConfig: CorsOptions = {
  origin: (origin, cb) => {
    if (!origin) return cb(null, true) // curl / healthchecks, etc.
    const normalized = trim(origin)
    if (normalized && ALLOWED.has(normalized)) return cb(null, true)
    return cb(new Error(`CORS: origin not allowed: ${origin}`), false)
  },
  methods: ["GET","POST","PATCH","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"],
  credentials: false,
  optionsSuccessStatus: 204,
}
