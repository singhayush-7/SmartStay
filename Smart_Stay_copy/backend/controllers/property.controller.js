import {
  uploadMultipleImages,
  deleteMultipleImages,
} from "../utils/cloudinaryUpload.js";
import Property from "../models/property.model.js";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiFeatures from "../utils/ApiFeatures.js";



export const createProperty = async (req, res, next) => {
  try {
    const {
      name,
      description,
      address,
      city,
      state,
      pincode,
      gender,
      amenities,
      foodAvailable,
      wifiAvailable,
      parkingAvailable,
      latitude,
      longitude,
    } = req.body;

    if (
      !name ||
      !description ||
      !address ||
      !city ||
      !state ||
      !pincode ||
      !gender
    ) {
      return next(new ApiError(400, "Please fill all required fields."));
    }

    const uploadedImages = await uploadMultipleImages(
  req.files,
  "SmartStay/Properties"
);

    const property = await Property.create({
      owner: req.user._id,
      name,
      description,
      address,
      city,
      state,
      pincode,

      gender,

      amenities: amenities
        ? Array.isArray(amenities)
          ? amenities
          : amenities.split(",").map((item) => item.trim())
        : [],

      foodAvailable,
      wifiAvailable,
      parkingAvailable,

     location: {
  latitude: latitude || null,
  longitude: longitude || null,
},

      images: uploadedImages,
    });

    return res.status(201).json(
      new ApiResponse(
        201,
        "Property created successfully.",
        property
      )
    );
  } catch (error) {
    next(error);
  }
};




export const getAllProperties = async (
  req,
  res,
  next
) => {
  try {
    const features = new ApiFeatures(
      Property.find(),
      req.query
    )
      .filter()
      .search([
        "name",
        "city",
        "state",
        "address",
      ])
      .sort()
      .limitFields()
      .paginate();

    const properties = await features.query
      .populate("owner", "name email")
      .lean();

    return res.status(200).json(
      new ApiResponse(
        200,
        "Properties fetched successfully.",
        properties
      )
    );
  } catch (error) {
    next(error);
  }
};




export const getPropertyById = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate("owner", "name email phone");

    if (!property) {
      return next(new ApiError(404, "Property not found."));
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        "Property fetched successfully.",
        property
      )
    );
  } catch (error) {
    next(error);
  }
};



export const updateProperty = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);

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
          "You are not authorized to update this property."
        )
      );
    }

    let uploadedImages = property.images;

    
    if (req.files && req.files.length > 0) {
  
  await deleteMultipleImages(property.images);

  
  uploadedImages = await uploadMultipleImages(
    req.files,
    "SmartStay/Properties"
  );
}

    property.name = req.body.name ?? property.name;
    property.description = req.body.description ?? property.description;
    property.address = req.body.address ?? property.address;
    property.city = req.body.city ?? property.city;
    property.state = req.body.state ?? property.state;
    property.pincode = req.body.pincode ?? property.pincode;
    property.gender = req.body.gender ?? property.gender;

    property.foodAvailable =
      req.body.foodAvailable ?? property.foodAvailable;

    property.wifiAvailable =
      req.body.wifiAvailable ?? property.wifiAvailable;

    property.parkingAvailable =
      req.body.parkingAvailable ?? property.parkingAvailable;

    if (req.body.amenities) {
      property.amenities = Array.isArray(req.body.amenities)
        ? req.body.amenities
        : req.body.amenities.split(",").map((item) => item.trim());
    }

    if (req.body.latitude) {
      property.location.latitude = req.body.latitude;
    }

    if (req.body.longitude) {
      property.location.longitude = req.body.longitude;
    }

    property.images = uploadedImages;

    await property.save();

    return res.status(200).json(
      new ApiResponse(
        200,
        "Property updated successfully.",
        property
      )
    );
  } catch (error) {
    next(error);
  }
};




export const deleteProperty = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);

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
          "You are not authorized to delete this property."
        )
      );
    }

    
    await deleteMultipleImages(property.images);

    await property.deleteOne();

    return res.status(200).json(
      new ApiResponse(
        200,
        "Property deleted successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};




export const getMyProperties = async (req, res, next) => {
  try {
    const properties = await Property.find({
      owner: req.user._id,
    }).sort({ createdAt: -1 });

    return res.status(200).json(
      new ApiResponse(
        200,
        "Properties fetched successfully.",
        properties
      )
    );
  } catch (error) {
    next(error);
  }
};