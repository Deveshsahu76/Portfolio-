import mongoose from 'mongoose'

const siteSettingSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },

    value: {
      type: String,
      required: true,
      trim: true,
    },

    label: {
      type: String,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
)

const SiteSetting =
  mongoose.models.SiteSetting || mongoose.model('SiteSetting', siteSettingSchema)

export default SiteSetting