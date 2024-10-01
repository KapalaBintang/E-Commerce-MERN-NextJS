import express from "express";
import { createUser, loginUser, logoutUser, getAllUsers, getCurrentProfileUser, updateCurrentUserProfile } from "../controllers/useController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import { refreshToken } from "../middlewares/refreshToken.js";
const router = express.Router();

router.route("/").post(createUser).get(authenticate, authorizeAdmin, getAllUsers);
router.post("/auth", loginUser);
router.get("/:userId/refresh-token", refreshToken);
router.post("/logout", logoutUser);
router.route("/profile").get(authenticate, getCurrentProfileUser).put(authenticate, updateCurrentUserProfile);

export default router;
