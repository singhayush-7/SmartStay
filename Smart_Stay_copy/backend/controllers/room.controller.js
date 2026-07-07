 import Room from "../models/room.model.js";
import Property from "../models/property.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  uploadMultipleImages,
  deleteMultipleImages,
} from "../utils/cloudinaryUpload.js";
import updatePropertyStats from "../utils/updatePropertyStats.js";




export const createRoom = async (req, res, next) => {
  try {
    const {
      property,
      roomNumber,
      roomType,
      capacity,
      rent,
      securityDeposit,
      floor,
      hasAC,
      attachedBathroom,
      furnished,
      wifiAvailable,
    } = req.body;

    if (
      !property ||
      !roomNumber ||
      !roomType ||
      !capacity ||
      !rent ||
      floor === undefined
    ) {
      return next(
        new ApiError(400, "Please provide all required fields.")
      );
    }
    const existingProperty = await Property.findById(property);

    if (!existingProperty) {
      return next(new ApiError(404, "Property not found."));
    }

    if (
      existingProperty.owner.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return next(
        new ApiError(
          403,
          "You are not authorized to add rooms to this property."
        )
      );
    }

    const roomExists = await Room.findOne({
      property,
      roomNumber,
    });

    if (roomExists) {
      return next(
        new ApiError(
          409,
          "Room number already exists in this property."
        )
      );
    }

    const uploadedImages = await uploadMultipleImages(
      req.files,
      "SmartStay/Rooms"
    );

    const room = await Room.create({
      property,
      roomNumber,
      roomType,
      capacity,
      occupiedBeds: 0,
      availableBeds: capacity,
      rent,
      securityDeposit,
      floor,
      hasAC,
      attachedBathroom,
      furnished,
      wifiAvailable,
      images: uploadedImages,
    });

    await updatePropertyStats(property);

    return res.status(201).json(
      new ApiResponse(
        201,
        "Room created successfully.",
        room
      )
    );
  } catch (error) {
    next(error);
  }
};
 



export const getRoomsByProperty = async (req, res, next) => {
  try {
    const rooms = await Room.find({
      property: req.params.propertyId,
      isActive: true,
    }).sort({ roomNumber: 1 });

    return res.status(200).json(
      new ApiResponse(
        200,
        "Rooms fetched successfully.",
        rooms
      )
    );
  } catch (error) {
    next(error);
  }
};




export const getRoomById = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id)
      .populate("property", "name address city");

    if (!room) {
      return next(new ApiError(404, "Room not found."));
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        "Room fetched successfully.",
        room
      )
    );
  } catch (error) {
    next(error);
  }
};




export const updateRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      return next(new ApiError(404, "Room not found."));
    }

    const property = await Property.findById(room.property);

    if (!property) {
      return next(new ApiError(404, "Property not found."));
    }

    if (
      property.owner.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return next(
        new ApiError(
          403,
          "You are not authorized to update this room."
        )
      );
    }

    if (req.files && req.files.length > 0) {
  
  await deleteMultipleImages(room.images);

  
  const uploadedImages = await uploadMultipleImages(
    req.files,
    "SmartStay/Rooms"
  );

  room.images = uploadedImages;
}

    room.roomNumber = req.body.roomNumber ?? room.roomNumber;
    room.roomType = req.body.roomType ?? room.roomType;
    room.capacity = req.body.capacity ?? room.capacity;
    room.rent = req.body.rent ?? room.rent;
    room.securityDeposit =
      req.body.securityDeposit ?? room.securityDeposit;
    room.floor = req.body.floor ?? room.floor;
    room.hasAC = req.body.hasAC ?? room.hasAC;
    room.attachedBathroom =
      req.body.attachedBathroom ?? room.attachedBathroom;
    room.furnished = req.body.furnished ?? room.furnished;
    room.wifiAvailable =
      req.body.wifiAvailable ?? room.wifiAvailable;
    room.status = req.body.status ?? room.status;
    room.isActive = req.body.isActive ?? room.isActive;

    
    if (req.body.capacity) {
      const newCapacity = Number(req.body.capacity);

      if (room.occupiedBeds > newCapacity) {
        return next(
          new ApiError(
            400,
            "Capacity cannot be less than occupied beds."
          )
        );
      }

      room.availableBeds = newCapacity - room.occupiedBeds;
    }

    await room.save();

    await updatePropertyStats(room.property);

    return res.status(200).json(
      new ApiResponse(
        200,
        "Room updated successfully.",
        room
      )
    );
  } catch (error) {
    next(error);
  }
};




export const deleteRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      return next(new ApiError(404, "Room not found."));
    }

    const property = await Property.findById(room.property);

    if (!property) {
      return next(new ApiError(404, "Property not found."));
    }

    if (
      property.owner.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return next(
        new ApiError(
          403,
          "You are not authorized to delete this room."
        )
      );
    }

    await deleteMultipleImages(room.images);

    const propertyId = room.property;

    await room.deleteOne();

    await updatePropertyStats(propertyId);

    return res.status(200).json(
      new ApiResponse(
        200,
        "Room deleted successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};