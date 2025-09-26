import User from "../models/user.model";

export const createUser = async ({ name, email, password }) => {
  if (!name || !email || !password) {
    throw new Error("Name, email, and password are required");
  }
  if (await User.findOne({ name })) {
    throw new Error("Username already in use");
  }
  if (await User.findOne({ email })) {
    throw new Error("Email already in use");
  }

  console.log("Creating user with data:", { name, email, password });

  const hashedPassword = await User.hashPassword(password);
  const user = new User({
    name,
    email,
    password: hashedPassword,
  });
  await user.save();
  return user;
};

export const getUSer = async ({ userId }) => {
  try {
    const users = await User.findOne({ _id: { $ne: userId } })
      .select("-password -isAdmin -__v -createdAt -updatedAt")
      .lean();
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};
