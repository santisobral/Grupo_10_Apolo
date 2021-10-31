let express = require("express");
const methodOverride = require('method-override'); // Para poder usar los métodos PUT y DELETE

let app = express();


const path = require("path");
// Aca estoy requiriendo el modulo routes
var mainRouter = require('./routes/mainRouter.js'); // aca estoy importando las funcionalidades del modulo de rutas
var productRouter = require('./routes/productRouter');
var usersRouter = require('./routes/usersRouter');

// aca genero una ruta estatica que va a consumir los recursos de la carpeta public
const publicPath = path.join(__dirname,"./public");// aca ya tengo la ruta public definida que la voy a usar para acceder a los recursos estaticos dentro de public
app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: false })); 
app.use(express.json());
app.use(methodOverride('_method')); // Para poder usar los métodos PUT y DELETE
// Template engine
app.set("views", "./views"); // es para que por defecto tome la vista
app.set("view engine", "ejs");

// Lo uso para el slider
app.use('/js', express.static(__dirname + '/public/js'));

// Aca el servidor se queda escuchando a la espera de ser llamado por algun metodo de Http
app.listen(3030, () => {
    console.log("Servidor Corriendo en el puerto http://localhost:3030/")
});
// Es para el home
app.use('/', mainRouter);
// Es para la seccion de productos donde la ruta es a partir de product
app.use('/product', productRouter);
// Es para la seccion de productos donde la ruta es a partir de user
app.use('/user', usersRouter);

// app.post('/registro', (req,res)=> {
//     res.redirect('/');
// });




app.post('/registro', (req,res)=> {
    res.redirect('/');
});

