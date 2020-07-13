const pool  = require('./../utils/bd'); //importo los datos de la conexion

const getCitas = async () =>{
    try {
        const query = "SELECT c.id,c.autor,c.cita,c.libro, u.nombre, u.correo FROM ?? as c JOIN ?? as u ON c.id_usuario = u.id where estado = 1 order by id asc";
        const params = [process.env.TABLA_CITA, process.env.TABLA_USUARIO];
        const rows = await pool.query(query,params);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

const getCita = async (id) =>{
    try {
        const query = "SELECT id, id_usuario,autor,cita,libro FROM ?? where id = ?"
        const params = ["cita",id];
        const rows =  await pool.query(query,params);
        return rows[0];
    } catch (error) {
        console.log(error);
    }
}
const update = async (id,obj) =>{
    try {
        const query = "UPDATE ?? SET ? where id = ?";
        const params = [process.env.TABLA_CITA,obj,id];
        return await pool.query(query,params);
        
    } catch (error) {
        console.log(error);
    }
}

const create = async (obj)=>{
    try {
        // SET para cuando en
        //las propiedades del objeto tienen que coincidir con los campos de la tabla
        //si no te va a decir que no existe el campo
        const query = "INSERT INTO ?? SET ?";
        const params = [process.env.TABLA_CITA,obj]
        const rows = await pool.query(query,params);
        return rows.insertId; // insertId es una propiedad de rows, es el ultimo id creado 
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getCitas,
    getCita,
    update,
    create
};