import mongoose from 'mongoose'

const leadSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['recruiter', 'freelance', 'contact'],
      required: true,
    },

    name: {
      type: String,
      trim: true,
    },

    recruiterName: {
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
  },
  {
    timestamps: true,
  }
)

const Lead = mongoose.model('Lead', leadSchema)

export default Lead