import Property from "../models/property.model.js";
import Room from "../models/room.model.js";
import Booking from "../models/booking.model.js";
import Payment from "../models/payment.model.js";
import Complaint from "../models/complaint.model.js";
import Maintenance from "../models/maintenance.model.js";
import User from "../models/user.model.js";

import ApiResponse from "../utils/ApiResponse.js";




export const ownerDashboard = async (
  req,
  res,
  next
) => {
  try {
    const ownerId = req.user._id;

    const [
      totalProperties,
      totalRooms,
      activeBookings,
      completedPayments,
      pendingComplaints,
      openMaintenance,
    ] = await Promise.all([
      Property.countDocuments({
        owner: ownerId,
      }),

      Room.countDocuments({
        owner: ownerId,
      }),

      Booking.countDocuments({
        owner: ownerId,
        status: "approved",
      }),

      Payment.countDocuments({
        owner: ownerId,
        status: "paid",
      }),

      Complaint.countDocuments({
        owner: ownerId,
        status: {
          $ne: "resolved",
        },
      }),

      Maintenance.countDocuments({
        owner: ownerId,
        status: {
          $ne: "completed",
        },
      }),
    ]);

    const revenue = await Payment.aggregate([
      {
        $match: {
          owner: ownerId,
          status: "paid",
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$amount",
          },
        },
      },
    ]);

    return res.status(200).json(
      new ApiResponse(
        200,
        "Owner dashboard fetched successfully.",
        {
          totalProperties,
          totalRooms,
          activeBookings,
          completedPayments,
          pendingComplaints,
          openMaintenance,
          totalRevenue:
            revenue.length > 0
              ? revenue[0].totalRevenue
              : 0,
        }
      )
    );
  } catch (error) {
    next(error);
  }
};



export const tenantDashboard = async (
  req,
  res,
  next
) => {
  try {
    const tenantId = req.user._id;

    const activeBooking = await Booking.findOne({
      tenant: tenantId,
      status: "approved",
    })
      .populate("property", "name city address")
      .populate("room", "roomNumber roomType rent");

    const totalPayments = await Payment.countDocuments({
      tenant: tenantId,
      status: "paid",
    });

    const pendingComplaints = await Complaint.countDocuments({
      tenant: tenantId,
      status: {
        $in: ["pending", "in-progress"],
      },
    });

    const recentPayments = await Payment.find({
      tenant: tenantId,
    })
      .sort({
        createdAt: -1,
      })
      .limit(5)
      .select(
        "amount rentMonth status paymentMethod paidAt createdAt"
      );

    let rentDue = 0;

    if (activeBooking) {
      rentDue = activeBooking.monthlyRent || 0;
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        "Tenant dashboard fetched successfully.",
        {
          activeBooking,
          rentDue,
          totalPayments,
          pendingComplaints,
          recentPayments,
        }
      )
    );
  } catch (error) {
    next(error);
  }
};




export const adminDashboard = async (
  req,
  res,
  next
) => {
  try {
    const [
      totalUsers,
      totalOwners,
      totalTenants,
      totalProperties,
      totalRooms,
      totalBookings,
      totalPayments,
      totalComplaints,
      totalMaintenance,
    ] = await Promise.all([
      User.countDocuments(),

      User.countDocuments({
        role: "owner",
      }),

      User.countDocuments({
        role: "tenant",
      }),

      Property.countDocuments(),

      Room.countDocuments(),

      Booking.countDocuments(),

      Payment.countDocuments(),

      Complaint.countDocuments(),

      Maintenance.countDocuments(),
    ]);

    
    const revenue = await Payment.aggregate([
      {
        $match: {
          status: "paid",
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$amount",
          },
        },
      },
    ]);

    
    const bookingStatus = await Booking.aggregate([
      {
        $group: {
          _id: "$status",
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    
    const complaintStatus = await Complaint.aggregate([
      {
        $group: {
          _id: "$status",
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    
    const maintenanceStatus =
      await Maintenance.aggregate([
        {
          $group: {
            _id: "$status",
            count: {
              $sum: 1,
            },
          },
        },
      ]);

    return res.status(200).json(
      new ApiResponse(
        200,
        "Admin dashboard fetched successfully.",
        {
          totalUsers,
          totalOwners,
          totalTenants,
          totalProperties,
          totalRooms,
          totalBookings,
          totalPayments,
          totalComplaints,
          totalMaintenance,

          totalRevenue:
            revenue.length > 0
              ? revenue[0].totalRevenue
              : 0,

          bookingStatus,
          complaintStatus,
          maintenanceStatus,
        }
      )
    );
  } catch (error) {
    next(error);
  }
};