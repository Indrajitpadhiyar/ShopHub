import express from "express";
import {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getSigleUser,
  getAllUsers,
  deleteUser,
  updateUserRole,
} from "../controllers/user.controller.js";
import {
  isAuthenticated,
  authorizeRoles,
} from "../middlewares/auth.middlewares.js";
import { get } from "http";

const userRouter = express.Router();

userRouter.route("/register").post(registerUser);

userRouter.route("/login").post(loginUser);

userRouter.route("/password/forgot").post(forgotPassword);

userRouter.route("/password/reset/:token").put(resetPassword);

userRouter.route("/logout").get(logout);

userRouter.route("/me").get(isAuthenticated, getUserDetails);

userRouter.route("/password/update").put(isAuthenticated, updatePassword);

userRouter.route("/me/update").put(isAuthenticated, updateProfile);

userRouter
  .route("/admin/users")
  .get(isAuthenticated, authorizeRoles("admin"), getAllUsers);

userRouter
  .route("/admin/user/:id")
  .get(isAuthenticated, authorizeRoles("admin"), getSigleUser)
  .put(isAuthenticated, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteUser);

export default userRouter;
