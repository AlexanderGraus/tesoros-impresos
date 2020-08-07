const pool = require('./../utils/bd');

getUser = async(mail, password)=>{
    try {
        const query = "select id, nombre from ?? where correo = ? and password = ?";
        const params = [process.env.TABLA_USUARIO,mail,password];
        const rows = await pool.query(query,params);
        return rows;
    } catch (error) {
        console.log(error);

    }
} 

const create = async (obj)=>{
    try {
        
        const query = "INSERT INTO ?? SET ?";
        const params = [process.env.TABLA_USUARIO,obj]
        const rows = await pool.query(query,params);
        return rows.insertId;  
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = {getUser,create};