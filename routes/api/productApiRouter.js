const express = require('express');
const router = express.Router();
const productApiController = require('../../controller/api/productApiController');

// Devuelve todos los productos
router.get("/",productApiController.list);
// Devuelve los productos por pagina
router.get("/paginate",productApiController.paginate);
// Devuelve el detalle de un producto
router.get('/:id', productApiController.detail);





module.exports = router