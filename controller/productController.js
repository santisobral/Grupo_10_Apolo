const fs = require('fs');
const path = require("path");


const productsFilePath = path.join(__dirname, '../data/products.json');
 const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


let productController = {
    carrito: (req, res) => {
     
     res.render("product/productCart")
    },
    // Le vamos a enviar solo un producto a la vista
    detalle: (req, res) => {
      const product = products.find(producto =>{
        return producto.id == req.params.id
     });
     
  
       res.render("product/productDetail",{
         product
       })
      },
      // (get) Create - Formulario para crear
      crearProducto: (req, res) => {
       
  
        res.render("product/createProduct")
       },
        // ************ (post) Create - Método para guardar la info ************
       store: (req, res) => {
       
        let newProducts = { // aca estamos creando el producto, pero no lo estamos guardando en el json, para eso lo hacemos en la fila
          id: products[products.length - 1].id + 1, // Este campo no llega desde el form, dado que el usuario no elige este numero
                name: req.body.name ,// aca vamos a guardar a la info que viene de el form de cracion del producto. Es un objeto literal con la propiedad y su valor
                price: req.body.price,// aca vamos a guardar a la info que viene de el form de cracion del producto. Es un objeto literal con la propiedad y su valor
                discount: req.body.discount ,// aca vamos a guardar a la info que viene de el form de cracion del producto. Es un objeto literal con la propiedad y su valor
                gender:  req.body.gender,
                category: req.body.category ,// aca vamos a guardar a la info que viene de el form de cracion del producto. Es un objeto literal con la propiedad y su valor
                brand: req.body.brand ,
                size: req.body.size,
               description: req.body.description ,// aca vamos a guardar a la info que viene de el form de cracion del producto. Es un objeto literal con la propiedad y su valor
               image: req.file.filename,
               sale: req.body.sale ,
        };
        products.push(newProducts);
        fs.writeFileSync(productsFilePath, JSON.stringify(products,null, " "));
        
        res.redirect("/product/productList")
       },
        // ************ (Get) editar un producto - Método que nos trae la vista del formulario para editar un producto ************
       editarProducto: (req, res) => {
        const product = products.find(producto =>{
          return producto.id == req.params.id
       });
  
        res.render("product/editProduct", {product})
       },
        // ************ (get)  - Método para devolver la lista de productos ************
       listaDeProductos: (req, res) => { // Porque funciona sin el find, al ir desde una img de productList a productDetail
        
  
        res.render("product/productList",{
          products
        })
       },
        // ************ (put) editar - Método para editar la info que se envia desde el Formulario y que se almacenara en la base de datos ************
       update: (req, res) => { 
        let id = req.params.id;
		let productToEdit = products.find(product =>{ // aca te busca el id que viene por url pero del array original
			return product.id == id
		});
		let editProducts = { 
			id: id, // aca en la propiedad id tenemos guardado el id que viene por url de la fila 73
      name: req.body.name ,// aca vamos a guardar a la info que viene de el form de cracion del producto. Es un objeto literal con la propiedad y su valor
      price: req.body.price,// aca vamos a guardar a la info que viene de el form de cracion del producto. Es un objeto literal con la propiedad y su valor
      discount: req.body.discount ,// aca vamos a guardar a la info que viene de el form de cracion del producto. Es un objeto literal con la propiedad y su valor
      gender:  req.body.gender,
      category: req.body.category ,// aca vamos a guardar a la info que viene de el form de cracion del producto. Es un objeto literal con la propiedad y su valor
      brand: req.body.brand ,
      size: req.body.size,
     description: req.body.description ,// aca vamos a guardar a la info que viene de el form de cracion del producto. Es un objeto literal con la propiedad y su valor
     image: req.file ? req.file.filename: productToEdit.image,// aca estamos preguntando, si existe un archivo queremos que nos traiga el archivo, caso contrario quede el archivo original
     sale: req.body.sale 
		}
		//Modificamos el array
		products.forEach((producto,index) => {
			if(producto.id == id){
				products[index] = editProducts
			}
		});
		fs.writeFileSync(productsFilePath, JSON.stringify(products,null, " "));
		res.redirect("/product/productList") 
	},
     // ************ (delete)  - Método para eliminar un producto de la base de datos ************
	destroy : (req, res) => {
		// Eliminamos el producto que llegó por parametro su ID
		//res.send("Producto con id " + req.params.id + " eliminado!")
      let id = req.params.id;
	  // Modificamos el array
	  let finalProducts = products.filter(producto =>{
         return producto.id != id
		 
	  });

		fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts,null, " "));
		res.redirect("/product/productList") 
	}
       
       
     

}

module.exports = productController


