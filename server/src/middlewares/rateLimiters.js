import { rateLimit } from 'express-rate-limit'

const createLimitHandler = (message) => {
  return (req, res) => {
    return res.status(429).json({
      success: false,
      message,
    })
  }
}

const commonOptions = {
  standardHeaders: 'draft-7',
  legacyHeaders: false,

  skip(req) {
    return req.method === 'OPTIONS'
  },
}

export const apiLimiter = rateLimit({
  ...commonOptions,

  windowMs: 15 * 60 * 1000,
  limit: 300,

  handler: createLimitHandler(
    'Too many API requests. Please try again after a few minutes.'
  ),
})

export const formLimiter = rateLimit({
  ...commonOptions,

  windowMs: 60 * 60 * 1000,
  limit: 20,

  handler: createLimitHandler(
    'Too many form submissions. Please try again later.'
  ),
})

export const adminLimiter = rateLimit({
  ...commonOptions,

  windowMs: 15 * 60 * 1000,
  limit: 120,

  handler: createLimitHandler(
    'Too many admin requests. Please wait and try again.'
  ),
})

export const adminLoginLimiter = rateLimit({
  ...commonOptions,

  windowMs: 15 * 60 * 1000,
  limit: 10,

  handler: createLimitHandler(
    'Too many admin login attempts. Please wait 15 minutes and try again.'
  ),
})