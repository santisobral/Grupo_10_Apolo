//----------* MIDDLEWARE *----------//
module.exports = (req, res, next) => {
    res.locals.loggedUser = false;
    if (req.session.userLogged) {
        res.locals.loggedUser = req.session.userLogged; // aca paso lo que tengo en session a una variable locals que es la que se va a compartir con todas las vistas ya que la barre de navegacion interviene en todas las views.
    }
   
    
    return next();
}