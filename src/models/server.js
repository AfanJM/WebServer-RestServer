import {join, dirname} from 'path'

import { fileURLToPath } from 'url'

import Routes from '../routes/index.js'

import connectDb from '../db/config.js'

import dotenv from 'dotenv'

dotenv.config()

import express from 'express'

import cors from 'cors'

import fileUpload from 'express-fileupload'

class server {

    //-- aqui llamamos todos los metodos
    constructor() {
        this.app = express()

        this.port = process.env.PORT

        this.pathPublic = join(dirname(fileURLToPath(import.meta.url)), '../public')

        this.pathImg = join(dirname(fileURLToPath(import.meta.url)), '../uploads/products')

        this.pathUser = join(dirname(fileURLToPath(import.meta.url)), '../uploads/user')

        this.pathNoImg = join(dirname(fileURLToPath(import.meta.url)), '../assets')
       
        this.paths = {
            auth: '/api/auth',

            users: '/api',

            category: '/api/category',

            products: '/api/products',

            search: '/api/search',

            upload: '/api/upload'
        }

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

        this.app.use(cors({
            origin: 'https://restserver-oxet.onrender.com/',
            methods: 'GET, HEAD, POST, PUT, PATCH, DELETE',
            credentials: true
        })); 

        this.app.use(express.static( this.pathPublic ))

        this.app.use(express.static(this.pathImg))

        this.app.use(express.static(this.pathNoImg ))

        this.app.use(express.static(   this.pathUser))

        //-- configuracion para la carga de archivo
        this.app.use( fileUpload({

            useTempFiles : true,
            
            tempFileDir : '/tmp/', 

            createParentPath: true //-- crear carpetas
        }));
        
    }

    //--definimos las rutas que queremos
    routes() {
        this.app.use(this.paths.upload, Routes.uploadRoutes)

        this.app.use(this.paths.search,Routes.searchRoutes)

        this.app.use(this.paths.products, Routes.productsRoutes)

        this.app.use(this.paths.category, Routes.categoryRoutes)

        this.app.use(this.paths.auth, Routes.authRoutes)

        this.app.use(this.paths.users ,Routes.userRoutes)
    }

    //-- escuchamos el server
    listen() {
        this.app.listen(this.port, () => {

            console.log(`Escuchando en el puerto ${this.port}`)
        })
    }
}


export default server 
