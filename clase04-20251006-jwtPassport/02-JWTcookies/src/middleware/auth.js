import jwt from "jsonwebtoken"

export const auth=(req, res, next)=>{
    // if(!req.headers.authorization){
    if(!req.cookies.tokenCookie){
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`No hay usuarios antenticados`, detalle:`Haga login`})
    }

    // "BEARER adsfasdfasf.asdfasdf88asdf.asdfasdf8asdfajsdf"
    // let token=req.headers.authorization.split(" ")[1]
    let token=req.cookies.tokenCookie

    let usuario
    try {
        usuario=jwt.verify(token, "CoderCoder123")
        req.user=usuario
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`Credenciales invalidas`, detalle: error.message})
    }

    next()
}