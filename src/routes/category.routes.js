
import middlewares from  '../middlewares/index.js'

import {existeCategoryId} from '../helpers/exists-categoryId.js'

import {createCategory, deleteCategory, getAllCategory, getIdCategory, putCategory} from '../controller/category.controller.js'

import { Router } from "express";

import {check} from 'express-validator'

const router = Router()

/**
 *  {{url}}/api/category
 */

//-- obtener todas las categorias

router.get('/', getAllCategory)

//-- una categoria por id 

router.get('/:id', [

    check('id').isMongoId().withMessage('No es una ID valida'),

    check('id').custom( existeCategoryId ),

], middlewares.validations, getIdCategory)


//-- crear categoria -- privado -- cualquiero persona con un token valido
router.post('/create', [

    check('name')
    .notEmpty().withMessage('El nombre es requerido para la creacion de la categoria'), 


],middlewares.validations, middlewares.validateJwt, createCategory)


//-- actualizar la categoria -- privado -- cualquier persona con un token valido
router.put('/:id', [

    check('id').isMongoId().withMessage('La id no es valida'),

    check('id').custom( existeCategoryId )

], middlewares.validations, middlewares.validateJwt, putCategory )

//-- borrar una categoria (solo admin)
router.delete('/:id', [
    
    check('id').isMongoId().withMessage('La id no es valida'),

    check('id').custom( existeCategoryId ),

], middlewares.validations, middlewares.validateJwt,middlewares.validateRoleAdmin, deleteCategory)





export default router