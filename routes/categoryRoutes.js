const express = require("express");
const {
  getCategories,
  createCategory,
  deleteCategory,
  updateCategory,
} = require("../controllers/categoryController");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

const router = express.Router();

router.get("/category", getCategories);

router.post("/category", auth, authAdmin, createCategory);

router.delete("/category/:id", auth, authAdmin, deleteCategory);

router.put("/category/:id", auth, authAdmin, updateCategory);

module.exports = router;
