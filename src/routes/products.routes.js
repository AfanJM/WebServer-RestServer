import { getProducts, createProducts, putProducts, deleteProducts, getIdProducts } from '../controller/products.controller.js'

import middlewares from '../middlewares/index.js'

import helpers from '../helpers/index.js'

import { Router } from "express";

import {check} from 'express-validator'

const router = Router()

//-- todos  los productos
router.get('/', getProducts )

//-- ver producto por id 
router.get('/:id', [ 

    check('id').isMongoId().withMessage('La id no es valida'), 

    check('id').custom( helpers.existProductId )    

], middlewares.validations, getIdProducts)

//-- crear producto (privado) personas con token valido
router.post('/', [

    check('name').notEmpty().withMessage('El nombre es requerido'), 

    check('price').notEmpty().isNumeric().withMessage('El precio es requerido'), 

    check('category').isMongoId().withMessage('No es una id valida'), 

    check('category').custom( helpers.existeCategoryId )


], middlewares.validations, middlewares.validateJwt, createProducts)

//-- actualizar (privado)

router.put('/:id', [

    check('id').isMongoId().withMessage('La id no es valida'), 

    check('id').custom( helpers.existProductId )

], middlewares.validations, middlewares.validateJwt, putProducts )


//-- delete (solo admin)

router.delete('/:id', [

    check('id').isMongoId().withMessage('La id no es valida'), 

    check('id').custom( helpers.existProductId )

], middlewares.validations,middlewares.validateJwt, middlewares.validateRoleAdmin, deleteProducts)


export default router