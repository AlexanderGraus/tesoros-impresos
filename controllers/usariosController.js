const userModel = require('../models/usuariosModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    getAll: async(req,res,next) =>{
        const usarios = await userModel.find({});
        res.json(usarios);
    },
    getById: async(req,res,next) =>{
        const user = await userModel.findById(req.params.id);
        res.json(user);
    },
    create: async(req,res,next) =>{
        const user = new userModel(req.body);
        await user.save();
        res.json(user);
    },
    update: async (req,res,next) =>{
        const user = await userModel.update({_id: req.params.id},req.body, {multi:false});
        res.json(user);
    },
    delete: async (req,res,next) =>{
        const user = await userModel.deleteOne({_id: req.params.id});
        res.json(user);
    }
};