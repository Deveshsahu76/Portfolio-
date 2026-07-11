import dotenv from 'dotenv'
import path from 'path'

import analyticsRoutes from './routes/analyticsRoutes.js'
import leadRoutes from './routes/leadRoutes.js'
import siteSettingsRoutes from './routes/siteSettingsRoutes.js'

import {
  adminLimiter,
  apiLimiter,
  formLimiter,
} from './middleware/rateLimiters.js'

import {
  errorHandler,
  notFoundHandler,
} from './middleware/errorHandlers.js'

dotenv.config({
  path: path.resolve(process.cwd(), '.env'),
})

const { default: app } = await import('./app.js')
const { default: connectDB } = await import('./config/db.js')

/*
|--------------------------------------------------------------------------
| API rate limits
|--------------------------------------------------------------------------
*/

app.use('/api', apiLimiter)

// Public form spam protection.
app.use('/api/recruiter', formLimiter)
app.use('/api/freelance', formLimiter)
app.use('/api/contact', formLimiter)

// Private/admin API protection.
app.use('/api/leads', adminLimiter)
app.use(
  '/api/site-settings/resume/upload',
  adminLimiter
)

/*
|--------------------------------------------------------------------------
| API routes
|--------------------------------------------------------------------------
*/

app.use('/api/analytics', analyticsRoutes)
app.use('/api', leadRoutes)
app.use('/api', siteSettingsRoutes)

/*
|--------------------------------------------------------------------------
| Error handlers must stay after routes
|--------------------------------------------------------------------------
*/

app.use(notFoundHandler)
app.use(errorHandler)

const PORT = Number(process.env.PORT) || 5000

const startServer = async () => {
  try {
    await connectDB()

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
      console.log(
        `Environment: ${process.env.NODE_ENV || 'development'}`
      )
    })
  } catch (error) {
    console.error(
      'Server startup error:',
      error.message
    )

    process.exit(1)
  }
}

startServer()