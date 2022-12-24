const jwt = require('jsonwebtoken');
const Usuario = require("../models/User");


const checkUser = (req, res, next) =>{

    return new Promise( (resolve, reject) => {
        const token = req.header('x-token');
        if (token){
            jwt.verify(token, process.env.SECRET_JWT, async (err, decodedToken) => {
                if (err){
                    console.log(err);
                    reject('Problemas con el token');
                }
                else{
                    resolve(decodedToken.uid)
                }
            })
        }else{
            reject('No hay token en la petición')
        }
    });

};

module.exports = {
    checkUser
};