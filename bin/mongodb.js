const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

mongoose.connect('mongodb+srv://ale613:hamburguesa@cluster0.dpgld.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true }, function (error) {
    if (error) {
        throw error;
    } else {
        console.log('Conectado a MongoDB');
    }
});

mongoosePaginate.paginate.options={
    limit:1,
    lean:false
}
mongoose.mongoosePaginate = mongoosePaginate;
module.exports = mongoose; 