var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usariosController');

/* GET users listing. */

router.post('/registro',usersController.create);
router.post('/login',usersController.validate);


module.exports = router;
