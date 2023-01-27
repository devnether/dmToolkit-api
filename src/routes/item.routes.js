const { Router } = require("express");
const {
  getAllItems,
  getItem,
  createItem,
  alterItem,
  deleteItem,
} = require("../controllers/item.controller");

const router = Router();

router.get("/items", getAllItems);
router.get("/items/:id", getItem);
router.post("/items", createItem);
router.put("/items/:id", alterItem);
router.delete("/items/:id", deleteItem);

module.exports = router;
