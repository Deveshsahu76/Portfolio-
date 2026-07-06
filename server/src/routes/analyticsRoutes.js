import express from 'express'
import AnalyticsEvent from '../models/AnalyticsEvent.js'

const router = express.Router()

const rateStore = new Map()

function sanitizeText(value, fallback = '') {
  if (typeof value !== 'string') return fallback
  return value.trim().slice(0, 300)
}

function sanitizeMetadata(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}

  const clean = {}

  Object.entries(value)
    .slice(0, 20)
    .forEach(([key, item]) => {
      const safeKey = String(key).slice(0, 50)

      if (
        typeof item === 'string' ||
        typeof item === 'number' ||
        typeof item === 'boolean'
      ) {
        clean[safeKey] =
          typeof item === 'string' ? item.trim().slice(0, 300) : item
      }
    })

  return clean
}

function simpleRateLimit(req, res, next) {
  const key = req.ip || 'unknown'
  const now = Date.now()
  const windowMs = 60 * 1000
  const maxRequests = 120

  const current = rateStore.get(key) || {
    count: 0,
    start: now,
  }

  if (now - current.start > windowMs) {
    rateStore.set(key, {
      count: 1,
      start: now,
    })

    return next()
  }

  if (current.count >= maxRequests) {
    return res.status(429).json({
      success: false,
      message: 'Too many analytics requests.',
    })
  }

  current.count += 1
  rateStore.set(key, current)

  return next()
}

function requireAdmin(req, res, next) {
  const adminKey =
    req.headers['x-admin-key'] || req.query.adminKey || req.body.adminKey

  if (!process.env.ADMIN_KEY || adminKey !== process.env.ADMIN_KEY) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized analytics access.',
    })
  }

  return next()
}

router.post('/track', simpleRateLimit, async (req, res) => {
  try {
    const {
      sessionId,
      eventType,
      path,
      title,
      referrer,
      source,
      device,
      browser,
      metadata,
    } = req.body || {}

    if (!sessionId || !eventType) {
      return res.status(400).json({
        success: false,
        message: 'sessionId and eventType are required.',
      })
    }

    await AnalyticsEvent.create({
      sessionId: sanitizeText(sessionId),
      eventType: sanitizeText(eventType),
      path: sanitizeText(path, '/'),
      title: sanitizeText(title),
      referrer: sanitizeText(referrer),
      source: sanitizeText(source, 'portfolio'),
      device: sanitizeText(device, 'unknown'),
      browser: sanitizeText(browser, 'unknown'),
      metadata: sanitizeMetadata(metadata),
    })

    return res.status(201).json({
      success: true,
      message: 'Analytics event tracked.',
    })
  } catch (error) {
    console.error('Analytics track error:', error.message)

    return res.status(500).json({
      success: false,
      message: 'Unable to track analytics event.',
    })
  }
})

router.get('/public-stats', async (req, res) => {
  try {
    const [
      uniqueVisitors,
      pageViews,
      resumeDownloads,
      recruiterClicks,
      freelanceClicks,
      whatsappClicks,
    ] = await Promise.all([
      AnalyticsEvent.distinct('sessionId'),
      AnalyticsEvent.countDocuments({ eventType: 'page_view' }),
      AnalyticsEvent.countDocuments({ eventType: 'resume_download' }),
      AnalyticsEvent.countDocuments({ eventType: 'recruiter_cta_click' }),
      AnalyticsEvent.countDocuments({ eventType: 'freelance_cta_click' }),
      AnalyticsEvent.countDocuments({ eventType: 'whatsapp_click' }),
    ])

    return res.json({
      success: true,
      stats: {
        uniqueVisitors: uniqueVisitors.length,
        pageViews,
        resumeDownloads,
        recruiterClicks,
        freelanceClicks,
        whatsappClicks,
        updatedAt: new Date(),
      },
    })
  } catch (error) {
    console.error('Public stats error:', error.message)

    return res.status(500).json({
      success: false,
      message: 'Unable to fetch public stats.',
    })
  }
})

router.get('/dashboard', requireAdmin, async (req, res) => {
  try {
    const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

    const [
      uniqueVisitors,
      totalEvents,
      pageViews,
      resumeDownloads,
      recruiterClicks,
      freelanceClicks,
      whatsappClicks,
      emailClicks,
      topPages,
      topEvents,
      dailyViews,
      recentEvents,
    ] = await Promise.all([
      AnalyticsEvent.distinct('sessionId', { createdAt: { $gte: since } }),

      AnalyticsEvent.countDocuments({ createdAt: { $gte: since } }),

      AnalyticsEvent.countDocuments({
        eventType: 'page_view',
        createdAt: { $gte: since },
      }),

      AnalyticsEvent.countDocuments({
        eventType: 'resume_download',
        createdAt: { $gte: since },
      }),

      AnalyticsEvent.countDocuments({
        eventType: 'recruiter_cta_click',
        createdAt: { $gte: since },
      }),

      AnalyticsEvent.countDocuments({
        eventType: 'freelance_cta_click',
        createdAt: { $gte: since },
      }),

      AnalyticsEvent.countDocuments({
        eventType: 'whatsapp_click',
        createdAt: { $gte: since },
      }),

      AnalyticsEvent.countDocuments({
        eventType: 'contact_email_click',
        createdAt: { $gte: since },
      }),

      AnalyticsEvent.aggregate([
        {
          $match: {
            eventType: 'page_view',
            createdAt: { $gte: since },
          },
        },
        {
          $group: {
            _id: '$path',
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
        { $limit: 10 },
      ]),

      AnalyticsEvent.aggregate([
        {
          $match: {
            createdAt: { $gte: since },
          },
        },
        {
          $group: {
            _id: '$eventType',
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
        { $limit: 12 },
      ]),

      AnalyticsEvent.aggregate([
        {
          $match: {
            eventType: 'page_view',
            createdAt: { $gte: since },
          },
        },
        {
          $group: {
            _id: {
              $dateToString: {
                format: '%Y-%m-%d',
                date: '$createdAt',
              },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]),

      AnalyticsEvent.find({ createdAt: { $gte: since } })
        .sort({ createdAt: -1 })
        .limit(25)
        .lean(),
    ])

    return res.json({
      success: true,
      range: 'last_30_days',
      totals: {
        uniqueVisitors: uniqueVisitors.length,
        totalEvents,
        pageViews,
        resumeDownloads,
        recruiterClicks,
        freelanceClicks,
        whatsappClicks,
        emailClicks,
      },
      topPages,
      topEvents,
      dailyViews,
      recentEvents,
    })
  } catch (error) {
    console.error('Analytics dashboard error:', error.message)

    return res.status(500).json({
      success: false,
      message: 'Unable to fetch analytics dashboard.',
    })
  }
})

export default router