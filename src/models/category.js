import { Schema, model } from 'mongoose'

const categorySchema = new Schema ({

    name: { type: String, required: [true, 'El nombre es requerido'], unique: true },

    state: { type: Boolean, default: true, required: true },

    /*
    cuando yo creo una categoria quiero saber que usuario fue el que la creo
     como si fuera una foranea en sql
     entonces creamos lo manejamos como otro obj y la referencia que apunte en el esquema
     de usuario
     */

    user: { type: Schema.Types.ObjectId, ref: 'user', required: true },



})

//-- sacamos el-v, password, id a la hora de mandarlo a imprimir
categorySchema.methods.toJSON = function (){
    const { __v , state, ...data }  = this.toObject() 

    return data
}


const categoryModel = model('category', categorySchema)

export default categoryModel