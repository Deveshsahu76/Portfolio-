import express from 'express'
import cors from 'cors'

const app = express()

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://deveshsahuportfolio.vercel.app',
]

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true)
      }

      return callback(null, true)
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)

app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true }))

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
    timestamp: new Date().toISOString(),
  })
})

export default app