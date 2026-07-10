import express from 'express'
import SiteSetting from '../models/SiteSetting.js'

const router = express.Router()

const DEFAULT_RESUME_URL = '/resume.pdf'

const clean = (value) => {
  if (typeof value !== 'string') return ''
  return value.trim()
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

router.get('/site-settings/public', async (req, res) => {
  try {
    const resumeSetting = await SiteSetting.findOne({ key: 'resumeUrl' })

    return res.status(200).json({
      success: true,
      settings: {
        resumeUrl: resumeSetting?.value || DEFAULT_RESUME_URL,
      },
    })
  } catch (error) {
    console.error('Public settings error:', error)

    return res.status(500).json({
      success: false,
      message: 'Server error while fetching public settings.',
    })
  }
})

router.get('/site-settings/resume', async (req, res) => {
  try {
    const resumeSetting = await SiteSetting.findOne({ key: 'resumeUrl' })

    return res.status(200).json({
      success: true,
      resumeUrl: resumeSetting?.value || DEFAULT_RESUME_URL,
    })
  } catch (error) {
    console.error('Resume setting error:', error)

    return res.status(500).json({
      success: false,
      message: 'Server error while fetching resume URL.',
    })
  }
})

router.put('/site-settings/resume', requireAdmin, async (req, res) => {
  try {
    const resumeUrl = clean(req.body.resumeUrl)

    if (!resumeUrl) {
      return res.status(400).json({
        success: false,
        message: 'Resume URL is required.',
      })
    }

    const setting = await SiteSetting.findOneAndUpdate(
      { key: 'resumeUrl' },
      {
        key: 'resumeUrl',
        value: resumeUrl,
        label: 'Resume URL',
        description: 'Latest resume link used across portfolio download buttons.',
      },
      {
        new: true,
        upsert: true,
      }
    )

    return res.status(200).json({
      success: true,
      message: 'Resume URL updated successfully.',
      resumeUrl: setting.value,
    })
  } catch (error) {
    console.error('Update resume URL error:', error)

    return res.status(500).json({
      success: false,
      message: 'Server error while updating resume URL.',
    })
  }
})

export default router