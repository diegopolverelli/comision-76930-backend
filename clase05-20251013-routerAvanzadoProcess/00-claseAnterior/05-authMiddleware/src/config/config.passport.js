import passport from "passport"
import passportJWT from "passport-jwt"

const buscarToken=req=>{
    let token=null

    if(req.cookies.cookieToken){
        token=req.cookies.cookieToken
    }

    return token
}

export const iniciarPassport=()=>{

    // 1
    passport.use("current" , new passportJWT.Strategy(
        {
            secretOrKey: "CoderCoder123", 
            jwtFromRequest: passportJWT.ExtractJwt.fromExtractors([buscarToken])
        }, 
        async(contenidoToken, done)=>{
            try {
                // return done(null, false, {message:"error personalizado"})
                if(contenidoToken.nombre=="Martin"){
                    return done(null, false, {message:"El usuario Martin tiene el acceso temporalmente inhabilitado. Contacte a RRHH"})
                }
                return done(null, contenidoToken)
            } catch (error) {
                return done(error)
            }
        }
    ))



    // 1'  // solo va si usamos sessions
    // passport.serializeUser()
    // passport.deserializeUser()

}