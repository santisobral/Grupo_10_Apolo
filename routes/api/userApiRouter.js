const express = require('express');
const router = express.Router();
const userApiController = require('../../controller/api/userApiController');

// Devuelve todos los usuario
router.get("/",userApiController.list);
// Devuelve el detalle de un usuario
router.get('/:id', userApiController.detail);





module.exports = router