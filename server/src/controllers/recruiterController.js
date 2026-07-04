import RecruiterRequest from '../models/RecruiterRequest.js';
import asyncHandler from '../utils/asyncHandler.js';
import sendMail from '../utils/sendMail.js';
import { successResponse } from '../utils/responseHandler.js';

const getRequestLabel = (type) => {
  if (type === 'shortlist') return 'Shortlist Request';
  if (type === 'assignment') return 'Assignment Request';
  return 'Interview Schedule Request';
};

export const createRecruiterRequest = asyncHandler(async (req, res) => {
  const request = await RecruiterRequest.create(req.body);

  const label = getRequestLabel(request.requestType);

  await sendMail({
    subject: `${label} from ${request.companyName}`,
    html: `
      <h2>${label}</h2>
      <p><strong>Recruiter:</strong> ${request.recruiterName}</p>
      <p><strong>Company:</strong> ${request.companyName}</p>
      <p><strong>Email:</strong> ${request.email}</p>
      <p><strong>Phone:</strong> ${request.phone || 'Not provided'}</p>
      <p><strong>Role:</strong> ${request.role}</p>
      <hr/>
      <h3>Interview Details</h3>
      <p><strong>Date:</strong> ${request.interviewDate || 'Not provided'}</p>
      <p><strong>Time:</strong> ${request.interviewTime || 'Not provided'}</p>
      <p><strong>Mode:</strong> ${request.interviewMode || 'Not provided'}</p>
      <hr/>
      <h3>Assignment</h3>
      <p><strong>Title:</strong> ${request.assignmentTitle || 'Not provided'}</p>
      <p>${request.assignmentDetails || 'No assignment provided.'}</p>
      <hr/>
      <p><strong>Message:</strong> ${request.message || 'No message'}</p>
    `,
  });

  successResponse(res, 201, 'Recruiter request submitted successfully.', request);
});

export const getRecruiterRequests = asyncHandler(async (req, res) => {
  const requests = await RecruiterRequest.find().sort({ createdAt: -1 });

  successResponse(res, 200, 'Recruiter requests fetched successfully.', {
    count: requests.length,
    requests,
  });
});

export const getRecruiterRequestById = asyncHandler(async (req, res) => {
  const request = await RecruiterRequest.findById(req.params.id);

  if (!request) {
    res.status(404);
    throw new Error('Recruiter request not found.');
  }

  successResponse(res, 200, 'Recruiter request fetched successfully.', request);
});

export const updateRecruiterRequestStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const request = await RecruiterRequest.findById(req.params.id);

  if (!request) {
    res.status(404);
    throw new Error('Recruiter request not found.');
  }

  request.status = status || request.status;
  await request.save();

  successResponse(res, 200, 'Recruiter request status updated successfully.', request);
});