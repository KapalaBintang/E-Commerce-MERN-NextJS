import express from "express";
import { createUser, loginUser, logoutUser, getAllUsers, getCurrentProfileUser, updateCurrentUserProfile, refreshAccessToken } from "../controllers/useController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.route("/").post(createUser).get(authenticate, authorizeAdmin, getAllUsers);
router.post("/auth", loginUser);
router.post("/refresh-token", refreshAccessToken);
router.post("/logout", logoutUser);
router.route("/profile").get(authenticate, getCurrentProfileUser).put(authenticate, updateCurrentUserProfile);

export default router;
