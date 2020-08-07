const express = require('express');
const router = express.Router();
//cuando solo voy a importar un unico archivo lo llamo directamente service 
const service = require('../../models/citasModel');
//getCita -> para editar, getCitas -> para listar

// LAS RUTAS CON MAS JERARQUIA (CON MAS /) VAN MAS ARRIBA
/* Modificar cita*/
router.get('/editar/:id',async(req,res)=>{
    const {id} = req.params;
    try {
        const cita = await service.getCita(id);
        res.render('admin/modifCita',{title: 'Editar Cita',cita});
    } catch (error) {
        console.log(error);
    }

});


/* Borrar una cita */
router.put('/baja/:id', async(req,res)=>{
    try {
        // esto tendria que ser un objeto XML HTTPRequest
        const {id} = req.params;
        console.log(id);
        const resultado =  await service.update(id,{estado:0});
        res.json({success: true,id});
    } catch (error) {
        console.log(error);
        res.json({success: false});
    }
});

/* /admin/citas/alta*/
router.get('/alta', (req,res)=>{
    res.render('admin/altaCita',{title: 'Subir una cita'});
});

/* Publicar una nueva cita*/
router.post('/alta', async (req,res)=>{
    try {
        const {autor,cita,libro} = req.body;
        //validar para no subir una cita vacia
        const obj ={
            id_usuario: req.session.idUsuario,
            autor: autor,
            cita: cita,
            libro: libro
        };
        console.log(obj);
        const resultado = await service.create(obj);
        console.log(`el insertId es ${resultado}`);
        res.render('admin/altaCita',{message: 'Cita subida correctamente'});
        
    } catch (error) {
        res.render('admin/altaCita',{message: error});
    }
});

/* Cargar todas las citas */
router.get('/', async(req,res)=>{
    /*las ventajas de las funciones asincronicas, 
    ademas de que permite que una funcion se ejecute antes que otra es que permite usar el try catch
    */
//    if(req.session.idUsuario != null){
       
       try {
           const citas = await service.getCitas();
           // [{}] returna un array de objetos
           // console.log(citas);
           res.render('admin/adminCitas',{citas});
       } catch (error) {
           console.log(error);
       }
//    }else{
        // res.send("Debe loguearse para agregar una cita");
//    }
});

module.exports = router;