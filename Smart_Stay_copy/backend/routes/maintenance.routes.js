import express from "express";

import {
  createMaintenance,
  getMyMaintenance,
  getMaintenanceById,
  assignMaintenance,
  updateMaintenanceStatus,
  completeMaintenance,
  deleteMaintenance,
} from "../controllers/maintenance.controller.js";

import {
  protect,
  authorize,
} from "../middleware/auth.middleware.js";

const router = express.Router();






router.post(
  "/",
  protect,
  authorize("owner", "admin"),
  createMaintenance
);


router.get(
  "/my-maintenance",
  protect,
  authorize("owner", "admin"),
  getMyMaintenance
);


router.get(
  "/:id",
  protect,
  authorize("owner", "admin"),
  getMaintenanceById
);


router.put(
  "/:id/assign",
  protect,
  authorize("owner", "admin"),
  assignMaintenance
);


router.put(
  "/:id/status",
  protect,
  authorize("owner", "admin"),
  updateMaintenanceStatus
);


router.put(
  "/:id/complete",
  protect,
  authorize("owner", "admin"),
  completeMaintenance
);






router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteMaintenance
);

export default router;