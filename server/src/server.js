import dotenv from 'dotenv'
import path from 'path'
import analyticsRoutes from './routes/analyticsRoutes.js'
import leadRoutes from './routes/leadRoutes.js'
import siteSettingsRoutes from './routes/siteSettingsRoutes.js'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

const { default: app } = await import('./app.js')
const { default: connectDB } = await import('./config/db.js')

app.use('/api/analytics', analyticsRoutes)
app.use('/api', leadRoutes)
app.use('/api', siteSettingsRoutes)

const PORT = process.env.PORT || 5000

const startServer = async () => {
  try {
    await connectDB()

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error('Server startup error:', error.message)
    process.exit(1)
  }
}

startServer()