var express = require('express');
var router = express.Router();

let mainController = require("../controller/mainController");

/* GET index page. */
router.get("/",mainController.index)


module.exports = router;


