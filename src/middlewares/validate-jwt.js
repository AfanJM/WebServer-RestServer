import userModel from '../models/user.js'

import jwt from 'jsonwebtoken'

import {request, response} from 'express'

export const validateJwt = async (req = request, res = response, next) =>{

    //sacamos el token de las cabeceras
    const token = req.header('Authorization')

    if(!token) return res.status(401).json({Message: 'Usuario no autorizado - NO TOKEN'})

    try {

        const { uid } = jwt.verify(token, process.env.SECRET_KEY)

        //-- agarramos todos los datos del uid del token (lo contiene la const user)
        const user = await userModel.findById(uid)

        //-- no existe en la base de datos
        if(!user) return res.status(401).json({Message: 'Token no valido - usuario no existente '})

        //-- verificamos que el usuario este activo
        if( user.state === false ) return res.status(401).json({Message: 'Token no valido - usuario inactivo'})

        //-- guardamos la informacion en la requet user 
        req.user = user
       
        



        next();    

    } catch (error) {
            console.log(error)

            res.status(401).json({Message: 'Token no valido'})
    }
}