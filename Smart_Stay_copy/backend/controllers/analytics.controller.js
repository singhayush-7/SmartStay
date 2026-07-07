import Payment from "../models/payment.model.js";
import Booking from "../models/booking.model.js";
import Room from "../models/room.model.js";
import Complaint from "../models/complaint.model.js";
import Maintenance from "../models/maintenance.model.js";

import ApiResponse from "../utils/ApiResponse.js";




export const getMonthlyRevenue = async (
  req,
  res,
  next
) => {
  try {
    const ownerId = req.user._id;

    const revenue = await Payment.aggregate([
      {
        $match: {
          owner: ownerId,
          status: "paid",
        },
      },
      {
        $group: {
          _id: {
            year: {
              $year: "$paidAt",
            },
            month: {
              $month: "$paidAt",
            },
          },
          totalRevenue: {
            $sum: "$amount",
          },
          totalPayments: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    return res.status(200).json(
      new ApiResponse(
        200,
        "Monthly revenue analytics fetched successfully.",
        revenue
      )
    );
  } catch (error) {
    next(error);
  }
};




export const getOccupancyAnalytics = async (
  req,
  res,
  next
) => {
  try {
    const ownerId = req.user._id;

    const totalRooms = await Room.countDocuments({
      owner: ownerId,
    });

    const occupiedRooms = await Booking.distinct(
      "room",
      {
        owner: ownerId,
        status: "approved",
      }
    );

    const occupiedCount = occupiedRooms.length;

    const vacantCount =
      totalRooms - occupiedCount;

    const occupancyRate =
      totalRooms === 0
        ? 0
        : Number(
            (
              (occupiedCount / totalRooms) *
              100
            ).toFixed(2)
          );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Occupancy analytics fetched successfully.",
        {
          totalRooms,
          occupiedRooms: occupiedCount,
          vacantRooms: vacantCount,
          occupancyRate,
        }
      )
    );
  } catch (error) {
    next(error);
  }
};




export const getBookingTrends = async (
  req,
  res,
  next
) => {
  try {
    const ownerId = req.user._id;

    const bookingTrends = await Booking.aggregate([
      {
        $match: {
          owner: ownerId,
        },
      },
      {
        $group: {
          _id: {
            year: {
              $year: "$createdAt",
            },
            month: {
              $month: "$createdAt",
            },
          },
          totalBookings: {
            $sum: 1,
          },
          approvedBookings: {
            $sum: {
              $cond: [
                {
                  $eq: ["$status", "approved"],
                },
                1,
                0,
              ],
            },
          },
          pendingBookings: {
            $sum: {
              $cond: [
                {
                  $eq: ["$status", "pending"],
                },
                1,
                0,
              ],
            },
          },
          cancelledBookings: {
            $sum: {
              $cond: [
                {
                  $eq: ["$status", "cancelled"],
                },
                1,
                0,
              ],
            },
          },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    return res.status(200).json(
      new ApiResponse(
        200,
        "Booking trends fetched successfully.",
        bookingTrends
      )
    );
  } catch (error) {
    next(error);
  }
};




export const getPaymentAnalytics = async (
  req,
  res,
  next
) => {
  try {
    const ownerId = req.user._id;

    const paymentAnalytics =
      await Payment.aggregate([
        {
          $match: {
            owner: ownerId,
          },
        },
        {
          $group: {
            _id: "$status",
            totalPayments: {
              $sum: 1,
            },
            totalAmount: {
              $sum: "$amount",
            },
          },
        },
      ]);

    return res.status(200).json(
      new ApiResponse(
        200,
        "Payment analytics fetched successfully.",
        paymentAnalytics
      )
    );
  } catch (error) {
    next(error);
  }
};




export const getComplaintAnalytics = async (
  req,
  res,
  next
) => {
  try {
    const ownerId = req.user._id;

    const complaintAnalytics =
      await Complaint.aggregate([
        {
          $match: {
            owner: ownerId,
          },
        },
        {
          $facet: {
            statusWise: [
              {
                $group: {
                  _id: "$status",
                  total: {
                    $sum: 1,
                  },
                },
              },
            ],
            categoryWise: [
              {
                $group: {
                  _id: "$category",
                  total: {
                    $sum: 1,
                  },
                },
              },
            ],
          },
        },
      ]);

    return res.status(200).json(
      new ApiResponse(
        200,
        "Complaint analytics fetched successfully.",
        complaintAnalytics[0]
      )
    );
  } catch (error) {
    next(error);
  }
};



export const getMaintenanceAnalytics = async (
  req,
  res,
  next
) => {
  try {
    const ownerId = req.user._id;

    const maintenanceAnalytics =
      await Maintenance.aggregate([
        {
          $match: {
            owner: ownerId,
          },
        },
        {
          $facet: {
            statusWise: [
              {
                $group: {
                  _id: "$status",
                  total: {
                    $sum: 1,
                  },
                },
              },
            ],

            priorityWise: [
              {
                $group: {
                  _id: "$priority",
                  total: {
                    $sum: 1,
                  },
                },
              },
            ],

            categoryWise: [
              {
                $group: {
                  _id: "$category",
                  total: {
                    $sum: 1,
                  },
                },
              },
            ],

            totalCost: [
              {
                $group: {
                  _id: null,
                  estimatedCost: {
                    $sum: "$estimatedCost",
                  },
                  actualCost: {
                    $sum: "$actualCost",
                  },
                },
              },
            ],
          },
        },
      ]);

    return res.status(200).json(
      new ApiResponse(
        200,
        "Maintenance analytics fetched successfully.",
        maintenanceAnalytics[0]
      )
    );
  } catch (error) {
    next(error);
  }
};