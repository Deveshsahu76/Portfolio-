import mongoose from 'mongoose';

const recruiterRequestSchema = new mongoose.Schema(
  {
    requestType: {
      type: String,
      enum: ['shortlist', 'interview', 'assignment'],
      default: 'interview',
    },
    recruiterName: {
      type: String,
      required: true,
      trim: true,
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
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
    role: {
      type: String,
      required: true,
      trim: true,
    },
    interviewDate: {
      type: String,
      default: '',
    },
    interviewTime: {
      type: String,
      default: '',
    },
    interviewMode: {
      type: String,
      default: 'Google Meet',
    },
    assignmentTitle: {
      type: String,
      default: '',
      trim: true,
    },
    assignmentDetails: {
      type: String,
      default: '',
      trim: true,
    },
    message: {
      type: String,
      default: '',
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected', 'completed'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

const RecruiterRequest = mongoose.model('RecruiterRequest', recruiterRequestSchema);

export default RecruiterRequest;