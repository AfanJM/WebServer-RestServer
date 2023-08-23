import { response, request } from "express"

import { compare } from "bcrypt"

import { generateJWT } from "../helpers/generate-jwt.js"

import userModel from "../models/user.js"


import googleVerify from "../helpers/google-verify.js"


export const login = async (req = request, res = response) =>{

    const {mail , password } = req.body
    
    try {
        // verificar si existe el correo

        const user = await userModel.findOne({ mail })

        if(!user) return res.status(400).json({Message: 'Usuario / Password incorrectos'})

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


export const googleSignIn = async(req = request, res = response) => {

    const {id_token} = req.body; 

    try {

     const {name, mail, img} = await googleVerify( id_token )

     //console.log({img})

      let usuario = await userModel.findOne({ mail })

      //-- si el usuario no existe, hay que crearlo
      if(!usuario) {

        const data = {
            name,
            mail,
            password: ':P',
            img,
            google: true
        };

         usuario = new userModel( data );

         await usuario.save()

      } else {
        //-- si el usuario ya existe actualizar los datos 
        usuario.name = name

        usuario.img  = img

        usuario.google = true

        await usuario.save()
      }


      //-- si el usuario en BD esta inactivo
      if(usuario.state === false) return res.status(401).json({Error: 'Usuario no autorizado'})

      //generar el jwt
      const token = await generateJWT(usuario.id)

     res.json({
        usuario, token
     })


    } catch (error) {
        console.log(error)
        return res.status(500).json({Error: 'El token no se pudo verificar'})
        
    }

}