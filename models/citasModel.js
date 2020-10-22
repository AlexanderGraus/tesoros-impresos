const mongoose = require("../bin/mongodb");
const errorMessage = require('../utils/errorMessage');

const citaSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.ObjectId,
        ref: "usuarios"
    },
    autor: {
        type: String,
        index: true,
        required: [true,errorMessage.GENERAL.campo_obligatorio]
    },
    libro: {
        type: String,
        index: true,
        maxlength: 1000
    },
    cita: {
        type: String,
        required: [true,errorMessage.GENERAL.campo_obligatorio]
    },
    
});
citaSchema.plugin(mongoose.mongoosePaginate);
module.exports = mongoose.model("citas", citaSchema);