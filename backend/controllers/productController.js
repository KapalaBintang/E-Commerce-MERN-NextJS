import Product from "../model/productModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

// create product
const createProduct = asyncHandler(async (req, res) => {
  const { name, price, image, brand, quantity, category, countInStock, description } = req.fields;

  switch (true) {
    case !name:
      res.status(400);
      throw new Error("Please add a name");
    case !price:
      res.status(400);
      throw new Error("Please add a price");
    case !brand:
      res.status(400);
      throw new Error("Please add a brand");
    case !quantity:
      res.status(400);
      throw new Error("Please add a quantity");
    case !category:
      res.status(400);
      throw new Error("Please add a category");
    case !countInStock:
      res.status(400);
      throw new Error("Please add a countInStock");
    case !description:
      res.status(400);
      throw new Error("Please add a description");
    case !image:
      res.status(400);
      throw new Error("Please add an image");
    default:
  }

  const newProduct = new Product({
    ...req.fields,
  });

  await newProduct.save();
  res.status(201).json({ message: "Product created", data: newProduct });
});

// update product
const updateProductDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, price, brand, quantity, image, category, countInStock, description } = req.fields;

  console.log(id);
  console.log(req.fields);

  switch (true) {
    case !name:
      res.status(400);
      throw new Error("Please add a name");
    case !price:
      res.status(400);
      throw new Error("Please add a price");
    case !brand:
      res.status(400);
      throw new Error("Please add a brand");
    case !quantity:
      res.status(400);
      throw new Error("Please add a quantity");
    case !category:
      res.status(400);
      throw new Error("Please add a category");
    case !countInStock:
      res.status(400);
      throw new Error("Please add a countInStock");
    case !description:
      res.status(400);
      throw new Error("Please add a description");
    case !image:
      res.status(400);
      throw new Error("Please add an image");
    default:
  }

  try {
    const product = await Product.findById(id);

    if (!product) {
      res.status(400);
      throw new Error("Product not found");
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, req.fields, {
      new: true,
    });

    await updatedProduct.save();

    res.status(200).json({ message: "Product updated", data: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete product
const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const deleteProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deleteProduct) {
      res.status(400);
      throw new Error("Product not found");
    }
    res.status(200).json({
      message: "Product deleted",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get single product
const getProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (!product) {
      res.status(400);
      throw new Error("Product not found");
    }
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const getProduct = asyncHandler(async (req, res) => {
  try {
    const totalPage = 6;

    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const count = await Product.countDocuments({ ...keyword });
    const product = await Product.find({ ...keyword })
      .limit(totalPage)
      .skip((req.query.page - 1) * totalPage);
    res.status(200).json({ product, totalPage: Math.ceil(count / totalPage) });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// get all products
const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).populate("category").limit(12).sort({ createdAt: -1 });
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get new product
const getNewProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.find({}).sort({ id: -1 }).limit(4);

    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// get top products
const getTopProduct = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(4);
  res.status(200).json({ products });
});

// add product review
const addProductReview = asyncHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(400);
      throw new Error("Product not found");
    }

    const alreadyReviewed = product.reviews.find((r) => r.user.toString() === req.user._id.toString);

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.username,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

    await product.save();

    res.status(200).json({ message: "Review added" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export { createProduct, getAllProducts, getProduct, updateProductDetails, getProductById, deleteProduct, getNewProduct, getTopProduct, addProductReview };
