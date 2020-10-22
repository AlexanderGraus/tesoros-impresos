const citasModel = require('../models/citasModel');

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
        const cita = new citasModel(req.body);
        await cita.save();
        res.json(cita);
    },
    update: async (req,res,next) =>{
        const cita = await citasModel.update({_id: req.params.id},req.body, {multi:false});
        res.json(cita);
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