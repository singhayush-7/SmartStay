import ApiResponse from "./ApiResponse.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "./generateToken.js";

const sendTokenResponse = async (
  user,
  statusCode,
  res,
  message = "Success"
) => {
  
  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  
  user.password = undefined;
  user.refreshToken = undefined;

  
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, 
  };

  
  res.cookie("refreshToken", refreshToken, cookieOptions);

  
  return res.status(statusCode).json(
    new ApiResponse(statusCode, message, {
      accessToken,
      user,
    })
  );
};

export default sendTokenResponse;