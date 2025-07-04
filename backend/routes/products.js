const express = require("express");
const { getProducts, getProductsById, postProducts, updateProduct, deleteProduct } = require("../controllers/productControllers");
const router = express.Router();

router.get("/", getProducts);

router.get("/:id",getProductsById);

router.post("/",postProducts);

router.put("/:id",updateProduct);

router.delete("/:id",deleteProduct);

module.exports = router;