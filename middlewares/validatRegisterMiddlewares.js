const path = require("path");
const {body} = require("express-validator");


module.exports = [
       body("name").notEmpty().withMessage("Tenes que escibir un nombre"),// el msg que le damos si lo deja en blanco
       body("lastname").notEmpty().withMessage("Tenes que escibir un apellido"),// el msg que le damos si lo deja en blanco
       body("birthdate").notEmpty().withMessage("Tenes que escibir una Fecha de Nacimiento"),// el msg que le damos si lo deja en blanco
       body("email")
         .notEmpty().withMessage("Tenes que escibir un email").bail()
         .isEmail().withMessage("Debes escribir un formato de correo valido"),// NO ME FUNCIONO
       body("password").notEmpty().withMessage("Tenes que escibir una Contrasena"),
       body("image").custom((value,{ req}) =>{
         let file = req.file;
         let aceptedExtension = [".jpg",".png",".gif"];
         if(!file){
           throw new Error("Tienes que subir una imagen")
         }else {
           let fileExtension = path.extname(file.originalname);
           if(!aceptedExtension.includes(fileExtension)) {
             throw new Error(`Las extensiones de archivos permitidos son ${aceptedExtension.join(", ")}`)
           }
         }
          return true
       })
    
     ];
    