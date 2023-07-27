import { response } from "express"

export const userGet = (req, res = response) =>{

    //-- obtenemos los parametros de la query
    const {page = 1, limit = 5} = req.query

    res.json({
        msg: 'get API',
        page,
         limit
    })
}

export const userPost = (req, res) =>{

    const {nombre, edad} = req.body

    res.json({
        msg: 'post API',
        nombre, edad
    })
}

export const userPut = (req, res) =>{

    const {id} = req.params

    res.json({
        msg: 'put API',
        id
    })
}

export const userDelete = (req, res) =>{
    res.json({
        msg: 'delete API'
    })
}
