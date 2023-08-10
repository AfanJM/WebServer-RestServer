import { response, request } from "express"

import { compare } from "bcrypt"

import { generateJWT } from "../helpers/generate-jwt.js"

import userModel from "../models/user.js"

export const login = async (req = request, res = response) =>{

    const {mail , password } = req.body
    
    try {
        // verificar si existe el correo

        const user = await userModel.findOne({ mail })

        if(!user) return res.status(400).json({Message: 'Usuario / Password incorrectos'})

        //si el usuario esta activo

        if( user.state === false ) return res.status(400).json({Message: 'Usuario / Password incorrectos - estado: false'})

        //verificar la contraseña
        const validPassword = await compare(password, user.password)

        if(!validPassword) return res.status(400).json({Message:'Usuario / Password incorrectos - password'})
        
        //generar el jwt
        const token = await generateJWT(user.id)

        res.json({user, token})

    } catch (error) {
        console.log(error)

        return res.status(500).json({Error: 'Error en el servidor'})
    }


}