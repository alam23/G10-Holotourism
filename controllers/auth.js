const { request ,response, json } = require("express");
const bcrypt = require('bcryptjs');
const Usuario = require("../models/User");
const { generarJWT } = require("../helpers/jwt");



const crearUsuario =  async( req=request, res=response ) => {

    const { email, password } = req.body;

    try {

        let usuario = await Usuario.findOne({ email });

        if( usuario ) { // si existe el usuario
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario ya esta registrado con ese correo.'
            });
        }

        usuario = new Usuario( req.body );

        // Encriptamos la contraceña
        const salt = bcrypt.genSaltSync(10);
        usuario.password = bcrypt.hashSync( password, salt );


        await usuario.save();

        //Generamos el JWT
        const token = await generarJWT( usuario.id, usuario.name );

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });

    } catch (error) {
        console.log('Error al registrar usuario: ', error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}


const loginUsuario = async( req=request , res=response ) => {

    const { email, password } = req.body;

    try {

        const usuario = await Usuario.findOne({ email });
        if( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario inexistente'
            });
        }

        //hacemos hatch con la contraceña
        const isValid = bcrypt.compareSync( password, usuario.password );
        if( !isValid ) {
            // si la contraceña no es valida
            return res.status(400).json({
                ok: false,
                msg: 'Contraceña incorrecta'
            });
        }

        //Generamos el JWT
        const token = await generarJWT( usuario.id, usuario.name );

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });

    } catch (error) {
        console.log('Error en login usuario: ', error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}


const revalidarToken = async( req, res=response ) => {

    const uid = req.uid;
    const name = req.name;

    // Generamos el nuevo token
    const token = await generarJWT( uid, name );

    res.json({
        ok: true,
        token,
        uid,
        name
    });
}


module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}