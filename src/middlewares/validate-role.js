import { response, request } from 'express'



export const validateRoleAdmin = async ( req = request, res = response,  next ) =>{

        if(!req.user) return res.status(500).json({Message: 'Se quiere validar el rol sin primero validar el token'})

        const {role, name} = req.user

        //-- evalauamos el role
        if(role !== 'ADMIN_ROLE') return res.status(401).json({Message: `${name } no tiene permiso`})
        
        next()
}


export const validateRoles = ( ...roles  ) => {

    return (req, res = response, next) => {

        if(!req.user) return res.status(500).json({Message: 'Se quiere validar el rol sin primero validar el token'})

        //-- sino esta incluido el role que esta en la request (peticion)
         if(! roles.includes( req.user.role )) return res.status(401).json({Message: `El servicio requiere uno de estos roles ${ roles }`})
        
        next()
    }
}
