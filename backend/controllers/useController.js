import User from "../model/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import { revokeRefreshToken, createAuthTokens, createToken } from "../utils/authToken.js";
import jwt from "jsonwebtoken";

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password, isAdmin } = req.body;
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
    const accessToken = await createAuthTokens(res, newUser._id);

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      password: newUser.password,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// const findUser = await User.findOne({ email }).select("+password");

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error("Please add all fields");
  }

  const findUser = await User.findOne({ email });

  if (findUser) {
    try {
      const match = await bcrypt.compare(password, findUser.password);

      if (match) {
        console.log(match);
        console.log(findUser._id);
        await createAuthTokens(res, findUser._id);

        res.status(200).json({
          _id: findUser._id,
          username: findUser.username,
          password: findUser.password,
          email: findUser.email,
          isAdmin: findUser.isAdmin,
        });

        return;
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

const refreshAccessToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    throw new Error("No refresh token");
  }

  const storedToken = await RefreshToken.findOne({
    token: refreshToken,
  });

  if (!storedToken || storedToken.expires < Date.now()) {
    return res.status(403).json({ message: "Refresh token expired or invalid" });
  }

  try {
    const decode = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const newAccesToken = createToken(res, decode.user_id);

    res.status(200).json({ accesToken: newAccesToken });
  } catch (error) {
    res.status(401).json({ message: "Invalid refresh token" });
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

export { createUser, loginUser, logoutUser, refreshAccessToken, getAllUsers, getCurrentProfileUser, updateCurrentUserProfile };
