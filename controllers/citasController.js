const citasModel = require('../models/citasModel');

module.exports = {
    getAll: async(req,res,next) =>{
        try{
            let queryFind ={};
            if(req.query.buscar){
                queryFind = {cita:{$regex:".*"+req.query.buscar+".*",$options:"i"}};
            }
            if(req.query.usuario){
                queryFind = {user:req.query.usuario};
            }
            const citas = await citasModel.paginate(queryFind,{
                sort: {autor:1},
                populate: 'usuarios',
                limit: req.query.limit || 10,
                page: req.query.page || 1
            });
            res.status(200).json(citas);

        }catch(error){
            next(error);
        }
    },
    getById: async(req,res,next) =>{
        try {
            const cita = await citasModel.findById(req.params.id);
            if(!cita){
                res.status(200).json({message:'no existe la cita'});
                return;
            }
            res.status(200).json(cita);
            
        } catch (error) {
            next(error);
        }
    },
    create: async(req,res,next) =>{
        try {
            const cita = new citasModel({
                user: req.body.tokenData.userId,
                autor: req.body.autor,
                libro: req.body.libro,
                cita: req.body.cita
            });
            const doc = await cita.save();
            res.status(201).json(doc);
            
        } catch (error) {
            next(error);
        }
    },
    update: async (req,res,next) =>{
        try {
            const cita = await citasModel.update({_id: req.params.id},req.body, {multi:false});
            res.status(200).json(cita);
            
        } catch (error) {
            next(error);
        }
    },
    delete: async (req,res,next) =>{
        try {
            const cita = await citasModel.deleteOne({_id: req.params.id});
            res.status(200).json(cita);
            
        } catch (error) {
            next(error);
        }
    }
};