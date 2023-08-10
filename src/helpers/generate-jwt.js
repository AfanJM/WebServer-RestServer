import jwt from 'jsonwebtoken'

export const generateJWT = ( uid = '' ) =>{
    
    return new Promise ((resolve, reject) =>{

        const payload = {uid}

        jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: '2h'
        }, ( error, token ) =>{

            if(error) {
                console.log(error)
                reject('No se pudo generar el token')
            } else{
                resolve( token )
            }
        })
    })
}