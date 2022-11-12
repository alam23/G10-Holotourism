const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');


/*
 *
    CREAMOS EL SERVIDOR
 *
 *
*/
const app = express();


/*
 *
    CONEXION A LA BASE DE DATOS
 *
 *
*/
dbConnection();




/*
 *
 *
    MIDDLEWARES NECESARIOS
 *
 *
*/
// cors
app.use(cors())

// directorio publico
app.use( express.static('public') );


//lectura y parseo del body
app.use( express.json() );




/*
 *
    RUTAS
 *
 *
*/
app.use('/api/auth', require('./routers/auth'));


//escuchamoms las peticiones
app.listen( process.env.PORT, () => {
    console.log('Escuchando en el puerto ', process.env.PORT);
});
module.exports = app;