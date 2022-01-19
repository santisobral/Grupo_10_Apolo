const db = require("../../database/models");

let userApiController = {
    'list': (req, res) => {
        db.User.findAll({
            raw:true// te trae directamente el array dentro de lo que te trae la base de datos 
        })
        .then(users => {
           // res.send(products)
             users.forEach(user => {
                 delete user.birthdate;
                 delete user.pass;
                 delete user.role_id;
                 delete user.avatar;
                 delete user.deleted;
                 delete user.lastname
           
                 user.detailUrl = 'http://localhost:3030/api/user/' + user.id
             });
            let respuesta = {
                meta: {
                    status : 200,
                    total: users.length,
                    url: 'http://localhost:3030/api/user/'
                },
                data: users
            }
                res.json(respuesta);
            })
    },
    'detail': (req, res) => {
        db.User.findByPk(req.params.id)
            .then(user => {
                delete user.pass
                let respuesta = {
                    meta: {
                        status: 200,
                        url: '/api/user/:id'
                    },
                    data:{
                        user, 
                        imgUrl:"/public/img/" + user.avatar
                    } 
                }
                res.json(respuesta);
            });
    }

}

module.exports =  userApiController