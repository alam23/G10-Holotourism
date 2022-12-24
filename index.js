const express = require('express')
const { Request, Response } = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');
const { restResponseTimeHistogram, startMetricsServer } = require('./helpers/metrics');
const responseTime = require('response-time');


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

//response time
app.use(responseTime((req, res, time) =>{
   if (req?.route.path){
      restResponseTimeHistogram.observe({
         method: req.method,
         route: req.baseUrl + req.route.path,
         status_code: res.statusCode,
      },
      time * 1000
      );
   }
}));


/*
 *
    RUTAS
 *
 *
*/
app.use('/api/auth', require('./routers/auth'));
app.use('/api/images', require('./routers/images'));
app.use('/api/detector', require('./routers/detector'));


//escuchamoms las peticiones
app.listen( process.env.PORT, () => {
    console.log('Escuchando en el puerto ', process.env.PORT);
    startMetricsServer();
});
module.exports = app;