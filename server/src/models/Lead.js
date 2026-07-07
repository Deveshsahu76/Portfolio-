import mongoose from 'mongoose'

const leadSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['recruiter', 'freelance', 'contact'],
      required: true,
      index: true,
    },

    status: {
      type: String,
      enum: ['new', 'reviewed', 'archived'],
      default: 'new',
      index: true,
    },

    name: {
      type: String,
      trim: true,
    },

    recruiterName: {
      type: String,
      trim: true,
    },

    companyName: {
      type: String,
      trim: true,
    },

    company: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    whatsapp: {
      type: String,
      trim: true,
    },

    role: {
      type: String,
      trim: true,
    },

    subject: {
      type: String,
      trim: true,
    },

    category: {
      type: String,
      trim: true,
    },

    projectType: {
      type: String,
      trim: true,
    },

    budget: {
      type: String,
      trim: true,
    },

    timeline: {
      type: String,
      trim: true,
    },

    message: {
      type: String,
      trim: true,
      required: true,
    },

    source: {
      type: String,
      default: 'portfolio',
    },

    userAgent: {
      type: String,
      trim: true,
    },

    ipAddress: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
)

const Lead = mongoose.models.Lead || mongoose.model('Lead', leadSchema)

export default Lead