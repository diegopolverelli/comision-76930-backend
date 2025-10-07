import passport from "passport"
import local from "passport-local"
import github from "passport-github2"
import bcrypt from "bcrypt"
import { usuariosModelo } from "../models/usuario.model.js"

export const iniciarPassport = () => {

    // paso 1
    passport.use("github", new github.Strategy(
        {
            clientID: "Iv23liiSfWnLpJvZY6s6",
            clientSecret: "18d2275b952f6adda00f6445ec69fd9f40a88446",
            callbackURL: "http://localhost:3000/api/sessions/callbackGithub"
        },
        async (t1, t2, profile, done) => {
            try {
                // console.log(profile)
                let { name, email } = profile._json
                if (!email) {
                    return done(null, false)  // 2) retorno indicando fallo en validacion
                }
                let usuario = await usuariosModelo.findOne({ email })
                if (!usuario) {
                    usuario = await usuariosModelo.create({
                        email, 
                        nombre: name, 
                        profile
                    })

                }

                console.log(usuario)
                return done(null, usuario)   // 1) retorno usuario autenticado
            } catch (error) {
                return done(error)  // 3 retorno error
            }
        }
    ))

    passport.use("login", new local.Strategy(
        {
            usernameField: "email"
        },
        async(username, password, done)=>{
            try {
                let usuario=await usuariosModelo.findOne({email: username})
                if(!usuario){
                    return done(null, false)
                }

                if(!bcrypt.compareSync(password, usuario.password)){
                    return done(null, false)
                }

                return done(null, usuario)
            } catch (error) {
                return done(error)
            }
        }
    ))

    passport.use("registro", new local.Strategy(
        {
            usernameField: "email", 
            passReqToCallback: true
        }, 
        async(req, username, password, done)=>{
            try {
                let{nombre, apellido}=req.body
                if(!nombre || !apellido){
                    return done(null, false)
                }

                // validaciones varias... 
                password=bcrypt.hashSync(password, 10)

                let nuevoUsuario=await usuariosModelo.create({nombre, apellido, email: username, password})
                return done(null, nuevoUsuario)
            } catch (error) {
                return done(error)
            }
        }
    ))


    // paso 1'  (solo si sessions...)
    passport.serializeUser((usuario, done) => {
        return done(null, usuario.email)
    })


    passport.deserializeUser(async (email, done) => {
        let usuario = await usuariosModelo.findOne({ email })
        return done(null, usuario)
    })


}