import jwt from "jsonwebtoken";
import RefreshToken from "../model/refreshTokenModel.js";

const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || "secret", {
    expiresIn: "15m",
  });
};

const createAuthTokens = async (res, userId) => {
  const accesToken = createToken(userId);

  const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });

  const expires = new Date();
  expires.setDate(expires.getDate() + 7);

  const newRefreshToken = new RefreshToken({
    userId,
    token: refreshToken,
    expires,
  });

  await newRefreshToken.save();

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return accesToken;
};

const revokeRefreshToken = async (refreshToken) => {
  await RefreshToken.findOneAndDelete({ token: refreshToken });
};

export { createToken, createAuthTokens, revokeRefreshToken };
