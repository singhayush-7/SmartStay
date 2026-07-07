import express from "express";

import {
  ownerDashboard,
  tenantDashboard,
  adminDashboard,
} from "../controllers/dashboard.controller.js";

import {
  protect,
  authorize,
} from "../middleware/auth.middleware.js";

const router = express.Router();




router.get(
  "/owner",
  protect,
  authorize("owner", "admin"),
  ownerDashboard
);




router.get(
  "/tenant",
  protect,
  authorize("tenant"),
  tenantDashboard
);




router.get(
  "/admin",
  protect,
  authorize("admin"),
  adminDashboard
);

export default router;