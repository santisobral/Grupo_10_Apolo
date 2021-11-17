//----------* MIDDLEWARE *----------//
module.exports = (req, res, next) => {
    res.locals.loggedUser = false;
    if (req.session.userLogged) {
        res.locals.loggedUser = req.session.userLogged;
    }
   
    
    return next();
}