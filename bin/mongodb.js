const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://ale613:hamburguesa@cluster0.dpgld.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

mongoosePaginate.paginate.options={
    limit:1,
    lean:false
}
mongoose.mongoosePaginate = mongoosePaginate;
module.exports = mongoose; 