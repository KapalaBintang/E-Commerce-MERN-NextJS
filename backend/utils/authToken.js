import jwt from "jsonwebtoken";
import RefreshToken from "../model/refreshTokenModel.js";
import bcrypt from "bcryptjs";

const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || "secret", {
    expiresIn: "30d",
  });
};

const createAuthTokens = async (res, userId, isAdmin) => {
  try {
    const accessToken = createToken(userId);

    const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "7d",
    });

    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    console.log(expires);

    const salt = await bcrypt.genSalt(10);
    const hashedRefreshToken = await bcrypt.hash(refreshToken, salt);

    const newRefreshToken = new RefreshToken({
      userId,
      token: hashedRefreshToken,
      expires,
    });

    await newRefreshToken.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return { accessToken };
  } catch (error) {
    throw new Error(error.message);
  }
};

const revokeRefreshToken = async (refreshToken) => {
  await RefreshToken.findOneAndDelete({ token: refreshToken });
};

export { createToken, createAuthTokens, revokeRefreshToken };
