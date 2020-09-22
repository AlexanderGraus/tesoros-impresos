const mongoose = require("../bin/mongodb");

const userSchema = new mongoose.Schema({
    usuario: {
        type:String,
        index: true,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true,
        maxlength: 20
    },
    apellido: {
        type: String,
        required: true,
        maxlength: 20
    },
    correo: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("usuarios", userSchema);