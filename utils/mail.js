"use strict"; //marca el lenguaje en el que trabajo
const nodemailer = require('nodemailer');
//metodo verify hace ping a smtp para comprobar si el mail existe
//cada vez que quiera enviar un mail tengo que llamar a esta funcion.
async function main(obj) {

  try {
    const transporter = nodemailer.createTransport({
        //hace la conexion
      host: process.env.SMTP,
      port: process.env.PORT_MAIL,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.USER_MAIL, // generated ethereal user
        pass: process.env.PASSWORD_MAIL, // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({

      to: obj.to, // list of receivers

     //este texto va a variar dependiendo de que parte del sitio se esta llamando a la funcion
     //(contacto, login, compra)

     //estos datos tienen que ser variables 
      subject: obj.subject, // Subject line
      html: obj.html, // html body
    });
  
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    //hace referencia a un numero de transaccion unico.
    return info.messageId;
  } catch (error) {
    console.log(error);
  }
  
  }

module.exports = {main};