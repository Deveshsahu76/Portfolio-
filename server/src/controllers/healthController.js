import asyncHandler from '../utils/asyncHandler.js';
import { successResponse } from '../utils/responseHandler.js';

export const healthCheck = asyncHandler(async (req, res) => {
  successResponse(res, 200, 'Portfolio backend API is running.', {
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
  });
});