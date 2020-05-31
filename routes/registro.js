const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.render('registro',{title: 'Registrarse'});
});

router.post('/',(req,res)=>{
    console.log("se envio el formulario");
});
module.exports = router;