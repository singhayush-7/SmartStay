import express from "express";

import {
  createBooking,
  getMyBookings,
  getPropertyBookings,
  approveBooking,
  rejectBooking,
  cancelBooking,
  deleteBooking,
} from "../controllers/booking.controller.js";

import {
  protect,
  authorize,
} from "../middleware/auth.middleware.js";

const router = express.Router();






router.post(
  "/",
  protect,
  authorize("tenant"),
  createBooking
);


router.get(
  "/my-bookings",
  protect,
  authorize("tenant"),
  getMyBookings
);


router.put(
  "/:id/cancel",
  protect,
  authorize("tenant", "owner", "admin"),
  cancelBooking
);


router.delete(
  "/:id",
  protect,
  authorize("tenant", "admin"),
  deleteBooking
);






router.get(
  "/property/:propertyId",
  protect,
  authorize("owner", "admin"),
  getPropertyBookings
);


router.put(
  "/:id/approve",
  protect,
  authorize("owner", "admin"),
  approveBooking
);


router.put(
  "/:id/reject",
  protect,
  authorize("owner", "admin"),
  rejectBooking
);

export default router;