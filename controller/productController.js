
const path = require("path");

let productController = {
    carrito: (req, res) => {
     
     res.render("product/productCart")
    },
    detalle: (req, res) => {
       
  
       res.render("product/productDetail")
      },
      crearProducto: (req, res) => {
       
  
        res.render("product/createProduct")
       },
       editarProducto: (req, res) => {
       
  
        res.render("product/editProduct", {producto:{id:''}})
       },
       listaDeProductos: (req, res) => {
       
  
        res.render("product/productList")
       }
}

module.exports = productController


// app.get("/productCart",(req,res)=>{
//     res.sendFile(path.join(__dirname, "./views/productCart.html"))
// });


// app.get('/productDetail', (req,res)=>{
//     res.sendFile(__dirname + '/views/productDetail.html');
// });

// app.post('/producDetail', (req,res)=>{
//     res.redirect('/');
// });