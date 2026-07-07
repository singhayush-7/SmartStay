import Payment from "../models/payment.model.js";
import Booking from "../models/booking.model.js";

import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import generateInvoiceNumber from "../utils/generateInvoiceNumber.js";




export const createPayment = async (req, res, next) => {
  try {
    const { bookingId, paymentMethod, notes } = req.body;

    if (!bookingId) {
      return next(
        new ApiError(400, "Booking ID is required.")
      );
    }

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return next(
        new ApiError(404, "Booking not found.")
      );
    }

    
    if (booking.tenant.toString() !== req.user._id.toString()) {
      return next(
        new ApiError(
          403,
          "You are not authorized to make this payment."
        )
      );
    }

    if (booking.status !== "approved") {
      return next(
        new ApiError(
          400,
          "Only approved bookings can have payments."
        )
      );
    }

    const today = new Date();

    const rentMonth = today.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

    const existingPayment = await Payment.findOne({
      booking: booking._id,
      rentMonth,
    });

    if (existingPayment) {
      return next(
        new ApiError(
          409,
          "Payment for this month already exists."
        )
      );
    }

    const invoiceNumber = await generateInvoiceNumber();

    const payment = await Payment.create({
      booking: booking._id,
      tenant: booking.tenant,
      owner: booking.owner,
      property: booking.property,
      room: booking.room,
      amount: booking.monthlyRent,
      securityDeposit: booking.securityDeposit,
      rentMonth,
      dueDate: today,
      paymentMethod,
      invoiceNumber,
      notes,
    });

    return res.status(201).json(
      new ApiResponse(
        201,
        "Payment created successfully.",
        payment
      )
    );
  } catch (error) {
    next(error);
  }
};




export const getMyPayments = async (req, res, next) => {
  try {
    const payments = await Payment.find({
      tenant: req.user._id,
    })
      .populate("property", "name city")
      .populate("room", "roomNumber roomType")
      .sort({
        createdAt: -1,
      });

    return res.status(200).json(
      new ApiResponse(
        200,
        "Payments fetched successfully.",
        payments
      )
    );
  } catch (error) {
    next(error);
  }
};




export const getOwnerPayments = async (req, res, next) => {
  try {
    const payments = await Payment.find({
      owner: req.user._id,
    })
      .populate("tenant", "name email phone")
      .populate("property", "name")
      .populate("room", "roomNumber")
      .sort({
        createdAt: -1,
      });

    return res.status(200).json(
      new ApiResponse(
        200,
        "Owner payments fetched successfully.",
        payments
      )
    );
  } catch (error) {
    next(error);
  }
};




export const getPaymentById = async (req, res, next) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate("tenant", "name email phone")
      .populate("owner", "name email phone")
      .populate("property", "name city address")
      .populate("room", "roomNumber roomType");

    if (!payment) {
      return next(
        new ApiError(404, "Payment not found.")
      );
    }

    const isTenant =
      payment.tenant._id.toString() === req.user._id.toString();

    const isOwner =
      payment.owner._id.toString() === req.user._id.toString();

    const isAdmin = req.user.role === "admin";

    if (!isTenant && !isOwner && !isAdmin) {
      return next(
        new ApiError(
          403,
          "You are not authorized to view this payment."
        )
      );
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        "Payment fetched successfully.",
        payment
      )
    );
  } catch (error) {
    next(error);
  }
};




export const markPaymentAsPaid = async (req, res, next) => {
  try {
    const { transactionId } = req.body;

    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return next(
        new ApiError(404, "Payment not found.")
      );
    }

    if (
      payment.tenant.toString() !== req.user._id.toString()
    ) {
      return next(
        new ApiError(
          403,
          "You are not authorized to pay this invoice."
        )
      );
    }

    if (payment.status === "paid") {
      return next(
        new ApiError(
          400,
          "Payment has already been completed."
        )
      );
    }

    payment.status = "paid";
    payment.transactionId =
      transactionId ||
      `TXN-${Date.now()}`;

    payment.paidAt = new Date();

    await payment.save();

    return res.status(200).json(
      new ApiResponse(
        200,
        "Payment marked as paid successfully.",
        payment
      )
    );
  } catch (error) {
    next(error);
  }
};




export const deletePayment = async (req, res, next) => {
  try {
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return next(
        new ApiError(404, "Payment not found.")
      );
    }

    if (req.user.role !== "admin") {
      return next(
        new ApiError(
          403,
          "Only admin can delete payment records."
        )
      );
    }

    await Payment.findByIdAndDelete(payment._id);

    return res.status(200).json(
      new ApiResponse(
        200,
        "Payment deleted successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};