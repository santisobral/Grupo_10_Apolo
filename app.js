let express = require("express");

let app = express();

const path = require("path");

const publicPath = path.join(__dirname,"./public");// aca ya tengo la ruta public definida que la voy a usar para acceder a los recursos estaticos dentro de public
app.use(express.static(publicPath))

app.use('/js', express.static(__dirname + '/public/js'));
app.listen(3030, () => {
    console.log("Servidor Corriendo en el puerto http://localhost:3030/")
});

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, "./views/index.html"));
 
 })

 app.post('/producDetail', (req,res)=>{
    res.redirect('/');
});

app.get('/productDetail', (req,res)=>{
    res.sendFile(__dirname + '/views/productDetail.html');
});

app.get("/login",(req,res)=>{
    res.sendFile(path.join(__dirname, "./views/login.html"))
});

app.get("/register",(req,res)=>{
    res.sendFile(path.join(__dirname, "./views/register.html"))
});

app.get("/productCart",(req,res)=>{
    res.sendFile(path.join(__dirname, "./views/productCart.html"))
});
