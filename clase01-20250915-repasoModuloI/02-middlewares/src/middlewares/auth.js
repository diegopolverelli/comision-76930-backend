export const auth=(req, res, next)=>{
    let {user, password}=req.query
    if(user!="admin" || password!="123456"){
        return res.status(401).send({
            error:"Credenciales inválidas"
        })
    }

    req.user="admin"

    next()
}