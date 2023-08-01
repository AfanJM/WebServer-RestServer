import {Schema, model} from 'mongoose'


const roleSchema = new Schema ({
    role: {type: String, required: [true, 'El rol es requerido'] }
    
})

const roleModel = model('role', roleSchema)

export default roleModel
