const path = require("path");

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

     ]
     res.render("index",{sliderInfo})
    }
}

module.exports = mainController