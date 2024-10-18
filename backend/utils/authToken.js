import jwt from "jsonwebtoken";
import RefreshToken from "../model/refreshTokenModel.js";
import bcrypt from "bcryptjs";

const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || "secret", {
    expiresIn: "30m",
  });
};

const createAuthTokens = async (res, userId) => {
  try {
    const accessToken = createToken(userId);

    const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "7d",
    });

    const newRefreshToken = new RefreshToken({
      userId,
      token: refreshToken,
    });

    await newRefreshToken.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { accessToken };
  } catch (error) {
    throw new Error(error.message);
  }
};

const revokeRefreshToken = async (refreshToken) => {
  console.log("ini refresh token revoke", refreshToken);
  try {
    // Verifikasi refresh token dengan JWT
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    // console.log("ini decoded", decoded);

    const foundToken = await RefreshToken.findOne({ userId: decoded.userId });
    // console.log("ini foundToken", foundToken);
    // console.log("ini refresh token", refreshToken);

    if (!foundToken) {
      throw new Error("Invalid refresh token");
    }

    // Hapus refresh token dari database
    await RefreshToken.deleteOne({ _id: foundToken._id });
  } catch (error) {
    throw new Error("Invalid refresh token");
  }
};

export { createToken, createAuthTokens, revokeRefreshToken };
