
import productsModel from '../models/product.js'

export const existProductId = async ( id = '') =>   {

    const exist = productsModel.findById(id)

    if(!exist) throw new Error(`El producto con id: ${id} no existe`)
}
