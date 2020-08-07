const express = require('express');
const router = express.Router();
const service = require('./../models/usuariosModel');

router.get('/',(req,res)=>{
    res.render('registro',{title: 'Registrarse'});
});

router.post('/',async (req,res)=>{
    try {
        const {nombre,apellido,correo,password,usuario} = req.body;
        console.log('el correo es:'+correo);
        const obj ={nombre,apellido,correo,password,usuario};
        const res = await service.create(obj);
        console.log(`usuario registrado con el id ${res}`);
        res.render('registro',{message: 'Usuario registrado'});

    } catch (error) {
        console.log(error);
        res.render('registro',{message: error});
    }
});
module.exports = router;