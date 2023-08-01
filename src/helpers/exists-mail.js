import userModel from '../models/user.js'

export const existsMail = async (mail = '') =>{

    const userByMail = await userModel.findOne({mail})
    
    if(userByMail) throw new Error (`El correo: ${mail} ya se encuentra registrado`)
}

