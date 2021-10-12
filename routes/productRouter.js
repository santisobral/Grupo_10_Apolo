var express = require('express');
var router = express.Router();

let productController = require("../controller/productController");

router.get("/productCart",productController.carrito);
router.get("/productdetail",productController.detalle);
router.get("/createProduct",productController.crearProducto);
router.get("/editProduct",productController.editarProducto)


module.exports = router



