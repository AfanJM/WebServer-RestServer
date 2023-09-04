import userModel from '../models/user.js'

import productsModel from '../models/product.js'

import categoryModel from '../models/category.js'

import { request, response } from 'express'

import mongoose from 'mongoose'

//-- colecciones permitidas para hacer las busquedas
const collections = [
    'users',
    'roles',
    'products',
    'categories'
]

//-- constante para manejar la busqueda de los usuarios

const users = async (term = '', res = response) => {

    //-- buscamos por id 
    const isMongoId = mongoose.isValidObjectId(term) //-- true o false si es mongoID

    if (isMongoId) {

        const user = await userModel.findById(term)

        return res.json({
            results: (user) ? [user] : []
        })
    }

    //-- buscamos por nombre y por corroreo

    //-- expresion regular para que no sean tan sencible
    const regex = new RegExp(  term ,'i'  )

    //-- me busca por nombre O correo
    const name = await userModel.find({ 

        $or: [{name: regex}, { mail: regex } ] , 

        $and: [{state: true}]
    })

    res.json({
        results: name
    })

}

//-- busqueda por producto

const products = async (term = '', res = response) => {

    const isMongoId = mongoose.isValidObjectId(term) //-- true o false si es mongoID

    if( isMongoId ) {

        const id = await productsModel.findById(term).populate('category', 'name')

        return res.json({
            results: (id) ?  [id]: []
        })

    }

    const regex = new RegExp( term, 'i' )
    
    const name = await productsModel.find({

        $or: [ {name: regex}], 

        $and: [ { state: true } ]
    }).populate('category', 'name')


    res.json({
        results: name
    })

}

//-- busqueda por categoria
const categories = async (term = '', res = response) => {

    const isMongoId = mongoose.isValidObjectId(term)

    if(isMongoId) {

        const id = await categoryModel.findById(term).populate('user', 'name')

        return res.json({
            results: (id) ? [id]: []
        })
    }

    const regex = new RegExp(term, 'i')

    const name = await categoryModel.find({

        $or: [{ name: regex }], 

        $and: [{ state: true }]
    }).populate('user', 'name')

    res.json({
        results: name
    })
}


export const search = async (req = request, res = response) => {

    const { coleccion, term } = req.params


    if (!collections.includes(coleccion)) return res.status(400).json({ Message: `Las colecciones permitidas son: ${collections}` })


    switch (coleccion) {

        case 'users':

            users(term, res)

            break;

        case 'products': 

            products(term, res)

            break;

        case 'categories': 

        categories(term, res)

            break;

        default:

            return res.json(500).json({ Message: 'No hay mas casos, proximamente.. ' })

            break;
    }






}