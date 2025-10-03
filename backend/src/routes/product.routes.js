import express from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} from "../controllers/product.controller.js";
import {
  isAuthenticated,
  authorizeRoles,
} from "../middlewares/auth.middlewares.js";

const productRouter = express.Router();

productRouter.route("/products").get(getAllProducts);

productRouter
  .route("/products/new")
  .post(isAuthenticated, authorizeRoles("admin"), createProduct);

productRouter
  .route("/products/:id")
  .put(isAuthenticated, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteProduct)
  .get(getProductDetails);

export default productRouter;
