import express from 'express'
import cors from 'cors'

const app = express()

app.set('trust proxy', 1)
app.disable('x-powered-by')

const defaultAllowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://deveshsahuportfolio.vercel.app',
]

const environmentOrigins = (
  process.env.FRONTEND_URLS ||
  process.env.FRONTEND_URL ||
  ''
)
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

const allowedOrigins = new Set([
  ...defaultAllowedOrigins,
  ...environmentOrigins,
])

const isAllowedVercelPreview = (origin) => {
  return /^https:\/\/deveshsahuportfolio(?:-[a-z0-9-]+)*\.vercel\.app$/i.test(
    origin
  )
}

const corsOptions = {
  origin(origin, callback) {
    // Allow server-to-server requests, curl and Postman.
    if (!origin) {
      return callback(null, true)
    }

    if (
      allowedOrigins.has(origin) ||
      isAllowedVercelPreview(origin)
    ) {
      return callback(null, true)
    }

    const error = new Error('Origin not allowed by CORS.')
    error.status = 403

    return callback(error)
  },

  credentials: true,

  methods: [
    'GET',
    'POST',
    'PUT',
    'PATCH',
    'DELETE',
    'OPTIONS',
  ],

  allowedHeaders: [
    'Accept',
    'Content-Type',
    'Authorization',
    'Origin',
    'X-Requested-With',
    'x-admin-key',
    'x-file-name',
  ],

  exposedHeaders: [
    'Content-Disposition',
    'Content-Length',
  ],

  optionsSuccessStatus: 204,
  maxAge: 86400,
}

app.use(cors(corsOptions))
app.options('*', cors(corsOptions))

// Basic security headers without adding another dependency.
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader(
    'Referrer-Policy',
    'strict-origin-when-cross-origin'
  )
  res.setHeader(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()'
  )
  res.setHeader(
    'Cross-Origin-Resource-Policy',
    'cross-origin'
  )

  next()
})

// PDF upload uses its own express.raw parser,
// so normal JSON requests can stay limited.
app.use(
  express.json({
    limit: '2mb',
    strict: true,
  })
)

app.use(
  express.urlencoded({
    extended: true,
    limit: '2mb',
  })
)

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Portfolio backend API is running.',
  })
})

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Backend health check passed.',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
  })
})

export default app