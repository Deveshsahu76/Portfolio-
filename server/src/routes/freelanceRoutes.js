import express from 'express';
import {
  createFreelanceRequest,
  getFreelanceRequestById,
  getFreelanceRequests,
  updateFreelanceRequestStatus,
} from '../controllers/freelanceController.js';
import { protectAdmin, validateFields } from '../middlewares/validateRequest.js';

const router = express.Router();

router.post(
  '/request',
  validateFields(['clientName', 'clientEmail', 'service', 'projectDetails']),
  createFreelanceRequest
);

router.get('/requests', protectAdmin, getFreelanceRequests);
router.get('/requests/:id', protectAdmin, getFreelanceRequestById);
router.patch('/requests/:id/status', protectAdmin, updateFreelanceRequestStatus);

export default router;