import express from "express";
import {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/password/forgot").post(forgotPassword);
userRouter.route("/logout").get(logout);

export default userRouter;
