var express = require('express');
var router = express.Router();
const multer = require("multer");

let usersController = require("../controller/usersController");
const guestMiddlewares = require("../middlewares/gustMiddlewares"); // es un middlewares a nivel de ruta
const loggedMiddleware = require("../middlewares/loggedMiddleware"); // es un middlewares a nivel de ruta


const storage = multer.diskStorage({
    destination: function(req ,file,cb) {
     cb(null, "./public/img")
    },
    filename:  function(req ,file,cb) { // aca le damos un nuevo al archivo y lo guardamos en la carpeta de la fila 12
        cb(null, Date.now() + file.originalname) // aca le pasamos a el controlador la info del archivo
       }
})

const upload = multer({storage});
// Devolver el formulario de login 
router.get("/login",guestMiddlewares,usersController.login);// si ya tenemos al alguien en session se activa el middlewares, caso contrario sigue al controlador
router.post("/login",usersController.userProcess);

// Devolver el formulario de register
router.get("/register",guestMiddlewares ,usersController.register);
router.post("/register",upload.single("image"), usersController.saveUsers);

// Devuelve la vista del profile
 router.get("/profile",loggedMiddleware,usersController.profile)
//Logout
 router.get("/logout",usersController.logout);



module.exports = router