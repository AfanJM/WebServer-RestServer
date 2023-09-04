import {Schema, model} from 'mongoose'


const productsSchema = new Schema ({

    name: {type: String, required: [true, 'El nombre es requerido'], unique: true } ,

    state: {type: Boolean, default: true, required: true} , 

    user: { type: Schema.Types.ObjectId, ref: 'user', required: true },

    price: {type: Number, default: 0}, 

    category: {type: Schema.Types.ObjectId, ref: 'category', required: true} ,

    desc: {type: String} ,

    available: {type: Boolean, default: true}

    

})

productsSchema.methods.toJSON = function() {

    const {_v, state, ...data} = this.toObject()

    return data
}

const productsModel = model('products', productsSchema)

export default productsModel