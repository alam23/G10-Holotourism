const { request ,response, json } = require("express");
require('dotenv').config()

//Funciones
const detectarLandmarks = async( req=request, res=response) => {
  const vision = require('@google-cloud/vision');
  const client = new vision.ImageAnnotatorClient();
  const bucketName = process.env.GCS_BUCKET_NAME;
  const { fileName} = req.body;
  if (!fileName) {
    res.status(400).json({
      ok: false,
      msg: 'Imagen inexistente'
    });
  }

  try{
    const [result] = await client.landmarkDetection(
      `gs://${bucketName}/${fileName}`
    );
    const landmarks = await result.landmarkAnnotations;
    res.status(200).json({
      ok: true,
      nombre: landmarks[0].description,
      latitud: landmarks[0].locations[0].latLng.latitude,
      longitud: landmarks[0].locations[0].latLng.longitude
    })
  }
  catch (error){
    console.log('Error en la ejecución de la función: ', error);
    res.status(500).json({
      ok: false,
      msg: 'Talk to the administrator'
    });
  }
}

module.exports = {
  detectarLandmarks
}