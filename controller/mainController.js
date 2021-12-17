const db = require("../database/models");

let mainController = {
  index: async (req, res) => {
    const sliderInfo = [
      { class: "item-a", img: "Imagen-principal.jpg" },
      { class: "item-a", img: "nike-futbol-women.jpg" },
      { class: "item-b", img: "Real-Madrid.jpg" },
      { class: "item-c", img: "botas-adidas.jpg" },
      { class: "item-d", img: "Puma-camisa.jpg" },
      { class: "item-e", img: "R.jpg" },
      { class: "item-a", img: "img-slider-women.jpg" },
    ];

    try {
      let products = await db.Product.findAll();
      // Aca primero filtramos por la categoria pelota y dentro de pelotas tendremos un nuevo array con los que cumplieron la condicion de fila 22.
      const pelotas = products.filter((producto) => {
        return producto.category_id == 1;
      });
      // Ahora lo que queremos es que el home solo tenga 3 pelotas, porque puede ser que tengamos 100 pelotas en la B. de Datos pero nosotros solo queremos 3 en el home
      let pelotasAEnviar = [];
      let cantidadDeIteraciones = 3; // le pongo por defecto 3 que es lo que quiero que este como maximo de pelotas en el home
      if (pelotas.length < 3) {
        // si la cantidad de elementos del array es menor a 3 porque elimine una pelota
        cantidadDeIteraciones = pelotas.length; // aca cantidad de iteracciones pase a tener 2 elementos
      }
      for (let i = 0; i < cantidadDeIteraciones; i++) {
        // aca voy a recorrer 2 veces el array en la posicion 0 y la 1 dado que ya elime una pelota
        pelotasAEnviar.push(pelotas[i]); // aca a pelotasAEnviar le agregamos(nuevo array), le vamos agregando los elementos en cada posicion
      }
      const camisetas = products.filter((producto) => {
        return producto.category_id == 2;
      });
      let camisetaAEnviar = [];
      cantidadDeIteraciones = 2;
      if (camisetas.length < 2) {
        cantidadDeIteraciones = camisetas.length;
      }
      for (let i = 0; i < cantidadDeIteraciones; i++) {
        camisetaAEnviar.push(camisetas[i]);
      }
      const botines = products.filter((producto) => {
        return producto.category_id == 5;
      });
      let botinAEnviar = [];
      cantidadDeIteraciones = 3;
      if (botines.length < 3) {
        cantidadDeIteraciones = botines.length;
      }
      for (let i = 0; i < cantidadDeIteraciones; i++) {
        botinAEnviar.push(botines[i]);
      }

      // Le vamos mandandando a la vista la variables que tiene un array para recorrerlo desde la vista.
      res.render("index", {
        sliderInfo,
        pelotasAEnviar,
        camisetaAEnviar,
        botinAEnviar,
      });
    } catch (error) {
      console.log(error);
      res.send("error");
    }
  },
  nosotros: (req, res) => {
    res.render("sobreNosotros");
  },
};
module.exports = mainController;
