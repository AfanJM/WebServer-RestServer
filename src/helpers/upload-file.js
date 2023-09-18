
import {dirname, join} from 'path'

import { fileURLToPath } from 'url';

import {v4 as uuid} from 'uuid'

/*
Aqui tenemos el req.file, las extensiones permitidas y el nombre de la carpeta
*/
export const uploadFile = async (files,  validExtensions = ['png', 'jpg', 'gif'], carpeta = '' ) =>{

    return new Promise( (resolve, reject) =>{

         //-- destructuramos el upload de la request
      const {upload}  = files;

      //-- cortamos el nombre y lo separamos en un array
      const cutName = upload.name.split( '.' )
  
      //-- sacamos la extension es decir PNG, JPG
      const ext = cutName[cutName.length - 1] 
  
      if(! validExtensions.includes(ext)) {
          
          return reject(`La extension: ${ext} NO es permitida. Las permitidas son: ${validExtensions} `)
      }
  
      //--nombre temporal para el archivo     Taller1.txt
      const nameTemp = uuid() + '.' + ext  
  
      //-- guardamos la foto en el carpeta upload que esta en la raiz
      const uploadPath = join(dirname(fileURLToPath(import.meta.url)),  '../uploads/', carpeta ,nameTemp)
      
      //-- mv es para que se mueva hacia la carpeta upload
      upload.mv( uploadPath, (err) => {
  
        if (err) {
  
          console.log(err)
  
          return reject( err )
        }
    
        resolve( nameTemp)
  
      });

    } )
     
}