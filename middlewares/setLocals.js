//----------* MIDDLEWARE *----------//
const db = require("../database/models");
const path = require("path");
const fs = require('fs');

const usersFilePath = path.join(__dirname, '../data/user.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));


module.exports = async (req, res, next) => {
    res.locals.loggedUser = false;

    let emailInCookie = req.cookies.userEmail; // Aca estas llamando a la cookie que viene del body al tildar el remermberMe
    // let userCookie = users.find(user=>{
    //  return user.email ==emailInCookie
    // });
    let userCookie;
    if(emailInCookie){
        userCookie = await db.User.findOne({
            where: {
                email: emailInCookie
            }
        })
        .then(user => {
            data = JSON.parse(JSON.stringify(user));
            return data;
        })
    }

    if(userCookie){
        req.session.userLogged = userCookie
    }


    if (req.session.userLogged) {
        res.locals.loggedUser = req.session.userLogged; // aca paso lo que tengo en session a una variable locals que es la que se va a compartir con todas las vistas ya que la barre de navegacion interviene en todas las views.
    }
   
   
    return next();
}