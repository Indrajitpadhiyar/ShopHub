import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    phone: {
      type: Number,
      default: null,
    },
    address: {
      type: String,
      default: null,
    },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, minimize: false }
);

userSchema.static.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

userSchema.method.isPasswordMatch = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.method.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
  return token;
};
const User = mongoose.model("User", userSchema);

export default User;
