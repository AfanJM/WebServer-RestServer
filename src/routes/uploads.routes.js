
import { fileUpload, updateUpload,updateUploadCloudinary, getFile } from '../controller/uploads.controller.js'

import middlewares from '../middlewares/index.js'

import helpers from '../helpers/index.js'

import { Router } from "express";

import { check } from "express-validator";

const router = Router()

router.get('/:coleccion/:id', [

    check('id').isMongoId().withMessage('Esta id no es valida'), 

    check('coleccion').custom( c => helpers.validateColection( c, ['user', 'products']  )  )    ,

], middlewares.validations, getFile )

router.post('/',middlewares.validaFile, fileUpload)


router.put('/:coleccion/:id', [

    check('id').isMongoId().withMessage('No es una id valida'),

    check('coleccion').custom( c => helpers.validateColection( c, ['user', 'products']  )  )    ,

], middlewares.validaFile, middlewares.validations ,  updateUploadCloudinary )


// router.put('/:coleccion/:id', [

//     check('id').isMongoId().withMessage('No es una id valida'),

//     check('coleccion').custom( c => helpers.validateColection( c, ['user', 'products']  )  )    ,

// ], middlewares.validaFile, middlewares.validations ,  updateUpload )






 
export default router