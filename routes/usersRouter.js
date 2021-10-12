var express = require('express');
var router = express.Router();

let usersController = require("../controller/usersController");

router.get("/login",usersController.login)
router.get("/register",usersController.register)



module.exports = router