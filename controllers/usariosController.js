const userModel = require('../models/usuariosModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    //tengo que cambiar estas funciones por el validate y el create
    validate: async (req,res,next)=>{
        try {
            const {error, message, usuario} = await userModel.validateUser(req.body.user,req.body.password);
            if(!error){
                //aca no puedo enviar informacion sensible
                const token = jwt.sign({userId:usuario._id},req.app.get('secretKey'));
                res.json({message,token});
                return;
            }
            res.json({message});
        } catch (error) {
            //le paso el eror al manejador de error de express
            next(error);
        }
    },
    create: async(req,res,next) =>{
        try {
            const user = new userModel({
                usuario: req.body.user,
                nombre: req.body.nombre,
                correo: req.body.mail,
                password: req.body.password
            });
            const res = await user.save();
            res.json(res);
        } catch (error) {
            next(error);
        }
    },
};