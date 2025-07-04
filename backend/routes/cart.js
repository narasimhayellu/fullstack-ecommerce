const express = require("express");
const { saveCart, getCart } = require("../controllers/cartControllers");
const router = express.Router();

router.post("/save", saveCart);
router.get("/:userId", getCart);

module.exports = router;
