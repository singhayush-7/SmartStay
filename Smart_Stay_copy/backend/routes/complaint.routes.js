import express from "express";

import {
  createComplaint,
  getMyComplaints,
  getPropertyComplaints,
  updateComplaintStatus,
  addResolution,
  deleteComplaint,
} from "../controllers/complaint.controller.js";

import {
  protect,
  authorize,
} from "../middleware/auth.middleware.js";

const router = express.Router();






router.post(
  "/",
  protect,
  authorize("tenant"),
  createComplaint
);


router.get(
  "/my-complaints",
  protect,
  authorize("tenant"),
  getMyComplaints
);






router.get(
  "/property/:propertyId",
  protect,
  authorize("owner", "admin"),
  getPropertyComplaints
);


router.put(
  "/:id/status",
  protect,
  authorize("owner", "admin"),
  updateComplaintStatus
);


router.put(
  "/:id/resolve",
  protect,
  authorize("owner", "admin"),
  addResolution
);






router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteComplaint
);

export default router;