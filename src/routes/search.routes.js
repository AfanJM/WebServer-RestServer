
import { search } from "../controller/search.controller.js";

import { Router } from "express";

const router = Router()


//-- busquedas
router.get('/:coleccion/:term', search)



export default router