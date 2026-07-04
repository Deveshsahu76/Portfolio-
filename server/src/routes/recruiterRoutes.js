import express from 'express';
import {
  createRecruiterRequest,
  getRecruiterRequestById,
  getRecruiterRequests,
  updateRecruiterRequestStatus,
} from '../controllers/recruiterController.js';
import { protectAdmin, validateFields } from '../middlewares/validateRequest.js';

const router = express.Router();

router.post(
  '/schedule',
  validateFields(['recruiterName', 'companyName', 'email', 'role']),
  createRecruiterRequest
);

router.get('/requests', protectAdmin, getRecruiterRequests);
router.get('/requests/:id', protectAdmin, getRecruiterRequestById);
router.patch('/requests/:id/status', protectAdmin, updateRecruiterRequestStatus);

export default router;