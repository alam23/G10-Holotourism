const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');


/**
 * inicio de servidor
 */
const app = express();

/**
 * conexión a base de datos
 */
dbConnection();

/**
 * middlewares necesarios
 */

// cors
app.use(cors())

// directorio publico
app.use( express.static('public') );

//lectura y parseo del body
app.use( express.json() );

/**
 * Rutas
 */


app.listen( process.env.PORT, () => {
    console.log('Escuchando en el puerto ', process.env.PORT);
});