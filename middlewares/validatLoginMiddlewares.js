
const {body} = require("express-validator");


module.exports = [
       body("email")
         .notEmpty().withMessage("Tenes que escibir un email").bail()
         .isEmail().withMessage("Debes escribir un formato de correo valido"),// NO ME FUNCIONO
       body("password").notEmpty().withMessage("Tenes que escibir una Contrasena"),
     ];
    