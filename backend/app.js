// app.js
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";

import product from "./src/routes/product.routes.js";
import userRouter from "./src/routes/user.routes.js";
import orderRouter from "./src/routes/order.routes.js";
import errorMiddlewares from "./src/middlewares/error.middlewares.js";

const app = express();

// Middlewares
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  })
);
app.use(
  cors({
    origin: "http://localhost:5173", // Change to your frontend URL
    credentials: true,
  })
);

// Routes
app.use("/api/v1", product);
app.use("/api/v1", userRouter);
app.use("/api/v1", orderRouter);

// Error Middleware
app.use(errorMiddlewares);

// Health check
app.get("/", (req, res) => {
  res.send("<h1>Bagify API is running!</h1>");
});

export default app;
