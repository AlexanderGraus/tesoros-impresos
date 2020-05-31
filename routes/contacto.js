const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.render('contacto',{title: 'Contacto'});
});

router.post('/',(req,res)=>{
    console.log("se enviaron datos por POST");
});

module.exports = router;