import crypto from 'crypto'

const ADMIN_ROLE = 'portfolio-admin'
const TOKEN_TTL_MS = 8 * 60 * 60 * 1000

const getSessionSecret = () => {
  return String(process.env.ADMIN_SESSION_SECRET || '').trim()
}

const encodePayload = (payload) => {
  return Buffer.from(JSON.stringify(payload)).toString('base64url')
}

const signPayload = (encodedPayload, secret) => {
  return crypto
    .createHmac('sha256', secret)
    .update(encodedPayload)
    .digest('base64url')
}

export const safeCompare = (firstValue, secondValue) => {
  const firstBuffer = Buffer.from(String(firstValue || ''))
  const secondBuffer = Buffer.from(String(secondValue || ''))

  if (firstBuffer.length !== secondBuffer.length) {
    return false
  }

  return crypto.timingSafeEqual(firstBuffer, secondBuffer)
}

export const createAdminToken = () => {
  const secret = getSessionSecret()

  if (!secret) {
    throw new Error('ADMIN_SESSION_SECRET is not configured.')
  }

  const issuedAt = Date.now()
  const expiresAt = issuedAt + TOKEN_TTL_MS

  const payload = {
    role: ADMIN_ROLE,
    issuedAt,
    expiresAt,
  }

  const encodedPayload = encodePayload(payload)
  const signature = signPayload(encodedPayload, secret)

  return {
    token: `${encodedPayload}.${signature}`,
    expiresAt,
    expiresInSeconds: Math.floor(TOKEN_TTL_MS / 1000),
  }
}

export const verifyAdminToken = (token) => {
  try {
    const secret = getSessionSecret()

    if (!secret || !token) {
      return {
        valid: false,
        reason: 'Missing admin session.',
      }
    }

    const [encodedPayload, receivedSignature] = String(token).split('.')

    if (!encodedPayload || !receivedSignature) {
      return {
        valid: false,
        reason: 'Invalid admin session format.',
      }
    }

    const expectedSignature = signPayload(encodedPayload, secret)

    if (!safeCompare(receivedSignature, expectedSignature)) {
      return {
        valid: false,
        reason: 'Invalid admin session signature.',
      }
    }

    const payloadText = Buffer.from(
      encodedPayload,
      'base64url'
    ).toString('utf8')

    const payload = JSON.parse(payloadText)

    if (payload.role !== ADMIN_ROLE) {
      return {
        valid: false,
        reason: 'Invalid admin role.',
      }
    }

    if (!payload.expiresAt || Date.now() >= payload.expiresAt) {
      return {
        valid: false,
        reason: 'Admin session expired.',
      }
    }

    return {
      valid: true,
      payload,
    }
  } catch {
    return {
      valid: false,
      reason: 'Invalid admin session.',
    }
  }
}

export const getBearerToken = (req) => {
  const authorization = req.get('authorization') || ''

  if (!authorization.startsWith('Bearer ')) {
    return ''
  }

  return authorization.slice('Bearer '.length).trim()
}

export const requireAdminSession = (req, res, next) => {
  const token = getBearerToken(req)
  const verification = verifyAdminToken(token)

  if (!verification.valid) {
    return res.status(401).json({
      success: false,
      message: verification.reason || 'Unauthorized admin request.',
    })
  }

  req.adminSession = verification.payload

  return next()
}