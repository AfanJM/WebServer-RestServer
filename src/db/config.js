import {connect} from "mongoose";

const connectDb = async () =>{
    try {

        await  connect(process.env.MONGODB)

        console.log('conectado correctamente a la BD')
        
    } catch (error) {
        console.log(error)
        throw new Error('Error a la hora de conectarse con la BD')
    }
}

export default connectDb
