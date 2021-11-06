var express = require('express');
var router = express.Router();
const multer = require("multer");


// ************ Requiero la funcionalidad del controlador ************
let productController = require("../controller/productController");

// ************ Configuracion de Multer ************
const storage = multer.diskStorage({
    destination: function(req ,file,cb) {
     cb(null, "./public/img")
    },
    filename:  function(req ,file,cb) { // aca le damos un nuevo al archivo y lo guardamos en la carpeta de la fila 12
        cb(null, Date.now() + file.originalname) // aca le pasamos a el controlador la info del archivo
       }
})

const upload = multer({storage});

// ************ Configuracion de las rutas ************
// Devolver todos los productos  
router.get("/productList",productController.listaDeProductos);
router.post("/productList",upload.single("image"),productController.store);
// Crear un producto
router.get("/createProduct",productController.crearProducto);

// Devolver un producto 
router.get("/productdetail/:id",productController.detalle);
// Editar un producto 
router.get("/editProduct/:id",productController.editarProducto)
router.put("/editProduct/:id",upload.single("editImage"),productController.update)
// Eliminar un producto 
router.delete("/delete/:id",productController.destroy)



router.get("/productCart",productController.carrito);






module.exports = router



