import crypto from "crypto";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import sendEmail from "../utils/sendEmail.js";
import sendTokenResponse from "../utils/sendTokenResponse.js";
import { generateAccessToken } from "../utils/generateToken.js";
 
export const register = async (req, res, next) => {
  try {
    const { name, email, password, phone, role } = req.body;

    if (!name || !email || !password) {
      return next(new ApiError(400, "Please provide all required fields."));
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return next(new ApiError(409, "Email is already registered."));
    }

    const allowedRoles = ["tenant", "owner"];

    const userRole = allowedRoles.includes(role) ? role : "tenant";

    const user = await User.create({
      name,
      email,
      password,
      phone,
      role: userRole,
    });

    return sendTokenResponse(
      user,
      201,
      res,
      "User registered successfully."
    );
  } catch (error) {
    next(error);
  }
};
 
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ApiError(400, "Please provide email and password."));
    }

    const user = await User.findOne({ email }).select(
      "+password +refreshToken"
    );

    if (!user) {
      return next(new ApiError(401, "Invalid email or password."));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return next(new ApiError(401, "Invalid email or password."));
    }

    return sendTokenResponse(
      user,
      200,
      res,
      "Login successful."
    );
  } catch (error) {
    next(error);
  }
};
 
export const logout = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET
      );

      const user = await User.findById(decoded.id).select("+refreshToken");

      if (user) {
        user.refreshToken = "";
        await user.save({ validateBeforeSave: false });
      }
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Logged out successfully."
        )
      );
  } catch (error) {
    next(error);
  }
};
 
export const getMe = async (req, res, next) => {
  try {
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "User fetched successfully.",
          req.user
        )
      );
  } catch (error) {
    next(error);
  }
};
 
export const refreshAccessToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return next(new ApiError(401, "Refresh token not found."));
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    const user = await User.findById(decoded.id).select("+refreshToken");

    if (!user) {
      return next(new ApiError(401, "User not found."));
    }

    if (user.refreshToken !== refreshToken) {
      return next(new ApiError(401, "Invalid refresh token."));
    }

    const accessToken = generateAccessToken(user._id);

    return res.status(200).json(
      new ApiResponse(200, "Access token refreshed successfully.", {
        accessToken,
      })
    );
  } catch (error) {
    next(new ApiError(401, "Invalid or expired refresh token."));
  }
};
 
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return next(new ApiError(400, "Email is required."));
    }

    const user = await User.findOne({ email });

    if (!user) {
      return next(new ApiError(404, "User not found."));
    }

    const resetToken = user.generateResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    const message = `
You requested a password reset for your SmartStay account.

Click the link below to reset your password:

${resetUrl}

If you did not request this, please ignore this email.
`;

    await sendEmail({
      email: user.email,
      subject: "SmartStay Password Reset",
      message,
    });

    return res.status(200).json(
      new ApiResponse(
        200,
        "Password reset email sent successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};
 
export const resetPassword = async (req, res, next) => {
  try {
    const { password } = req.body;

    if (!password) {
      return next(new ApiError(400, "Password is required."));
    }

    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: {
        $gt: Date.now(),
      },
    }).select("+password");

    if (!user) {
      return next(
        new ApiError(
          400,
          "Reset token is invalid or has expired."
        )
      );
    }

    user.password = password;
    user.resetPasswordToken = "";
    user.resetPasswordExpire = undefined;

    await user.save();

    return sendTokenResponse(
      user,
      200,
      res,
      "Password reset successful."
    );
  } catch (error) {
    next(error);
  }
};