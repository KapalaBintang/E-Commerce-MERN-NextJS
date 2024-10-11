import User from "../model/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import { revokeRefreshToken, createAuthTokens, createToken } from "../utils/authToken.js";

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    throw new Error("Please add all fields");
  }

  const userExist = await User.findOne({ email });

  if (userExist) {
    throw new Error("User already Exist");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// const findUser = await User.findOne({ email }).select("+password");

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const findUser = await User.findOne({ email });

  if (findUser) {
    try {
      const match = await bcrypt.compare(password, findUser.password);

      if (match) {
        const user = await createAuthTokens(res, findUser._id);

        console.log(user);

        res.status(200).json({
          user,
          username: findUser.username,
          isAdmin: findUser.isAdmin,
        });
      } else {
        res.status(400).send("Invalid credentials");
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    throw new Error("No refresh token");
  }

  await revokeRefreshToken(refreshToken);
  res.clearCookie("refreshToken");

  res.status(200).json({ message: "Logged out successfully" });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

const getCurrentProfileUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    try {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } catch (error) {
      throw new Error("Invalid user data");
    }
  } else {
    throw new Error("User not found");
  }
});

const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const { username, email } = req.body;

  if (user) {
    try {
      user.username = username || user.username;
      user.email = email || user.email;

      if (req.body.password) {
        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync(req.body.password, salt);
        user.password = hash;
      }

      const updatedUser = await user.save();

      res.status(200).json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } catch (error) {
      throw new Error("Invalid user data");
    }
  } else {
    throw new Error("User not found");
  }
});

const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  res.status(200).json({ message: "User deleted" });
});

const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  const { username, email, password } = req.body;

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  user.username = username || user.username;
  user.email = email || user.email;
  if (password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;
  }

  const updatedUser = await user.save();
  res.status(200).json({
    _id: updatedUser._id,
    username: updatedUser.username,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
  });
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }
  res.status(200).json(user);
});
export { createUser, loginUser, logoutUser, getAllUsers, getCurrentProfileUser, updateCurrentUserProfile, deleteUserById, getUserById, updateUserById };
