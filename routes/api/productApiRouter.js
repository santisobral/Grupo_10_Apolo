const express = require('express');
const router = express.Router();
const productApiController = require('../../controller/api/productApiController');

// Devuelve todos los productos
router.get("/",productApiController.list);
// Devuelve el detalle de un producto
router.get('/:id', productApiController.detail);





module.exports = router