import categoryModel from "../models/category.js"

export const existeCategoryId = async ( id = '') =>{

    const existCategory = await categoryModel.findById(id)

    if(!existCategory)  throw new Error(`La id ${id} no existe`) 
    
}