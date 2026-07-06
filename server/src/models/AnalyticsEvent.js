import mongoose from 'mongoose'

const analyticsEventSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
    eventType: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
    path: {
      type: String,
      default: '/',
      trim: true,
    },
    title: {
      type: String,
      default: '',
      trim: true,
    },
    referrer: {
      type: String,
      default: '',
      trim: true,
    },
    source: {
      type: String,
      default: 'portfolio',
      trim: true,
    },
    device: {
      type: String,
      default: 'unknown',
      trim: true,
    },
    browser: {
      type: String,
      default: 'unknown',
      trim: true,
    },
    metadata: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
)

analyticsEventSchema.index({ createdAt: -1 })
analyticsEventSchema.index({ eventType: 1, createdAt: -1 })
analyticsEventSchema.index({ path: 1, createdAt: -1 })

const AnalyticsEvent =
  mongoose.models.AnalyticsEvent ||
  mongoose.model('AnalyticsEvent', analyticsEventSchema)

export default AnalyticsEvent