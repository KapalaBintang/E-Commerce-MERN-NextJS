import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  token: { type: String, required: true },
  expires: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);

export default RefreshToken;
