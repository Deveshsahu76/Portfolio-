import mongoose from 'mongoose'

const resumeFileSchema = new mongoose.Schema(
  {
    originalName: {
      type: String,
      trim: true,
      default: 'resume.pdf',
    },

    contentType: {
      type: String,
      default: 'application/pdf',
    },

    size: {
      type: Number,
      required: true,
    },

    data: {
      type: Buffer,
      required: true,
    },

    uploadedBy: {
      type: String,
      default: 'admin',
    },
  },
  {
    timestamps: true,
  }
)

const ResumeFile =
  mongoose.models.ResumeFile || mongoose.model('ResumeFile', resumeFileSchema)

export default ResumeFile