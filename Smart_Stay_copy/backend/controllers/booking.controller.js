import Booking from "../models/booking.model.js";
import Property from "../models/property.model.js";
import Room from "../models/room.model.js";
import ApiFeatures from "../utils/ApiFeatures.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import updateRoomOccupancy from "../utils/updateRoomOccupancy.js";




export const createBooking = async (req, res, next) => {
  try {
    const {
      property,
      room,
      checkInDate,
      checkOutDate,
      message,
    } = req.body;

    
    if (
      !property ||
      !room ||
      !checkInDate ||
      !checkOutDate
    ) {
      return next(
        new ApiError(
          400,
          "Please provide all required fields."
        )
      );
    }

    
    if (req.user.role !== "tenant") {
      return next(
        new ApiError(
          403,
          "Only tenants can book rooms."
        )
      );
    }

    
    const propertyDoc = await Property.findById(property);

    if (!propertyDoc) {
      return next(
        new ApiError(404, "Property not found.")
      );
    }

    
    const roomDoc = await Room.findById(room);

    if (!roomDoc) {
      return next(
        new ApiError(404, "Room not found.")
      );
    }

    
    if (
      roomDoc.property.toString() !==
      propertyDoc._id.toString()
    ) {
      return next(
        new ApiError(
          400,
          "Selected room does not belong to this property."
        )
      );
    }

    
    if (!roomDoc.isActive) {
      return next(
        new ApiError(
          400,
          "This room is currently unavailable."
        )
      );
    }

    
    if (roomDoc.availableBeds <= 0) {
      return next(
        new ApiError(
          400,
          "No beds available in this room."
        )
      );
    }

    
    const existingBooking = await Booking.findOne({
      tenant: req.user._id,
      room,
      status: {
        $in: ["pending", "approved"],
      },
    });

    if (existingBooking) {
      return next(
        new ApiError(
          409,
          "You already have an active booking for this room."
        )
      );
    }

    const booking = await Booking.create({
      tenant: req.user._id,
      owner: propertyDoc.owner,
      property,
      room,
      checkInDate,
      checkOutDate,
      monthlyRent: roomDoc.rent,
      securityDeposit: roomDoc.securityDeposit,
      message,
    });

    return res.status(201).json(
      new ApiResponse(
        201,
        "Booking request submitted successfully.",
        booking
      )
    );
  } catch (error) {
    next(error);
  }
};




export const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({
      tenant: req.user._id,
    })
      .populate("property", "name city address")
      .populate(
        "room",
        "roomNumber roomType rent capacity"
      )
      .sort({
        createdAt: -1,
      });

    return res.status(200).json(
      new ApiResponse(
        200,
        "Bookings fetched successfully.",
        bookings
      )
    );
  } catch (error) {
    next(error);
  }
};




export const getPropertyBookings = async (
  req,
  res,
  next
) => {
  try {
    const property = await Property.findById(
      req.params.propertyId
    );

    if (!property) {
      return next(
        new ApiError(404, "Property not found.")
      );
    }

    if (
      property.owner.toString() !==
        req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return next(
        new ApiError(
          403,
          "You are not authorized to view these bookings."
        )
      );
    }

    const bookings = await Booking.find({
      property: property._id,
    })
      .populate("tenant", "name email phone")
      .populate(
        "room",
        "roomNumber roomType capacity"
      )
      .sort({
        createdAt: -1,
      });

    return res.status(200).json(
      new ApiResponse(
        200,
        "Property bookings fetched successfully.",
        bookings
      )
    );
  } catch (error) {
    next(error);
  }
};




export const approveBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("room")
      .populate("property");

    if (!booking) {
      return next(new ApiError(404, "Booking not found."));
    }

    
    if (
      booking.owner.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return next(
        new ApiError(
          403,
          "You are not authorized to approve this booking."
        )
      );
    }

    if (booking.status !== "pending") {
      return next(
        new ApiError(
          400,
          "Only pending bookings can be approved."
        )
      );
    }

    
    const room = await Room.findById(booking.room._id);

    if (!room) {
      return next(new ApiError(404, "Room not found."));
    }

    if (!room.isActive) {
      return next(
        new ApiError(
          400,
          "This room is currently unavailable."
        )
      );
    }

    if (room.availableBeds <= 0) {
      return next(
        new ApiError(
          400,
          "No beds are available in this room."
        )
      );
    }

    booking.status = "approved";
    await booking.save();

    await updateRoomOccupancy(room._id);

    return res.status(200).json(
      new ApiResponse(
        200,
        "Booking approved successfully.",
        booking
      )
    );
  } catch (error) {
    next(error);
  }
};




export const rejectBooking = async (req, res, next) => {
  try {
    const { rejectionReason } = req.body;

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return next(new ApiError(404, "Booking not found."));
    }

    if (
      booking.owner.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return next(
        new ApiError(
          403,
          "You are not authorized to reject this booking."
        )
      );
    }

    if (booking.status !== "pending") {
      return next(
        new ApiError(
          400,
          "Only pending bookings can be rejected."
        )
      );
    }

    booking.status = "rejected";
    booking.rejectionReason = rejectionReason || "";

    await booking.save();

    return res.status(200).json(
      new ApiResponse(
        200,
        "Booking rejected successfully.",
        booking
      )
    );
  } catch (error) {
    next(error);
  }
};

// ==========================================
// Cancel Booking
// ==========================================
export const cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return next(new ApiError(404, "Booking not found."));
    }

    const isTenant =
      booking.tenant.toString() === req.user._id.toString();

    const isOwner =
      booking.owner.toString() === req.user._id.toString();

    const isAdmin = req.user.role === "admin";

    if (!isTenant && !isOwner && !isAdmin) {
      return next(
        new ApiError(
          403,
          "You are not authorized to cancel this booking."
        )
      );
    }

    if (
      booking.status === "cancelled" ||
      booking.status === "completed"
    ) {
      return next(
        new ApiError(
          400,
          "This booking cannot be cancelled."
        )
      );
    }

    booking.status = "cancelled";

    await booking.save();

    await updateRoomOccupancy(booking.room);

    return res.status(200).json(
      new ApiResponse(
        200,
        "Booking cancelled successfully.",
        booking
      )
    );
  } catch (error) {
    next(error);
  }
};




export const deleteBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return next(new ApiError(404, "Booking not found."));
    }

    const isTenant =
      booking.tenant.toString() === req.user._id.toString();

    const isAdmin = req.user.role === "admin";

    if (!isTenant && !isAdmin) {
      return next(
        new ApiError(
          403,
          "You are not authorized to delete this booking."
        )
      );
    }

    await Booking.findByIdAndDelete(booking._id);

    await updateRoomOccupancy(booking.room);

    return res.status(200).json(
      new ApiResponse(
        200,
        "Booking deleted successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};
