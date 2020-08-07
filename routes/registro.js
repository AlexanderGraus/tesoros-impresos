const express = require('express');
const router = express.Router();
const service = require('./../models/usuariosModel');

router.get('/',(req,res)=>{
    res.render('registro',{title: 'Registrarse'});
});

router.post('/',async (req,res)=>{
    try {
        const {nombre,apellido,correo,password,usuario} = req.body;
        const obj ={nombre,apellido,correo,password,usuario};
        const respuesta = await service.create(obj);
        console.log(`usuario registrado con el id ${respuesta}`);
        res.json({success: true});
    } catch (error) {
        console.log(error);
        res.json({success: false});
    }
});
module.exports = router;