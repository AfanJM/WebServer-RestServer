
import {join, dirname} from 'path'

import fs from 'fs';

import { fileURLToPath } from 'url';

import models from  '../models/index.js'

import { uploadFile } from '../helpers/upload-file.js';

import {request, response} from 'express'

import {v2 } from 'cloudinary';

const cloudinary = v2

const callBackClaodinary = ()  => {
  
  cloudinary.config({ 
    cloud_name: 'dxmvhjc55', 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
  })

  return cloudinary
}

//-- traer la imagen de un producto por coleccion/id
export const getFile = async (req = request, res = response) => {

  const {coleccion , id } = req.params

  let modelo;

  let usuario = models.userModel

  let producto = models.productsModel

  switch (coleccion) {

    case 'user':

    modelo = await usuario.findById(id)

    if(!modelo) return res.status(400).json({Message: 'No existe usuario con esta id ', id})
      
      break;

    case 'products': 

    modelo = await producto.findById(id)

    if(!modelo) return res.status(400).json({Message: 'No existe usuario con esta id ', id})

      break;
  
    default:

       return res.status(500).json({Message: 'No tengo este caso aun jj'})

  }

  if(modelo.img){

    const pathImg = join(dirname(fileURLToPath(import.meta.url)), '../uploads', coleccion, modelo.img)
  
    if(fs.existsSync(pathImg)){
      
        return res.sendFile(pathImg)
    }

    
  }

  //-- mostramos la img no encontrada
  const pathNoImg = join(dirname(fileURLToPath(import.meta.url)), '../assets/no-image.jpg')

  res.sendFile(pathNoImg)

   
}

//-- post para crear la imagen del producto
export const fileUpload = async (req = request, res = response) => {
  
    try {

      const pathName = await uploadFile( req.files, undefined, 'imgs' )
    
      res.json({ pathName })
      
    } catch (error) {
        return res.status(400).json({error})
    }

}


//-- actualizar img
export const updateUpload = async (req = request, res = response ) => {

  const { coleccion, id } = req.params

  let modelo;

  let usuario = models.userModel

  let producto = models.productsModel

  switch (coleccion) {

    case 'user':

    modelo = await usuario.findById(id)

    if(!modelo) return res.status(400).json({Message: 'No existe usuario con esta id ', id})
      
      break;

    case 'products': 

    modelo = await producto.findById(id)

    if(!modelo) return res.status(400).json({Message: 'No existe usuario con esta id ', id})

      break;
  
    default:

       return res.status(500).json({Message: 'No tengo este caso aun jj'})

  }

  //-- limpiamos las fotos previas

  if(modelo.img){

    const pathImg = join(dirname(fileURLToPath(import.meta.url)), '../uploads', coleccion, modelo.img)

    if(fs.existsSync(pathImg)   ){
        fs.unlinkSync( pathImg ) 
    }


  }


  const name = await uploadFile( req.files, undefined, coleccion)

  modelo.img = name

  await modelo.save();

  res.json( modelo )

}


//-- cloudinary
export const updateUploadCloudinary = async (req = request, res = response ) => {

  const { coleccion, id } = req.params

  let modelo;

  let usuario = models.userModel

  let producto = models.productsModel

  try {
    
    switch (coleccion) {

      case 'user':
  
      modelo = await usuario.findById(id)
  
      if(!modelo) return res.status(400).json({Message: 'No existe usuario con esta id ', id})
        
        break;
  
      case 'products': 
  
      modelo = await producto.findById(id)
  
      if(!modelo) return res.status(400).json({Message: 'No existe usuario con esta id ', id})
  
        break;
    
      default:
  
         return res.status(500).json({Message: 'No tengo este caso aun jj'})
  
    }
  
    //-- limpiamos las fotos previas
  
    if(modelo.img){
      
      const public_id = modelo.img.split("/").pop().split(".").shift();

      callBackClaodinary().uploader.destroy(`nodejs-rest-api/${public_id}`)
 
      console.log('id del archivo: ',public_id)
  
    }
  
    let {tempFilePath } = req.files.upload

    const {secure_url} = await callBackClaodinary().uploader.upload(  tempFilePath, {
      folder: 'nodejs-rest-api',
    } ); 

    modelo.img = secure_url

    await modelo.save()

    //-- la subimos a cloudinary
    res.status(200).json(modelo)

  } catch (error) {

      console.log(error)

      return res.status(500).json({Message: 'Error en el servidor'})
  }

}

