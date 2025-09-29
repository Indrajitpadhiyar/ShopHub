import express from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} from "../controllers/product.controller.js";

const productRouter = express.Router();

productRouter.route("/products").get(getAllProducts);

productRouter.route("/products/new").post(createProduct);

productRouter
  .route("/products/:id")
  .put(updateProduct)
  .delete(deleteProduct)
  .get(getProductDetails);

export default productRouter;
