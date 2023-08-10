import {Schema, model} from 'mongoose'


const userSchema = new Schema({

    name: {type: String, required: true},

    mail: {type: String, unique: true},

    password: {type: String, required: true},

    img: {type: String},

    role: {type: String , required: true, emun: ['ADMIN_ROLE', 'USER_ROLE', 'VENTAS_ROLE']},

    state: {type: Boolean, default: true},

    google: {type: Boolean ,default: false}
    
})

//-- sacamos el-v, password, id a la hora de mandarlo a imprimir
userSchema.methods.toJSON = function (){
    const { __v , password,_id,  ...user }  = this.toObject() 

    user.uid = _id

    return user
}

const userModel = model('user', userSchema)


export default userModel


