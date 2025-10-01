import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./src/config/db.js";
import product from "./src/routes/product.routes.js";
import errorMiddlewares from "./src/middlewares/error.middlewares.js";

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use("/api/v1", product);

// error middleware
app.use(errorMiddlewares);

app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;
