import productsModel from '../models/product.js'

import {query, request, response} from 'express'



export const getProducts = async (req = request, res = response) => {

    try {
        
        const { limit = 2, offset = 0 } = req.query

        const query = {state: true}

        //const products = await productsModel.find()
        // .limit(Number(limit))
        // .skip(Number(offset))

        const [total, products] = await Promise.all([

            productsModel.countDocuments(query),
            productsModel.find(query)
            .populate('category', 'name')
            .limit(Number(limit))
            .skip(Number(offset))
        ])

        return res.status(200).json({total,products})

    } catch (error) {
        
        console.log(error)

        return res.status(500).json({Message: 'Error en el servidor'})
    }
}

export const getIdProducts  = async (req = request, res = response ) => {

    const {id} = req.params

    try {

        const getId = await productsModel.findById(id).populate('category', 'name')

        return res.status(200).json(getId)

    } catch (error) {
        
        console.log(error)

        return res.status(500).json({Message: 'Error en el servidor'})
    }
}


export const createProducts = async (req = request, res = response) => {
    
    const {name, price, desc, category} = req.body
    
    try {
        
        const existProduct = await productsModel.findOne({name})

        if(existProduct) return res.status(400).json({Message: `El producto ${name} ya existe `})

        //-- data a guardar

        const data = {
            name,
            price,
            desc,
            category,
            user: req.user._id, //--me da la id del usuario que la creo
          
        }

        //-- guardamos la data
        const dataSave = new productsModel(data)

        //-- guardamos la data en bd
        await dataSave.save()

        return res.status(201).json(dataSave)


    } catch (error) {
        
        console.log(error)

        return res.status(500).json({Message: 'Error en el servidor'})
    }
}

export const putProducts = async (req = request, res = response) => {

    const {id} = req.params

    const { state, user, ...data} = req.body

    console.log({data})

    try {

        const put = await productsModel.findByIdAndUpdate(id, data, {new: true})
        
        return res.status(201).json({put})

    } catch (error) {
        
        console.log(error)

        return res.status(500).json({Message: 'Error en el servidor'})
    }
}

export const deleteProducts = async (req = request, res = response) => {

    const {id} = req.params


    try {

        const deleteLogic = await productsModel.findByIdAndUpdate(id, {state: false}, {new: true})

        return res.status(200).json({deleteLogic})

    } catch (error) {
        
        console.log(error)

        return res.status(500).json({Message: 'Error en el servidor'})
    }
}