import mongoose from 'mongoose'

const resumeDownloadSchema = new mongoose.Schema(
  {
    page: {
      type: String,
      trim: true,
      maxlength: 120,
      default: '/',
    },

    source: {
      type: String,
      trim: true,
      maxlength: 80,
      default: 'portfolio',
    },

    referrer: {
      type: String,
      trim: true,
      maxlength: 300,
      default: '',
    },

    createdAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    versionKey: false,
  }
)

resumeDownloadSchema.index({
  page: 1,
  createdAt: -1,
})

const ResumeDownload =
  mongoose.models.ResumeDownload ||
  mongoose.model(
    'ResumeDownload',
    resumeDownloadSchema
  )

export default ResumeDownload