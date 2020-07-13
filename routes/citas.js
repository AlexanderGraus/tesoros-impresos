const express = require('express');
const router = express.Router();
const serviceCitas = require('./../models/citasModel');

// const citas =[
//     {id: 1, autor: 'Alexander', libro: 'libro 1',cita: 'No aguanto mas la cuarentena', titulo: 'Sobre la soledad'},
//     {id: 2, autor: 'Pedro', libro: 'libro 2', cita: 'Que bueno estar vivo', titulo: 'Sobre la vida'}
// ];

router.get('/',async (req,res)=>{
    try {
        const citas = await serviceCitas.getCitas();
        res.render('citas',{title: 'Citas Literarias', citas});
    } catch (error) {
        console.log(error);
        res.render('citas',{title: 'Citas Literarias', message: 'Error en la conexion  a la Base de Datos'});
    }
});

router.get('/:id',async (req,res)=>{
    try {
        const idCita = req.params.id;
        const cita = await serviceCitas.getCita(idCita);
        // const cita = citas.find(cita => cita.id == idCita);
        res.render('cita',{title: 'Citas Literarias', cita});
        
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;