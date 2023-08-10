import {join, dirname} from 'path'
import { fileURLToPath } from 'url'
import userRoutes from '../routes/user.routes.js'
import authRoutes from '../routes/auth.routes.js'
import connectDb from '../db/config.js'
import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'

dotenv.config()

class server {

    //-- aqui llamamos todos los metodos
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.pathPublic = join(dirname(fileURLToPath(import.meta.url)), '..')

        this.usersPath = '/api'
        this.authPath = '/api/auth'

        //-- conectamos a la DB
        this.conexionBD()
        
        //middlewares
        this.middlewares()
        
        //routes
        this.routes()
    }

    //--metodos//--

    //-- conexion a la bd
    async conexionBD(){
        await connectDb()
    }

    //-- servimos todos los middlewares
    middlewares(){
        this.app.use(express.json() )
        this.app.use(cors())
        this.app.use(express.static(join(this.pathPublic, 'public')))
    }

    //--definimos las rutas que queremos
    routes() {
        this.app.use(this.authPath, authRoutes)
        this.app.use(this.usersPath ,userRoutes)
    }

    //-- escuchamos el server
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Escuchando en el puerto ${this.port}`)
        })
    }
}


export default server 
