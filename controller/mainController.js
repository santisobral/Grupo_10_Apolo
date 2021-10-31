const fs = require('fs');

const path = require("path");

 const productsFilePath = path.join(__dirname, '../data/products.json');
 const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

let mainController = {
    index: (req, res) => {
     const sliderInfo = [
         {class: "item-a",img:"Imagen-principal.jpg"},
         {class: "item-a",img:"nike-futbol-women.jpg"},
         {class: "item-b",img:"Real-Madrid.jpg"},
         {class: "item-c",img:"botas-adidas.jpg"},
         {class: "item-d",img:"Puma-camisa.jpg"},
         {class: "item-e",img:"R.jpg"},
         {class: "item-a",img:"img-slider-women.jpg"},

     ];
     // Aca primero filtramos por la categoria pelota y dentro de pelotas tendremos un nuevo array con los que cumplieron la condicion de fila 22.
     const pelotas = products.filter(producto =>{
        return producto.category == "pelota"
     });
     // Ahora lo que queremos es que el home solo tenga 3 pelotas, porque puede ser que tengamos 100 pelotas en la B. de Datos pero nosotros solo queremos 3 en el home
     let pelotasAEnviar = [] ;
     for (let i= 0; i < 3; i++) {
         pelotasAEnviar.push(pelotas[i]) // aca a pelotasAEnviar le agregamos(nuevo array), le vamos agregando los elementos en cada posicion
         
     }
     const camisetas = products.filter(producto =>{
        return producto.category == "Camiseta"
     });
     let camisetaAEnviar = [] ;
     for (let i= 0; i < 2; i++) {
         camisetaAEnviar.push(camisetas[i])
         
     }
     const botines = products.filter(producto =>{
        return producto.category == "Botin"
     });
     let botinAEnviar = [] ;
     for (let i= 0; i < 3; i++) {
         botinAEnviar.push(botines[i])
         
     }
    // Le vamos mandandando a la vista la variables que tiene un array para recorrerlo desde la vista.
     res.render("index",{
         sliderInfo,
         products,
         pelotasAEnviar,
         camisetaAEnviar,
         botinAEnviar
        })
     }
     
}

module.exports = mainController