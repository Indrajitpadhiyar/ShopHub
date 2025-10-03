import mongoose from "mongoose";

function connectDB() {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("mongoDb Is Connected.......");
  });
}

export default connectDB;
