const { request ,response, json } = require("express");
require('dotenv').config();
//const imagen = require("../models/images");
const processFile = require("../middlewares/uploadimage");
const { format } = require("util");
const { Storage } = require("@google-cloud/storage");
const Image = require("../models/Images");
const { validarJWT } = require("../middlewares/validar-jwt");
const { checkUser } = require("../middlewares/checkUser");

// Instantiate a storage client with credentials
const storage = new Storage({ keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS });
const bucket = storage.bucket(process.env.GCS_BUCKET_NAME);


const guardarImagen = async( req=request, res=response ) => {
 
    try {
        await processFile(req, res);
        if (!req.file) {
          return res.status(400).send({ message: "Por favor, suba una imagen" });
        }
        // Create a new blob in the bucket and upload the file data.
        const blob = bucket.file(req.file.originalname);
        const blobStream = blob.createWriteStream({
          resumable: false,
        });
        await new Promise(r => setTimeout(r, 3000));
        blobStream.on("error", (err) => {
          res.status(500).send({ message: err.message });
        });
        blobStream.on("finish", async (data) => {
          // Create URL for directly file access via HTTP.
          const publicUrl = format(
            `https://storage.googleapis.com/${bucket.name}/${blob.name}`
          );
          res.status(200).send({
            message: "Imagen subida exitosamente: " + req.file.originalname,
            url: publicUrl,
          });
        });
        blobStream.end(req.file.buffer);
      } catch (err) {
        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
              message: "El archivo no puede ser más grande que 2MB",
            });
        }
        return res.status(500).send({
          message: `No se pudo subir la imagen: ${req.file.originalname}. ${err}`,
        });
      }

}

const saveImagedb = async (req = request, res = response) => {

  const { filename } = req.body;

  try{
    let image = await Image.findOne({ filename });
    if( image ) { // si existe el usuario
      return res.status(400).json({
          ok: false,
          msg: 'Ya existe una imagen guardada.'
      });
    }

    const userid = await checkUser(req,res);

    //validarJWT(req);

    //console.log(req.uid);

    const newbody = {
      ...req.body,
      user: userid
    }

    console.log(newbody);

    image = new Image(newbody);

    await image.save();

    res.status(201).json({
      ok: true,
      message: "Imagen guardada en la base de datos"
    });
  }
  catch (error){
    console.log('Error al guardar imagen: ', error);
        res.status(500).json({
            ok: false,
            msg: error
        });
  }
}

module.exports = {
    guardarImagen,
    saveImagedb
}