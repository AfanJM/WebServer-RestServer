

export const validaFile = (req, res, next) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.upload) 

         return res.status(400).json({ Message: 'No hay archivo que subir' });
    
          next()
      
}