import express from "express";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import { createCategory, fetchAllCategories, fetchCategoryById, updateCategory, deleteCategory } from "../controllers/categoryController.js";

const router = express.Router();

router.route("/").post(authenticate, authorizeAdmin, createCategory).get(fetchAllCategories);

router.route("/:id").get(authenticate, authorizeAdmin, fetchCategoryById).put(authenticate, authorizeAdmin, updateCategory).delete(authenticate, authorizeAdmin, deleteCategory);

export default router;
