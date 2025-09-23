export const auth=(req, res, next)=>{
    if(!req.session.usuario){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`No hay usuarios autenticados`})
    }

    req.user=req.session.usuario
    next()    
}