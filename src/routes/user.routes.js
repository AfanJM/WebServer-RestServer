import { Router } from "express";

import { check } from 'express-validator'

import middlewares from '../middlewares/index.js'

import helpers from "../helpers/index.js";

import {
        userDelete
        , userGet,
        userPost,
        userPut
} from "../controller/user.controller.js";


const router = Router()

router.get('/user', userGet)

router.post('/user', [

        check('name').not().isEmpty().withMessage('El nombre es obligatorio'),

        check('password').isLength({ min: 6 }).withMessage('Debe contener al menos 6 caracteres'),

        check('mail').isEmail().withMessage('Debe ser un formato valido'),

        check('mail').custom(helpers.existsMail),

        //check('role').isIn(['USER_ROLE', 'ADMIN_ROLE']).withMessage('No es un rol permitido')

        //validamos los roles en la base de datos usando un custom
        check('role').custom(helpers.isRolValidate),


], middlewares.validations, userPost)

router.put('/user/:id', [

        check('id').isMongoId().withMessage('No es un id valido'),

        check('id').custom(helpers.existUserById),

        check('role').custom(helpers.isRolValidate)


], middlewares.validations, userPut)

router.delete('/user/:id', middlewares.validateJwt,  middlewares.validateRoleAdmin,middlewares.validateRoles('VENTAS_ROLE', 'ADMIN_ROLE'), [

        check('id').isMongoId().withMessage('No es un id valido'),

        check('id').custom(helpers.existUserById),

], middlewares.validations, userDelete)




export default router