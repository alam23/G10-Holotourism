const express = require('express');
const { check } = require('express-validator');

const { detectarLandmarks } = require('../controllers/detector');
//const { validarCampos } = require('../middlewares/validar-campos');
/*const { validarJWT } = require('../middlewares/validar-jwt');*/

const router = express.Router();


router.post('/',
            [
                check('fileName', 'El archivo de imagen es obligatorio').isEmpty(),
            ],
            detectarLandmarks);

module.exports = router;