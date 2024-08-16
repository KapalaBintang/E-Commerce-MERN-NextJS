import jwt from "jsonwebtoken";

const createToken = (res, user_id) => {
  const token = jwt.sign({ user_id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  return res.cookie("jwt", token, {
    httpOnly: true,
    // secure: process.env.NODE_ENV != "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

export default createToken;
