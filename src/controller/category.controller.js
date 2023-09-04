import categoryModel from '../models/category.js'

import {response ,request} from 'express'

//-- obtener listado de categorias paginadas y el total
export const getAllCategory = async (req = request, res = response) =>{

    const {limit = 2, offset = 2} = req.query

    const query = {state: true}


    try {
        
        const [total, category] = await Promise.all([

        categoryModel.countDocuments( query ),
        categoryModel.find( query )
        .populate('user', 'name') //-- referencia al modelo de usuario y el nombre
        .limit(Number(limit))
        .skip(Number(offset))
    ])

    return res.status(200).json({total, category})

    } catch (error) {
        
        console.log(error)

        return res.status(500).json({Message: 'Error en el servidor'})
    }

}

export const getIdCategory = async (req = request, res = response) =>{

    const {id} = req.params

    try {

        const category = await categoryModel.findById(id).populate('user', 'name')

        res.status(200).json(category)

    } catch (error) {
             
        console.log(error)

        return res.status(500).json({Message: 'Error en el servidor'})
        
    }
}

export const createCategory =  async (req = request, res = response) => {
    
    const {name} = req.body

    try {
        
        const category = await categoryModel.findOne({name})

        if(category) return res.status(400).json({message: `La categoria ${category.name} ya existe`})

        //-- generar la data a guardar

        const data = {
            name, 
            user: req.user._id
        }

        //-- creamos
        const dataSave = new categoryModel(data)

        //-- guardamos
        await dataSave.save()

        return res.status(201).json(dataSave)

    } catch (error) {
            console.log(error)

            return res.status(500).json({message: 'Error en el servidor'})
    }

    
}

export const putCategory = async (req = request, res = response) => {

    const {id} = req.params

    const {state, user, ...data} = req.body

    try {
        
        const categoryPut = await categoryModel.findByIdAndUpdate(id, data,  {new: true})

        return res.status(201).json({categoryPut})

    } catch (error) {

        console.log(error)

        return res.status(500).json({message: 'Error en el servidor'})
        
    }
}

export const deleteCategory = async (req = request, res = response) => {

    const {id} = req.params

    try {

        const deleteLogic = await categoryModel.findByIdAndUpdate(id, {state: false}, {new: true})

        return res.status(201).json({deleteLogic})
        
    } catch (error) {

        console.log(error)

        return res.status(500).json({message: 'Error en el servidor'})
        
        
    }
}