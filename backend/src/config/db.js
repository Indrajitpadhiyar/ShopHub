import mongoose from "mongoose";

function connectDB() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("mongoDb Is Connected.......");
    })
    .catch((err) => {
      console.log("mongodb connection errorrrrrrrr",err);
    });
}

export default connectDB;
