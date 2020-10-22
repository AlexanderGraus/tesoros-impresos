const mongoose = require("../bin/mongodb");
//el bcrypt nos va a permitir encriptar las constraseñas
const bcrypt = require('bcrypt');
const errorMessage = require('../utils/errorMessage');
const validators = require('../utils/validators');

const userSchema = new mongoose.Schema({
    usuario: {
        type:String,
        index: true,
        required: [true,errorMessage.GENERAL.campo_obligatorio],
        //validar que uno existe un usuario con el mismo nombre
        validate:{
            validator: async function(u){
                const res = await this.model('usuarios').findOne({usuario:u});
                console.log(res);
                if(res){
                    //ya existe el usuario
                    return false;
                }else{
                    return true;
                }
            },
            message: errorMessage.USERS.userExist
        }
    },
    nombre: {
        type: String,
        required: [true,errorMessage.GENERAL.campo_obligatorio],
        maxlength: 20
    },
    correo: {
        type: String,
        required: [true,errorMessage.GENERAL.campo_obligatorio],
        validate:{
            validator: (mail) =>{
                return validators.emailValidate(mail);
            },
            message:errorMessage.USERS.mailIncorrect
        }
    },
    password: {
        type: String,
        required: [true,errorMessage.GENERAL.campo_obligatorio],
        validate:{
            validator: async function(pass){
                return validators.isGoodPassword(pass);
            },
            message: errorMessage.USERS.passwordIncorrect
        }
    }
});

userSchema.pre('save', function(next){
    //encripto la contraseña antes de guardarla
    this.password = bcrypt.hashSync(this.password,10);
    next();
});

//creo una funcion estatica para validar usuarios del model.
userSchema.statics.validateUser = async function(user, password){
    const res = await this.findOne({usuario: user});
    if(res){
        if(bcrypt.compareSync(password, res.password)){
            //el usuario y la contraseña son correctos
            return {error: false, message: 'Usuario ok', usuario: res};
        }else{
            return {error: true, message: 'contraseña incorrecta'};
        }
    }else{
        return {error: true, message: 'usuario incorrecto'};
    }
}
module.exports = mongoose.model("usuarios", userSchema);