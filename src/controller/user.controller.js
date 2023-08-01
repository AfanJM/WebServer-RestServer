import { response } from "express"
import {hash} from 'bcrypt'
import userModel from '../models/user.js'

export const userGet = async (req, res = response) =>{

    //-- obtenemos los parametros de la query
    //-- limit: el numero delos que me trae || skip: a partir de cual me trae
    const { limit  = 5, offset = 5} = req.query

    //para que me salgan solo los usuarios activos
    const query = {state: true}

    // const users = await userModel.find( query )
    // .limit( Number( limit ) )
    // .skip(Number( offset ) )

    // const total = await userModel.countDocuments( query ) 

    //-- aqui ejecutamos las dos promesass de manera simultanea para mejora de los tiempos
    //-- no pasa hasta que las dos funcionen, si una da error la otra tambien 
    const [total, users] = await Promise.all([
        userModel.countDocuments( query ),
        userModel.find( query )
        .limit( Number( limit ) )
        .skip(Number( offset ) )
    ])

    res.json({ total, users })
}

export const userPost = async (req, res) =>{

    const {name, mail, password, role} = req.body

    const User = new userModel({ name, mail, password, role })

    //-- hash de la password

    User.password = await hash(password, 12)

    //-- guardamos el bd
    await User.save()

    res.json({
        User
    })
}

export const userPut = async (req, res) =>{

    const { id } = req.params

    const {_id ,password, google, mail,  ...resto } = req.body

    //TODO: validar contra base de dato
    if(password) {
        resto.password = await hash(password, 12)

    }
    const user = await userModel.findByIdAndUpdate( id, resto )

    res.json({ user })
}

export const userDelete = async (req, res) =>{

    const { id } = req.params

    //-- borrado fisico
    //const user = await userModel.findByIdAndDelete(id )

    //-- borrado logico (cambiamo el estado)
    const user = await userModel.findByIdAndUpdate( id, {state: false } )

    res.json({ user })
}
