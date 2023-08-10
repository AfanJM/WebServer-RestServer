import {Router} from 'express'

import { check } from 'express-validator'

import { login } from '../controller/auth.controller.js'

import { validations } from '../middlewares/validations.js'


const router = Router()

// /api/auth/login
router.post('/login',[
    
    check('mail', 'El correo es requerido').isEmail(),

    check('password', 'La password es requerida').not().isEmpty()

],validations , login)



export default router