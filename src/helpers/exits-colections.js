
export const validateColection =  ( coleccion = '', colecciones = [] ) => {

    const include = colecciones.includes(coleccion)


    if(!include) throw new Error 
    (`La coleccion: ${coleccion} NO esta permitida. Las permitidas son: ${colecciones} `)

    return true;
}

