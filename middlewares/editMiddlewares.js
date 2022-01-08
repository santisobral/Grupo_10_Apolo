const path = require("path");
const {body} = require("express-validator");


module.exports = [
       body("name").notEmpty().withMessage("Tenes que escribir un nombre").isLength({min:5}).withMessage("Tenes que escibir como minimo 5 caracteres"),// el msg que le damos si lo deja en blanco
       body("description").notEmpty().withMessage("Tenes que escribir una descripcion").isLength({min:20}).withMessage("Tenes que escibir como minimo 20 caracteres"),// el msg que le damos si lo deja en blanco
       // Para la imagen solo validamos en el caso de que se suba una imagen que tiene que ser de las extensiones detalla mas abajo
      body("image").custom((value, {req}) => {
         let file = req.file;
         let aceptedExtension = [".jpg",".png",".gif"];
         if(file){
          let fileExtension = path.extname(file.originalname);
        
          if(!aceptedExtension.includes(fileExtension)) {
            throw new Error(`Las extensiones de archivos permitidos son ${aceptedExtension.join(", ")}`)
           }
         }
        
         return true
      })
      
     ];