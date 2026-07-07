import express from 'express'
import Lead from '../models/Lead.js'

const router = express.Router()

router.post('/recruiter/schedule', async (req, res) => {
  try {
    const { recruiterName, company, email, role, message } = req.body

    if (!recruiterName || !company || !email || !role || !message) {
      return res.status(400).json({
        success: false,
        message: 'All recruiter fields are required.',
      })
    }

    const lead = await Lead.create({
      type: 'recruiter',
      recruiterName,
      name: recruiterName,
      company,
      email,
      role,
      message,
      source: 'portfolio-recruiter-page',
    })

    return res.status(201).json({
      success: true,
      message: 'Recruiter request saved successfully.',
      leadId: lead._id,
    })
  } catch (error) {
    console.error('Recruiter request error:', error)

    return res.status(500).json({
      success: false,
      message: 'Server error while saving recruiter request.',
    })
  }
})

router.post('/freelance/request', async (req, res) => {
  try {
    const { name, email, whatsapp, projectType, budget, timeline, message } =
      req.body

    if (!name || !email || !projectType || !budget || !timeline || !message) {
      return res.status(400).json({
        success: false,
        message: 'All freelance fields are required.',
      })
    }

    const lead = await Lead.create({
      type: 'freelance',
      name,
      email,
      whatsapp,
      projectType,
      budget,
      timeline,
      message,
      source: 'portfolio-freelance-page',
    })

    return res.status(201).json({
      success: true,
      message: 'Freelance request saved successfully.',
      leadId: lead._id,
    })
  } catch (error) {
    console.error('Freelance request error:', error)

    return res.status(500).json({
      success: false,
      message: 'Server error while saving freelance request.',
    })
  }
})

router.post('/contact', async (req, res) => {
  try {
    const { name, email, subject, category, message } = req.body

    if (!name || !email || !subject || !category || !message) {
      return res.status(400).json({
        success: false,
        message: 'All contact fields are required.',
      })
    }

    const lead = await Lead.create({
      type: 'contact',
      name,
      email,
      subject,
      category,
      message,
      source: 'portfolio-contact-page',
    })

    return res.status(201).json({
      success: true,
      message: 'Contact message saved successfully.',
      leadId: lead._id,
    })
  } catch (error) {
    console.error('Contact request error:', error)

    return res.status(500).json({
      success: false,
      message: 'Server error while saving contact message.',
    })
  }
})

export default router