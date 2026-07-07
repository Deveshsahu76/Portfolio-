import express from 'express'
import Lead from '../models/Lead.js'

const router = express.Router()

const clean = (value) => {
  if (typeof value !== 'string') return ''
  return value.trim()
}

const getFirstValue = (body, keys) => {
  for (const key of keys) {
    const value = clean(body[key])

    if (value) {
      return value
    }
  }

  return ''
}

const getRequestMeta = (req) => {
  return {
    userAgent: req.get('user-agent') || '',
    ipAddress:
      req.headers['x-forwarded-for']?.toString().split(',')[0] ||
      req.socket?.remoteAddress ||
      '',
  }
}

const sendMissingFields = (res, fields) => {
  return res.status(400).json({
    success: false,
    message: `Missing required fields: ${fields.join(', ')}`,
  })
}

const getAdminKeyFromRequest = (req) => {
  const headerKey = req.get('x-admin-key')
  const queryKey = req.query.adminKey
  const authHeader = req.get('authorization') || ''

  if (headerKey) return headerKey
  if (queryKey) return queryKey

  if (authHeader.startsWith('Bearer ')) {
    return authHeader.replace('Bearer ', '').trim()
  }

  return ''
}

const requireAdmin = (req, res, next) => {
  const configuredKey = process.env.ADMIN_KEY
  const providedKey = getAdminKeyFromRequest(req)

  if (!configuredKey) {
    return res.status(500).json({
      success: false,
      message: 'ADMIN_KEY is not configured on backend.',
    })
  }

  if (providedKey !== configuredKey) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized admin request.',
    })
  }

  next()
}

router.get('/leads/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Lead routes are working.',
  })
})

router.get('/leads', requireAdmin, async (req, res) => {
  try {
    const { type = 'all', status = 'all' } = req.query

    const filter = {}

    if (type !== 'all') {
      filter.type = type
    }

    if (status !== 'all') {
      filter.status = status
    }

    const leads = await Lead.find(filter).sort({ createdAt: -1 }).limit(200)

    const counts = await Lead.aggregate([
      {
        $group: {
          _id: {
            type: '$type',
            status: '$status',
          },
          count: { $sum: 1 },
        },
      },
    ])

    return res.status(200).json({
      success: true,
      leads,
      counts,
    })
  } catch (error) {
    console.error('Fetch leads error:', error)

    return res.status(500).json({
      success: false,
      message: 'Server error while fetching leads.',
    })
  }
})

router.patch('/leads/:id/status', requireAdmin, async (req, res) => {
  try {
    const status = clean(req.body.status)

    if (!['new', 'reviewed', 'archived'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status.',
      })
    }

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found.',
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Lead status updated.',
      lead,
    })
  } catch (error) {
    console.error('Update lead status error:', error)

    return res.status(500).json({
      success: false,
      message: 'Server error while updating lead status.',
    })
  }
})

router.delete('/leads/:id', requireAdmin, async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id)

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found.',
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Lead deleted successfully.',
    })
  } catch (error) {
    console.error('Delete lead error:', error)

    return res.status(500).json({
      success: false,
      message: 'Server error while deleting lead.',
    })
  }
})

router.post('/recruiter/schedule', async (req, res) => {
  try {
    const recruiterName = getFirstValue(req.body, ['recruiterName', 'name'])
    const companyName = getFirstValue(req.body, ['companyName', 'company'])
    const email = getFirstValue(req.body, ['email'])
    const role = getFirstValue(req.body, ['role', 'position'])
    const message = getFirstValue(req.body, ['message'])

    const missing = []

    if (!recruiterName) missing.push('recruiterName')
    if (!companyName) missing.push('companyName')
    if (!email) missing.push('email')
    if (!role) missing.push('role')
    if (!message) missing.push('message')

    if (missing.length > 0) {
      return sendMissingFields(res, missing)
    }

    const lead = await Lead.create({
      type: 'recruiter',
      status: 'new',
      name: recruiterName,
      recruiterName,
      companyName,
      company: companyName,
      email,
      role,
      message,
      source: 'portfolio-recruiter-page',
      ...getRequestMeta(req),
    })

    return res.status(201).json({
      success: true,
      message: 'Recruiter request saved successfully.',
      leadId: lead._id,
    })
  } catch (error) {
    console.error('Recruiter lead error:', error)

    return res.status(500).json({
      success: false,
      message: 'Server error while saving recruiter request.',
    })
  }
})

router.post('/freelance/request', async (req, res) => {
  try {
    const name = getFirstValue(req.body, ['name', 'clientName'])
    const email = getFirstValue(req.body, ['email'])
    const whatsapp = getFirstValue(req.body, ['whatsapp', 'phone'])
    const projectType = getFirstValue(req.body, ['projectType', 'service'])
    const budget = getFirstValue(req.body, ['budget'])
    const timeline = getFirstValue(req.body, ['timeline', 'deadline'])
    const message = getFirstValue(req.body, ['message', 'requirements'])

    const missing = []

    if (!name) missing.push('name')
    if (!email) missing.push('email')
    if (!projectType) missing.push('projectType')
    if (!budget) missing.push('budget')
    if (!timeline) missing.push('timeline')
    if (!message) missing.push('message')

    if (missing.length > 0) {
      return sendMissingFields(res, missing)
    }

    const lead = await Lead.create({
      type: 'freelance',
      status: 'new',
      name,
      email,
      whatsapp,
      phone: whatsapp,
      projectType,
      budget,
      timeline,
      message,
      source: 'portfolio-freelance-page',
      ...getRequestMeta(req),
    })

    return res.status(201).json({
      success: true,
      message: 'Freelance request saved successfully.',
      leadId: lead._id,
    })
  } catch (error) {
    console.error('Freelance lead error:', error)

    return res.status(500).json({
      success: false,
      message: 'Server error while saving freelance request.',
    })
  }
})

router.post('/contact', async (req, res) => {
  try {
    const name = getFirstValue(req.body, ['name'])
    const email = getFirstValue(req.body, ['email'])
    const subject = getFirstValue(req.body, ['subject']) || 'Portfolio Contact'
    const category = getFirstValue(req.body, ['category']) || 'General'
    const message = getFirstValue(req.body, ['message'])

    const missing = []

    if (!name) missing.push('name')
    if (!email) missing.push('email')
    if (!message) missing.push('message')

    if (missing.length > 0) {
      return sendMissingFields(res, missing)
    }

    const lead = await Lead.create({
      type: 'contact',
      status: 'new',
      name,
      email,
      subject,
      category,
      message,
      source: 'portfolio-contact-page',
      ...getRequestMeta(req),
    })

    return res.status(201).json({
      success: true,
      message: 'Contact message saved successfully.',
      leadId: lead._id,
    })
  } catch (error) {
    console.error('Contact lead error:', error)

    return res.status(500).json({
      success: false,
      message: 'Server error while saving contact message.',
    })
  }
})

export default router