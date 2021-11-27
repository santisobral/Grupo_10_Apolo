const path = require("path");
const fs = require('fs');
const bcryptjs = require("bcryptjs");
const {validationResult} = require("express-validator");

const usersFilePath = path.join(__dirname, '../data/user.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));


let usersController = {
  login: (req, res) => {
    res.render("user/login")
  },
  userProcess: (req, res) => {
    let validetEmail = users.find(user => { // aca te busca el email que viene por url y te lo compara con el email de la base de datos
      return user.email == req.body.email
    });
    if (validetEmail) { // Si los email coincide y ademas la password que mandas en el formulario coincide con la base de dato te redirige al profile
      let isOkThePassword = bcryptjs.compareSync(req.body.password, validetEmail.password);
      if (isOkThePassword) {
        //delete validetEmail.password; // ESTO ES LO QUE HACE QUE NO ME DEJE LOGUEARME DE NUEVO CUANDO DE ME DESLOGUEO, PREGUNTAR PORQUE
        req.session.userLogged = validetEmail // aca guardas al usuario en session

        if(req.body.rememberMe){
          res.cookie("userEmail",req.body.email,{ maxAge: (1000 * 60) *60 })
        }
       
        return res.redirect("/user/profile")
      }
    }
    res.render("user/login", { // caso contrario te manda de nuevo al login
      users
    })
  },
  // (get) Create - Formulario para crear un usuario
  register: (req, res) => {

    res.render("user/register")
  },
  saveUsers: (req, res) => {
    const resultValidation = validationResult(req);
    console.log(resultValidation.mapped()) 
    if(resultValidation.errors.length > 0) { // si es mayor a cero es porque hay errores
        return res.render("user/register",{
            errors:resultValidation.mapped(),
            oldData: req.body

        })
    }
    let validationEmail = users.find(user => { // aca te busca el email que viene por url y te lo compara con el email de la base de datos
      return user.email == req.body.email
    });
    console.log(validationEmail)
    if (validationEmail) { // Si los email coincide no te deja avanzar
      return res.render("user/register")
    };
    let userId = users[users.length - 1].id + 1;
    let newUsers = { // aca estamos creando el producto, pero no lo estamos guardando en el json, para eso lo hacemos en la fila
      id: userId, // Este campo no llega desde el form, dado que el usuario no elige este numero
      name: req.body.name,// aca vamos a guardar a la info que viene de el form de cracion del producto. Es un objeto literal con la propiedad y su valor
      lastname: req.body.lastname,// aca vamos a guardar a la info que viene de el form de cracion del producto. Es un objeto literal con la propiedad y su valor
      birthdate: req.body.birthdate,// aca vamos a guardar a la info que viene de el form de cracion del producto. Es un objeto literal con la propiedad y su valor
      email: req.body.email,
      password: bcryptjs.hashSync(req.body.password, 10),// aca vamos a guardar a la info que viene de el form de cracion del producto. Es un objeto literal con la propiedad y su valor
      image: req.file.filename,
    };
    users.push(newUsers);
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, " "));
    return res.redirect("/user/login") // si la persona se registro existosamente te lo manda al login
  },
  profile: (req, res) => {
    return res.render("user/profile", {
      user: req.session.userLogged
    })
  },
  logout: function (req, res) {
    res.clearCookie("userEmail");// aca se destruye la cookie y te permite desloguearte
    req.session.destroy()// Esto lo que hace es borrar todo lo que esta en sesion, tenes que volver a loguearte
    return res.redirect("/")
  }
}

module.exports = usersController