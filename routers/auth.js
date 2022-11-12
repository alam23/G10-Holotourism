const express = require('express');
const { check } = require('express-validator');

const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = express.Router();



// RUTAS DE USUARIOS / AUTH
// host + /api/auth



router.post('/new',
            [
                check('name', 'El name es obligatorio').not().isEmpty(),
                check('email', 'El email es obligatorio').isEmail(),
                check('password', 'El password debe de tener minimo 6 caracteres').isLength({ min:6 }),
                validarCampos
            ],
            crearUsuario);


router.post('/',
            [
                check('email', 'El email es obligatorio').isEmail(),
                check('password', 'El password debe de tener minimo 6 caracteres').isLength({ min:6 }),
                validarCampos
            ],
            loginUsuario );


router.get('/renew', [ validarJWT ],revalidarToken );





module.exports = router;