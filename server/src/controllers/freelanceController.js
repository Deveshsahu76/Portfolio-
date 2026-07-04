import FreelanceRequest from '../models/FreelanceRequest.js';
import asyncHandler from '../utils/asyncHandler.js';
import sendMail from '../utils/sendMail.js';
import { successResponse } from '../utils/responseHandler.js';

export const createFreelanceRequest = asyncHandler(async (req, res) => {
  const request = await FreelanceRequest.create(req.body);

  await sendMail({
    subject: `New Freelance Request - ${request.service}`,
    html: `
      <h2>New Freelance Project Request</h2>
      <p><strong>Client:</strong> ${request.clientName}</p>
      <p><strong>Email:</strong> ${request.clientEmail}</p>
      <p><strong>Phone:</strong> ${request.phone || 'Not provided'}</p>
      <p><strong>Service:</strong> ${request.service}</p>
      <p><strong>Budget:</strong> ${request.budget || 'Not mentioned'}</p>
      <p><strong>Timeline:</strong> ${request.timeline || 'Not mentioned'}</p>
      <hr/>
      <p><strong>Project Details:</strong></p>
      <p>${request.projectDetails}</p>
    `,
  });

  successResponse(res, 201, 'Freelance request submitted successfully.', request);
});

export const getFreelanceRequests = asyncHandler(async (req, res) => {
  const requests = await FreelanceRequest.find().sort({ createdAt: -1 });

  successResponse(res, 200, 'Freelance requests fetched successfully.', {
    count: requests.length,
    requests,
  });
});

export const getFreelanceRequestById = asyncHandler(async (req, res) => {
  const request = await FreelanceRequest.findById(req.params.id);

  if (!request) {
    res.status(404);
    throw new Error('Freelance request not found.');
  }

  successResponse(res, 200, 'Freelance request fetched successfully.', request);
});

export const updateFreelanceRequestStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const request = await FreelanceRequest.findById(req.params.id);

  if (!request) {
    res.status(404);
    throw new Error('Freelance request not found.');
  }

  request.status = status || request.status;
  await request.save();

  successResponse(res, 200, 'Freelance request status updated successfully.', request);
});