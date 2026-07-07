import bcrypt from "bcrypt";

import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  uploadSingleImage,
  deleteSingleImage,
} from "../utils/cloudinaryUpload.js";





export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return next(new ApiError(404, "User not found."));
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        "Profile fetched successfully.",
        user
      )
    );
  } catch (error) {
    next(error);
  }
};





export const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return next(new ApiError(404, "User not found."));
    }

    user.name = req.body.name ?? user.name;
    user.phone = req.body.phone ?? user.phone;
    user.address = req.body.address ?? user.address;

    if (req.file) {
      if (user.avatar?.public_id) {
        await deleteSingleImage(user.avatar.public_id);
      }

      const avatar = await uploadSingleImage(
        req.file,
        "SmartStay/Users"
      );

      user.avatar = avatar;
    }

    await user.save();

    return res.status(200).json(
      new ApiResponse(
        200,
        "Profile updated successfully.",
        user
      )
    );
  } catch (error) {
    next(error);
  }
};





export const changePassword = async (
  req,
  res,
  next
) => {
  try {
    const {
      currentPassword,
      newPassword,
    } = req.body;

    const user = await User.findById(req.user._id).select("+password");

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      return next(
        new ApiError(400, "Current password is incorrect.")
      );
    }

    user.password = newPassword;

    await user.save();

    return res.status(200).json(
      new ApiResponse(
        200,
        "Password updated successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};





export const deleteProfile = async (
  req,
  res,
  next
) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return next(new ApiError(404, "User not found."));
    }

    if (user.avatar?.public_id) {
      await deleteSingleImage(user.avatar.public_id);
    }

    await user.deleteOne();

    return res.status(200).json(
      new ApiResponse(
        200,
        "Account deleted successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};