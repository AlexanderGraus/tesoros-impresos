const express = require('express');
const router = express.Router();
const usuarioModel = require('./../models/usuariosModel');

router.get('/',(req,res)=>{
    res.render('login',{ title: 'Inicar Sesion'});
});

router.post('/', async (req,res)=>{
    // console.log("se enviaron datos por POST");
    try {
        // sesiones : variables superglobales, las puedo llamar desde cualquier archivo
        console.log(req.body);
        const resultado = await usuarioModel.getUser(req.body.mail, req.body.password);
        if(resultado.length == 1){
            //significa que existe el usuario
            // crear la variable de sesion (super global)
            req.session.user = true;
            console.log(req.session.user);
            req.session.idUsuario = resultado[0].id;
            req.session.nombreUsuario = resultado[0].nombre;
            req.session.apellidoUsuario = resultado[0].apellido;
            console.log(`el nombre del usuario es: ${req.session.nombreUsuario}`);
            res.redirect('/');
        }else{
            res.render('login', {message: 'Usuario o contraseña incorrectos'});
        }
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;