const express = require('express');
const router = express.Router();
const citasController = require('./../controllers/citasController');

router.get('/',citasController.getAll);

router.get('/:id',citasController.getById);

router.post('/',citasController.create);

router.put('/:id',citasController.update);

router.delete('/:id',citasController.delete);

module.exports = router;