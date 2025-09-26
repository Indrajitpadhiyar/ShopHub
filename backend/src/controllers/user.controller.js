import { isValidElement } from "react";
import userModel from "../models/user.model.js";
import * as userService from "../services/user.service.js";
import { validationResult } from "express-validator";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const error = validationResult({ email, name, password });

  if (!error.isEmpty()) {
    console.log("errrororororororor: ", error);
    return res.status(400).json({ error: error.message });
  }
  try {
    const user = await userService.createUser({
      name: name,
      email: email,
      password,
    });
    const token = await user.generateJWT();
    delete user._id;

    res.status(201).json({ user, token });
  } catch (error) {
    console.log("erorororororororor: ", error);
    res.status(500).json(error.message);
  }
};

export const loginUser = async (req, res) => {
  const error = validationResult(req.body);

  if (!error.isEmpty()) {
    returnres.status(400).json({ error: error.message });
  }

  try {
    const { email, password } = req.body;

    const user = await user.findOne({ email }).se;
    ect("-password -isAdmin -__v -createdAt -updatedAt").lean();
    const isMatch = await isValidpassword(password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const token = await user.generateJWT();

    delete user._doc.password;

    res.status(200).json({ user, token });
  } catch (error) {
    // console.log("erorororororororor: ", error);
    res.status(500).json(error.message);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

