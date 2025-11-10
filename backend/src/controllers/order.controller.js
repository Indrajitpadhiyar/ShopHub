import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import ErrorHandler from "../utils/error.handler.js";
import catchAsyncError from "../middlewares/catchAysncerror.middleware.js";

export const newOrder = catchAsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });
  res.status(201).json({
    success: true,
    order,
  });
});

export const getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }
  res.status(200).json({
    success: true,
    order,
  });
});

//get logged in user orders
export const myOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json({
    success: true,
    orders,
  });
});

// all order for -- admin
export const getAllOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });
  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

//update order status -- admin
export const updateOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already delivered this order", 400));
  }

  order.orderItems.forEach(async(order) => {
    await updateStock(order.product, order.quantity);
  });

  order.orderStatus = req.body.status;
  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }
  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

//update order status -- admin

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}

//delete order from the Admin

export const deleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }
  await order.deleteOne();
  res.status(200).json({
    success: true,
  });
});

// Cancel Order -- User
export const cancelOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }

  // Only owner can cancel
  if (order.user.toString() !== req.user._id.toString()) {
    return next(new ErrorHandler("You can only cancel your own orders", 403));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("Delivered orders cannot be cancelled", 400));
  }

  if (order.orderStatus === "Cancelled") {
    return next(new ErrorHandler("Order is already cancelled", 400));
  }

  order.orderStatus = "Cancelled";
  order.cancelledAt = Date.now();

  // Optional: Return stock
  order.orderItems.forEach(async (o) => {
    await updateStockReverse(o.product, o.quantity);
  });

  await order.save();

  res.status(200).json({
    success: true,
    message: "Order cancelled successfully",
  });
});