
import { fileUpload, updateUpload } from '../controller/uploads.controller.js'

import middlewares from '../middlewares/index.js'

import helpers from '../helpers/index.js'

import { Router } from "express";

import { check } from "express-validator";

const router = Router()

router.post('/', fileUpload)

router.put('/:coleccion/:id', [

    check('id').isMongoId().withMessage('No es una id valida'),

    check('coleccion').custom( c => helpers.validateColection( c, ['user', 'products']  )  )    ,

], middlewares.validations,  updateUpload )



 
export default router