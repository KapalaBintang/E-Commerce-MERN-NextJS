import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import RefreshToken from "../model/refreshTokenModel.js";
import bcrypt from "bcryptjs";

const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;
  const { userId } = req.params;

  if (!refreshToken) {
    throw new Error("No refresh token");
  }

  const storedToken = await RefreshToken.findOne({ userId });
  console.log("ini rftkn", refreshToken);
  console.log("ini storedToken", storedToken);

  const isRefreshTokenValid = await bcrypt.compare(refreshToken, storedToken.token);

  if (!isRefreshTokenValid) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }

  try {
    const decode = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const accessToken = jwt.sign({ userId: decode.userId, isAdmin: decode.isAdmin }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(401).json({ message: "Invalid refresh token" });
  }
});

export { refreshToken };
