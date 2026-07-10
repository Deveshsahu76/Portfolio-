import express from 'express'
import SiteSetting from '../models/SiteSetting.js'
import ResumeFile from '../models/ResumeFile.js'

const router = express.Router()

const DEFAULT_RESUME_URL = '/resume.pdf'
const MAX_RESUME_SIZE = 5 * 1024 * 1024

const clean = (value) => {
  if (typeof value !== 'string') return ''
  return value.trim()
}

const getBackendBaseUrl = (req) => {
  const configuredUrl = clean(process.env.PUBLIC_BACKEND_URL)

  if (configuredUrl) {
    return configuredUrl.replace(/\/$/, '')
  }

  return `${req.protocol}://${req.get('host')}`
}

const getLatestResumeFileUrl = (req) => {
  return `${getBackendBaseUrl(req)}/api/site-settings/resume/file/latest`
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

router.get('/site-settings/resume/file/latest', async (req, res) => {
  try {
    const resumeFile = await ResumeFile.findOne().sort({ createdAt: -1 })

    if (!resumeFile) {
      return res.status(404).json({
        success: false,
        message: 'No uploaded resume file found.',
      })
    }

    const fileName = resumeFile.originalName || 'resume.pdf'

    res.setHeader('Content-Type', resumeFile.contentType || 'application/pdf')
    res.setHeader(
      'Content-Disposition',
      `inline; filename="${fileName.replace(/"/g, '')}"`
    )
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private')

    return res.status(200).send(resumeFile.data)
  } catch (error) {
    console.error('Resume file fetch error:', error)

    return res.status(500).json({
      success: false,
      message: 'Server error while fetching uploaded resume.',
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
        description:
          'Latest resume link used across portfolio resume buttons.',
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

router.put(
  '/site-settings/resume/upload',
  requireAdmin,
  express.raw({
    type: ['application/pdf', 'application/octet-stream'],
    limit: '5mb',
  }),
  async (req, res) => {
    try {
      const fileBuffer = req.body

      if (!Buffer.isBuffer(fileBuffer) || fileBuffer.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Resume PDF file is required.',
        })
      }

      if (fileBuffer.length > MAX_RESUME_SIZE) {
        return res.status(400).json({
          success: false,
          message: 'Resume PDF must be less than 5MB.',
        })
      }

      const contentType = req.get('content-type') || 'application/pdf'

      if (
        !contentType.includes('application/pdf') &&
        !contentType.includes('application/octet-stream')
      ) {
        return res.status(400).json({
          success: false,
          message: 'Only PDF files are allowed.',
        })
      }

      const rawFileName = decodeURIComponent(
        req.get('x-file-name') || 'resume.pdf'
      )

      const safeFileName = rawFileName.toLowerCase().endsWith('.pdf')
        ? rawFileName
        : 'resume.pdf'

      await ResumeFile.create({
        originalName: safeFileName,
        contentType: 'application/pdf',
        size: fileBuffer.length,
        data: fileBuffer,
        uploadedBy: 'admin',
      })

      const latestResumeUrl = getLatestResumeFileUrl(req)

      const setting = await SiteSetting.findOneAndUpdate(
        { key: 'resumeUrl' },
        {
          key: 'resumeUrl',
          value: latestResumeUrl,
          label: 'Resume URL',
          description:
            'Latest uploaded resume PDF used across portfolio resume buttons.',
        },
        {
          new: true,
          upsert: true,
        }
      )

      return res.status(200).json({
        success: true,
        message: 'Resume PDF uploaded successfully.',
        resumeUrl: setting.value,
        fileName: safeFileName,
        size: fileBuffer.length,
      })
    } catch (error) {
      console.error('Resume upload error:', error)

      return res.status(500).json({
        success: false,
        message: 'Server error while uploading resume PDF.',
      })
    }
  }
)

export default router