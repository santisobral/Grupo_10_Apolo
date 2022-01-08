const db = require("../database/models");
const { validationResult } = require("express-validator");

const fs = require("fs");



let productController = {
  carrito: (req, res) => {
    res.render("product/productCart");
  },
  // Le vamos a enviar solo un producto a la vista
  detalle: (req, res) => {
    let promDetail = db.Product.findByPk(req.params.id);
    let promSizes = db.Size.findAll();
    Promise.all([promDetail, promSizes])
      .then(([product, sizes]) => {
        res.render("product/productDetail", {
          product,
          sizes,
        });
      })
      .catch((error) => {
        console.log(error);
        res.send("error");
      });
  },
  // (get) Create - Formulario para crear
  crearProducto: (req, res) => {
    let promCategories = db.Category.findAll();
    let promSizes = db.Size.findAll();
    Promise.all([promCategories, promSizes]).then(([categories, sizes]) => {
      return res.render("product/createProduct", { categories, sizes });
    });
  },
  // ************ (post) Create - Método para guardar la info ************
  store: (req, res) => {
    const resultValidations = validationResult(req);

    console.log(resultValidations.errors);
    if (resultValidations.errors.length > 0) {
      // si es mayor a cero es porque hay errores
      let promCategories = db.Category.findAll();
      let promSizes = db.Size.findAll();
      Promise.all([promCategories, promSizes]).then(([categories, sizes]) => {
        return res.render("product/createProduct", {
          categories,
          sizes,
          errors: resultValidations.mapped(),
          oldData: req.body,
        });
      });
    } else { // si pasamos las validaciones continuamos con la creacion del producto
      db.Product.create({
        id: req.params.id,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        brand: req.body.brand,
        size_id: req.body.size_id,
        category_id: req.body.category_id,
        discount: req.body.discount,
        image: req.file ? req.file.filename : "default-image.jpg",
        gender: req.body.gender,
        deleted: 0,
      })
        .then(() => {
          // el then no lleva parametro porque no estas esperando nada de la base de datos x qu estas creando una pelicula
          res.redirect("/product/productList");
        })
        .catch((error) => {
          console.log(error);
          res.send("error");
        });
    }
   
  },
  // ************ (Get) editar un producto - Método que nos trae la vista del formulario para editar un producto ************
  editarProducto: (req, res) => {
    let productId = req.params.id;
    let promEdit = db.Product.findByPk(productId, {
      include: [{ association: "category" }, { association: "size" }],
    });
    let promSizes = db.Size.findAll();
    let promCategories = db.Category.findAll();
    Promise.all([promEdit, promSizes, promCategories]) // si tengo mas de una promesa y quiero esperar a tener estas 3 promesas, tengo que poner el Peomise.all
      .then(([product, sizes, categories]) => {
        return res.render("product/editProduct", {
          product,
          sizes,
          categories,
        });
      })
      .catch((error) => {
        console.log(error);
        res.send("error");
      });
  },
  // ************ (get)  - Método para devolver la lista de productos ************
  listaDeProductos: (req, res) => {
    db.Product.findAll() // db es la base de datos y Product es el alias del modelo Product
      .then((products) => {
        res.render("product/productList", { products });
      })
      .catch((error) => {
        console.log(error);
        res.send("error");
      });
  },
  category: (req, res) => {
    db.Product.findAll()
      .then((products) => {
        res.render("product/categoryProduct", {
          products,
          category: req.params.id,
        });
      })
      .catch((error) => {
        console.log(error);
        res.send("error");
      });
  },
  // Barra de busqueda que filtra segun el nombre y con el like buscas por palabras en la base de datos
  search: (req, res) => {
    db.Product.findAll({
      where: {
        name: {
          [db.Sequelize.Op.like]: "%" + req.body.searching + "%", // aca el req.body.searching va fuera de las comillas porque es una variable
          // que trae de forma dinamica lo que pones en barra de busqueda
        },
      },
    })
      .then((products) => {
        res.render("product/searchProducts", {
          products,
        });
      })
      .catch((error) => {
        console.log(error);
        res.send("error");
      });
  },
  // Nos muestra los productos en oferta
  sale: (req, res) => {
    let productToFilter = 10; // en esta variable decidimos a partir de que porcentaje se considera en oferta
    db.Product.findAll({
      where: {
        discount: { [db.Sequelize.Op.gte]: productToFilter }, // aca queremos que nos filtre cuando el descuento es >= a 10
      },
    })
      .then((products) => {
        res.render("product/saleProduct", {
          products,
        });
      })
      .catch((error) => {
        console.log(error);
        res.send("error");
      });
  },
  season: (req, res) => {
    res.render("product/newSeasonProduct", {
      products,
      season: req.params.id,
    });
  },
  // ************ (put) editar - Método para editar la info que se envia desde el Formulario y que se almacenara en la base de datos ************
  update: (req, res) => {
    const resultValidations = validationResult(req);

    console.log(resultValidations.errors);
    if (resultValidations.errors.length > 0) {
      let productId = req.params.id;
      let promEdit = db.Product.findByPk(productId, {
        include: [{ association: "category" }, { association: "size" }],
      });
      let promSizes = db.Size.findAll();
      let promCategories = db.Category.findAll();
      Promise.all([promEdit, promSizes, promCategories]) // si tengo mas de una promesa y quiero esperar a tener estas 3 promesas, tengo que poner el Peomise.all
        .then(([product, sizes, categories]) => {
          return res.render("product/editProduct", {
            product,
            sizes,
            categories,
            errors: resultValidations.mapped(),
            oldData: req.body,
          });
        })
        .catch((error) => {
          console.log(error);
          res.send("error");
        });
    } else {
      db.Product.findByPk(req.params.id)

      .then((product) => {
        db.Product.update(
          {
            // en todos los campos debe coincidir el name del form de editar menos en la imagen ya que lo trae de la base de datos
            id: req.params.id,
            name: req.body.name, // aca vamos a guardar a la info que viene de el form de cracion del producto. Es un objeto literal con la propiedad y su valor
            description: req.body.description, // aca vamos a guardar a la info que viene de el form de cracion del producto. Es un objeto literal con la propiedad y su valor
            price: req.body.price, // aca vamos a guardar a la info que viene de el form de cracion del producto. Es un objeto literal con la propiedad y su valor
            brand: req.body.brand,
            size_id: req.body.size_id,
            category_id: req.body.category_id, // aca vamos a guardar a la info que viene de el form de cracion del producto. Es un objeto literal con la propiedad y su valor
            discount: req.body.discount, // aca vamos a guardar a la info que viene de el form de cracion del producto. Es un objeto literal con la propiedad y su valor
            image: req.file ? req.file.filename : product.image,
            gender: req.body.gender,
            deleted: 0,
          },
          {
            where: { id: req.params.id },
          }
        );
      })
      .then(() => {
        // aca se pone el then porque una vez que se actualiza la base de datos recien ahi te va dejar continuar y hacer el redirect
        res.redirect("/product/productList");
      });
    }
    
  },
  // ************ (delete)  - Método para eliminar un producto de la base de datos ************
  destroy: (req, res) => {
    db.Product.destroy({
      where: { id: req.params.id },
    }).then(() => {
      res.redirect("/product/productList");
    });
  },
};

module.exports = productController;
