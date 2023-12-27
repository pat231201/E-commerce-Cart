const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProduct,
  updateProduct,
  addProduct,
} = require("../controllers/productController");

router.get("/", getAllProducts);
router.get("/:id", getProduct);
router.put("/add", addProduct);
router.patch("/:id", updateProduct);

module.exports = router;
