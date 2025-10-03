import jwt from "jsonwebtoken";
import catchAsyncError from "./catchAysncerror.middleware.js";
import ErrorHandler from "../utils/error.handler.js";
import User from "../models/user.model.js";

export const isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

  let decodedData;
  try {
    decodedData = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decodedData);
  } catch (err) {
    return next(new ErrorHandler("Invalid or expired token", 401));
  }

  req.user = await User.findById(decodedData.id);

  if (!req.user) {
    return next(new ErrorHandler("User not found", 404));
  }

  console.log("Authenticated user:", req.user);

  next();
});

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
