import express from "express";
import { createUser, loginUser, logoutUser, getAllUsers, getCurrentProfileUser, updateCurrentUserProfile, deleteUserById, getUserById, updateUserById } from "../controllers/useController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import { refreshToken } from "../middlewares/refreshToken.js";
const router = express.Router();

router.route("/").post(createUser).get(authenticate, authorizeAdmin, getAllUsers);
router.post("/login", loginUser);
router.get("/refresh-token", refreshToken);
router.post("/logout", logoutUser);
router.route("/profile").get(authenticate, getCurrentProfileUser).put(authenticate, updateCurrentUserProfile);

// admin route
router.route("/:id").delete(authenticate, authorizeAdmin, deleteUserById).get(authenticate, authorizeAdmin, getUserById).put(authenticate, authorizeAdmin, updateUserById);
export default router;
