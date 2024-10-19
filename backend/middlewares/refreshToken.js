import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import RefreshToken from "../model/refreshTokenModel.js";

const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    throw new Error("No refresh token");
  }

  const storedToken = await RefreshToken.findOne({ token: refreshToken });

  console.log("ini storedToken", storedToken);

  if (!storedToken) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }

  try {
    const decode = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    if (!decode) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const accessToken = jwt.sign({ userId: decode.userId }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    console.log("ini accessToken", accessToken);

    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(401).json({ message: "Invalid refresh token" });
  }
});

export { refreshToken };
