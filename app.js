let express = require("express");

let app = express();

const path = require("path");

const publicPath = path.join(__dirname,"./public");// aca ya tengo la ruta public definida que la voy a usar para acceder a los recursos estaticos dentro de public
app.use(express.static(publicPath))


app.listen(3030, () => {
    console.log("Servidor Corriendo en el puerto 3030")
});

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, "./views/index.html"));
 
 })