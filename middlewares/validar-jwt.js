const { request, response } = require("express");
const jwt = require('jsonwebtoken');



const validarJWT = ( req=request, res=response, next ) => {

    // x-token
    const token = req.header('x-token');

    if( !token ) { //si no hay token - null
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion.'
        });
    }

    try {

        const payload = jwt.verify( token, process.env.SECRET_JWT );
        //console.log(payload);
        req.uid = payload.uid;
        req.name = payload.name;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido.'
        });
    }

    next();

};



module.exports = {
    validarJWT
};
