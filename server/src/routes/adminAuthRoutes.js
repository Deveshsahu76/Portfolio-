import express from 'express'
import {
  createAdminToken,
  requireAdminSession,
  safeCompare,
} from '../middleware/adminAuth.js'

const router = express.Router()

const clean = (value) => {
  if (typeof value !== 'string') return ''
  return value.trim()
}

router.post('/admin/login', (req, res) => {
  try {
    const configuredAdminKey = clean(process.env.ADMIN_KEY)
    const configuredSessionSecret = clean(
      process.env.ADMIN_SESSION_SECRET
    )

    if (!configuredAdminKey) {
      return res.status(500).json({
        success: false,
        message: 'ADMIN_KEY is not configured on backend.',
      })
    }

    if (!configuredSessionSecret) {
      return res.status(500).json({
        success: false,
        message: 'ADMIN_SESSION_SECRET is not configured on backend.',
      })
    }

    const providedAdminKey = clean(req.body?.adminKey)

    if (
      !providedAdminKey ||
      !safeCompare(providedAdminKey, configuredAdminKey)
    ) {
      return res.status(401).json({
        success: false,
        message: 'Invalid admin credentials.',
      })
    }

    const session = createAdminToken()

    return res.status(200).json({
      success: true,
      message: 'Admin login successful.',
      token: session.token,
      expiresAt: new Date(session.expiresAt).toISOString(),
      expiresInSeconds: session.expiresInSeconds,
    })
  } catch (error) {
    console.error('Admin login error:', error)

    return res.status(500).json({
      success: false,
      message: 'Unable to create admin session.',
    })
  }
})

router.get('/admin/session', requireAdminSession, (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Admin session is valid.',
    session: {
      role: req.adminSession.role,
      issuedAt: new Date(
        req.adminSession.issuedAt
      ).toISOString(),
      expiresAt: new Date(
        req.adminSession.expiresAt
      ).toISOString(),
    },
  })
})

export default router