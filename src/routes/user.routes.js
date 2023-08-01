import { Router } from "express";

import {check} from 'express-validator'

import { validations } from "../middlewares/validations.js";

import { isRolValidate } from "../helpers/existRole.js";

import { existsMail } from "../helpers/exists-mail.js";

import { existUserById } from '../helpers/existUserById.js'

import { userDelete
        ,userGet, 
         userPost, 
         userPut } from "../controller/user.controller.js";


const router = Router()

router.get('/user', userGet)

router.post('/user', [

        check('name').not().isEmpty().withMessage('El nombre es obligatorio'),

        check('password').isLength({min: 6}).withMessage('Debe contener al menos 6 caracteres'),

        check('mail').isEmail().withMessage('Debe ser un formato valido'),

        check('mail').custom( existsMail ),

        //check('role').isIn(['USER_ROLE', 'ADMIN_ROLE']).withMessage('No es un rol permitido')
        
        //validamos los roles en la base de datos usando un custom
        check('role').custom( isRolValidate ),

        
], validations, userPost )

router.put('/user/:id', [

        check('id')
        .isMongoId().withMessage('No es un id valido'),

        check('id').custom( existUserById ),

        check('role').custom( isRolValidate )


],validations , userPut)

router.delete('/user/:id',[

        check('id')
        .isMongoId().withMessage('No es un id valido'),

        check('id').custom( existUserById ),

], validations ,userDelete)




export default router