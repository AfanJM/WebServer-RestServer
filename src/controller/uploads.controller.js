
import { uploadFile } from '../helpers/upload-file.js';

import {request, response} from 'express'

import models from  '../models/index.js'

export const fileUpload = async (req = request, res = response) => {
  
    //-- si viene la propiedad file en la request
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.upload) {

      res.status(400).json({Message: 'No hay archivo que subir'});

      return;
    }

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

  try {
    
    res.json({coleccion,id})

  } catch (error) { 

    console.log(error)

    return res.status(500).json({Message: 'Error en el servidor'})
    
  }

}
