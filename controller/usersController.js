const db = require("../database/models");

const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");

let usersController = {
  login: (req, res) => {
    res.render("user/login");
  },
  userProcess: (req, res) => {
    db.User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((validetEmail) => {
      if (validetEmail) {
        let isOkThePassword = bcryptjs.compareSync(
          req.body.password,
          validetEmail.pass
        ); // estamos comparando la contraseña que se envia desde el form con la que esta en la db
        console.log(isOkThePassword);
        console.log(req.body.password);
        if (isOkThePassword) {
          req.session.userLogged = validetEmail; // aca guardas al usuario en session
          if (req.body.rememberMe) {
            res.cookie("userEmail", req.body.email, { maxAge: 1000 * 60 * 60 });
          }
          return res.redirect("/user/profile");
        }
      }
      // caso contrario te manda de nuevo al login
      res.render("user/login");
    });
  },
  // (get) Create - Formulario para crear un usuario
  register: (req, res) => {
    res.render("user/register");
  },
  saveUsers: (req, res) => {
    const resultValidation = validationResult(req);
    console.log(resultValidation.mapped());
    if (resultValidation.errors.length > 0) {
      // si es mayor a cero es porque hay errores
      return res.render("user/register", {
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }
    db.User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((validationEmail) => {
      if (validationEmail) {
        // Si los email coincide no te deja avanzar
        return res.render("user/register");
      }
      db.User.create({
        name: req.body.name, // aca vamos a guardar a la info que viene de el form de cracion del usuario. Es un objeto literal con la propiedad y su valor
        lastname: req.body.lastname,
        birthdate: req.body.birthdate,
        email: req.body.email,
        pass: bcryptjs.hashSync(req.body.password, 10), // aca mandamos la contraseña hasheada
        role_id: 2,
        avatar: req.file.filename,
        deleted: 0,
      });
    });

    return res.redirect("/user/login"); // si la persona se registro existosamente te lo manda al login
  },
  // Traemos el formulario de edicion
  edit: (req, res) => {
    let movieId = req.params.id;
    console.log(movieId);
    db.User.findByPk(movieId).then((user) => {
      return res.render("user/userEdit", {
        user,
      });
    });
  },
  // Actualizamos la informacion del usuario
  userUpdate: async (req, res) => {
    try {
      let editUser = await db.User.findOne({
        // aca no te deja avanzar hasta que la variable reciba el dato de la db
        where: {
          id: req.params.id,
        },
      });
      await db.User.update(
        {
          ...req.body, // spread operator
          avatar: req.file ? req.file.filename : editUser.avatar,
          deleted: 0,
        },
        {
          where: { id: req.params.id },
        }
      );
      res.redirect("/user/profile");
    } catch (error) {
      console.log(error);
      res.send("error");
    }
  },
  profile: (req, res) => {
    return res.render("user/profile", {
      user: req.session.userLogged,
    });
  },
  logout: function (req, res) {
    res.clearCookie("userEmail"); // aca se destruye la cookie y te permite desloguearte
    req.session.destroy(); // Esto lo que hace es borrar todo lo que esta en sesion, tenes que volver a loguearte
    return res.redirect("/");
  },
};

module.exports = usersController;
