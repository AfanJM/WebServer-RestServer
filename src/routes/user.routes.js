import { userDelete
        ,userGet, 
         userPost, 
         userPut } from "../controller/user.controller.js";

import { Router } from "express";

const router = Router()
router.get('/user', userGet)

router.post('/user',userPost )

router.put('/user/:id',userPut)

router.delete('/user', userDelete)




export default router