const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{
   if(req.session.idUsuario != null){
       try {
           res.render('admin/adminIndex');
       } catch (error) {
           
       }
   }else{
        res.send("Debe loguearse para agregar una cita");
   }
});

module.exports = router;