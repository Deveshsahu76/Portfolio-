import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Always load server/.env, chahe command kisi bhi folder se run ho.
dotenv.config({
  path: path.resolve(__dirname, '../.env'),
  override: true,
})

const { default: app } = await import('./app.js')
const { default: connectDB } = await import('./config/db.js')

const { default: adminAuthRoutes } = await import(
  './routes/adminAuthRoutes.js'
)

const { default: analyticsRoutes } = await import(
  './routes/analyticsRoutes.js'
)

const { default: leadRoutes } = await import(
  './routes/leadRoutes.js'
)

const { default: siteSettingsRoutes } = await import(
  './routes/siteSettingsRoutes.js'
)

const { default: leetcodeRoutes } = await import(
  './routes/leetcodeRoutes.js'
)

const {
  adminLimiter,
  adminLoginLimiter,
  apiLimiter,
  formLimiter,
} = await import('./middleware/rateLimiters.js')

const {
  errorHandler,
  notFoundHandler,
} = await import('./middleware/errorHandlers.js')

/*
|--------------------------------------------------------------------------
| Global API protection
|--------------------------------------------------------------------------
*/

app.use('/api', apiLimiter)

/*
|--------------------------------------------------------------------------
| Public form protection
|--------------------------------------------------------------------------
*/

app.use('/api/recruiter', formLimiter)
app.use('/api/freelance', formLimiter)
app.use('/api/contact', formLimiter)

/*
|--------------------------------------------------------------------------
| Admin protection
|--------------------------------------------------------------------------
*/

app.use('/api/admin/login', adminLoginLimiter)
app.use('/api/admin/session', adminLimiter)
app.use('/api/leads', adminLimiter)
app.use('/api/analytics/dashboard', adminLimiter)
app.use('/api/site-settings/resume/upload', adminLimiter)

/*
|--------------------------------------------------------------------------
| API routes
|--------------------------------------------------------------------------
*/

app.use('/api', adminAuthRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api', leadRoutes)
app.use('/api', siteSettingsRoutes)
app.use('/api', leetcodeRoutes)

/*
|--------------------------------------------------------------------------
| Error handlers
|--------------------------------------------------------------------------
*/

app.use(notFoundHandler)
app.use(errorHandler)

const PORT = Number(process.env.PORT) || 5000

const startServer = async () => {
  try {
    if (!process.env.ADMIN_KEY) {
      throw new Error('ADMIN_KEY is missing from server/.env')
    }

    if (!process.env.ADMIN_SESSION_SECRET) {
      throw new Error(
        'ADMIN_SESSION_SECRET is missing from server/.env'
      )
    }

    await connectDB()

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
      console.log(
        `Environment: ${process.env.NODE_ENV || 'development'}`
      )
      console.log('Admin authentication configuration loaded.')
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