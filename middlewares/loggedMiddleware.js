function cartMiddlewares(req,res,next) {
    if(!req.session.userLogged ){ // aca quiero preguntar si ya tengo una persona logueada (lo tengo en session) o registrada, que lo reediriga y si esta logueada, pasa lo que comento mas abajo
      return res.redirect("/user/login") // Si yo quiero ir a register o login una vez que estoy logueado no me lo permite, me redirige a mi perfil
    }
    next() // si no esta logueda que contiene con todo el proceso
   }
   
   
   module.exports = cartMiddlewares