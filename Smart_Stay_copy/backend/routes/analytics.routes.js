import express from "express";

import {
  getMonthlyRevenue,
  getOccupancyAnalytics,
  getBookingTrends,
  getPaymentAnalytics,
  getComplaintAnalytics,
  getMaintenanceAnalytics,
} from "../controllers/analytics.controller.js";

import {
  protect,
  authorize,
} from "../middleware/auth.middleware.js";

const router = express.Router();




router.get(
  "/revenue",
  protect,
  authorize("owner", "admin"),
  getMonthlyRevenue
);




router.get(
  "/occupancy",
  protect,
  authorize("owner", "admin"),
  getOccupancyAnalytics
);




router.get(
  "/bookings",
  protect,
  authorize("owner", "admin"),
  getBookingTrends
);




router.get(
  "/payments",
  protect,
  authorize("owner", "admin"),
  getPaymentAnalytics
);




router.get(
  "/complaints",
  protect,
  authorize("owner", "admin"),
  getComplaintAnalytics
);




router.get(
  "/maintenance",
  protect,
  authorize("owner", "admin"),
  getMaintenanceAnalytics
);

export default router;