const express = require('express');
const { check } = require('express-validator');
const{guardarImagen, saveImagedb, showImages, deleteImage} = require('../controllers/images');
const router = express.Router();

router.post('/saveimg',            
            [
            ],
            guardarImagen);

router.post('/savedbimg',
            [

            ],
            saveImagedb);

router.get('/showimages', showImages);

router.delete('/delete/:name', deleteImage);


module.exports = router;