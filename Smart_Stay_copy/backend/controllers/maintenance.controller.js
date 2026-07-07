import Maintenance from "../models/maintenance.model.js";
import Property from "../models/property.model.js";
import Room from "../models/room.model.js";
import Complaint from "../models/complaint.model.js";

import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";




export const createMaintenance = async (
  req,
  res,
  next
) => {
  try {
    const {
      property,
      room,
      complaint,
      title,
      description,
      category,
      priority,
      expectedCompletionDate,
      estimatedCost,
    } = req.body;

    if (!property || !title || !description) {
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

    
    if (
      propertyDoc.owner.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return next(
        new ApiError(
          403,
          "You are not authorized to create maintenance tasks for this property."
        )
      );
    }

    
    if (room) {
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
            "Room does not belong to this property."
          )
        );
      }
    }

    
    if (complaint) {
      const complaintDoc = await Complaint.findById(
        complaint
      );

      if (!complaintDoc) {
        return next(
          new ApiError(
            404,
            "Complaint not found."
          )
        );
      }
    }

    const maintenance = await Maintenance.create({
      property,
      room: room || null,
      complaint: complaint || null,
      owner: propertyDoc.owner,
      title,
      description,
      category,
      priority,
      expectedCompletionDate,
      estimatedCost,
    });

    return res.status(201).json(
      new ApiResponse(
        201,
        "Maintenance task created successfully.",
        maintenance
      )
    );
  } catch (error) {
    next(error);
  }
};




export const getMyMaintenance = async (
  req,
  res,
  next
) => {
  try {
    const query = req.user.role === "admin" ? {} : { owner: req.user._id };

    const maintenanceTasks =
      await Maintenance.find(query)
        .populate("property", "name city")
        .populate("room", "roomNumber roomType")
        .populate("complaint", "title status")
        .sort({
          createdAt: -1,
        });

    return res.status(200).json(
      new ApiResponse(
        200,
        "Maintenance tasks fetched successfully.",
        maintenanceTasks
      )
    );
  } catch (error) {
    next(error);
  }
};




export const getMaintenanceById = async (
  req,
  res,
  next
) => {
  try {
    const maintenance =
      await Maintenance.findById(req.params.id)
        .populate("property")
        .populate("room")
        .populate("complaint");

    if (!maintenance) {
      return next(
        new ApiError(
          404,
          "Maintenance task not found."
        )
      );
    }

    if (
      maintenance.owner.toString() !==
        req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return next(
        new ApiError(
          403,
          "You are not authorized to view this maintenance task."
        )
      );
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        "Maintenance task fetched successfully.",
        maintenance
      )
    );
  } catch (error) {
    next(error);
  }

};




export const assignMaintenance = async (
  req,
  res,
  next
) => {
  try {
    const { assignedTo } = req.body;

    const maintenance = await Maintenance.findById(
      req.params.id
    );

    if (!maintenance) {
      return next(
        new ApiError(
          404,
          "Maintenance task not found."
        )
      );
    }

    if (
      maintenance.owner.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return next(
        new ApiError(
          403,
          "You are not authorized to assign this maintenance task."
        )
      );
    }

    if (!assignedTo || assignedTo.trim() === "") {
      return next(
        new ApiError(
          400,
          "Assigned technician/vendor is required."
        )
      );
    }

    maintenance.assignedTo = assignedTo;
    maintenance.status = "assigned";

    await maintenance.save();

    return res.status(200).json(
      new ApiResponse(
        200,
        "Maintenance assigned successfully.",
        maintenance
      )
    );
  } catch (error) {
    next(error);
  }
};




export const updateMaintenanceStatus = async (
  req,
  res,
  next
) => {
  try {
    const { status } = req.body;

    const maintenance = await Maintenance.findById(
      req.params.id
    );

    if (!maintenance) {
      return next(
        new ApiError(
          404,
          "Maintenance task not found."
        )
      );
    }

    if (
      maintenance.owner.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return next(
        new ApiError(
          403,
          "You are not authorized to update this maintenance task."
        )
      );
    }

    const allowedStatuses = [
      "pending",
      "assigned",
      "in-progress",
      "completed",
      "cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return next(
        new ApiError(
          400,
          "Invalid maintenance status."
        )
      );
    }

    maintenance.status = status;

    if (status === "completed") {
      maintenance.completedAt = new Date();
    }

    await maintenance.save();

    return res.status(200).json(
      new ApiResponse(
        200,
        "Maintenance status updated successfully.",
        maintenance
      )
    );
  } catch (error) {
    next(error);
  }
};




export const completeMaintenance = async (
  req,
  res,
  next
) => {
  try {
    const {
      actualCost,
      completionNotes,
    } = req.body || {};

    const maintenance = await Maintenance.findById(
      req.params.id
    );

    if (!maintenance) {
      return next(
        new ApiError(
          404,
          "Maintenance task not found."
        )
      );
    }

    if (
      maintenance.owner.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return next(
        new ApiError(
          403,
          "You are not authorized to complete this maintenance task."
        )
      );
    }

    maintenance.status = "completed";
    maintenance.actualCost = actualCost || 0;
    maintenance.completionNotes =
      completionNotes || "";
    maintenance.completedAt = new Date();

    await maintenance.save();

    return res.status(200).json(
      new ApiResponse(
        200,
        "Maintenance completed successfully.",
        maintenance
      )
    );
  } catch (error) {
    next(error);
  }
};

// ==========================================
// Delete Maintenance
// ==========================================
export const deleteMaintenance = async (
  req,
  res,
  next
) => {
  try {
    const maintenance = await Maintenance.findById(
      req.params.id
    );

    if (!maintenance) {
      return next(
        new ApiError(
          404,
          "Maintenance task not found."
        )
      );
    }

    if (req.user.role !== "admin") {
      return next(
        new ApiError(
          403,
          "Only admin can delete maintenance tasks."
        )
      );
    }

    await Maintenance.findByIdAndDelete(
      maintenance._id
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Maintenance task deleted successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};