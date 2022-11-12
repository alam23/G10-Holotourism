const { response } = require('express');
const { validationResult } = require('express-validator');



const validarCampos = ( req, res=response, next ) => {

    // Resultado de la validacion
    const errors = validationResult( req );
    if( !errors.isEmpty() ) {
        //si hay errores
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    next(); // nunca se llama el next si hay errores

}



module.exports = {
    validarCampos
}