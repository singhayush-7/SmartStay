import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";

export const protect = async (req, res, next) => {
  try {
    let token;
 
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(new ApiError(401, "Please login to access this resource"));
    }
 
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
 
    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new ApiError(401, "User not found"));
    }
 
    req.user = user;

    next();
  } catch (error) {
    return next(new ApiError(401, "Invalid or expired access token"));
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {

    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError(
          403,
          "You are not authorized to access this resource"
        )
      );
    }

    next();
  };
};