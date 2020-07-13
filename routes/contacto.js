const express = require('express');
const router = express.Router();
const {main} = require('./../utils/mail');

router.get('/',(req,res)=>{
    res.render('contacto',{title: 'Contacto'});
});

router.post('/', async (req,res)=>{
    const {mail,asunto,mensaje} = req.body;
    const to = process.env.ADMIN_MAIL;
    const subject = `Mensaje de Tesoros Impresos: ${asunto}`;
    const html = `Se contactaron desde ${mail} con la siguiente consulta: ${mensaje}`;

    const finalObject = {
        to,
        subject,
        html
    };

    console.log(`Cuerpo del mail: ${finalObject}`);
    try {
        const resultMail = await main({to, subject,html});
        console.log(`Clave unica del mail: ${resultMail}`);
        res.render('contacto',{message: 'Mensaje Enviado'});
        
    } catch (error) {
        console.log(error);
        res.end();    
    }
});

module.exports = router;