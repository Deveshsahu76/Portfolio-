import mongoose from 'mongoose';

const freelanceRequestSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: true,
      trim: true,
    },
    clientEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      default: '',
      trim: true,
    },
    service: {
      type: String,
      required: true,
      trim: true,
    },
    budget: {
      type: String,
      default: '',
      trim: true,
    },
    timeline: {
      type: String,
      default: '',
      trim: true,
    },
    projectDetails: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'in-progress', 'completed', 'rejected'],
      default: 'new',
    },
  },
  { timestamps: true }
);

const FreelanceRequest = mongoose.model('FreelanceRequest', freelanceRequestSchema);

export default FreelanceRequest;