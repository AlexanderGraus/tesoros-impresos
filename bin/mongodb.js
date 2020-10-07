const mongoose = require('mongoose');

mongoose.connect('mongodb://'+process.env.HOST_DB+'/'+process.env.DATABASE+'', { useNewUrlParser: true }, function (error) {
    if (error) {
        throw error;
    } else {
        console.log('Conectado a MongoDB');
    }
});


module.exports = mongoose; 