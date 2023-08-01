import roleModel from '../models/role.js'

export const isRolValidate = async (role = '') => {
    const existRole = await roleModel.findOne({role})
 
    if(!existRole) {
            throw new Error(`El rol ${role} no esta registrado en la base de datos`)
    }
}