import userModel from "../models/user.js"

export const existUserById = async ( id  = '') => {

    const existUser = await userModel.findById( id )

    if(!existUser) throw new Error(`El id ${id} no existe`)

}