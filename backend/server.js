// server.js
import "dotenv/config";
import app from "./app.js";
import connectDB from "./src/config/db.js";
import cloudinary from "cloudinary";

const PORT = process.env.PORT || 5000;

// Cloudinary Config (after dotenv)
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Connect to DB
connectDB();

// Start Server
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("SIGINT received - shutting down");
  server.close(() => process.exit(0));
});
process.on("SIGTERM", () => {
  console.log("SIGTERM received - shutting down");
  server.close(() => process.exit(0));
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  server.close(() => process.exit(1));
});
