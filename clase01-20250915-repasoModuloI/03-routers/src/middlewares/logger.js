export const logger=(req, res, next)=>{
    console.log(`Fecha: ${new Date().toUTCString()} - ruta: ${req.url}`)

    next()
}

// module.exports={logger}