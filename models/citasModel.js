const mongoose = require("../bin/mongodb");

const citaSchema = new mongoose.Schema({
    autor: {
        type: String,
        index: true,
        required: true
    },
    libro: {
        type: String,
        index: true,
        maxlength: 1000
    },
    cita: {
        type: String,
        required: true
    },
    
});

module.exports = mongoose.model("citas", citaSchema);