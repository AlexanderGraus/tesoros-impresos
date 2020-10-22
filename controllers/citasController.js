const citasModel = require('../models/citasModel');
const usersModel = require('../models/usuariosModel');

module.exports = {
    getAll: async(req,res,next) =>{
        const citas = await citasModel.find({});
        res.json(citas);
    },
    getById: async(req,res,next) =>{
        const cita = await citasModel.findById(req.params.id);
        res.json(cita);
    },
    create: async(req,res,next) =>{
        try {
            const cita = new citasModel({
                user: req.body.tokenData,
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