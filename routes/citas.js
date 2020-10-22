const express = require('express');
const router = express.Router();
const citasController = require('./../controllers/citasController');

router.get('/',citasController.getAll);

router.get('/:id',citasController.getById);

router.post('/',(req,res,next)=>{req.app.validateUser(req,res,next)},citasController.create);

router.put('/:id',(req,res,next)=>{req.app.validateUser(req,res,next)},citasController.update);

router.delete('/:id',(req,res,next)=>{req.app.validateUser(req,res,next)},citasController.delete);

module.exports = router;