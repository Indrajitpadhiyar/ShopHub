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
  addToCart,
  removeFromCart,
} from "../controllers/user.controller.js";
import {
  isAuthenticated,
  authorizeRoles,
} from "../middlewares/auth.middlewares.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/password/forgot", forgotPassword);
userRouter.put("/password/reset/:token", resetPassword);
userRouter.get("/logout", logout);

userRouter.get("/me", isAuthenticated, getUserDetails);
userRouter.put("/password/update", isAuthenticated, updatePassword);
userRouter.put("/me/update", isAuthenticated, updateProfile);

userRouter.get(
  "/admin/users",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllUsers
);

userRouter
  .route("/admin/user/:id")
  .get(isAuthenticated, authorizeRoles("admin"), getSigleUser)
  .put(isAuthenticated, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteUser);

// Cart Routes
userRouter
  .route("/cart")
  .post(isAuthenticated, addToCart)
  .delete(isAuthenticated, removeFromCart);

export default userRouter;
