import Category from "../model/categoryModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const category = await Category.findOne({ name });

  if (category) {
    res.status(400);
    throw new Error("Category already exist");
  } else {
    const newCategory = new Category({
      name,
    });

    await newCategory.save();
    res.status(201).json({ message: "Category created", data: newCategory });
  }
});

const fetchAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  res.status(200).json({ categories });
});

const fetchCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(400);
    throw new Error("Category not found");
  }

  res.status(200).json({ category });
});

const updateCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(400);
    throw new Error("Category not found");
  }

  category.name = name;

  await category.save();

  res.status(200).json({ message: "Category updated", data: category });
});

const deleteCategory = asyncHandler(async (req, res) => {
  const deleteCategory = await Category.findByIdAndDelete(req.params.id);
  if (!deleteCategory) {
    res.status(400);
    throw new Error("Category not found");
  }
  res.status(200).json({
    message: "Category deleted",
  });
});

export { createCategory, fetchAllCategories, fetchCategoryById, updateCategory, deleteCategory };
