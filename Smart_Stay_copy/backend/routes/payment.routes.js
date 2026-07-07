import express from "express";

import {
  createPayment,
  getMyPayments,
  getOwnerPayments,
  getPaymentById,
  markPaymentAsPaid,
  deletePayment,
} from "../controllers/payment.controller.js";

import {
  protect,
  authorize,
} from "../middleware/auth.middleware.js";

const router = express.Router();






router.post(
  "/",
  protect,
  authorize("tenant"),
  createPayment
);


router.get(
  "/my-payments",
  protect,
  authorize("tenant"),
  getMyPayments
);


router.put(
  "/:id/pay",
  protect,
  authorize("tenant"),
  markPaymentAsPaid
);






router.get(
  "/owner",
  protect,
  authorize("owner", "admin"),
  getOwnerPayments
);






router.get(
  "/:id",
  protect,
  authorize("tenant", "owner", "admin"),
  getPaymentById
);






router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deletePayment
);

export default router;