import express from "express";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import { createProduct, getAllProducts, updateProductDetails, getProductById, deleteProduct, getProduct, getNewProduct, getTopProduct, addProductReview } from "../controllers/productController.js";
import ExpressFormidable from "express-formidable";

const router = express.Router();

router.route("/").post(authenticate, authorizeAdmin, ExpressFormidable(), createProduct).get(getAllProducts);

router.route("/searchProduct").get(getProduct);
router.route("/fetchNewProduct").get(getNewProduct);

router.route("/:id/reviews").post(authenticate, authorizeAdmin, addProductReview);
router.route("/topProducts").get(getTopProduct);

router.route("/:id").put(authenticate, authorizeAdmin, ExpressFormidable(), updateProductDetails).get(authenticate, authorizeAdmin, getProductById).delete(authenticate, authorizeAdmin, deleteProduct);

export default router;
