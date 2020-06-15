const pool = require('./../bd'); //referencia de la conexion

async function getCitas (){
    try{
        let query = "select * from cita";
        let rows = await pool.query(query);
        return rows;
    }catch(error){
        throw error;
    }
}

// la idea de los models es poder usarlos dentro de otros archivos
module.exports = {getCitas};