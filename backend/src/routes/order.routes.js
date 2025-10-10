import express from "express";
import {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} from "../controllers/order.controller.js";
import {
  isAuthenticated,
  authorizeRoles,
} from "../middlewares/auth.middlewares.js";

const orderRouter = express.Router();

orderRouter.route("/order/new").post(isAuthenticated, newOrder);

//get single order -- admin

orderRouter.route("/order/:id").get(isAuthenticated, getSingleOrder);

//get all orders -- users
orderRouter.route("/orders/me").get(isAuthenticated, myOrders);

// get all orders -- Admin

orderRouter
  .route("/admin/orders")
  .get(isAuthenticated, authorizeRoles("admin"), getAllOrders);

//update order status and delete -- admin

orderRouter
  .route("/admin/order/:id")
  .put(isAuthenticated, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteOrder);

export default orderRouter;
