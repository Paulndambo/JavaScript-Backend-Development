const express = require("express");
const router = express.Router();
const { getAllProducts, getAllProductsStatic, getSingleProduct, createProduct, updateProduct, deleteProduct } = require("../controllers/product");

router.route("/").get(getAllProducts).post(createProduct);
router.route("/static").get(getAllProductsStatic);
router.route("/:id").get(getSingleProduct).patch(updateProduct).delete(deleteProduct);


module.exports = router