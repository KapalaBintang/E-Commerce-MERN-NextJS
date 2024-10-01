import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../model/userModel.js";

const authenticate = asyncHandler(async (req, res, next) => {
  // let token = req.cookies.refreshToken;

  let header = req.headers.authorization || req.headers.Authorization;

  if (!header.startsWith("Bearer")) {
    res.status(401).json({ message: "No token" });
  }

  let token = header.split(" ")[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("ini decoded", decoded);
      req.user = await User.findById(decoded.id).select("-password");
      console.log("ini req.user", req.user);
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

export { authenticate, authorizeAdmin };
