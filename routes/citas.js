const express = require('express');
const router = express.Router();
const citasModel =  require('./../models/citasModel');
const citas =[
    {id: 1, autor: 'Alexander', libro: 'libro 1',cita: 'No aguanto mas la cuarentena', titulo: 'Sobre la soledad'},
    {id: 2, autor: 'Pedro', libro: 'libro 2', cita: 'Que bueno estar vivo', titulo: 'Sobre la vida'}
];

router.get('/',async (req,res)=>{
    let citasArray = await citasModel.getCitas();//va a guardar un array de JSON
    res.render('citas',{title: 'Citas Literarias', citas: citasArray});
});

router.get('/:id',(req,res)=>{
    const idCita = req.params.id;
    const cita = citas.find(cita => cita.id == idCita);
    res.render('cita',{title: 'Citas Literarias', cita: cita});
});
module.exports = router;