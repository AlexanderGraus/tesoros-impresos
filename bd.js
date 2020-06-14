//la referencia de la conexion a la base de datos
//mysql
//util es un modulo para que las devolucion de mysql sean asincronicas
// mysql funciona por callback, no permite asyn await, con util lo va a permitir
const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tesorosimpresos'
});
// pool: referencia a la conexion a localhost con user root, password '' y bd tesoros impresos

// pool.query()= para hacer consultas a la bd. ("select * from tesorsoimpresos")
// con async await trabajo las demoras
pool.query = util.promisify(pool.query);
// quiero que pool.query sea trabajado como una promesa
console.log("conexion a la base de datos realizada");
// exporto el modulo pool para poder consumirlo desde cualquier archivo de la app. para eso exporto la referencia de la conexion
module.exports = pool;