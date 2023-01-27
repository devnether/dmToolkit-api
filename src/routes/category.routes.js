const { Router } = require("express");
const {
  getAllcategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");

const router = Router();

router.get("/category", getAllcategories);
router.get("/category/:id", getCategory);
router.post("/category", createCategory);
router.put("/category/:id", updateCategory);
router.delete("/category/:id", deleteCategory);

module.exports = router;
