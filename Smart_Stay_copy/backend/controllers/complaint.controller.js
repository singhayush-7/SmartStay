import Complaint from "../models/complaint.model.js";
import Property from "../models/property.model.js";
import Room from "../models/room.model.js";

import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";




export const createComplaint = async (req, res, next) => {
  try {
    const {
      property,
      room,
      category,
      title,
      description,
      priority,
    } = req.body;

    if (
      !property ||
      !room ||
      !category ||
      !title ||
      !description
    ) {
      return next(
        new ApiError(
          400,
          "Please provide all required fields."
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

    const complaint = await Complaint.create({
      tenant: req.user._id,
      owner: propertyDoc.owner,
      property,
      room,
      category,
      title,
      description,
      priority,
    });

    return res.status(201).json(
      new ApiResponse(
        201,
        "Complaint submitted successfully.",
        complaint
      )
    );
  } catch (error) {
    next(error);
  }
};




export const getMyComplaints = async (req, res, next) => {
  try {
    const complaints = await Complaint.find({
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
        "Complaints fetched successfully.",
        complaints
      )
    );
  } catch (error) {
    next(error);
  }
};




export const getPropertyComplaints = async (
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
          "You are not authorized to view these complaints."
        )
      );
    }

    const complaints = await Complaint.find({
      property: property._id,
    })
      .populate("tenant", "name email phone")
      .populate("room", "roomNumber roomType")
      .sort({
        createdAt: -1,
      });

    return res.status(200).json(
      new ApiResponse(
        200,
        "Property complaints fetched successfully.",
        complaints
      )
    );
  } catch (error) {
    next(error);
  }
};




export const updateComplaintStatus = async (
  req,
  res,
  next
) => {
  try {
    const { status } = req.body;

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return next(
        new ApiError(404, "Complaint not found.")
      );
    }

    if (
      complaint.owner.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return next(
        new ApiError(
          403,
          "You are not authorized to update this complaint."
        )
      );
    }

    const allowedStatuses = [
      "pending",
      "in-progress",
      "resolved",
      "closed",
    ];

    if (!allowedStatuses.includes(status)) {
      return next(
        new ApiError(400, "Invalid complaint status.")
      );
    }

    complaint.status = status;

    if (status === "resolved") {
      complaint.resolvedAt = new Date();
    }

    await complaint.save();

    return res.status(200).json(
      new ApiResponse(
        200,
        "Complaint status updated successfully.",
        complaint
      )
    );
  } catch (error) {
    next(error);
  }
};




export const addResolution = async (
  req,
  res,
  next
) => {
  try {
    const { resolution } = req.body;

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return next(
        new ApiError(404, "Complaint not found.")
      );
    }

    if (
      complaint.owner.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return next(
        new ApiError(
          403,
          "You are not authorized to resolve this complaint."
        )
      );
    }

    if (!resolution || resolution.trim() === "") {
      return next(
        new ApiError(
          400,
          "Resolution is required."
        )
      );
    }

    complaint.resolution = resolution;
    complaint.status = "resolved";
    complaint.resolvedAt = new Date();

    await complaint.save();

    return res.status(200).json(
      new ApiResponse(
        200,
        "Complaint resolved successfully.",
        complaint
      )
    );
  } catch (error) {
    next(error);
  }
};




export const deleteComplaint = async (
  req,
  res,
  next
) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return next(
        new ApiError(404, "Complaint not found.")
      );
    }

    if (req.user.role !== "admin") {
      return next(
        new ApiError(
          403,
          "Only admin can delete complaints."
        )
      );
    }

    await Complaint.findByIdAndDelete(complaint._id);

    return res.status(200).json(
      new ApiResponse(
        200,
        "Complaint deleted successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};